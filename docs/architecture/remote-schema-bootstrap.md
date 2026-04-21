# Bootstrap Do Schema Remoto

Estado atual da primeira migration remota.

## Feito

- `supabase init`
- migration inicial criada em `supabase/migrations/20260420215500_initial_remote_schema.sql`
- tabelas base modeladas:
  - `liturgical_seasons`
  - `mass_moments`
  - `songs`
  - `celebrations`
  - `song_assets`
  - `celebration_recommendations`
  - `profiles`
  - `subscriptions`
  - `comments`

## Blocker Atual

- `supabase db push` nao conecta no host do Postgres remoto
- erro atual: hostname de `db.<project-ref>.supabase.co` nao resolve

## Impacto

- tabelas remotas ainda nao existem
- blockers `404` continuam em `songs`, `celebrations` e `comments`

## Proximo Passo

- validar host Postgres correto no dashboard
- ou executar `db push` em ambiente com acesso DNS ao host remoto
