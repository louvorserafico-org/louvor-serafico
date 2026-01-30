-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";
create extension if not exists "unaccent";

-- 1. Profiles (Linked to auth.users)
create table public.profiles (
  user_id uuid not null primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Songs
create table public.songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  composer text,
  lyrics_markdown text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz
);

-- 3. Song Assets
create table public.song_assets (
  id uuid primary key default gen_random_uuid(),
  song_id uuid not null references public.songs(id) on delete cascade,
  type text not null check (type in ('score_pdf', 'audio_mp3', 'cover_image')),
  storage_bucket text not null,
  storage_path text not null,
  version int default 1,
  duration_seconds int,
  created_at timestamptz default now()
);

-- 4. Tags
create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz default now()
);

-- 5. Song Tags (ManyToMany)
create table public.song_tags (
  song_id uuid not null references public.songs(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (song_id, tag_id)
);

-- 6. Favorites
create table public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  song_id uuid not null references public.songs(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, song_id)
);

-- 7. Ratings
create table public.ratings (
  user_id uuid not null references auth.users(id) on delete cascade,
  song_id uuid not null references public.songs(id) on delete cascade,
  rating int not null check (rating >= 1 and rating <= 5),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (user_id, song_id)
);

-- 8. Song Stats (Materialized info for quick access)
create table public.song_stats (
  song_id uuid primary key references public.songs(id) on delete cascade,
  avg_rating numeric(3, 2) default 0,
  ratings_count int default 0,
  favorites_count int default 0,
  updated_at timestamptz default now()
);

-- Indexes
create index idx_songs_status on public.songs(status);
create index idx_songs_title on public.songs using gin (title gin_trgm_ops); -- Fuzzy search capability
create index idx_song_assets_lookup on public.song_assets(song_id, type, version);
create index idx_favorites_song on public.favorites(song_id);
create index idx_ratings_song on public.ratings(song_id);

-- Search setup (Optional simple search vector)
alter table public.songs add column if not exists fts tsvector generated always as (to_tsvector('portuguese', title || ' ' || coalesce(composer, '') || ' ' || coalesce(lyrics_markdown, ''))) stored;
create index idx_songs_fts on public.songs using gin (fts);

-- Functions & Triggers

-- Automatic updated_at
create or replace function public.handle_updated_at() 
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_profiles before update on public.profiles for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_songs before update on public.songs for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_ratings before update on public.ratings for each row execute procedure public.handle_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Admin Helper
create or replace function public.is_admin(uid uuid)
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where user_id = uid and role = 'admin'
  );
$$ language sql security definer;

-- Admin Promotion Helper
create or replace function public.promote_admin_by_email(user_email text)
returns void as $$
declare
  u_id uuid;
begin
  select id into u_id from auth.users where email = user_email;
  if u_id is not null then
    update public.profiles set role = 'admin' where user_id = u_id;
  end if;
end;
$$ language plpgsql security definer;

-- Stats Maintenance Trigger
create or replace function public.update_song_stats()
returns trigger as $$
declare
  target_song_id uuid;
begin
  target_song_id := coalesce(new.song_id, old.song_id);
  
  -- Upsert stats
  insert into public.song_stats (song_id, avg_rating, ratings_count, favorites_count)
  select
    target_song_id,
    coalesce(avg(rating), 0),
    count(rating),
    (select count(*) from public.favorites where song_id = target_song_id)
  from public.ratings
  where song_id = target_song_id
  on conflict (song_id) do update set
    avg_rating = excluded.avg_rating,
    ratings_count = excluded.ratings_count,
    favorites_count = excluded.favorites_count,
    updated_at = now();
    
  return null;
end;
$$ language plpgsql;

create trigger update_stats_on_rating 
  after insert or update or delete on public.ratings
  for each row execute procedure public.update_song_stats();

create trigger update_stats_on_favorite
  after insert or update or delete on public.favorites
  for each row execute procedure public.update_song_stats();

-- RLS Policies

alter table public.profiles enable row level security;
alter table public.songs enable row level security;
alter table public.song_assets enable row level security;
alter table public.tags enable row level security;
alter table public.song_tags enable row level security;
alter table public.favorites enable row level security;
alter table public.ratings enable row level security;
alter table public.song_stats enable row level security;

-- Profiles: 
-- Read: Public (or specific logic? defaulting to public reading of profiles is often okay, but let's restrict if needed. User said: "usuário pode ler/editar apenas seu próprio display_name; role só admin altera")
-- Actually user said: "profiles: usuário pode ler/editar apenas seu próprio display_name". So user can read THEIR own.
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = user_id);
create policy "Users can update own display_name" on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Admins can do everything on profiles" on public.profiles for all using (public.is_admin(auth.uid()));

-- Songs:
-- Read: Public if published
create policy "Public can read published songs" on public.songs for select using (status = 'published');
-- Admin: CRUD
create policy "Admins can do everything on songs" on public.songs for all using (public.is_admin(auth.uid()));

-- Song Assets:
-- Read: Public if song published AND bucket public
-- (We implement bucket logic in storage policies, but here we can check song status too)
create policy "Public read assets of published songs" on public.song_assets for select using (
  exists (select 1 from public.songs where id = song_assets.song_id and status = 'published')
);
create policy "Admins can do everything on assets" on public.song_assets for all using (public.is_admin(auth.uid()));

-- Tags:
-- Read: Public
create policy "Public read tags" on public.tags for select using (true);
create policy "Admins manage tags" on public.tags for all using (public.is_admin(auth.uid()));

-- Song Tags:
-- Read: Public
create policy "Public read song tags" on public.song_tags for select using (true);
create policy "Admins manage song tags" on public.song_tags for all using (public.is_admin(auth.uid()));

-- Favorites:
-- CRUD Own
create policy "Users manage own favorites" on public.favorites for all using (auth.uid() = user_id);

-- Ratings:
-- CRUD Own
create policy "Users manage own ratings" on public.ratings for all using (auth.uid() = user_id);
-- Public read? User said "Select público pode ser permitido apenas via agregados".
-- But song_stats is public. Does user need to read individual ratings? Maybe not.
-- Let's allow authenticated users to read ratings (to see their own, or others? usually just own).
-- Policy above "Users manage own ratings" covers SELECT for own.
-- Let's leave it as: Only see own ratings. Stats show aggregates.

-- Song Stats:
-- Read: Public
create policy "Public read stats" on public.song_stats for select using (true);

-- Storage Buckets & Policies (SQL)
insert into storage.buckets (id, name, public) 
values 
  ('public-assets', 'public-assets', true),
  ('draft-assets', 'draft-assets', false)
on conflict (id) do nothing;

-- Storage RLS
-- Objects are in storage.objects
create policy "Public read public-assets" on storage.objects for select using ( bucket_id = 'public-assets' );
-- Draft assets: admin only
create policy "Admin read draft-assets" on storage.objects for select using ( bucket_id = 'draft-assets' and public.is_admin(auth.uid()) );
-- Upload/Update/Delete: Admin only for both
create policy "Admin insert objects" on storage.objects for insert with check ( public.is_admin(auth.uid()) );
create policy "Admin update objects" on storage.objects for update using ( public.is_admin(auth.uid()) );
create policy "Admin delete objects" on storage.objects for delete using ( public.is_admin(auth.uid()) );

