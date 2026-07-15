insert into public.liturgical_seasons (slug, name, sort_order)
values
  ('tempo-comum', 'Tempo Comum', 5)
on conflict (slug) do update
set name = excluded.name,
    sort_order = excluded.sort_order;

insert into public.mass_moments (key, label, sort_order, required)
values
  ('entrance_chant', 'Canto de entrada', 1, true),
  ('responsorial_psalm', 'Salmo Responsorial', 2, true),
  ('gospel_acclamation', 'Aclamacao ao Evangelho', 3, true),
  ('offertory', 'Apresentacao das oferendas', 4, true),
  ('communion_chant', 'Canto de comunhao', 5, true),
  ('final_chant', 'Canto final', 6, true)
on conflict (key) do update
set label = excluded.label,
    sort_order = excluded.sort_order,
    required = excluded.required;

insert into public.songs (slug, title, status)
values
  ('fazei-em-nome-do-senhor', 'Fazei em nome do Senhor', 'published'),
  ('bendito-seja-o-nome-do-senhor', 'Bendito seja o nome do Senhor', 'published'),
  ('aleluia-bendizei-o-seu-nome', 'Aleluia, bendizei o seu nome', 'published'),
  ('invocando-o-nome-do-senhor', 'Invocando o nome do Senhor', 'reviewed'),
  ('por-teu-nome-o-senhor', 'Por teu nome, o Senhor', 'published'),
  ('vamos-em-nome-do-senhor', 'Vamos em nome do Senhor', 'published')
on conflict (slug) do update
set title = excluded.title,
    status = excluded.status;

insert into public.song_assets (song_id, asset_type, title, storage_path, mime_type, premium, license_status, status)
select s.id, seeded.asset_type, seeded.title, seeded.storage_path, seeded.mime_type, seeded.premium, seeded.license_status, seeded.status
from (
  values
    ('fazei-em-nome-do-senhor', 'score_pdf', 'Partitura', 'Fazei em Nomedo Senhor.pdf', 'application/pdf', true, 'pending_review', 'published'),
    ('bendito-seja-o-nome-do-senhor', 'score_pdf', 'Partitura', 'Benndito seja o nome do Senhor (Salmo Responsotial).pdf', 'application/pdf', true, 'pending_review', 'published'),
    ('aleluia-bendizei-o-seu-nome', 'score_pdf', 'Partitura', 'Aleluia, bendizei o seu nome.pdf', 'application/pdf', true, 'pending_review', 'published'),
    ('por-teu-nome-o-senhor', 'score_pdf', 'Partitura', 'Por teu nome, o Senhor.pdf', 'application/pdf', true, 'pending_review', 'published'),
    ('vamos-em-nome-do-senhor', 'score_pdf', 'Partitura', 'Vamos em nome do Senhor.pdf', 'application/pdf', true, 'pending_review', 'published')
) as seeded(song_slug, asset_type, title, storage_path, mime_type, premium, license_status, status)
join public.songs s on s.slug = seeded.song_slug
where not exists (
  select 1
  from public.song_assets existing
  where existing.song_id = s.id
    and existing.asset_type = seeded.asset_type
    and existing.title = seeded.title
);

insert into public.celebrations (slug, title, date_label, date_month_day, liturgical_rank, liturgical_color, season_id, status)
select
  'Santíssimo-nome-de-jesus',
  'Missa do Santíssimo Nome de Jesus',
  '03 de janeiro',
  '01-03',
  'memoria facultativa',
  'branco',
  season.id,
  'published'
from public.liturgical_seasons season
where season.slug = 'tempo-comum'
on conflict (slug) do update
set title = excluded.title,
    date_label = excluded.date_label,
    date_month_day = excluded.date_month_day,
    liturgical_rank = excluded.liturgical_rank,
    liturgical_color = excluded.liturgical_color,
    season_id = excluded.season_id,
    status = excluded.status;

insert into public.celebration_recommendations (celebration_id, mass_moment_id, song_id, priority, notes)
select c.id, m.id, s.id, seeded.priority, seeded.notes
from (
  values
    ('entrance_chant', 'fazei-em-nome-do-senhor', 'required', 'Canto de entrada do repertório inicial.'),
    ('responsorial_psalm', 'bendito-seja-o-nome-do-senhor', 'required', 'Salmo do repertório inicial.'),
    ('gospel_acclamation', 'aleluia-bendizei-o-seu-nome', 'required', 'Aclamacao do repertório inicial.'),
    ('offertory', 'invocando-o-nome-do-senhor', 'required', 'Oferendas do repertório inicial.'),
    ('communion_chant', 'por-teu-nome-o-senhor', 'required', 'Comunhao do repertório inicial.'),
    ('final_chant', 'vamos-em-nome-do-senhor', 'required', 'Canto final do repertório inicial.')
) as seeded(moment_key, song_slug, priority, notes)
join public.celebrations c on c.slug = 'Santíssimo-nome-de-jesus'
join public.mass_moments m on m.key = seeded.moment_key
join public.songs s on s.slug = seeded.song_slug
where not exists (
  select 1
  from public.celebration_recommendations existing
  where existing.celebration_id = c.id
    and existing.mass_moment_id = m.id
    and existing.song_id = s.id
);
