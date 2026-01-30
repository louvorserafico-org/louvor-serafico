-- Seed Tags
insert into public.tags (name) values 
('Entrada'), ('Comunhão'), ('Mariano'), ('Natal'), ('Quaresma')
on conflict do nothing;

-- Seed Songs
insert into public.songs (title, composer, status, lyrics_markdown, published_at)
values 
('Glória a Deus nas Alturas', 'Frei Exemplo', 'published', '# Refrão\n\nGlória a Deus nas alturas...', now()),
('Cantai ao Senhor (Rascunho)', 'Irmã Teste', 'draft', '# Intro\n\nAinda está sendo composto...', null);

-- Stats entries (trigger handles it if we had ratings, but we can init empty)
insert into public.song_stats (song_id)
select id from public.songs
on conflict do nothing;

-- Note: We cannot seed a user/admin easily without their UUID. 
-- The user must sign up and then run `select promote_admin_by_email('email@example.com')` manually.
