# Ambiente Local

Este documento descreve o ambiente local esperado para desenvolver o Louvor
Serafico.

## Sistema Alvo

- Windows.
- PowerShell.
- VSCode aberto no projeto.
- Android Studio e Android Emulator instalados.
- Docker instalado.
- Node.js compativel com o projeto.
- PNPM como package manager.
- Expo/EAS futuramente.
- Supabase CLI futuramente.

## Workspace

Workspace alvo:

```text
C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
```

Pasta de referencia editorial/documental:

```text
C:\Users\myPC\Desktop\dev\personal\frei-luis
```

## Modos De Desenvolvimento Planejados

### Modo 1 - Mobile com dados locais/mockados

Uso:

- Navegacao.
- Tema.
- Telas iniciais.
- Componentes.
- Dominio local.

Comandos serao definidos na etapa de bootstrap tecnico.

### Modo 2 - Mobile com Supabase remoto

Uso:

- Integracao real com Auth, Postgres e Storage.
- Testes contra ambiente de desenvolvimento na nuvem.

Requer `.env` local com chaves publicas adequadas.

### Modo 3 - Mobile com Supabase local via Docker

Uso:

- Desenvolvimento de schema.
- Migrations.
- Seeds.
- RLS.
- Testes locais de backend gerenciado.

Comandos esperados futuramente:

```bash
supabase start
supabase db reset
```

## Android Emulator

Fluxo esperado:

1. Abrir Android Studio.
2. Iniciar um device no Android Emulator.
3. Rodar o app mobile pelo script documentado.
4. Validar visualmente os fluxos alterados.

Guia detalhado:

- `docs/development/run-android.md`

## Expo Go Versus Development Build

Expo Go pode ser usado no inicio para telas, navegacao e logica simples.

Development Build sera necessario quando o projeto usar recursos nativos que nao
funcionam no Expo Go, especialmente compras/assinaturas com RevenueCat.

## Secrets E Variaveis

Regras:

- Nao commitar `.env`.
- Nao commitar service role key do Supabase.
- Chaves publicas podem usar prefixo `EXPO_PUBLIC_` quando forem realmente
  publicas.
- Secrets de build devem ir para EAS Secrets no momento adequado.

## Validacoes Futuras

Comandos reais apos o bootstrap tecnico:

```powershell
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm install
corepack pnpm test
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm dev
corepack pnpm android
```

Supabase local ainda nao foi configurado nesta etapa. Quando entrar no escopo,
os comandos esperados serao:

```bash
supabase start
supabase db reset
```

## Hurdles Do Ambiente

- `pnpm` nao esta disponivel diretamente no PATH.
- `corepack` tentou usar `AppData` e recebeu `EPERM` no sandbox.
- O workaround adotado foi usar `COREPACK_HOME` dentro do workspace.
- `pnpm --recursive run` tambem encontrou `spawn EPERM` no sandbox; por isso os
  scripts raiz de validacao chamam Node/TypeScript diretamente nos alvos atuais.
- `adb devices -l` pode mostrar `emulator-5554` mesmo sem emulator real rodando.
  Nesse caso, use `adb disconnect emulator-5554` e abra o AVD real.
- Nao manter BlueStacks e Android Studio abertos ao mesmo tempo durante testes
  Expo. Use apenas o Android Studio para evitar conflito no ADB.
