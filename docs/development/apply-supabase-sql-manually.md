# Aplicar SQL Manualmente No Supabase

## Objetivo

Este guia existe porque o `supabase db push` pode falhar localmente por DNS, rede ou bloqueio do ambiente. Quando isso acontecer, aplique o SQL diretamente pelo painel do Supabase sem destravar o desenvolvimento do app.

## Ordem Correta

Abra o Supabase Dashboard do projeto e acesse:

```text
SQL Editor -> New query
```

Execute nesta ordem:

1. `supabase/migrations/20260420215500_initial_remote_schema.sql`
2. `supabase/migrations/20260420224000_add_favorite_songs.sql`
3. `supabase/seed.sql`

Execute um arquivo por vez. Se um erro acontecer, pare e registre o erro antes de continuar.

## Validação Rápida

Depois de aplicar, rode no SQL Editor:

```sql
select slug, title, status
from public.songs
order by title;

select slug, title, date_label, status
from public.celebrations
order by date_month_day;

select count(*) as total_recommendations
from public.celebration_recommendations;

select count(*) as total_assets
from public.song_assets;
```

Resultado esperado inicial:

- 6 músicas cadastradas.
- 1 celebração publicada.
- 6 recomendações.
- 5 assets de partitura.

## Validação Pelo App

Depois de aplicar o SQL:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm dev
```

No iPhone com Expo Go:

- abrir `Perfil`;
- confirmar status remoto do Supabase;
- abrir `Repertório`;
- abrir uma música;
- conferir se o subtítulo indica leitura remota;
- abrir `Calendário`;
- conferir celebração de 03 de janeiro.

## Cuidados

- Não cole `SERVICE_ROLE` no app.
- Não coloque credenciais em documentação.
- Não execute SQL destrutivo sem revisão.
- Se uma migration já tiver sido aplicada, os comandos `if not exists`, `on conflict` e `drop policy if exists` devem permitir reexecução segura.

## Storage

Este guia aplica apenas tabelas, policies de tabelas e seed inicial.

O bucket `song-assets` deve ser criado separadamente antes de testes reais de arquivos premium. A decisão atual é manter o bucket privado e não criar policy pública de leitura para materiais premium.

## Hurdles & Fixes

- Problema conhecido: `supabase db push` pode falhar por DNS.
- Correção operacional: aplicar SQL manualmente pelo Dashboard e validar pelo app.
- Trade-off: o histórico local de migrations continua existindo, mas o ambiente remoto pode ficar fora de sincronia se alguém editar SQL direto no painel sem replicar no repositório.
