insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'song-assets',
  'song-assets',
  false,
  20971520,
  array[
    'application/pdf',
    'audio/mpeg',
    'audio/mp3',
    'image/jpeg',
    'image/png'
  ]
)
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "song assets are publicly readable" on storage.objects;
drop policy if exists "authenticated users read song assets" on storage.objects;
