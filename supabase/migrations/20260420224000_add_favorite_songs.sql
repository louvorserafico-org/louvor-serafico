create table if not exists public.favorite_songs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  song_id uuid not null references public.songs(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  constraint favorite_songs_profile_song_unique unique (profile_id, song_id)
);

create index if not exists favorite_songs_profile_id_idx on public.favorite_songs(profile_id);
create index if not exists favorite_songs_song_id_idx on public.favorite_songs(song_id);

alter table public.favorite_songs enable row level security;

drop policy if exists "users read own favorite songs" on public.favorite_songs;
create policy "users read own favorite songs"
on public.favorite_songs
for select
to authenticated
using (auth.uid() = profile_id);

drop policy if exists "users insert own favorite songs" on public.favorite_songs;
create policy "users insert own favorite songs"
on public.favorite_songs
for insert
to authenticated
with check (auth.uid() = profile_id);

drop policy if exists "users delete own favorite songs" on public.favorite_songs;
create policy "users delete own favorite songs"
on public.favorite_songs
for delete
to authenticated
using (auth.uid() = profile_id);
