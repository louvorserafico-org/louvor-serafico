# Louvor Serafico

app mobile para musicos da Santa Missa, construido com Expo,
React Native e TypeScript.

## Estrutura Inicial

```text
louvor-serafico/
  apps/
    mobile/
  packages/
    shared/
  docs/
  CODEX.md
```

## Pre-requisitos

- Node.js 24.x ou compativel.
- Corepack.
- Android Studio com Android Emulator.
- Docker, futuramente para Supabase local.

PNPM e gerenciado via Corepack. Neste ambiente Windows, use `COREPACK_HOME`
apontando para `.corepack` dentro do projeto:

```powershell
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
```

## Instalar Dependencias

```powershell
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm install
```

## Rodar Validacoes

```powershell
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm test
corepack pnpm typecheck
corepack pnpm lint
```

## Rodar O App Mobile

Teste preferencial agora:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm dev
```

Depois:

- abrir Expo Go no iPhone
- escanear QR code
- pressionar `s` quando quiser trocar modo no Expo CLI
- abrir tab `Perfil` para validar estado local e leitura remota inicial do Supabase

Guia detalhado:

- `docs/development/run-iphone-expo-go.md`
- `docs/development/development-build.md`
- `docs/development/apply-supabase-sql-manually.md`

Com o Android Emulator aberto:

```powershell
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm android
```

Ou iniciar o Metro/Expo:

```powershell
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm dev
```

Se ocorrer erro com `emulator-5554` ou porta `5554`, veja:

- `docs/development/run-android.md`

Para validar visualmente, veja:

- `docs/development/visual-review.md`

## Documentacao Viva

Leia primeiro:

- `CODEX.md`
- `docs/workflow/ai-pair-programming.md`
- `docs/workflow/definition-of-done.md`
- `docs/workflow/tdd-strategy.md`
- `docs/development/local-environment.md`
- `docs/development/supabase-setup.md`
- `docs/architecture/supabase-schema-plan.md`
- `docs/architecture/remote-schema-bootstrap.md`
- `docs/architecture/remote-seed-bootstrap.md`
- `docs/product/auth-flow.md`
- `docs/product/session-preview.md`
- `docs/product/favorites-preview.md`
- `docs/product/comments-preview.md`
- `docs/product/local-persistence.md`
- `docs/product/supabase-auth-email.md`
- `docs/product/supabase-session-state.md`
- `docs/product/supabase-profile.md`
- `docs/product/remote-comments.md`
- `docs/product/remote-comments-feed.md`
- `docs/product/remote-comment-submit.md`
- `docs/product/remote-favorites.md`
- `docs/product/remote-favorites-feed.md`
- `docs/product/remote-favorite-toggle.md`
- `docs/product/remote-celebration-detail.md`
- `docs/product/remote-song-detail.md`
- `docs/product/premium-asset-gate.md`
- `docs/product/premium-storage-assets.md`
- `docs/product/subscription-preview.md`
- `docs/product/revenuecat-readiness.md`
- `docs/product/remote-songs.md`
- `docs/product/remote-celebrations.md`
- `docs/product/remote-fallback-catalogs.md`

## Regra De Trabalho

Toda etapa deve atualizar `CODEX.md`, seguir DoD e usar TDD quando houver regra
de negocio ou comportamento critico.
