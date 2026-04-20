# Supabase schema plan

Documento inicial do schema relacional proposto para Louvor Serafico.

Esta etapa nao cria migrations. Ela define linguagem comum antes do banco real.

## Principios

- Banco relacional.
- Conteudo liturgico primeiro.
- Curadoria editorial separada de interacao social.
- Conteudo premium controlado por metadados.
- RLS desde inicio.

## Tabelas iniciais

### liturgical_seasons

- `id`
- `slug`
- `name`
- `sort_order`

Exemplos:

- advento
- natal
- quaresma
- pascoa
- tempo-comum

### celebrations

- `id`
- `slug`
- `title`
- `date_month_day`
- `liturgical_rank`
- `liturgical_color`
- `season_id`
- `notes`
- `status`
- `created_at`
- `updated_at`

Status inicial:

- draft
- reviewed
- published

### mass_moments

- `id`
- `key`
- `label`
- `sort_order`
- `required`

Valores iniciais:

- entrance_chant
- responsorial_psalm
- gospel_acclamation
- offertory
- communion_chant
- final_chant

### songs

- `id`
- `slug`
- `title`
- `subtitle`
- `theme_tags`
- `difficulty_level`
- `notes`
- `status`
- `created_at`
- `updated_at`

### song_assets

- `id`
- `song_id`
- `asset_type`
- `title`
- `storage_path`
- `mime_type`
- `premium`
- `license_status`
- `status`
- `created_at`

Asset types iniciais:

- lyrics
- chord_sheet
- score_pdf
- audio

### celebration_recommendations

- `id`
- `celebration_id`
- `mass_moment_id`
- `song_id`
- `priority`
- `notes`
- `created_at`

Priority inicial:

- required
- recommended
- optional

### profiles

- `id`
- `auth_user_id`
- `display_name`
- `avatar_url`
- `role`
- `created_at`

Role inicial:

- user
- editor
- admin

### subscriptions

- `id`
- `profile_id`
- `provider`
- `customer_id`
- `entitlement`
- `status`
- `expires_at`
- `created_at`
- `updated_at`

### comments

- `id`
- `profile_id`
- `song_id`
- `celebration_id`
- `body`
- `status`
- `created_at`

Status inicial:

- visible
- hidden
- flagged

## Relacionamentos

- `celebrations.season_id -> liturgical_seasons.id`
- `song_assets.song_id -> songs.id`
- `celebration_recommendations.celebration_id -> celebrations.id`
- `celebration_recommendations.mass_moment_id -> mass_moments.id`
- `celebration_recommendations.song_id -> songs.id`
- `profiles.auth_user_id -> auth.users.id`
- `subscriptions.profile_id -> profiles.id`
- `comments.profile_id -> profiles.id`
- `comments.song_id -> songs.id`
- `comments.celebration_id -> celebrations.id`

## RLS direcao inicial

Leitura publica:

- liturgical_seasons
- mass_moments
- celebrations publicadas
- songs publicadas
- recommendations ligadas a celebracoes publicadas

Leitura autenticada:

- comments visiveis
- proprio profile
- propria subscription

Escrita restrita:

- editor/admin para conteudo liturgico
- usuario autenticado para comentarios proprios
- backend/server-side para subscriptions

## Premium

Regra inicial:

- Metadado `premium` mora em `song_assets`
- Titulo da musica pode ser publico
- Arquivo premium exige entitlement ativo

## Seeds iniciais

Obrigatorios na primeira migration futura:

- seasons basicas
- mass_moments padrao
- celebracao "Missa do Santissimo Nome de Jesus"
- songs iniciais
- recommendations iniciais

## Observacoes

- `SERVICE_ROLE` nunca entra no app mobile.
- `ANON_KEY` e `PUBLISHABLE_KEY` podem existir no ambiente local do app.
- URL e chaves reais devem ficar em `.env.local`, nunca em docs versionados.
