# Louvor Serafico

Aplicativo mobile catolico para musicos da Santa Missa, construido com Expo,
React Native e TypeScript.

O projeto usa monorepo leve. O foco inicial e o app mobile; backend, assinatura
e conteudo premium serao integrados incrementalmente.

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

## Regra De Trabalho

Toda etapa deve atualizar `CODEX.md`, seguir DoD e usar TDD quando houver regra
de negocio ou comportamento critico.
