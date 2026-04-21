create extension if not exists pgcrypto;

create table if not exists public.liturgical_seasons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort_order integer not null default 0
);

create table if not exists public.mass_moments (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  sort_order integer not null default 0,
  required boolean not null default true
);

create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  theme_tags text[] not null default '{}',
  difficulty_level text,
  notes text,
  status text not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint songs_status_check check (status in ('draft', 'reviewed', 'published', 'archived'))
);

create table if not exists public.celebrations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  date_label text not null,
  date_month_day text not null,
  liturgical_rank text,
  liturgical_color text,
  season_id uuid references public.liturgical_seasons(id) on delete set null,
  notes text,
  status text not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint celebrations_status_check check (status in ('draft', 'reviewed', 'published', 'archived'))
);

create table if not exists public.song_assets (
  id uuid primary key default gen_random_uuid(),
  song_id uuid not null references public.songs(id) on delete cascade,
  asset_type text not null,
  title text not null,
  storage_path text,
  mime_type text,
  premium boolean not null default false,
  license_status text,
  status text not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  constraint song_assets_type_check check (asset_type in ('lyrics', 'chord_sheet', 'score_pdf', 'audio')),
  constraint song_assets_status_check check (status in ('draft', 'reviewed', 'published', 'archived'))
);

create table if not exists public.celebration_recommendations (
  id uuid primary key default gen_random_uuid(),
  celebration_id uuid not null references public.celebrations(id) on delete cascade,
  mass_moment_id uuid not null references public.mass_moments(id) on delete cascade,
  song_id uuid not null references public.songs(id) on delete cascade,
  priority text not null default 'recommended',
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint celebration_recommendations_priority_check check (priority in ('required', 'recommended', 'optional'))
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'user',
  created_at timestamptz not null default timezone('utc', now()),
  constraint profiles_role_check check (role in ('user', 'editor', 'admin'))
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null,
  customer_id text,
  entitlement text,
  status text not null default 'inactive',
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint subscriptions_status_check check (status in ('inactive', 'trialing', 'active', 'past_due', 'canceled', 'expired'))
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  song_id uuid references public.songs(id) on delete cascade,
  celebration_id uuid references public.celebrations(id) on delete cascade,
  body text not null,
  status text not null default 'visible',
  created_at timestamptz not null default timezone('utc', now()),
  constraint comments_status_check check (status in ('visible', 'hidden', 'flagged'))
);

create index if not exists celebrations_date_month_day_idx on public.celebrations(date_month_day);
create index if not exists songs_slug_idx on public.songs(slug);
create index if not exists comments_song_id_idx on public.comments(song_id);
create index if not exists comments_celebration_id_idx on public.comments(celebration_id);
create index if not exists song_assets_song_id_idx on public.song_assets(song_id);
create index if not exists celebration_recommendations_celebration_id_idx on public.celebration_recommendations(celebration_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email))
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists songs_set_updated_at on public.songs;
create trigger songs_set_updated_at
before update on public.songs
for each row
execute function public.set_updated_at();

drop trigger if exists celebrations_set_updated_at on public.celebrations;
create trigger celebrations_set_updated_at
before update on public.celebrations
for each row
execute function public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row
execute function public.set_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.liturgical_seasons enable row level security;
alter table public.mass_moments enable row level security;
alter table public.songs enable row level security;
alter table public.celebrations enable row level security;
alter table public.song_assets enable row level security;
alter table public.celebration_recommendations enable row level security;
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.comments enable row level security;

drop policy if exists "liturgical seasons are readable" on public.liturgical_seasons;
create policy "liturgical seasons are readable"
on public.liturgical_seasons
for select
to anon, authenticated
using (true);

drop policy if exists "mass moments are readable" on public.mass_moments;
create policy "mass moments are readable"
on public.mass_moments
for select
to anon, authenticated
using (true);

drop policy if exists "published songs are readable" on public.songs;
create policy "published songs are readable"
on public.songs
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "published celebrations are readable" on public.celebrations;
create policy "published celebrations are readable"
on public.celebrations
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "published song assets are readable" on public.song_assets;
create policy "published song assets are readable"
on public.song_assets
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "recommendations are readable" on public.celebration_recommendations;
create policy "recommendations are readable"
on public.celebration_recommendations
for select
to anon, authenticated
using (true);

drop policy if exists "visible comments are readable" on public.comments;
create policy "visible comments are readable"
on public.comments
for select
to anon, authenticated
using (status = 'visible');

drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "users create own profile" on public.profiles;
create policy "users create own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "users read own subscription" on public.subscriptions;
create policy "users read own subscription"
on public.subscriptions
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = subscriptions.profile_id
      and profiles.id = auth.uid()
  )
);

drop policy if exists "users insert own comments" on public.comments;
create policy "users insert own comments"
on public.comments
for insert
to authenticated
with check (auth.uid() = profile_id);

drop policy if exists "users update own comments" on public.comments;
create policy "users update own comments"
on public.comments
for update
to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

drop policy if exists "users delete own comments" on public.comments;
create policy "users delete own comments"
on public.comments
for delete
to authenticated
using (auth.uid() = profile_id);
