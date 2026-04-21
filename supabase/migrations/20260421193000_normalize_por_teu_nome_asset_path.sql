update public.song_assets asset
set storage_path = 'Por teu nome, o Senhor.pdf'
from public.songs song
where asset.song_id = song.id
  and song.slug = 'por-teu-nome-o-senhor'
  and asset.asset_type = 'score_pdf';
