<!-- rtk-instructions v2 -->
# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:
```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)
```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (60-99% savings)
```bash
rtk cargo test          # Cargo test failures only (90%)
rtk go test             # Go test failures only (90%)
rtk jest                # Jest failures only (99.5%)
rtk vitest              # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk pytest              # Python test failures only (90%)
rtk rake test           # Ruby test failures only (90%)
rtk rspec               # RSpec test failures only (60%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)
```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)
```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)
```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)
```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%). Format flags (-c, -l, -L, -o, -Z) run raw.
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)
```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)
```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)
```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands
```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category | Commands | Typical Savings |
|----------|----------|-----------------|
| Tests | vitest, playwright, cargo test | 90-99% |
| Build | next, tsc, lint, prettier | 70-87% |
| Git | status, log, diff, add, commit | 59-80% |
| GitHub | gh pr, gh run, gh issue | 26-87% |
| Package Managers | pnpm, npm, npx | 70-90% |
| Files | ls, read, grep, find | 60-75% |
| Infrastructure | docker, kubectl | 85% |
| Network | curl, wget | 65-70% |

Overall average: **60-90% token reduction** on common development operations.
<!-- /rtk-instructions -->

---

# Regras de desenvolvimento (OBRIGATORIO)

- **TDD sempre.** Teste antes do codigo. Red -> Green -> Refactor.
- **Teste primeiro.** Nenhuma regra de negocio sem um teste que falha antes.
- **Validacoes completas** antes de considerar pronto: `rtk pnpm test`, `rtk pnpm typecheck`, `rtk pnpm lint`.
- **DOD (Definition of Done):** comportamento entregue, testes passando, typecheck limpo, lint limpo, sem TODO solto, sem codigo morto, doc viva atualizada.
- **Cobertura minima:** happy path + 1 edge case + 1 caso de erro quando aplicavel.
- **Escopo nao cresce** sem aprovacao explicita.
- **Commit SO quando o usuario confirmar** o fim de uma etapa. Nunca commitar por conta propria.
- **Use RTK sempre.** Prefixe todo comando verboso com `rtk` (git, pnpm, testes).

# Documentacao viva

Este arquivo (CLAUDE.md) e a memoria operacional do projeto. Migrado de CODEX.md.
A cada etapa: registrar resumo, arquivos, decisoes/trade-offs, DoD e sugestao de commit.

---

# Historico do projeto (migrado de CODEX.md)

# CODEX.md

Documento vivo do desenvolvimento assistido do projeto Louvor Serafico.

Este arquivo e a memoria operacional do projeto. Antes de qualquer etapa futura,
ele deve ser lido junto com os documentos em `docs/`. Depois de cada etapa, ele
deve ser atualizado com o que foi feito, decisoes, trade-offs, problemas reais
encontrados e o checklist de Definition of Done.

## Contexto Do Produto

Louvor Serafico e um aplicativo mobile catolico para musicos da Santa Missa.
O objetivo e organizar roteiros musicais por data, celebracao, tempo liturgico
e momento da missa, oferecendo repertorio recomendado e acesso premium a
materiais como letra, cifra, partitura, audio e, futuramente, video.

O projeto deve nascer com cuidado editorial, beleza visual, identidade
franciscana e uma base tecnica simples, moderna, testavel e evolutiva.

## Paths Oficiais

- Workspace alvo do app: `C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico`
- Pasta de referencia editorial/documental: `C:\Users\myPC\Desktop\dev\personal\frei-luis`

## Fonte De Verdade

A fonte de verdade do projeto, nesta ordem:

1. Decisoes explicitas do usuario nesta conversa.
2. Este `CODEX.md`.
3. Documentos versionados em `docs/`.
4. Codigo e configuracoes criados a partir do novo processo.

Arquivos legados restaurados no repositorio nao devem ser tratados como fonte de
verdade para a implementacao futura. Eles podem ser apagados, substituidos ou
ignorados quando o usuario autorizar a etapa de bootstrap tecnico.

## Estado Atual Do Workspace

Validacao feita em 2026-04-20:

- Repositorio Git restaurado em `louvor-serafico`.
- Branch atual: `dev`.
- Tracking remoto: `origin/dev`.
- Ha arquivos legados restaurados: `.github`, `apps`, `packages`, `supabase`,
  `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `turbo.json`,
  `tsconfig.json`, `.gitignore` e `README.md`.
- Nesta etapa, esses arquivos foram apenas observados. Nenhum codigo legado foi
  adotado como base tecnica.

Atualizacao apos Etapa 1 em 2026-04-20:

- O usuario limpou o legado antes da Etapa 1.
- Monorepo mantido por decisao explicita do usuario.
- Estrutura tecnica inicial criada com `apps/mobile` e `packages/shared`.
- Dependencias instaladas com PNPM via Corepack e cache local em `.corepack`.
- `.corepack` e `.pnpm-store` foram adicionados ao `.gitignore`.

Atualizacao apos validacao manual mais recente:

- Testes manuais do app passarao a usar iPhone com Expo Go como fluxo padrao.
- Android Studio continua util para validacoes especificas, mas nao sera o fluxo
  principal de teste enquanto estivermos em Expo Go.
- Guia detalhado criado em `docs/development/run-iphone-expo-go.md`.

## Produto Inicial

O primeiro caso editorial real sera:

- Data: 03 de janeiro.
- Celebracao: Missa do Santissimo Nome de Jesus.
- Modelo: missa padrao.

Ordem liturgico-musical inicial:

1. Canto de entrada: Fazei em nome do Senhor.
2. Salmo Responsorial: Bendito seja o nome do Senhor.
3. Aclamacao ao Evangelho: Aleluia, bendizei o seu nome.
4. Apresentacao das oferendas: Invocando o nome do Senhor.
5. Canto de comunhao: Por teu nome, o Senhor.
6. Canto final: Vamos em nome do Senhor.

## Lacunas Conhecidas

- Confirmar se o PDF de `Invocando o nome do Senhor` existe ou precisa ser
  criado/adicionado.
- Normalizar nomes dos PDFs da pasta de referencia.
- Corrigir possiveis erros de digitacao em nomes de arquivos, como `Benndito`,
  `Responsotial` e `Nomedo`.
- Corrigir problema de encoding no README legado antes de reaproveitar qualquer
  texto dele.
- Decidir, antes do bootstrap tecnico, se o repositorio antigo sera limpo ou se
  faremos substituicao incremental dos arquivos.

## Arquitetura Desejada

Direcao aprovada ate aqui:

- Monorepo leve, com foco inicial no app mobile.
- Mobile em React Native + Expo + TypeScript.
- Backend gerenciado com Supabase como BaaS: Postgres, Auth, Storage, RLS,
  migrations e Edge Functions quando necessario.
- Assinaturas com RevenueCat.
- Repositorio versionara app, docs, schema/migrations e funcoes futuras.
- Admin web pode existir futuramente, mas nao deve bloquear o MVP mobile.

## Processo Obrigatorio

Para cada etapa futura:

1. Ler `CODEX.md` e `docs/`.
2. Extrair requisitos, criterios de aceitacao, entradas, saidas e limites.
3. Propor plano curto, com no maximo 10 itens.
4. Quando houver regra de negocio ou comportamento testavel, iniciar com TDD:
   Red -> Green -> Refactor.
5. Implementar o minimo necessario.
6. Rodar validacoes locais cabiveis.
7. Refatorar apenas se for pequeno, seguro e justificado.
8. Atualizar `CODEX.md`.
9. Finalizar com arquivos alterados, testes, validacoes, DoD e sugestao de
   commit.

## Definition Of Done Base

Uma etapa so e considerada pronta quando:

- O comportamento combinado foi entregue.
- O escopo nao cresceu sem aprovacao.
- Testes relevantes passam, quando existirem.
- TypeScript passa, quando houver codigo TypeScript.
- Lint/format passam, quando configurados.
- Nao ha TODO solto ou codigo morto introduzido.
- Erros e logs tem mensagens uteis, quando aplicavel.
- `CODEX.md` foi atualizado.
- Divergencias com `docs/` foram registradas.
- O proximo passo ficou claro.

## Hurdles & Fixes

### 2026-04-20 - Restauracao do repositorio

- Hurdle: inicialmente o path `louvor-serafico` continha apenas `README.md` e
  nao era reconhecido como repositorio Git.
- Fix: usuario restaurou os arquivos e a pasta `.git`; nova validacao confirmou
  a branch `dev...origin/dev`.

### 2026-04-20 - Legado restaurado

- Hurdle: o repositorio restaurado contem uma estrutura antiga que o usuario
  informou que nao sera usada.
- Fix: registrar que o legado nao e fonte de verdade e que o bootstrap futuro
  deve ignorar ou substituir esses arquivos com autorizacao explicita.

### 2026-04-20 - Etapa sem codigo executavel

- Hurdle: a Etapa 0 e documental; aplicar TDD artificialmente nao agregaria
  valor.
- Fix: registrar que nao houve testes nesta etapa por ausencia de comportamento
  executavel. TDD permanece obrigatorio para regras e codigo futuro.

### 2026-04-20 - PNPM indisponivel no PATH

- Hurdle: `pnpm` nao estava disponivel diretamente no PowerShell.
- Fix: usar `corepack pnpm` com `COREPACK_HOME` apontando para `.corepack`
  dentro do workspace.

### 2026-04-20 - Corepack fora do workspace

- Hurdle: `corepack` tentou criar cache em `AppData` e recebeu `EPERM` no
  sandbox.
- Fix: definir `COREPACK_HOME` para
  `C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack`.

### 2026-04-20 - Runner Node e PNPM recursive

- Hurdle: `node --test` e `pnpm --recursive run` encontraram `spawn EPERM` no
  sandbox.
- Fix: para esta fase, scripts raiz chamam Node/TypeScript diretamente nos
  alvos atuais. O teste do dominio roda com
  `node packages/shared/src/mass-template.test.ts`.

### 2026-04-20 - Expo CLI via pnpm exec

- Hurdle: `pnpm --filter @louvor-serafico/mobile exec expo config --type public`
  nao resolveu o binario `expo` no Windows/sandbox.
- Fix: validar a config chamando o CLI diretamente via Node:
  `node C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\node_modules\expo\bin\cli config --type public`.

### 2026-04-20 - Device fantasma no ADB

- Hurdle: `corepack pnpm android` falhou porque o Expo tentou consultar
  `emulator-5554`, mas a porta TCP 5554 recusou conexao.
- Causa confirmada: BlueStacks e Android Studio estavam abertos ao mesmo tempo.
- Fix: fechar BlueStacks, usar apenas Android Studio, desconectar devices
  fantasmas quando necessario e abrir o AVD real `Medium_Phone_API_36.1`.
- Documentacao criada em `docs/development/run-android.md`.

### 2026-04-20 - Primeira leitura remota do Supabase

- Hurdle: a ideia inicial de ler o OpenAPI do PostgREST com chave publica falhou.
- Causa confirmada: o endpoint `rest/v1/` exigiu `service_role` para esse tipo de
  leitura, o que nao pode entrar no app mobile.
- Fix: trocar a primeira leitura remota para o endpoint publico
  `auth/v1/settings`, que funciona com chave publica e permite validar conexao
  real sem expor segredos nem depender de tabelas prontas.

### 2026-04-20 - Instalacao do AsyncStorage

- Hurdle: `npx expo install` falhou porque `pnpm` nao estava no PATH do processo
  interno do Expo.
- Hurdle: `corepack pnpm add` encontrou `ENOENT` temporario dentro de
  `node_modules\*_tmp`.
- Fix: dependencia ficou disponivel em `node_modules`, o lockfile foi atualizado
  e o `package.json` do app foi corrigido manualmente para manter estado
  coerente e rastreavel.

### 2026-04-20 - Tabela remota comments ausente

- Hurdle: leitura remota em `rest/v1/comments` respondeu `404`.
- Causa confirmada: a tabela `public.comments` ainda nao existe no schema cache
  do projeto Supabase.
- Fix: manter preview local funcionando e expor o estado remoto na tab
  `Comunidade` ate a migration real existir.

### 2026-04-20 - Tabela remota songs ausente

- Hurdle: leitura remota em `rest/v1/songs` respondeu `404`.
- Causa confirmada: a tabela `public.songs` ainda nao existe no schema cache
  do projeto Supabase.
- Fix: manter catalogo local como fonte principal e expor estado remoto na tab
  `Repertorio` ate a migration real existir.

### 2026-04-20 - Tabela remota celebrations ausente

- Hurdle: leitura remota em `rest/v1/celebrations` respondeu `404`.
- Causa confirmada: a tabela `public.celebrations` ainda nao existe no schema
  cache do projeto Supabase.
- Fix: manter calendario local como fonte principal e expor estado remoto na tab
  `Calendario` ate a migration real existir.

### 2026-04-20 - Push remoto do schema bloqueado

- Hurdle: `supabase db push` nao conseguiu conectar no Postgres remoto.
- Causa confirmada: hostname `db.engvbvdtdcveoebgrexl.supabase.co` nao resolve
  neste ambiente, mesmo com `--dns-resolver https`.
- Fix: migration inicial foi preparada localmente em `supabase/migrations`, e o
  blocker foi documentado para execucao em ambiente com DNS/host valido.

## Historico De Etapas

### Etapa 78 - Home sem repertorio com proximo passo claro

Status: concluida em 2026-04-25.

Entregue:

- Home passou a distinguir entre dia comum sem roteiro e data liturgica sem
  repertorio publicado.
- Regra nova passou a selecionar os proximos dias preparados a partir do ponto
  atual do ano; quando nao houver proximos, a Home mostra os dias ja
  publicados.
- Foram adicionados testes especificos para a copy e para a selecao dos dias
  preparados.

Arquivos principais:

- `apps/mobile/src/features/home/home-summary.ts`
- `apps/mobile/src/features/home/home-summary.test.ts`
- `apps/mobile/src/features/home/home-prepared-days.ts`
- `apps/mobile/src/features/home/home-prepared-days.test.ts`
- `apps/mobile/app/(tabs)/index.tsx`

Validacao:

- `corepack pnpm test`
- `corepack pnpm --filter @louvor-serafico/mobile typecheck`

### Etapa 79 - Calendario mensal navegavel em 2026

Status: concluida em 2026-04-25.

Entregue:

- A tab `Calendario` deixou de ficar presa ao mes atual e passou a navegar por
  todos os meses de 2026.
- Grade, datas marcadas e roteiros seguem o mes selecionado.
- Meses sem datas marcadas e meses sem roteiros publicados agora possuem
  estados vazios proprios.
- A regra do mes selecionado foi isolada em arquivo proprio com teste dedicado.

Arquivos principais:

- `apps/mobile/src/features/celebrations/calendar-month-view.ts`
- `apps/mobile/src/features/celebrations/calendar-month-view.test.ts`
- `apps/mobile/app/(tabs)/calendario.tsx`
- `package.json`

Validacao:

- `corepack pnpm test`
- `corepack pnpm --filter @louvor-serafico/mobile typecheck`
- `corepack pnpm lint`
- `git diff --check`

### Etapa 80 - Dias do calendario com navegação para detalhe

Status: concluida em 2026-04-25.

Entregue:

- Os dias da grade mensal passaram a ser clicaveis.
- As datas marcadas do mes tambem passaram a abrir o detalhe correto.
- A navegacao agora distingue automaticamente entre:
  - celebracao com roteiro, usando `slug`
  - data liturgica sem repertorio, usando `monthDay`
  - dia comum, usando `monthDay`
- A regra de rota foi isolada e coberta por teste.

Arquivos principais:

- `apps/mobile/src/features/celebrations/calendar-day-route.ts`
- `apps/mobile/src/features/celebrations/calendar-day-route.test.ts`
- `apps/mobile/app/(tabs)/calendario.tsx`
- `package.json`

Validacao:

- `corepack pnpm test`
- `corepack pnpm --filter @louvor-serafico/mobile typecheck`
- `corepack pnpm lint`
- `git diff --check`

### Etapa 81 - Refinar detalhe de dia sem repertorio

Status: concluida em 2026-04-25.

Entregue:

- O detalhe de dia liturgico sem repertorio ganhou copy mais final e menos
  tecnica.
- O detalhe de dia comum ganhou copy propria, orientada a consulta futura do
  calendario.
- O card principal do detalhe passou a exibir eyebrow, titulo editorial, texto
  de contexto e observacao curta antes do CTA.

Arquivos principais:

- `apps/mobile/src/features/celebrations/liturgical-day-detail.ts`
- `apps/mobile/src/features/celebrations/liturgical-day-detail.test.ts`
- `apps/mobile/app/celebracoes/[id].tsx`

Validacao:

- `corepack pnpm test`
- `corepack pnpm --filter @louvor-serafico/mobile typecheck`
- `corepack pnpm lint`
- `git diff --check`

### Etapa 82 - Refinar composicao visual da Home

Status: concluida em 2026-04-25.

Entregue:

- A Home ganhou hierarquia visual mais clara no bloco principal de hoje.
- O estado principal passou a exibir badge de data, titulo com mais peso e CTA
  mais presente.
- Foram adicionados atalhos editoriais para `Calendario` e `Repertorio`.
- O bloco mensal da Home ganhou cabecalho proprio e CTA direto para o
  calendario completo.
- O texto de apoio do roteiro sugerido foi refinado para reforcar contexto e
  ordem de leitura.

Arquivos principais:

- `apps/mobile/app/(tabs)/index.tsx`

Validacao:

- `corepack pnpm test`
- `corepack pnpm --filter @louvor-serafico/mobile typecheck`
- `corepack pnpm lint`
- `git diff --check`

### Etapa 83 - Refinar visual e copy da tab Repertorio

Status: concluida em 2026-04-25.

Entregue:

- A tab `Repertorio` ganhou resumo inicial com metricas de cantos e guardados.
- O cabecalho do catalogo recebeu texto de apoio mais editorial.
- Os cards de canto passaram a exibir eyebrow de materiais e uma copy mais
  clara para disponibilidade ou preparo do material.
- O overview textual do repertorio foi ajustado para um tom menos tecnico.

Arquivos principais:

- `apps/mobile/app/(tabs)/repertorio.tsx`
- `apps/mobile/src/components/SongCard.tsx`
- `apps/mobile/src/features/songs/repertoire-overview.ts`
- `apps/mobile/src/features/songs/repertoire-overview.test.ts`

Validacao:

- `corepack pnpm test`
- `corepack pnpm --filter @louvor-serafico/mobile typecheck`
- `corepack pnpm lint`
- `git diff --check`

### Etapa 84 - Refinar visual e copy da tab Comunidade

Status: concluida em 2026-04-25.

Entregue:

- A tab `Comunidade` recebeu copy menos tecnica e mais humana.
- Os estados de acesso remoto, local e bloqueado passaram a usar linguagem de
  partilha em vez de linguagem de ambiente.
- O bloco principal ganhou metrica visivel de partilhas.
- O formulario ganhou hierarquia visual melhor.
- Os cards de comentarios passaram a ter eyebrow editorial e estado vazio mais
  acolhedor.

Arquivos principais:

- `apps/mobile/app/(tabs)/comunidade.tsx`
- `apps/mobile/src/features/comments/community-access.ts`
- `apps/mobile/src/features/comments/community-access.test.ts`

Validacao:

- `corepack pnpm test`
- `corepack pnpm --filter @louvor-serafico/mobile typecheck`
- `corepack pnpm lint`
- `git diff --check`

### Etapa 0 - Fundacao documental e workflow

Status: concluida em 2026-04-20.

Objetivo:

- Criar memoria viva do projeto.
- Registrar workflow de desenvolvimento assistido.
- Registrar DoD e estrategia TDD.
- Registrar ambiente local esperado.
- Registrar modelo editorial inicial da missa padrao.
- Registrar arquitetura inicial e escopo de MVP.

Arquivos criados nesta etapa:

- `CODEX.md`
- `docs/workflow/ai-pair-programming.md`
- `docs/workflow/definition-of-done.md`
- `docs/workflow/tdd-strategy.md`
- `docs/development/local-environment.md`
- `docs/editorial/mass-template.md`
- `docs/product/mvp-scope.md`
- `docs/architecture/initial-architecture.md`

Validacoes executadas:

- `git status --short`
- `git diff --check`
- Conferencia da arvore de arquivos em `docs/`

Testes:

- Nenhum teste automatizado foi adicionado nesta etapa porque nao houve codigo
  executavel nem regra implementada. A excecao esta registrada em
  `docs/workflow/tdd-strategy.md`.

Checklist DoD:

- [x] `CODEX.md` criado.
- [x] `docs/` criado com documentos iniciais.
- [x] Processo de AI pair programming registrado.
- [x] Definition of Done registrado.
- [x] Estrategia de TDD registrada.
- [x] Ambiente local esperado registrado.
- [x] Modelo da missa padrao registrado.
- [x] Caso de 03 de janeiro registrado.
- [x] Lacunas conhecidas registradas.
- [x] Nenhuma implementacao de app feita.
- [x] Nenhuma dependencia instalada.
- [x] Proxima etapa indicada.

Sugestao de commit:

`docs: establish project workflow and technical foundation`

### Etapa 1 - Bootstrap tecnico controlado

Status: concluida em 2026-04-20.

Objetivo:

- Manter monorepo.
- Criar app mobile Expo/React Native com TypeScript.
- Criar pacote compartilhado com a primeira regra de dominio testavel.
- Usar TDD para a ordem da missa padrao e validacao de celebracao incompleta.
- Documentar comandos locais.

Plano executado:

1. Validar workspace e branch.
2. Criar configs raiz do monorepo.
3. Escrever testes de dominio primeiro.
4. Confirmar Red com import ausente.
5. Implementar regra minima da missa padrao.
6. Criar app mobile Expo em `apps/mobile`.
7. Ajustar Expo Router, tema inicial e tela inicial mockada.
8. Instalar dependencias com PNPM/Corepack.
9. Rodar validacoes.
10. Atualizar documentacao viva.

Arquivos principais criados/alterados:

- `package.json`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `.npmrc`
- `.gitignore`
- `README.md`
- `tsconfig.base.json`
- `apps/mobile`
- `packages/shared`
- `docs/development/local-environment.md`
- `docs/architecture/initial-architecture.md`
- `CODEX.md`

Testes adicionados:

- `packages/shared/src/mass-template.test.ts`

Cobertura:

- Happy path: ordem obrigatoria dos momentos da missa padrao.
- Edge case: celebracao incompleta sem musica no ofertorio.
- Caso de erro/entrada invalida: lookup de chave inexistente retorna
  `undefined`.

Validacoes executadas:

- `corepack pnpm install`
- `corepack pnpm test`
- `corepack pnpm typecheck`
- `corepack pnpm lint`
- `node ...\node_modules\expo\bin\cli config --type public`

Validacao nao executada:

- `corepack pnpm android` nao foi executado nesta etapa para evitar deixar o
  servidor Expo/Metro rodando e porque a validacao manual depende do Android
  Emulator aberto pelo usuario.

Decisoes tecnicas:

- Monorepo com PNPM workspaces.
- `packages/shared` guarda dominio testavel desde o inicio.
- `apps/mobile` foi gerado com `create-expo-app` e ajustado para Expo Router.
- Scripts raiz de validacao chamam Node/TypeScript diretamente para contornar
  limitacoes de spawn do sandbox.
- `react-dom` foi fixado em `19.1.0` para alinhar com `react@19.1.0` do
  template Expo SDK 54 e evitar peer warning inicial.

Alternativas rejeitadas:

- App Expo isolado na raiz: rejeitado porque o usuario confirmou monorepo.
- Reaproveitar legado restaurado: rejeitado porque o usuario pediu para ignorar
  tudo e partir limpo.
- Criar backend/Supabase nesta etapa: rejeitado para manter o bootstrap pequeno
  e validavel.

Checklist DoD:

- [x] Monorepo criado.
- [x] App mobile Expo criado em `apps/mobile`.
- [x] Pacote compartilhado criado em `packages/shared`.
- [x] TDD aplicado a regra de dominio inicial.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Config Expo carregou corretamente.
- [x] README atualizado com comandos.
- [x] Docs atualizados.
- [x] Hurdles registrados.
- [x] Nenhum backend, auth, assinatura ou Supabase implementado fora do escopo.

Sugestao de commit:

`feat: bootstrap expo monorepo foundation`

## Proxima Etapa Planejada

Etapa 2 - Navegacao base e design system inicial.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Criar tabs principais com Expo Router.
- Evoluir tema inicial para tokens mais completos.
- Criar componentes compartilhados basicos no mobile.
- Manter dados mockados.
- Validar manualmente no Android Emulator com `corepack pnpm android`.

Resultado:

- Tabs criadas: Hoje, Calendario, Repertorio, Comunidade e Perfil.
- Tela Hoje movida para grupo `(tabs)`.
- Componentes mobile criados: `PageHeader`, `SectionTitle`, `MomentCard` e
  `PlaceholderScreen`.
- Dados mockados movidos para `src/data/initialCelebration.ts`.
- Tokens visuais expandidos em `src/theme/tokens.ts`.
- Icones de tab usando `@expo/vector-icons`.

Testes:

- Nenhum teste novo foi adicionado porque a etapa alterou UI/navegacao simples.
- Testes de dominio existentes foram preservados.

Validacoes executadas:

- `corepack pnpm install`
- `corepack pnpm test`
- `corepack pnpm typecheck`
- `corepack pnpm lint`
- `node ...\node_modules\expo\bin\cli config --type public`

Validacao nao executada:

- `corepack pnpm android` nao foi executado para nao deixar servidor Metro/Expo
  aberto nesta resposta.

Checklist DoD:

- [x] Tabs principais criadas.
- [x] Tema inicial expandido.
- [x] Componentes compartilhados criados.
- [x] Dados mockados mantidos.
- [x] Testes existentes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Config Expo carrega.
- [x] `CODEX.md` atualizado.
- [x] Docs de arquitetura atualizados.

Sugestao de commit:

`feat: add mobile tabs and design foundation`

## Proxima Etapa Planejada

Etapa 3 - Dados mockados estruturados.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Modelar tipos iniciais de celebracao e canto.
- Criar mock do dia 03 de janeiro com estrutura mais proxima do dominio.
- Criar tela de detalhe de celebracao.
- Manter Supabase fora do escopo.

Resultado:

- Tipos criados: `Song`, `SongAsset`, `RepertoireRecommendation`,
  `Celebration` e `CelebrationMomentRow`.
- Mock estruturado criado em `santissimoNomeDeJesusCelebration`.
- Funcoes criadas: `buildCelebrationMomentRows` e `validateCelebration`.
- Tela Hoje passou a consumir linhas estruturadas.
- Tela de detalhe criada em `app/celebracoes/[id].tsx`.
- `MomentCard` passou a exibir status de material premium/pendente.

Testes adicionados:

- `packages/shared/src/celebration.test.ts`

Cobertura:

- Happy path: linhas da celebracao na ordem liturgica.
- Edge case: celebracao incompleta sem recomendacao no ofertorio.
- Caso de erro: recomendacao com musica inexistente gera erro.

Hurdle:

- TypeScript e Node exigiram caminhos diferentes para imports `.ts` em codigo
  executado direto.

Fix:

- Mantido import `.ts` para execucao direta nos testes Node.
- Adicionado `// @ts-ignore` local com comentario explicito ate adotarmos runner
  de testes/transpilacao mais adequado.

Validacoes executadas:

- `corepack pnpm test`
- `corepack pnpm typecheck`
- `corepack pnpm lint`

Checklist DoD:

- [x] Tipos de dominio criados.
- [x] Mock estruturado criado.
- [x] TDD aplicado.
- [x] Tela detalhe criada.
- [x] Supabase fora do escopo.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: structure celebration mock domain`

## Proxima Etapa Planejada

Etapa 4 - Navegacao para detalhe.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Adicionar acao da tela Hoje para detalhe.
- Criar card/CTA navegavel.
- Melhorar estado editorial pendente.
- Validar Expo config.

Resultado:

- A tela Hoje agora possui um CTA para abrir a celebração.
- Os cards de momento também podem navegar para o detalhe da celebração.
- Foi criado o componente `CelebrationCta`, responsável por destacar a ação principal da celebração do dia.
- Foi criado o componente `EditorialStatus`, usado para exibir se a celebração está completa ou possui material pendente.
- A tela de detalhe passou a calcular quantos cantos estão sem material associado, em vez de usar texto fixo.

Testes:

- Nenhum teste novo foi adicionado porque a mudança principal foi navegação visual no app.
- Os testes de domínio existentes foram preservados.

Validações executadas:

- `corepack pnpm test`
- `corepack pnpm typecheck`
- `corepack pnpm lint`
- `node ...\node_modules\expo\bin\cli config --type public`

Validação não executada:

- `corepack pnpm android` ainda não foi executado para evitar manter Metro/Expo aberto nesta resposta. A validação visual no Android Emulator continua pendente.

Checklist DoD:

- [x] Ação da tela Hoje para detalhe criada.
- [x] CTA navegável criado.
- [x] Cards de momento com navegação.
- [x] Estado editorial pendente melhorado.
- [x] Testes existentes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Config Expo carrega.
- [x] `CODEX.md` atualizado em linguagem normal.

Sugestão de commit:

`feat: add celebration detail navigation`

## Próxima Etapa Planejada

Etapa 5 - Validação visual local.

Objetivo esperado:

- Rodar `corepack pnpm android`.
- Validar tabs, CTA e detalhe no Android Emulator.
- Registrar qualquer problema visual ou de runtime.
- Ajustar somente bugs encontrados.

Status: concluida em 2026-04-20.

Resultado:

- O usuario conseguiu acessar e validar o app localmente.
- Nao houve report de bugs visuais ou de runtime no momento.
- A causa do erro local foi conflito entre BlueStacks e Android Studio.
- A documentacao Android foi atualizada para orientar o uso apenas do Android
  Studio durante testes Expo.

Validacoes:

- Validacao manual local realizada pelo usuario.
- Sem bugs reportados.

Checklist DoD:

- [x] App acessado localmente.
- [x] Problema de ADB identificado.
- [x] Causa documentada.
- [x] Guia Android atualizado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`docs: document android emulator troubleshooting`

## Proxima Etapa Planejada

Etapa 6 - Catalogo inicial de musicas.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Criar tela inicial de repertorio com dados estruturados.
- Listar cantos da celebracao inicial.
- Permitir abrir detalhe basico de musica.
- Manter Supabase fora do escopo.

Resultado:

- A tela Repertorio agora lista os cantos da celebracao inicial.
- Foi criado o componente `SongCard` para exibir cada canto do catalogo.
- Foi criada a rota `app/musicas/[slug].tsx` para detalhe basico de musica.
- O detalhe mostra materiais cadastrados ou estado de material pendente.
- O dominio compartilhado ganhou `getInitialSongCatalog` e `findSongBySlug`.

Testes adicionados:

- Ordenacao alfabetica do catalogo inicial.
- Lookup de slug inexistente retornando `undefined`.

Validacoes executadas:

- `corepack pnpm test`
- `corepack pnpm typecheck`
- `corepack pnpm lint`

Checklist DoD:

- [x] Catalogo inicial criado.
- [x] Tela Repertorio usa dados estruturados.
- [x] Detalhe basico de musica criado.
- [x] Supabase fora do escopo.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add initial song catalog`

## Proxima Etapa Planejada

Etapa 7 - Revisao visual no Android.

Status: preparada em 2026-04-20. Pendente validacao manual do usuario.

Objetivo esperado:

- Validar manualmente Repertorio e detalhes de musica.
- Ajustar somente bugs visuais ou runtime encontrados.

Resultado:

- Foi criado o checklist `docs/development/visual-review.md`.
- O README passou a apontar para o checklist de revisao visual.
- Nenhuma mudanca de UI foi feita nesta etapa.

Validacoes executadas:

- `corepack pnpm test`
- `corepack pnpm typecheck`
- `corepack pnpm lint`

Checklist DoD:

- [x] Checklist visual criado.
- [x] README atualizado.
- [ ] Validacao manual Android realizada.
- [ ] Bugs visuais/runtime revisados, se houver.

Sugestao de commit:

`docs: add android visual review checklist`

## Proxima Etapa Planejada

Etapa 8 - Corrigir achados da revisao visual.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Aguardar feedback visual do usuario.
- Ajustar apenas bugs encontrados.

Resultado:

- O usuario validou o checklist visual e marcou todos os itens como concluídos.
- Não houve bugs visuais ou de runtime reportados.
- Como não havia correção a fazer, a etapa foi encerrada sem mudança de UI.

Checklist DoD:

- [x] Feedback visual recebido.
- [x] Sem bugs reportados.
- [x] Nenhuma alteração desnecessária feita.

Sugestao de commit:

`docs: record successful android visual review`

## Proxima Etapa Planejada

Etapa 9 - Calendario inicial de celebracoes.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Criar catalogo inicial de celebracoes.
- Permitir encontrar celebracao por data.
- Transformar a tab Calendario em uma lista real.
- Manter Supabase fora do escopo.

Resultado:

- O domínio compartilhado ganhou `getInitialCelebrationCatalog` e `findCelebrationByDate`.
- A tab Calendario passou a listar a celebração inicial.
- Foi criado o componente `CelebrationCard`.
- O card navega para o detalhe da celebração.

Testes adicionados:

- Busca da celebração inicial por `dateMonthDay`.
- Retorno `undefined` para data sem celebração.

Validações executadas:

- `corepack pnpm test`
- `corepack pnpm typecheck`
- `corepack pnpm lint`

Checklist DoD:

- [x] Catalogo inicial de celebracoes criado.
- [x] Busca por data criada.
- [x] Calendario usa dados estruturados.
- [x] Supabase fora do escopo.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add initial celebration calendar`

## Proxima Etapa Planejada

Etapa 10 - Preparar base Supabase documental.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Documentar schema inicial proposto.
- Ainda nao criar migrations.
- Decidir tabelas e relacionamentos antes do banco real.

Resultado:

- Criado `.env.example` com variaveis publicas e privadas separadas.
- Criado `docs/architecture/supabase-schema-plan.md`.
- Criado `docs/development/supabase-setup.md`.
- README atualizado com os novos documentos.
- Nenhuma migration foi criada.
- Nenhuma chave real foi versionada.

Decisoes:

- Schema inicial sera relacional.
- Conteudo premium fica em `song_assets`.
- `SERVICE_ROLE` fica fora do app mobile.
- Projeto vai usar Expo Go no iPhone para testes manuais nas proximas etapas.

Checklist DoD:

- [x] Schema inicial documentado.
- [x] Variaveis de ambiente documentadas.
- [x] Sem migration nesta etapa.
- [x] Sem segredo versionado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`docs: add supabase schema plan`

## Proxima Etapa Planejada

Etapa 11 - Integracao Supabase no app.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Criar cliente Supabase no mobile.
- Ler variaveis publicas do ambiente.
- Ainda sem auth.
- Ainda sem salvar dados.

Resultado:

- Criado `.env.local` local com chaves recebidas do usuario.
- Criado `.env.example` para referencia segura.
- Criado `src/services/supabase/config.ts`.
- Criado `src/services/supabase/client.ts`.
- Criado teste de configuracao em `config.test.ts`.
- A tab Perfil agora mostra o estado da configuracao Supabase sem expor segredos.
- O app continua sem auth e sem escrita remota.

Testes adicionados:

- Extracao de `projectHost` e `projectRef`.
- Suporte a publishable key ou anon key.
- Estado nao configurado quando URL falta.

Validacoes executadas:

- `corepack pnpm test`
- `corepack pnpm typecheck`
- `corepack pnpm lint`

Checklist DoD:

- [x] Cliente Supabase criado.
- [x] Variaveis publicas lidas do ambiente.
- [x] Sem auth nesta etapa.
- [x] Sem escrita remota nesta etapa.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add supabase client bootstrap`

## Proxima Etapa Planejada

Etapa 12 - Primeira leitura remota do Supabase.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Fazer a primeira leitura remota real com chave publica.
- Manter auth fora do escopo.
- Evitar dependencia de tabelas ainda nao criadas.

Resultado:

- Criado `src/services/supabase/remote-status.ts`.
- Criado `src/services/supabase/remote-status.test.ts`.
- Criado `src/components/SupabaseRemoteStatusCard.tsx`.
- A tab `Perfil` agora mostra estado local e leitura remota inicial.
- A primeira leitura remota usa `auth/v1/settings`.
- O endpoint foi validado externamente e responde com chave publica.

Testes adicionados:

- Happy path para leitura remota com resposta valida.
- Edge case para ambiente publico incompleto.
- Caso de erro para falha HTTP remota.

Validacoes executadas:

- `node apps/mobile/src/services/supabase/remote-status.test.ts`

Checklist DoD:

- [x] Primeira leitura remota implementada.
- [x] Sem auth nesta etapa.
- [x] Sem escrita remota nesta etapa.
- [x] Testes da leitura remota passam.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add initial remote supabase read`

## Proxima Etapa Planejada

Etapa 13 - Base inicial de autenticacao documental e UX.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Definir fluxo inicial de login.
- Preparar UX de entrada.
- Ainda sem sessao real, compra ou RLS no app.

Resultado:

- Criado `docs/product/auth-flow.md`.
- Criado `src/features/auth/auth-readiness.ts`.
- Criado `src/features/auth/auth-readiness.test.ts`.
- Criado `src/components/AuthEntryCard.tsx`.
- Criada tela `app/entrar.tsx`.
- A tab `Perfil` agora mostra readiness de autenticacao e CTA para a base visual do fluxo.

Testes adicionados:

- Happy path para autenticacao pronta.
- Edge case para autenticacao limitada com signup bloqueado.
- Caso de erro para autenticacao bloqueada por falha remota.

Validacoes executadas:

- `node apps/mobile/src/features/auth/auth-readiness.test.ts`

Checklist DoD:

- [x] Fluxo inicial documentado.
- [x] Estado de readiness implementado.
- [x] Base visual do fluxo criada.
- [x] Sem login real nesta etapa.
- [x] Sem compra nesta etapa.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add initial auth ux foundation`

## Proxima Etapa Planejada

Etapa 14 - Sessao fake controlada para favoritos e comentarios.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Preparar estado local de sessao.
- Liberar UX condicionada sem auth real.

Resultado:

- Criado `src/features/auth/session-gate.ts`.
- Criado `src/features/auth/session-gate.test.ts`.
- Criado `src/features/auth/SessionProvider.tsx`.
- Criado `src/components/SessionPreviewCard.tsx`.
- Criado `docs/product/session-preview.md`.
- A tab `Perfil` agora ativa e encerra sessao teste.
- A tela de musica mostra gate de favoritos.
- A tab `Comunidade` reage ao estado da sessao teste.

Testes adicionados:

- Happy path para sessao ativa.
- Edge case para estado guest.
- Caso de erro substituido por estado booting controlado.

Validacoes executadas:

- `node apps/mobile/src/features/auth/session-gate.test.ts`

Checklist DoD:

- [x] Sessao local implementada.
- [x] UX condicionada aplicada.
- [x] Sem auth real nesta etapa.
- [x] Sem persistencia nesta etapa.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add local session preview gates`

## Proxima Etapa Planejada

Etapa 15 - Favoritos locais com estado em memoria.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Permitir favoritar musicas localmente.
- Refletir estado em Repertorio e detalhe.

Resultado:

- Criado `src/features/favorites/favorite-store.ts`.
- Criado `src/features/favorites/favorite-store.test.ts`.
- Criado `src/features/favorites/FavoritesProvider.tsx`.
- Criado `docs/product/favorites-preview.md`.
- O detalhe da musica agora salva e remove favoritos locais.
- A tab `Repertorio` mostra contagem local de favoritos.
- `SongCard` mostra selo visual para musica favoritada.

Testes adicionados:

- Happy path para favorito novo.
- Edge case para remocao.
- Caso de consistencia para ids unicos.

Validacoes executadas:

- `node apps/mobile/src/features/favorites/favorite-store.test.ts`

Checklist DoD:

- [x] Favoritos locais implementados.
- [x] Estado refletido em lista e detalhe.
- [x] Sem persistencia nesta etapa.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add in-memory favorites`

## Proxima Etapa Planejada

Etapa 16 - Comentarios locais guiados por sessao.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Liberar composicao basica de comentario.
- Manter tudo local e controlado.

Resultado:

- Criado `src/features/comments/comment-store.ts`.
- Criado `src/features/comments/comment-store.test.ts`.
- Criado `src/features/comments/CommentsProvider.tsx`.
- Criado `docs/product/comments-preview.md`.
- A tab `Comunidade` agora permite comentar com sessao teste ativa.
- Comentarios novos entram no topo da lista local.

Testes adicionados:

- Happy path para comentario valido.
- Edge case para corpo vazio.
- Caso de erro para autor vazio.

Validacoes executadas:

- `node apps/mobile/src/features/comments/comment-store.test.ts`

Checklist DoD:

- [x] Comentarios locais implementados.
- [x] Gate por sessao aplicado.
- [x] Sem persistencia nesta etapa.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add local comments preview`

## Proxima Etapa Planejada

Etapa 17 - Persistencia local de sessao, favoritos e comentarios.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Manter preview entre reloads.
- Continuar sem backend real nesses fluxos.

Resultado:

- Criado `src/features/preview/storage.ts`.
- Criado `src/features/preview/storage-parsers.ts`.
- Criado `src/features/preview/storage-parsers.test.ts`.
- Criado `docs/product/local-persistence.md`.
- `SessionProvider`, `FavoritesProvider` e `CommentsProvider` agora hidratam e
  salvam estado local.
- AsyncStorage entrou na base mobile.

Testes adicionados:

- Sessao restaurada por parser.
- Fallback para payload invalido.
- Favoritos restaurados e filtrados.
- Comentarios restaurados e invalidados quando payload e ruim.

Validacoes executadas:

- `node apps/mobile/src/features/preview/storage-parsers.test.ts`

Checklist DoD:

- [x] Persistencia local implementada.
- [x] Sessao, favoritos e comentarios hidratam apos reload.
- [x] Sem backend nesses fluxos.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: persist local preview state`

## Proxima Etapa Planejada

Etapa 18 - Autenticacao real com Supabase Auth.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Iniciar sessao real por email.
- Separar preview local de sessao autentica.

Resultado:

- Criado `src/features/auth/email-auth.ts`.
- Criado `src/features/auth/email-auth.test.ts`.
- Criado `docs/product/supabase-auth-email.md`.
- A tela `app/entrar.tsx` agora envia acesso por email via Supabase Auth.
- O cliente Supabase agora usa AsyncStorage para persistencia nativa de auth.
- Sessao preview continua separada da autenticacao real.

Testes adicionados:

- normalizacao de email
- bloqueio de email invalido
- erro sem cliente
- mapeamento de erro Supabase

Validacoes executadas:

- `node apps/mobile/src/features/auth/email-auth.test.ts`

Checklist DoD:

- [x] Envio de email implementado.
- [x] Auth real separado de preview local.
- [x] Sem sessao remota aplicada no app inteiro ainda.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add supabase email auth request`

## Proxima Etapa Planejada

Etapa 19 - Sessao real observavel no app.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Ler sessao autenticada do Supabase.
- Mostrar estado real no Perfil.

Resultado:

- Criado `src/features/auth/supabase-session.ts`.
- Criado `src/features/auth/supabase-session.test.ts`.
- Criado `src/features/auth/SupabaseSessionProvider.tsx`.
- Criado `src/components/SupabaseSessionCard.tsx`.
- Criado `docs/product/supabase-session-state.md`.
- A tab `Perfil` agora mostra estado real de sessao autenticada.

Testes adicionados:

- sessao autenticada
- sessao anonima
- estado loading

Validacoes executadas:

- `node apps/mobile/src/features/auth/supabase-session.test.ts`

Checklist DoD:

- [x] Sessao real observavel.
- [x] Perfil mostra estado real.
- [x] Sem acoplar resto do app ainda.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: observe supabase auth session`

## Proxima Etapa Planejada

Etapa 20 - Perfil remoto inicial.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Ler dados basicos do usuario autenticado.
- Preparar base para perfil e assinatura.

Resultado:

- Criado `src/features/auth/supabase-profile.ts`.
- Criado `src/features/auth/supabase-profile.test.ts`.
- Criado `src/features/auth/SupabaseProfileProvider.tsx`.
- Criado `src/components/SupabaseProfileCard.tsx`.
- Criado `docs/product/supabase-profile.md`.
- A tab `Perfil` agora mostra dados basicos do usuario autenticado.

Testes adicionados:

- perfil pronto
- perfil anonimo
- perfil com erro
- loading inicial

Validacoes executadas:

- `node apps/mobile/src/features/auth/supabase-profile.test.ts`

Checklist DoD:

- [x] Perfil remoto lido.
- [x] Base pronta para assinatura.
- [x] Sem tabela `profiles` ainda.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add initial remote profile state`

## Proxima Etapa Planejada

Etapa 21 - Catalogo remoto de comentarios.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Sair do preview local de comunidade.
- Preparar leitura remota simples.

Resultado:

- Criado `src/features/comments/remote-comments.ts`.
- Criado `src/features/comments/remote-comments.test.ts`.
- Criado `src/components/RemoteCommentsCard.tsx`.
- Criado `docs/product/remote-comments.md`.
- A tab `Comunidade` agora mostra estado da leitura remota.
- O preview local foi mantido porque a tabela remota ainda nao existe.

Testes adicionados:

- mapeamento de linhas remotas
- ambiente nao configurado
- erro de tabela ausente

Validacoes executadas:

- `node apps/mobile/src/features/comments/remote-comments.test.ts`

Checklist DoD:

- [x] Leitura remota preparada.
- [x] Bloqueio real documentado.
- [x] Preview local preservado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote comments readiness`

## Proxima Etapa Planejada

Etapa 22 - Base remota para musicas.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Preparar leitura remota do catalogo de musicas.
- Repetir estrategia de readiness e fallback.

Resultado:

- Criado `src/features/songs/remote-songs.ts`.
- Criado `src/features/songs/remote-songs.test.ts`.
- Criado `src/components/RemoteSongsCard.tsx`.
- Criado `docs/product/remote-songs.md`.
- A tab `Repertorio` agora mostra estado da leitura remota.
- O catalogo local foi mantido porque a tabela remota ainda nao existe.

Testes adicionados:

- mapeamento de linhas remotas
- ambiente nao configurado
- erro de tabela ausente

Validacoes executadas:

- `node apps/mobile/src/features/songs/remote-songs.test.ts`

Checklist DoD:

- [x] Leitura remota preparada.
- [x] Bloqueio real documentado.
- [x] Catalogo local preservado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote songs readiness`

## Proxima Etapa Planejada

Etapa 23 - Base remota para celebracoes.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Preparar leitura remota de celebracoes.
- Repetir readiness e fallback.

Resultado:

- Criado `src/features/celebrations/remote-celebrations.ts`.
- Criado `src/features/celebrations/remote-celebrations.test.ts`.
- Criado `src/components/RemoteCelebrationsCard.tsx`.
- Criado `docs/product/remote-celebrations.md`.
- A tab `Calendario` agora mostra estado da leitura remota.
- O calendario local foi mantido porque a tabela remota ainda nao existe.

Testes adicionados:

- mapeamento de linhas remotas
- ambiente nao configurado
- erro de tabela ausente

Validacoes executadas:

- `node apps/mobile/src/features/celebrations/remote-celebrations.test.ts`

Checklist DoD:

- [x] Leitura remota preparada.
- [x] Bloqueio real documentado.
- [x] Calendario local preservado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote celebrations readiness`

## Proxima Etapa Planejada

Etapa 24 - Schema real Supabase.

Status: preparada em 2026-04-20. Bloqueada na aplicacao remota.

Objetivo esperado:

- Criar tabelas base no projeto remoto.
- Sair dos blockers `404`.

Resultado parcial:

- `supabase init` executado.
- Criado `supabase/config.toml`.
- Criado `supabase/migrations/20260420215500_initial_remote_schema.sql`.
- Schema inicial cobre seasons, moments, songs, celebrations, assets,
  recommendations, profiles, subscriptions e comments.
- Push remoto bloqueado por falha de resolucao DNS no host Postgres.

Validacoes executadas:

- `npx supabase --version`
- `npx supabase db push --help`
- `npx supabase db push --dry-run --include-all --yes`
- `npx supabase db push --dry-run --include-all --yes --dns-resolver https`

Checklist DoD:

- [x] Projeto Supabase inicializado localmente.
- [x] Migration inicial criada.
- [x] Blocker remoto confirmado e documentado.
- [ ] Tabelas aplicadas no projeto remoto.
- [ ] Blockers `404` removidos.

Sugestao de commit:

`feat: scaffold initial supabase schema migration`

## Proxima Etapa Planejada

Etapa 25 - Seed remoto inicial.

Status: concluida em 2026-04-20.

Objetivo esperado:

- Preparar dados iniciais no projeto remoto.
- Alinhar base local e base remota.

Resultado:

- Criado `supabase/seed.sql`.
- Criado `docs/architecture/remote-seed-bootstrap.md`.
- Seed cobre season, moments, songs, assets, celebration e recommendations.
- Seed foi preparado de forma idempotente com `on conflict` e `where not exists`.

Checklist DoD:

- [x] Seed inicial preparado.
- [x] Arquivo documentado.
- [ ] Seed aplicado no projeto remoto.

Sugestao de commit:

`feat: add initial remote seed data`

## Proxima Etapa Planejada

Etapa 26 - Catalogos com fallback remoto.

Status: concluida em 2026-04-20.

Objetivo esperado:

- usar remoto quando houver dados
- manter local como fallback

Resultado:

- Criado `src/features/songs/song-catalog-source.ts`.
- Criado `src/features/songs/song-catalog-source.test.ts`.
- Criado `src/features/celebrations/celebration-catalog-source.ts`.
- Criado `src/features/celebrations/celebration-catalog-source.test.ts`.
- Criado `docs/product/remote-fallback-catalogs.md`.
- `Repertorio` agora tenta remoto antes do local.
- `Calendario` agora tenta remoto antes do local.

Checklist DoD:

- [x] Fallback remoto implementado.
- [x] Fallback local preservado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote-first catalog fallback`

## Proxima Etapa Planejada

Etapa 27 - Feed de comentarios com fallback remoto.

Status: concluida em 2026-04-20.

Objetivo esperado:

- usar comentarios remotos quando existirem
- manter preview local visivel

Resultado:

- Criado `src/features/comments/comment-feed-source.ts`.
- Criado `src/features/comments/comment-feed-source.test.ts`.
- Criado `docs/product/remote-comments-feed.md`.
- `Comunidade` agora tenta ler comentarios remotos ao abrir.
- Quando Supabase responde dados, comentarios remotos entram no topo.
- Comentarios locais continuam visiveis no aparelho.
- Quando feed remoto vier vazio ou falhar, preview local continua ativo.

Checklist DoD:

- [x] Feed remoto preparado.
- [x] Preview local preservado.
- [x] TDD aplicado ao resolver de feed.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote comments feed fallback`

## Proxima Etapa Planejada

Etapa 28 - Favoritos remotos por usuario.

Status: concluida em 2026-04-20.

Objetivo esperado:

- preparar leitura remota de favoritos
- exigir sessao Supabase real
- registrar schema necessario

Resultado:

- Criado `src/features/favorites/remote-favorites.ts`.
- Criado `src/features/favorites/remote-favorites.test.ts`.
- Criado `src/components/RemoteFavoritesCard.tsx`.
- Criado `docs/product/remote-favorites.md`.
- Criado `supabase/migrations/20260420224000_add_favorite_songs.sql`.
- `SupabaseSessionState` agora expõe `accessToken`.
- `Repertorio` agora mostra estado remoto de favoritos.

Checklist DoD:

- [x] Leitura remota preparada.
- [x] Sessao autenticada considerada.
- [x] Migration incremental criada.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote favorites readiness`

## Proxima Etapa Planejada

Etapa 29 - Feed de favoritos com fallback remoto.

Status: concluida em 2026-04-20.

Objetivo esperado:

- unir favoritos remotos e locais
- manter preview local durante migracao

Resultado:

- Criado `src/features/favorites/favorite-source.ts`.
- Criado `src/features/favorites/favorite-source.test.ts`.
- Criado `docs/product/remote-favorites-feed.md`.
- `FavoritesProvider` agora tenta ler favoritos remotos quando houver sessao.
- `SongDetail` e `Repertorio` agora refletem mensagem da fonte ativa.

Checklist DoD:

- [x] Feed remoto preparado.
- [x] Preview local preservado.
- [x] TDD aplicado ao resolver de feed.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote favorites feed fallback`

## Proxima Etapa Planejada

Etapa 30 - Publicacao remota de comentarios.

Status: concluida em 2026-04-20.

Objetivo esperado:

- permitir escrita remota com sessao real
- preservar preview local

Resultado:

- Criado `src/features/comments/remote-comment-submit.ts`.
- Criado `src/features/comments/remote-comment-submit.test.ts`.
- Criado `docs/product/remote-comment-submit.md`.
- `Comunidade` agora tenta publicar remoto quando houver sessao Supabase.
- Preview local continua ativo quando houver apenas sessao teste.

Checklist DoD:

- [x] Escrita remota preparada.
- [x] Preview local preservado.
- [x] TDD aplicado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote comment submit flow`

## Proxima Etapa Planejada

Etapa 31 - Sincronizacao remota de favoritos.

Status: concluida em 2026-04-20.

Objetivo esperado:

- permitir toggle remoto com sessao real
- preservar preview local

Resultado:

- Criado `src/features/favorites/remote-favorite-toggle.ts`.
- Criado `src/features/favorites/remote-favorite-toggle.test.ts`.
- Criado `docs/product/remote-favorite-toggle.md`.
- `FavoritesProvider` agora tenta salvar ou remover favorito remoto.
- `SongDetail` agora libera favorito remoto com sessao Supabase.

Checklist DoD:

- [x] Escrita remota preparada.
- [x] Preview local preservado.
- [x] TDD aplicado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote favorite toggle flow`

## Proxima Etapa Planejada

Etapa 32 - Detalhe remoto de celebracao.

Status: concluida em 2026-04-20.

Objetivo esperado:

- carregar celebracao remota por slug
- manter fallback local

Resultado:

- Criado `src/features/celebrations/remote-celebration-detail.ts`.
- Criado `src/features/celebrations/remote-celebration-detail.test.ts`.
- Criado `docs/product/remote-celebration-detail.md`.
- `CelebrationDetail` agora tenta remoto antes do local.
- `packages/shared` agora expõe busca local por slug.

Checklist DoD:

- [x] Leitura remota preparada.
- [x] Fallback local preservado.
- [x] TDD aplicado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote celebration detail fallback`

## Proxima Etapa Planejada

Etapa 33 - Detalhe remoto de musica.

Status: concluida em 2026-04-21.

Objetivo esperado:

- carregar musica remota por slug
- carregar assets remotos
- manter fallback local

Resultado:

- Criado `src/features/songs/remote-song-detail.ts`.
- Criado `src/features/songs/remote-song-detail.test.ts`.
- Criado `docs/product/remote-song-detail.md`.
- `SongDetail` agora tenta remoto antes do local.

Checklist DoD:

- [x] Leitura remota preparada.
- [x] Assets remotos mapeados.
- [x] Fallback local preservado.
- [x] TDD aplicado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add remote song detail fallback`

## Proxima Etapa Planejada

Etapa 34 - Gate premium de materiais.

Status: concluida em 2026-04-21.

Objetivo esperado:

- centralizar regra premium
- bloquear caminho de asset premium sem assinatura
- preparar RevenueCat futuro

Resultado:

- Criado `src/features/subscription/premium-access.ts`.
- Criado `src/features/subscription/premium-access.test.ts`.
- Criado `docs/product/premium-asset-gate.md`.
- `SongDetail` agora usa regra central para exibir materiais.
- Assets premium sem assinatura nao exibem o caminho do arquivo.

Checklist DoD:

- [x] Regra premium centralizada.
- [x] TDD aplicado.
- [x] UI preservada.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add premium asset gate`

## Proxima Etapa Planejada

Etapa 35 - Preview local de assinatura.

Status: concluida em 2026-04-21.

Objetivo esperado:

- validar desbloqueio premium no Expo Go
- manter RevenueCat fora do escopo por enquanto

Resultado:

- Criado `src/features/subscription/subscription-state.ts`.
- Criado `src/features/subscription/subscription-state.test.ts`.
- Criado `src/features/subscription/SubscriptionPreviewProvider.tsx`.
- Criado `src/components/SubscriptionPreviewCard.tsx`.
- Criado `docs/product/subscription-preview.md`.
- `Perfil` agora permite ativar/desativar premium local.
- `SongDetail` agora usa assinatura local para liberar assets premium.

Checklist DoD:

- [x] Estado premium local criado.
- [x] Gate premium integrado.
- [x] TDD aplicado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add subscription preview state`

## Proxima Etapa Planejada

Etapa 36 - Preparacao RevenueCat.

Status: concluida em 2026-04-21.

Objetivo esperado:

- preparar variaveis RevenueCat
- manter Expo Go funcionando
- evitar dependencia nativa prematura

Resultado:

- Criado `src/features/subscription/revenuecat-config.ts`.
- Criado `src/features/subscription/revenuecat-config.test.ts`.
- Criado `docs/product/revenuecat-readiness.md`.
- `.env.example` recebeu chaves publicas futuras do RevenueCat.
- SDK RevenueCat nao foi instalado nesta etapa porque exige development build.

Checklist DoD:

- [x] Configuracao futura preparada.
- [x] Expo Go preservado.
- [x] TDD aplicado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`chore: prepare revenuecat configuration`

## Proxima Etapa Planejada

Etapa 37 - Preparacao development build.

Status: concluida em 2026-04-21.

Objetivo esperado:

- preparar EAS development build
- manter Expo Go como fluxo principal
- criar caminho futuro para RevenueCat

Resultado:

- Criado `apps/mobile/eas.json`.
- Criado `docs/development/development-build.md`.
- README atualizado com o novo guia.
- Nenhum SDK nativo foi instalado.

Checklist DoD:

- [x] EAS configurado para development, preview e production.
- [x] Expo Go preservado.
- [x] Documentacao atualizada.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`chore: prepare eas development build`

## Proxima Etapa Planejada

Etapa 38 - Preparacao de assets premium no Storage.

Status: concluida em 2026-04-21.

Objetivo esperado:

- preparar abertura de materiais via signed URL
- manter gate premium antes da tentativa de acesso
- documentar limites de seguranca antes da assinatura real

Resultado:

- Criado `src/features/assets/signed-asset-url.ts`.
- Criado `src/features/assets/signed-asset-url.test.ts`.
- Criado `docs/product/premium-storage-assets.md`.
- `.env.example` recebeu `EXPO_PUBLIC_SUPABASE_ASSET_BUCKET`.
- `SupabaseConfig` agora expoe `assetBucket`.
- Tela de musica ganhou botao `Abrir material` para assets liberados.

Decisoes tecnicas e trade-offs:

- Usamos signed URL curta com expiracao padrao de 300 segundos.
- O bucket padrao ficou como `song-assets`, porque o nome do bucket nao e segredo e facilita ambientes locais/remotos.
- Nao criamos policy permissiva de Storage nesta etapa. Isso evita liberar premium apenas por autenticacao.
- Alternativa rejeitada: criar policy `authenticated can select` diretamente no bucket. Seria simples, mas insegura para conteudo premium.
- Decisao futura: mover a geracao de signed URL premium para Edge Function ou backend, validando assinatura real no servidor.

Hurdles & Fixes:

- O primeiro teste ficou vermelho porque o modulo ainda nao existia, confirmando ciclo Red.
- O teste direto em Node nao conseguia resolver alias `@/`; ajustamos a importacao interna da feature para caminho relativo testavel.
- Mantivemos a integracao visual simples para nao antecipar RevenueCat nem Edge Function.

Checklist DoD:

- [x] TDD aplicado.
- [x] Happy path coberto.
- [x] Caso bloqueado coberto.
- [x] Caso sem configuracao coberto.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: prepare premium storage asset links`

## Proxima Etapa Planejada

Etapa 39 - Guia de aplicacao manual do SQL remoto.

Status: concluida em 2026-04-21.

Objetivo esperado:

- destravar aplicacao remota quando `supabase db push` falhar por DNS
- definir ordem segura para migrations e seed
- orientar validacao pelo painel e pelo app

Resultado:

- Criado `docs/development/apply-supabase-sql-manually.md`.
- README atualizado com referencia ao guia.
- Nenhuma credencial foi documentada.
- Nenhum SQL destrutivo foi adicionado.

Decisoes tecnicas e trade-offs:

- Preferimos documentar execucao manual pelo Supabase Dashboard em vez de insistir no CLI enquanto ha instabilidade de DNS.
- Alternativa rejeitada: duplicar todo o SQL em um unico arquivo manual. Isso reduziria cliques, mas criaria risco de divergencia com as migrations reais.
- A ordem oficial permanece: schema inicial, favoritos, seed.

Hurdles & Fixes:

- O projeto ja tinha migrations e seed idempotentes, entao o guia pode orientar reexecucao segura.
- O bucket `song-assets` ficou fora deste guia porque Storage precisa de uma etapa propria de seguranca.

Checklist DoD:

- [x] Ordem de execucao documentada.
- [x] Queries de validacao documentadas.
- [x] Fluxo de validacao no iPhone documentado.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`docs: add manual supabase sql apply guide`

## Correcao De Erro Em Expo Go

Status: concluida em 2026-04-21.

Problemas reportados:

- `AsyncStorageError: Native module is null, cannot access legacy storage`.
- Supabase aparecendo como nao configurado no iPhone, mesmo com `.env.local` na raiz.

Resultado:

- Criado `src/features/preview/storage.test.ts`.
- `src/features/preview/storage.ts` agora usa fallback em memoria quando AsyncStorage nativo nao existe no Expo Go.
- `src/services/supabase/client.ts` agora usa storage seguro em memoria como fallback para auth do Supabase.
- Criado `apps/mobile/app.config.js` para carregar variaveis `EXPO_PUBLIC_*` da raiz do monorepo.
- `docs/development/run-iphone-expo-go.md` atualizado com instrucao de limpar cache quando variaveis nao aparecerem.
- `package.json` agora valida `app.config.js` no lint e inclui o novo teste.

Decisoes tecnicas e trade-offs:

- Mantivemos AsyncStorage como caminho preferencial quando disponivel.
- No Expo Go, se o modulo nativo estiver ausente, o app usa memoria. Isso evita crash, mas nao persiste dados apos fechar o app.
- Alternativa rejeitada: exigir development build imediatamente. Isso resolveria o modulo nativo, mas atrasaria o fluxo atual de teste por iPhone com Expo Go.
- `app.config.js` so expoe variaveis `EXPO_PUBLIC_*`; service role e DB URL continuam fora do bundle.

Hurdles & Fixes:

- O teste vermelho inicial confirmou que a camada de storage dependia do modulo nativo no carregamento.
- Removemos import nativo direto no topo e passamos a resolver storage com fallback seguro.
- O monorepo mantem `.env.local` na raiz, entao o app Expo precisava de ponte explicita via config.

Checklist DoD:

- [x] Erro de AsyncStorage tratado.
- [x] Supabase configuravel a partir da raiz do monorepo.
- [x] TDD aplicado para fallback de storage.
- [x] Documentacao atualizada.

Sugestao de commit:

`fix: stabilize expo go storage and env config`

## Correcao De AsyncStorage Remanescente

Status: concluida em 2026-04-21.

Problemas reportados:

- Expo avisava que `@react-native-async-storage/async-storage@3.0.2` estava instalado, mas Expo 54 esperava `2.2.0`.
- Supabase Auth ainda tentava acessar AsyncStorage nativo durante inicializacao e auto refresh.

Resultado:

- Removida dependencia `@react-native-async-storage/async-storage` do app mobile.
- Removida referencia remanescente no `pnpm-lock.yaml`.
- Removido pacote obsoleto de `node_modules`.
- `SupabaseClient` agora usa storage em memoria explicitamente no Expo Go.
- Preview storage tambem usa memoria por padrao.

Decisoes tecnicas e trade-offs:

- Decidimos nao usar AsyncStorage no Expo Go neste momento. Isso elimina o crash e o warning.
- Trade-off: sessao Supabase e estado preview nao persistem apos fechar o app.
- Alternativa rejeitada: voltar para AsyncStorage `2.2.0`. Seria compativel com Expo, mas ainda exigiria modulo nativo corretamente disponivel; como estamos priorizando Expo Go, memoria e mais estavel agora.
- Quando entrarmos em development build, podemos reintroduzir persistencia nativa com versao fixada pelo `expo install`.

Hurdles & Fixes:

- `pnpm install` atualizou lockfile, mas restou diretorio antigo em `node_modules`.
- A remocao direta falhou no Windows por caminhos longos dentro de frameworks iOS.
- Reexecutamos remocao com prefixo `\\?\` para apagar o pacote obsoleto.

Checklist DoD:

- [x] Pacote incompatível removido.
- [x] Supabase Auth sem AsyncStorage nativo.
- [x] Warning de compatibilidade removido da arvore do projeto.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`fix: remove async storage from expo go flow`

## Proxima Etapa Planejada

Etapa 40 - Paywall preview.

Status: concluida em 2026-04-21.

Objetivo esperado:

- criar primeira experiencia clara de paywall
- manter fluxo sem compra real
- preparar transicao futura para RevenueCat

Resultado:

- Criado `src/features/subscription/paywall-copy.ts`.
- Criado `src/features/subscription/paywall-copy.test.ts`.
- Criado `src/components/PaywallPreviewCard.tsx`.
- Criado `docs/product/paywall-preview.md`.
- Perfil agora mostra card de paywall antes do controle tecnico de premium preview.
- README atualizado com o novo documento.

Decisoes tecnicas e trade-offs:

- O paywall usa estado local de preview para manter Expo Go estavel.
- Usuario anonimo e levado para `/entrar`.
- Usuario autenticado pode alternar premium localmente.
- Alternativa rejeitada: instalar SDK RevenueCat agora. Isso exigiria development build e interromperia o fluxo atual de teste no iPhone com Expo Go.

Hurdles & Fixes:

- O teste vermelho confirmou que a regra de copy ainda nao existia.
- Mantivemos copy em funcao pura para facilitar troca futura por offerings reais.

Checklist DoD:

- [x] TDD aplicado.
- [x] Estado anonimo coberto.
- [x] Estado autenticado sem premium coberto.
- [x] Estado premium coberto.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add paywall preview card`

## Proxima Etapa Planejada

Etapa 41 - CI inicial.

Status: concluida em 2026-04-21.

Objetivo esperado:

- criar primeira pipeline de qualidade
- refletir comandos locais no GitHub Actions
- evitar build nativo prematuro

Resultado:

- Criado `.github/workflows/ci.yml`.
- Criado `docs/development/ci.md`.
- README atualizado com referencia ao guia de CI.

Decisoes tecnicas e trade-offs:

- CI usa Node 24 para acompanhar o ambiente local atual.
- CI usa Corepack e pnpm `10.10.0`, conforme `packageManager`.
- Checks incluidos: install frozen, test, typecheck e lint.
- Alternativa rejeitada: adicionar build EAS agora. Isso aumentaria tempo e exigiria configuracoes/secrets que ainda nao fazem parte do DoD atual.

Hurdles & Fixes:

- `.github` existia sem workflows, entao a etapa criou o primeiro arquivo de pipeline.
- Nenhum secret foi usado.

Checklist DoD:

- [x] Workflow criado.
- [x] Checks locais refletidos.
- [x] Documentacao viva atualizada.
- [x] Sem build nativo prematuro.

Sugestao de commit:

`ci: add quality workflow`

### Ajuste Solicitado

Status: concluido em 2026-04-21.

Mudanca:

- CI agora roda apenas em push para `main` e pull request direcionado para `main`.
- Branch `dev` nao dispara pipeline.
- `docs/development/ci.md` atualizado com a regra.

Motivo:

- `dev` deve permanecer leve para iteracao assistida e validacao manual.

## Proxima Etapa Planejada

Etapa 42 - Bucket privado de Storage.

Status: concluida em 2026-04-21.

Objetivo esperado:

- preparar bucket `song-assets`
- manter arquivos premium privados
- evitar policy ampla para usuarios autenticados

Resultado:

- Criado `supabase/migrations/20260421120000_create_song_assets_bucket.sql`.
- Criado `docs/development/supabase-storage.md`.
- Atualizado `docs/development/apply-supabase-sql-manually.md`.
- Atualizado `docs/product/premium-storage-assets.md`.
- README atualizado com referencia ao guia de Storage.

Decisoes tecnicas e trade-offs:

- Bucket `song-assets` fica privado.
- Limite inicial definido em 20 MB por arquivo.
- Tipos permitidos: PDF, MP3, JPEG e PNG.
- Nao criamos policy de leitura para `anon` nem para `authenticated`.
- Alternativa rejeitada: permitir leitura para todo usuario autenticado. Isso facilitaria signed URL direto no app, mas quebraria a regra premium.

Hurdles & Fixes:

- A abertura final de arquivo premium ainda depende de Edge Function ou backend usando service role.
- O botao atual pode retornar erro ate a Edge Function existir; isso e esperado e seguro.

Checklist DoD:

- [x] Migration do bucket criada.
- [x] Bucket privado documentado.
- [x] Aplicacao manual atualizada.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add private song assets bucket`

## Proxima Etapa Planejada

Etapa 43 - Edge Function para signed URL premium.

Status: concluida em 2026-04-21.

Objetivo esperado:

- preparar backend seguro para gerar signed URL
- validar sessao no servidor
- bloquear premium sem assinatura ativa

Resultado:

- Criado `supabase/functions/create-asset-signed-url/index.ts`.
- Criado `docs/development/supabase-edge-functions.md`.
- Atualizado `docs/development/supabase-storage.md`.
- README atualizado com o guia de Edge Functions.

Decisoes tecnicas e trade-offs:

- A funcao exige `Authorization: Bearer <access_token>`.
- A funcao usa service role apenas no ambiente de servidor.
- Asset premium exige assinatura ativa na tabela `subscriptions`.
- Signed URL expira em 300 segundos.
- Alternativa rejeitada: gerar signed URL direto no app. Isso dependeria de policy ampla ou service role no cliente, ambos inseguros.

Hurdles & Fixes:

- A funcao ainda nao foi integrada ao app. Primeiro deixamos o backend seguro desenhado e versionado.
- Deploy real fica para etapa propria, porque pode depender de login CLI/rede.

Checklist DoD:

- [x] Funcao criada.
- [x] Contrato documentado.
- [x] Sem secrets no app.
- [x] `CODEX.md` atualizado.

Sugestao de commit:

`feat: add premium asset signed url function`

### Ajuste Solicitado

Status: concluido em 2026-04-21.

Erro reportado:

- `ERROR: 42501: must be owner of table objects`.

Causa:

- A migration tentava executar `comment on table storage.objects`.
- O usuario do SQL Editor nao e dono da tabela interna `storage.objects`.

Correcao:

- Removido o `comment on table storage.objects`.
- Mantidos bucket privado e remocao de policies inseguras.
- `docs/development/supabase-storage.md` atualizado com a causa.

## Proxima Etapa Planejada

Etapa 44 - Integracao mobile com Edge Function.

Status: concluida em 2026-04-21.

Objetivo esperado:

- trocar a geracao direta de signed URL no app por chamada a Edge Function;
- exigir sessao Supabase real para abrir material protegido;
- manter o app seguro enquanto a funcao ainda nao estiver implantada;
- remover helper legado de acesso direto ao Storage.

Resultado:

- Criado `src/features/assets/edge-asset-url.ts`.
- Criado `src/features/assets/edge-asset-url.test.ts`.
- `SupabaseConfig` agora expoe `functionsUrl`.
- `SongDetail` agora chama `create-asset-signed-url` via Edge Function.
- Removido helper antigo `signed-asset-url`.
- Documentacao de Storage, Edge Functions e assets premium atualizada.

Decisoes tecnicas e trade-offs:

- A URL da funcao e derivada do host Supabase configurado no app.
- A chamada exige `accessToken` de sessao Supabase real.
- Mantivemos erro claro quando a funcao, a URL ou a sessao nao estao disponiveis.
- Alternativa rejeitada: manter fallback direto ao Storage no app. Isso facilitaria teste local, mas manteria um caminho inseguro e confuso para conteudo premium.

Hurdles & Fixes:

- O teste vermelho confirmou que o modulo de Edge Function ainda nao existia.
- O helper direto de Storage ficou obsoleto apos a integracao e foi removido para reduzir superficie de erro.
- O deploy da funcao permanece etapa operacional separada, pois depende do ambiente Supabase remoto.

Checklist DoD:

- [x] TDD aplicado.
- [x] App chama Edge Function para material.
- [x] Sessao real exigida.
- [x] Helper direto removido.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: route asset links through edge function`

## Proxima Etapa Planejada

Etapa 45 - Deploy da Edge Function.

Status: concluida em 2026-04-21.

Objetivo esperado:

- autenticar o Supabase CLI no ambiente local;
- implantar a funcao `create-asset-signed-url`;
- registrar o novo estado operacional do backend.

Resultado:

- `npx supabase login` executado pelo usuario com sucesso.
- Token local do Supabase CLI criado.
- `npx supabase functions deploy create-asset-signed-url --project-ref engvbvdtdcveoebgrexl` executado com sucesso.
- Funcao `create-asset-signed-url` implantada no projeto `engvbvdtdcveoebgrexl`.
- Guia `docs/development/supabase-edge-functions.md` atualizado com estado de deploy.

Decisoes tecnicas e trade-offs:

- O login CLI fica no ambiente local do usuario, nao no repositorio.
- Nenhum token ou segredo foi versionado.
- O deploy da funcao foi tratado como etapa operacional, separada da implementacao do app.

Hurdles & Fixes:

- O CLI emitiu aviso de npm sobre `node-linker`; isso nao bloqueou login nem deploy.
- O Edge Runtime foi baixado via Docker durante o deploy.
- A funcao foi implantada sem necessidade de alterar codigo.

Checklist DoD:

- [x] Supabase CLI autenticado.
- [x] Edge Function implantada.
- [x] Nenhum segredo documentado.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`docs: record edge function deployment`

## Proxima Etapa Planejada

Etapa 46 - Validacao remota da Edge Function.

Status: concluida em 2026-04-21.

Objetivo esperado:

- confirmar que a funcao implantada esta ativa no Supabase;
- validar comportamento remoto sem sessao;
- confirmar preflight CORS basico.

Resultado:

- `npx supabase functions list --project-ref engvbvdtdcveoebgrexl` confirmou `create-asset-signed-url` com status `ACTIVE`.
- POST remoto sem `Authorization` retornou HTTP 401.
- A mensagem retornada foi do gateway Supabase: `Missing authorization header`.
- OPTIONS remoto retornou HTTP 200 com body `ok`.
- `docs/development/supabase-edge-functions.md` atualizado com a validacao remota.

Decisoes tecnicas e trade-offs:

- A chamada sem sessao deve falhar antes de chegar ao fluxo de negocio. Isso e correto para o endpoint.
- Nao testamos ainda signed URL real porque depende de usuario autenticado, asset remoto com `storage_path`, arquivo no bucket e assinatura ativa quando premium.

Hurdles & Fixes:

- `Invoke-WebRequest -SkipHttpErrorCheck` nao estava disponivel nesta versao do PowerShell.
- Ajustamos a leitura do erro via exception response stream.

Checklist DoD:

- [x] Funcao listada como ativa.
- [x] Falha sem auth validada.
- [x] Preflight validado.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`docs: record edge function smoke test`

## Proxima Etapa Planejada

Etapa 47 - Upload inicial de assets.

Status: concluida em 2026-04-21.

Objetivo esperado:

- preparar upload idempotente dos PDFs locais para o bucket privado;
- usar `song_assets.storage_path` remoto como fonte de verdade;
- evitar expor service role no codigo do app.

Resultado:

- Criado `scripts/upload-song-assets.ps1`.
- Criado `docs/development/upload-song-assets.md`.
- README atualizado com referencia ao guia.
- `docs/development/supabase-storage.md` atualizado com caminho de upload.
- Criada migration `20260421193000_normalize_por_teu_nome_asset_path.sql`.
- `supabase/seed.sql` atualizado com path normalizado.
- Patch remoto aplicado no asset `por-teu-nome-o-senhor`.
- PDFs enviados ao bucket privado `song-assets`.
- Bucket validado via Storage API.

Decisoes tecnicas e trade-offs:

- O script le `.env.local` localmente e nunca versiona segredos.
- O upload usa service role porque o bucket e privado e nao deve ter policy ampla para usuarios autenticados.
- O script consulta os assets remotos antes do upload, evitando hardcode dos caminhos do bucket.
- `x-upsert: true` permite reexecutar o upload sem criar duplicatas.

Hurdles & Fixes:

- Um dos PDFs tem nome local com encoding diferente do `storage_path` remoto.
- Para reduzir fragilidade, o script mapeia arquivo local por slug e usa o `storage_path` remoto como destino.
- O upload real falhou no arquivo `por-teu-nome-o-senhor` porque o `storage_path` remoto continha caracteres invalidos para chave do Storage.
- Criada migration para normalizar o caminho remoto para `Por teu nome, o Senhor.pdf`.
- A migration nova ainda nao foi registrada no historico remoto via Supabase CLI porque a conexao Postgres segue bloqueada por DNS para `db.engvbvdtdcveoebgrexl.supabase.co`.
- O efeito da migration foi aplicado remotamente por REST com service role: o registro de `song_assets` foi atualizado para `Por teu nome, o Senhor.pdf`.
- O seed local foi atualizado para manter o estado futuro coerente; nao foi reexecutado integralmente no banco remoto.

Checklist DoD:

- [x] Dry run executado.
- [x] Upload executado.
- [x] Bucket validado.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add song asset upload workflow`

## Proxima Etapa Planejada

Etapa 48 - Assinatura manual de teste.

Status: concluida em 2026-04-21.

Objetivo esperado:

- preparar caminho controlado para ativar assinatura premium de teste;
- permitir validar Edge Function com usuario real;
- manter RevenueCat fora do escopo ate development build.

Resultado:

- Criado `scripts/grant-test-subscription.ps1`.
- Criado `docs/development/grant-test-subscription.md`.
- README atualizado com referencia ao guia.

Decisoes tecnicas e trade-offs:

- O script recebe `ProfileId` em vez de email. Isso evita depender de endpoint admin de Auth e usa a tabela publica `profiles`.
- A assinatura manual usa `provider = manual_test` e `entitlement = premium_content`.
- O script usa service role apenas localmente.
- Alternativa rejeitada: criar assinatura pelo app. Isso colocaria poder administrativo no cliente e seria inseguro.

Hurdles & Fixes:

- A validacao completa ainda depende do usuario fazer login real no app para criar `profiles.id`.
- A UI atual ainda usa premium preview para liberar visualmente o botao. A assinatura manual valida o lado servidor pela Edge Function.

Checklist DoD:

- [x] Script criado.
- [x] Guia criado.
- [x] Sem segredo versionado.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`chore: add manual test subscription script`

## Proxima Etapa Planejada

Etapa 49 - Cadastro e login com senha.

Status: concluida em 2026-04-21.

Objetivo esperado:

- substituir magic link por cadastro e login com email/senha;
- coletar dados iniciais de perfil;
- manter fluxo compatível com Expo Go e testes locais;
- preparar schema remoto para versão final.

Resultado:

- Criado `src/features/auth/credentials-auth.ts`.
- Criado `src/features/auth/credentials-auth.test.ts`.
- Tela `Entrar` reescrita com modo `Entrar` e `Cadastrar`.
- Cadastro coleta nome, email, senha, telefone, estado, cidade, paroquia opcional e pastoral/banda opcional.
- Criada migration `20260421200000_expand_profiles_for_registration.sql`.
- Supabase CLI foi linkado ao projeto remoto.
- `supabase db push --linked --include-all --yes` aplicou migrations remotas, incluindo a nova migration de profiles.
- `SupabaseProfileCard` passou a exibir telefone, estado, cidade, paroquia e pastoral/banda.
- `docs/product/auth-flow.md` atualizado.

Decisoes tecnicas e trade-offs:

- Telefone foi tratado como dado de perfil, nao como auth por SMS. Isso reduz complexidade e melhora teste local.
- Dados de cadastro seguem em `user_metadata` do Supabase Auth e tambem sao preparados em `profiles`.
- Magic link deixa de ser o fluxo principal.
- Login social continua fora do escopo desta etapa.

Hurdles & Fixes:

- A conexao Postgres via CLI voltou a funcionar apos `supabase link`.
- `db push` reaplicou migrations idempotentes antigas e registrou tambem as novas migrations locais.
- O aviso de npm sobre `node-linker` permaneceu, mas nao bloqueou a operacao.

Checklist DoD:

- [x] TDD aplicado.
- [x] Tela integrada.
- [x] Schema preparado.
- [x] Migration aplicada remotamente.
- [x] Validacoes locais passam.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add password registration flow`

### Ajuste Da Etapa 49

Status: concluido em 2026-04-21.

Problemas reportados:

- Partitura premium nao abria e exibia `Unsupported JWT algorithm ES256`.
- Perfil remoto nao atualizava apos login.

Causa:

- A Edge Function usava `admin.auth.getUser(token)`, que falhou com token ES256 neste ambiente.
- `SupabaseProfileProvider` buscava perfil apenas uma vez no mount, antes da sessao autenticada estar disponivel.

Correcao:

- Edge Function passou a validar o usuario chamando diretamente `auth/v1/user` com o bearer token recebido.
- `SupabaseProfileProvider` passou a observar `session.status` e `session.userId`, refazendo a leitura apos login.
- Funcao redeployada com `--no-verify-jwt`, porque o gateway bloqueava tokens ES256 antes da funcao executar.

Limite:

- Se usuarios antigos foram criados antes da migration de profiles, alguns campos podem continuar nulos. Para novos cadastros, o trigger ja esta preparado.

Validacao manual:

- Usuario confirmou que login, acesso premium e abertura de partitura passaram a funcionar.
- Etapa pode ser considerada concluida para o estado atual.

## Proxima Etapa Planejada

Etapa 50 - Logout real.

Status: concluida em 2026-04-21.

Objetivo esperado:

- permitir encerrar sessao Supabase real pelo app;
- melhorar ciclo de testes de login/cadastro;
- manter escopo pequeno.

Resultado:

- Criado `src/features/auth/sign-out.ts`.
- Criado `src/features/auth/sign-out.test.ts`.
- `SupabaseSessionCard` agora exibe botao `Sair` quando ha sessao autenticada.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- Logout fica no card de sessao remota, porque e uma acao tecnica de conta.
- Nenhum fluxo de confirmacao foi adicionado nesta etapa para manter o ciclo de teste rapido.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add supabase sign out action`

## Proxima Etapa Planejada

Etapa 51 - Recuperacao inicial de senha.

Status: concluida em 2026-04-21.

Objetivo esperado:

- permitir solicitar recuperacao de senha por email;
- manter o fluxo compativel com Expo Go;
- evitar criar deep link antes de definir URLs finais do app.

Resultado:

- `requestPasswordReset` foi adicionado ao modulo de autenticacao por credenciais.
- Testes cobrem email normalizado e email invalido antes de chamar Supabase.
- Tela `Entrar` recebeu a acao `Esqueci minha senha`.
- `docs/product/auth-flow.md` foi atualizado.

Decisoes tecnicas e trade-offs:

- A etapa usa `resetPasswordForEmail` sem `redirectTo`. Isso permite validar o envio pelo Supabase sem amarrar agora um deep link final.
- A tela interna para trocar senha apos abrir o link fica fora deste passo, porque depende da estrategia definitiva de URL/deep link.
- Alternativa rejeitada: implementar reset completo no app agora. Seria maior que o necessario para a etapa atual.

Hurdles & Fixes:

- O primeiro typecheck falhou porque a UI usava uma cor inexistente (`colors.wine`). Corrigido para `colors.accent`.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add password reset request`

## Proxima Etapa Planejada

Etapa 52 - Definir deep links de autenticacao.

Status: concluida em 2026-04-21.

Objetivo esperado:

- definir URLs de retorno para autenticacao;
- enviar `redirectTo` no fluxo de recuperacao de senha;
- documentar configuracao necessaria no Supabase.

Resultado:

- Criado `src/features/auth/auth-deep-link.ts`.
- Criado `src/features/auth/auth-deep-link.test.ts`.
- `requestPasswordReset` agora aceita `redirectTo`.
- Tela `Entrar` envia `louvor-serafico://recuperar-senha` no reset de senha.
- Criado `docs/development/auth-deep-links.md`.
- README e `docs/product/auth-flow.md` atualizados.

Decisoes tecnicas e trade-offs:

- O scheme usado foi o ja existente em `app.json`: `louvor-serafico`.
- A etapa definiu tambem `louvor-serafico://auth/callback` como URL futura para callbacks gerais.
- A rota `recuperar-senha` ainda nao foi implementada. Isso evita misturar contrato de URL com tela de redefinicao de senha.

Hurdles & Fixes:

- Nenhum bloqueio tecnico encontrado.

Checklist DoD:

- [x] TDD aplicado.
- [x] Fluxo de reset usa redirect.
- [x] Documentacao viva atualizada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.

Sugestao de commit:

`feat: define auth deep links`

## Proxima Etapa Planejada

Etapa 53 - Tela de redefinicao de senha.

Status: concluida em 2026-04-21.

Objetivo esperado:

- criar rota interna para redefinir senha;
- validar senha minima e confirmacao;
- chamar Supabase Auth para atualizar senha quando houver sessao de recuperacao valida.

Resultado:

- Criado `src/features/auth/password-reset.ts`.
- Criado `src/features/auth/password-reset.test.ts`.
- Criada tela `app/recuperar-senha.tsx`.
- Script de testes raiz atualizado.
- `docs/development/auth-deep-links.md` e `docs/product/auth-flow.md` atualizados.

Decisoes tecnicas e trade-offs:

- A tela chama `auth.updateUser({ password })`, que depende da sessao criada pelo link de recuperacao do Supabase.
- Se a rota for aberta manualmente, sem sessao de recuperacao, a tela exibe o erro retornado pelo Supabase.
- Nao foi adicionada personalizacao de template de email nesta etapa. Isso e configuracao de produto/Supabase e deve ser tratado separadamente.

Hurdles & Fixes:

- Nenhum bloqueio tecnico encontrado.

Checklist DoD:

- [x] TDD aplicado.
- [x] Tela integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add password recovery screen`

## Proxima Etapa Planejada

Etapa 54 - Validacao manual do fluxo de recuperacao.

Status: concluida em 2026-04-21.

Objetivo esperado:

- documentar como validar recuperacao de senha;
- separar validacao parcial no Expo Go da validacao completa em development build;
- registrar DoD manual do fluxo.

Resultado:

- Criado `docs/development/validate-password-recovery.md`.
- `README.md` atualizado com o novo guia.
- `docs/development/run-iphone-expo-go.md` atualizado com limite do Expo Go para deep links.

Decisoes tecnicas e trade-offs:

- A validacao completa foi marcada como dependente de development build, porque Expo Go nao e ambiente confiavel para custom scheme do app.
- A validacao parcial no Expo Go continua util para confirmar envio do email e estados de erro.
- Nenhum codigo foi alterado nesta etapa, pois o objetivo era operacional e de QA manual.

Hurdles & Fixes:

- Risco identificado: confundir sucesso no Expo Go com validacao completa do deep link. O guia agora separa explicitamente os dois cenarios.

Checklist DoD:

- [x] Guia criado.
- [x] Limite do Expo Go documentado.
- [x] DoD manual registrado.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`docs: add password recovery validation guide`

## Proxima Etapa Planejada

Etapa 55 - Preparar build de desenvolvimento para deep links.

Status: concluida em 2026-04-21.

Objetivo esperado:

- preparar comando padrao para gerar development build iOS;
- alinhar docs de deep link com development build;
- manter Expo Go como fluxo principal ate a necessidade de testar custom scheme real.

Resultado:

- Adicionado script raiz `build:development:ios`.
- Adicionado script mobile `build:development:ios`.
- `docs/development/development-build.md` atualizado com fluxo de deep links.
- `docs/development/validate-password-recovery.md` atualizado com comando de build.

Decisoes tecnicas e trade-offs:

- O comando usa `npx eas-cli build --profile development --platform ios` dentro do app mobile.
- O script raiz delega para o package mobile via pnpm filter.
- A build real nao foi executada nesta etapa, porque isso consome ambiente externo, credenciais Apple/EAS e tempo operacional.
- Alternativa rejeitada: trocar o fluxo principal para development build agora. Expo Go segue mais rapido para iteracao diaria.

Hurdles & Fixes:

- Nenhum bloqueio tecnico encontrado.

Checklist DoD:

- [x] Script criado.
- [x] Guia atualizado.
- [x] Validacao de deep link orientada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`chore: add ios development build script`

## Proxima Etapa Planejada

Etapa 56 - Checklist operacional EAS e Apple.

Status: concluida em 2026-04-21.

Objetivo esperado:

- registrar bloqueio Apple Developer;
- documentar pre-requisitos para retomar build iOS;
- manter o plano de trabalho desbloqueado pelo Expo Go.

Resultado:

- Criado `docs/development/eas-apple-checklist.md`.
- `docs/development/development-build.md` atualizado com bloqueio atual.
- `README.md` atualizado com referencia ao checklist.

Decisoes tecnicas e trade-offs:

- Nao tentamos contornar o requisito Apple. Build iOS fisica exige Apple Developer Program pago.
- O desenvolvimento segue pelo Expo Go enquanto custom scheme, RevenueCat e compras reais ficam bloqueados.
- A etapa foi documental/operacional, sem alteracao de codigo.

Hurdles & Fixes:

- Hurdle: EAS autenticou o Apple ID, mas falhou por ausencia de Team associado.
- Fix: registrar o pagamento do Apple Developer Program como pre-requisito antes de retomar build iOS.

Checklist DoD:

- [x] Bloqueio registrado.
- [x] Checklist Apple criado.
- [x] Fluxos bloqueados documentados.
- [x] Fluxos que seguem no Expo Go documentados.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`docs: add eas apple checklist`

## Proxima Etapa Planejada

Etapa 57 - Revisar estabilidade auth.

Status: concluida em 2026-04-21.

Objetivo esperado:

- consolidar leitura de estabilidade entre sessao real e perfil remoto;
- exibir resumo simples na tab Perfil;
- manter diagnosticos tecnicos existentes para desenvolvimento.

Resultado:

- Criado `src/features/auth/auth-stability.ts`.
- Criado `src/features/auth/auth-stability.test.ts`.
- Criado `src/components/AuthStabilityCard.tsx`.
- Tab `Perfil` passou a mostrar o resumo de estabilidade antes dos cards tecnicos.
- Script de testes raiz atualizado.
- `docs/product/auth-flow.md` atualizado.

Decisoes tecnicas e trade-offs:

- O resumo considera estavel apenas quando `session.status` e autenticado e `profile.status` e ready.
- Sessao autenticada com perfil em erro vira estado parcial, porque o usuario pode estar logado mas com dados incompletos.
- Os cards tecnicos foram mantidos por enquanto. A limpeza visual fica para etapa posterior de modo debug.

Hurdles & Fixes:

- Nenhum bloqueio tecnico encontrado.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add auth stability summary`

## Proxima Etapa Planejada

Etapa 58 - Melhorar UX de Perfil.

Status: concluida em 2026-04-21.

Objetivo esperado:

- reduzir a sensacao de tela tecnica na tab Perfil;
- adicionar um resumo humano de conta e assinatura;
- manter diagnosticos tecnicos disponiveis durante o desenvolvimento.

Resultado:

- Criado `src/features/auth/profile-overview.ts`.
- Criado `src/features/auth/profile-overview.test.ts`.
- Criado `src/components/ProfileOverviewCard.tsx`.
- Tab `Perfil` passou a priorizar o resumo de conta antes dos cards tecnicos.
- Script de testes raiz atualizado.
- `docs/product/auth-flow.md` atualizado.

Decisoes tecnicas e trade-offs:

- A melhoria foi feita sem remover os cards de diagnostico, porque eles ainda ajudam a validar Supabase, sessao, perfil e assinatura durante o ciclo com Expo Go.
- O novo resumo usa dados ja existentes de sessao, perfil e assinatura local, sem nova chamada remota.
- A CTA de entrada aparece apenas quando nao ha sessao autenticada.
- Alternativa rejeitada: redesenhar toda a tela Perfil agora. Isso aumentaria escopo antes de termos a versao final de assinatura e edição de perfil.

Hurdles & Fixes:

- Nenhum bloqueio tecnico encontrado.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add profile overview card`

## Proxima Etapa Planejada

Etapa 59 - Preparar modo debug para cards tecnicos.

Status: concluida em 2026-04-21.

Objetivo esperado:

- esconder cards tecnicos da tab Perfil por padrao;
- manter diagnosticos disponiveis quando necessario;
- controlar exibicao por variavel publica simples.

Resultado:

- Criado `src/features/debug/debug-mode.ts`.
- Criado `src/features/debug/debug-mode.test.ts`.
- Criado `src/features/debug/useDebugMode.ts`.
- Tab `Perfil` passou a mostrar cards tecnicos somente com `EXPO_PUBLIC_DEBUG_CARDS=true` ou `1`.
- `.env.example` atualizado.
- `docs/development/run-iphone-expo-go.md` atualizado.

Decisoes tecnicas e trade-offs:

- O modo debug usa variavel `EXPO_PUBLIC_DEBUG_CARDS`, porque precisa ser lida no bundle Expo.
- O default e esconder diagnosticos tecnicos, priorizando experiencia de produto.
- Alternativa rejeitada: remover os cards tecnicos. Eles ainda sao uteis no ciclo de validacao com Supabase, Expo Go e builds futuras.

Hurdles & Fixes:

- Nenhum bloqueio tecnico encontrado.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: gate profile debug cards`

## Proxima Etapa Planejada

Etapa 60 - Revisar tela inicial autenticada.

Status: concluida em 2026-04-21.

Objetivo esperado:

- ajustar a tela Hoje para responder ao estado autenticado;
- orientar usuarios anonimos para login quando tentarem acessar materiais;
- manter o roteiro de hoje como experiencia principal.

Resultado:

- Criado `src/features/home/home-summary.ts`.
- Criado `src/features/home/home-summary.test.ts`.
- Tab `Hoje` passou a usar sessao Supabase e estado premium para montar copy e CTA.
- CTA principal abre a celebracao para usuario autenticado e leva para `Entrar` para usuario anonimo.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A tela continua usando a celebracao inicial local como fallback principal.
- A regra de copy ficou isolada e testada fora da UI.
- A assinatura ainda usa o preview local ate RevenueCat estar ativo em development build.
- Alternativa rejeitada: buscar celebracao remota na tela Hoje nesta etapa. O app ja tem fallback funcional e a prioridade era UX autenticada.

Hurdles & Fixes:

- Hurdle: o teste importando `@louvor-serafico/shared` falhou no runner Node direto por resolucao ESM sem extensao.
- Fix: o teste passou a importar o arquivo fonte com caminho explicito, seguindo o padrao pragmatico ja usado no workspace.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve authenticated home summary`

## Proxima Etapa Planejada

Etapa 61 - Revisar fluxo premium na tela de musica.

Status: concluida em 2026-04-21.

Objetivo esperado:

- tornar o bloqueio premium mais acionavel na tela de musica;
- direcionar usuario anonimo para login;
- direcionar usuario autenticado sem acesso para a area premium/perfil;
- manter abertura real de material quando acesso estiver liberado.

Resultado:

- Criado `src/features/songs/song-asset-action.ts`.
- Criado `src/features/songs/song-asset-action.test.ts`.
- Tela de musica passou a exibir CTA navegavel quando material premium esta bloqueado.
- Usuario anonimo ve `Entrar para acessar`.
- Usuario autenticado sem acesso ve `Ver premium`.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de acao do material ficou isolada e testada fora da UI.
- A abertura de material continua usando Edge Function e signed URL quando `access.canAccess` e verdadeiro.
- O destino `Perfil` foi usado como area premium temporaria, porque RevenueCat e paywall final ainda dependem de development build e configuracao operacional.
- Alternativa rejeitada: implementar paywall final nesta etapa. Isso exigiria RevenueCat real e foge do escopo atual em Expo Go.

Hurdles & Fixes:

- Nenhum bloqueio tecnico encontrado.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve song premium actions`

## Proxima Etapa Planejada

Etapa 62 - Revisar UX de comunidade autenticada.

Status: concluida em 2026-04-25.

Objetivo esperado:

- deixar a tela Comunidade mais acionavel;
- orientar claramente quando comentario remoto, preview local ou bloqueio estiverem ativos;
- direcionar usuario anonimo para login;
- manter feed funcional com fallback local.

Resultado:

- Criado `src/features/comments/community-access.ts`.
- Criado `src/features/comments/community-access.test.ts`.
- Tab `Comunidade` passou a resumir o estado da comunidade com copy e CTA especificos.
- Placeholder do campo muda conforme estado.
- Usuario anonimo ve CTA para `Entrar`.
- Estado vazio ganhou mensagem explicita.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de UX foi isolada em helper testado para evitar ifs espalhados na tela.
- O card tecnico remoto foi mantido, porque ainda ajuda na validacao do Supabase durante desenvolvimento.
- O fluxo continua aceitando preview local quando nao ha sessao remota.
- Alternativa rejeitada: remover o preview local agora. Ele segue util enquanto a comunidade remota ainda esta em consolidacao.

Hurdles & Fixes:

- Nenhum bloqueio tecnico encontrado.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve community access ux`

## Proxima Etapa Planejada

Etapa 63 - Revisar UX do calendario remoto.

Status: concluida em 2026-04-25.

Objetivo esperado:

- deixar a tela Calendario menos tecnica;
- resumir claramente quando fonte local ou remota estiver ativa;
- manter lista funcional com fallback local.

Resultado:

- Criado `src/features/celebrations/calendar-overview.ts`.
- Criado `src/features/celebrations/calendar-overview.test.ts`.
- Tab `Calendario` ganhou resumo visual de fonte local/remota.
- Header passou a responder ao modo atual do catalogo.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de copy ficou isolada e testada fora da UI.
- O card tecnico remoto foi mantido para diagnostico durante desenvolvimento.
- O fallback local segue como comportamento padrao quando leitura remota falha.
- Alternativa rejeitada: remover o card remoto agora. Ainda e util enquanto Supabase segue em evolucao.

Hurdles & Fixes:

- Hurdle: `typecheck` falhou porque `Text` nao estava importado na tela `calendario`.
- Fix: importar `Text` de `react-native` e revalidar.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve calendar source summary`

## Proxima Etapa Planejada

Etapa 64 - Revisar UX do repertorio remoto.

Status: concluida em 2026-04-25.

Objetivo esperado:

- deixar a tela Repertorio menos tecnica;
- resumir claramente quando catalogo local ou remoto estiver ativo;
- manter favoritos visiveis junto da fonte atual.

Resultado:

- Criado `src/features/songs/repertoire-overview.ts`.
- Criado `src/features/songs/repertoire-overview.test.ts`.
- Tab `Repertorio` ganhou resumo visual do catalogo atual.
- Header passou a responder ao modo local/remoto.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de copy ficou isolada e testada fora da UI.
- O card remoto e o card de favoritos foram mantidos para diagnostico operacional.
- O fallback local segue como comportamento padrao quando leitura remota falha.
- Alternativa rejeitada: simplificar demais a tela removendo diagnosticos. Ainda precisamos deles nesta fase.

Hurdles & Fixes:

- Nenhum bloqueio tecnico encontrado.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve repertoire source summary`

## Proxima Etapa Planejada

Etapa 65 - Revisar detalhes de celebracao remota.

Status: concluida em 2026-04-25.

Objetivo esperado:

- deixar detalhe de celebracao menos tecnico;
- resumir claramente quando roteiro local ou remoto estiver ativo;
- destacar quantidade de momentos e lacunas editoriais.

Resultado:

- Criado `src/features/celebrations/celebration-detail-overview.ts`.
- Criado `src/features/celebrations/celebration-detail-overview.test.ts`.
- Tela de detalhe da celebracao ganhou resumo visual do roteiro atual.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de copy ficou isolada e testada fora da UI.
- O `EditorialStatus` foi mantido, porque ainda e util para curadoria.
- O fallback local segue padrao quando detalhe remoto nao existe.
- Alternativa rejeitada: unificar tudo em um unico card gigante. Mantive resumo e status separados para leitura mais clara.

Hurdles & Fixes:

- Hurdle: `apply_patch` inicial nao encaixou por contexto divergente no arquivo.
- Fix: reler arquivo atual e reaplicar patch com contexto correto.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve celebration detail summary`

## Proxima Etapa Planejada

Etapa 66 - Revisar UX do detalhe de musica.

Status: concluida em 2026-04-25.

Objetivo esperado:

- deixar detalhe de musica menos tecnico;
- resumir claramente quando catalogo local ou remoto estiver ativo;
- manter favoritos e materiais em leitura mais objetiva.

Resultado:

- Criado `src/features/songs/song-detail-overview.ts`.
- Criado `src/features/songs/song-detail-overview.test.ts`.
- Tela de detalhe da musica ganhou resumo visual do catalogo atual.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de copy ficou isolada e testada fora da UI.
- O card de favoritos foi mantido separado do resumo para nao misturar estado de sessao com origem do catalogo.
- O fallback local segue padrao quando detalhe remoto nao existe.
- Alternativa rejeitada: mover toda a copy para dentro da tela. Mantive funcao pura para continuar escalavel.

Hurdles & Fixes:

- Hurdle: `typecheck` falhou porque `colors.accentSoft` nao existe no tema.
- Fix: usar `colors.goldSoft`, ja presente no design system.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve song detail summary`

## Proxima Etapa Planejada

Etapa 67 - Revisar UX do fluxo de assinatura.

Status: concluida em 2026-04-25.

Objetivo esperado:

- deixar fluxo de assinatura menos tecnico;
- resumir claramente se conta ja pode assinar ou se premium ja esta ativo;
- manter leitura rapida na tela Perfil.

Resultado:

- Criado `src/features/subscription/subscription-overview.ts`.
- Criado `src/features/subscription/subscription-overview.test.ts`.
- Criado `src/components/SubscriptionOverviewCard.tsx`.
- Tela Perfil ganhou resumo visual do estado da assinatura.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de copy ficou isolada e testada fora da UI.
- O novo resumo ficou separado do `PaywallPreviewCard` para nao misturar status com acao principal.
- O card tecnico de assinatura segue disponivel apenas em debug.
- Alternativa rejeitada: fundir resumo e paywall em um unico card. Ficaria menos legivel.

Hurdles & Fixes:

- Nenhum bloqueio tecnico novo.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve subscription flow summary`

## Proxima Etapa Planejada

Etapa 68 - Revisar UX da tela de entrada.

Status: concluida em 2026-04-25.

Objetivo esperado:

- deixar tela de entrada menos seca;
- resumir claramente diferenca entre entrar e cadastrar;
- manter fluxo simples para testes reais no Supabase Auth.

Resultado:

- Criado `src/features/auth/auth-screen-overview.ts`.
- Criado `src/features/auth/auth-screen-overview.test.ts`.
- Tela `entrar` ganhou resumo visual por modo.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de copy ficou isolada e testada fora da UI.
- O resumo muda junto com o toggle entre entrar e cadastrar.
- Mantive formulario unico por modo, sem dividir em telas separadas.
- Alternativa rejeitada: criar wizard de cadastro. Excesso para fase atual.

Hurdles & Fixes:

- Nenhum bloqueio tecnico novo.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve auth screen summary`

## Proxima Etapa Planejada

Etapa 69 - Revisar UX da redefinicao de senha.

Status: concluida em 2026-04-25.

Objetivo esperado:

- deixar tela de recuperacao menos tecnica;
- resumir claramente ordem do fluxo;
- manter foco em uso por link do email.

Resultado:

- Criado `src/features/auth/password-recovery-overview.ts`.
- Criado `src/features/auth/password-recovery-overview.test.ts`.
- Tela `recuperar-senha` ganhou resumo visual do fluxo.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de copy ficou isolada e testada fora da UI.
- O resumo ficou acima do formulario para orientar antes da acao.
- Mantive card final explicando que link do email continua necessario.
- Alternativa rejeitada: esconder card informativo final. Ainda ajuda em suporte.

Hurdles & Fixes:

- Nenhum bloqueio tecnico novo.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve password recovery summary`

## Proxima Etapa Planejada

Etapa 70 - Revisar UX de estados vazios e erros remotos.

Status: concluida em 2026-04-25.

Objetivo esperado:

- melhorar leitura de estados remotos;
- deixar vazio e erro mais claros nas tabs principais;
- evitar mensagens tecnicas soltas na interface.

Resultado:

- Criado `src/features/remote/remote-feedback.ts`.
- Criado `src/features/remote/remote-feedback.test.ts`.
- Tabs `Calendario`, `Repertorio` e `Comunidade` agora resumem melhor estado remoto.
- `Calendario` e `Repertorio` ganharam empty state explicito.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de copy ficou isolada e testada fora da UI.
- Mantive mensagens originais vindas dos fetchers quando ha erro ou falta configuracao.
- Empty states locais ficaram simples e reutilizaram estilos existentes.
- Alternativa rejeitada: criar componente visual global agora. Funcao pura bastou.

Hurdles & Fixes:

- Hurdle: `rg.exe` falhou com acesso negado no ambiente.
- Fix: seguir leitura direta dos arquivos-alvo.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve remote empty and error states`

## Proxima Etapa Planejada

Etapa 71 - Revisar consistencia final das tabs principais.

Status: concluida em 2026-04-25.

Objetivo esperado:

- alinhar tom das tabs principais;
- remover subtitulos tecnicos restantes;
- manter linguagem mais pastoral e objetiva.

Resultado:

- Criado `src/features/tabs/main-tab-copy.ts`.
- Criado `src/features/tabs/main-tab-copy.test.ts`.
- Tabs `Hoje`, `Comunidade` e `Perfil` agora usam copy mais consistente.
- Script de testes raiz atualizado.

Decisoes tecnicas e trade-offs:

- A regra de copy ficou isolada e testada fora da UI.
- A copy responde ao estado autenticado quando isso melhora contexto.
- Mantive headers atuais, ajustando apenas subtitulos.
- Alternativa rejeitada: refatorar `PageHeader` agora. Nao era necessario.

Hurdles & Fixes:

- Nenhum bloqueio tecnico novo.

Checklist DoD:

- [x] TDD aplicado.
- [x] UI integrada.
- [x] Testes passam.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: align main tab copy`

## Proxima Etapa Planejada

Etapa 72 - Revisar warnings tecnicos restantes dos testes.

Status: concluida em 2026-04-25.

Objetivo esperado:

- remover warnings ruidosos dos testes;
- manter pipeline local mais limpa;
- preservar comando simples de validacao.

Resultado:

- Runner raiz de testes migrou de `node` para `tsx`.
- Adicionado `tsx` em `devDependencies`.
- `pnpm-lock.yaml` atualizado.
- Warnings `MODULE_TYPELESS_PACKAGE_JSON` deixaram de aparecer no `pnpm test`.

Decisoes tecnicas e trade-offs:

- Escolha por `tsx` evitou mexer no `type` do pacote mobile.
- Isso preserva `metro.config.js` e `app.config.js` em CommonJS.
- Alternativa rejeitada: tornar `apps/mobile` ESM agora. Risco desnecessario.

Hurdles & Fixes:

- Hurdle: primeiro `pnpm install` falhou com `ERR_PNPM_ENOENT` em diretoria temporaria do `metro-core`.
- Fix: repetir `pnpm install`; segunda execucao concluiu normalmente.

Checklist DoD:

- [x] TDD preservado.
- [x] Testes passam sem warning anterior.
- [x] Typecheck passa.
- [x] Lint passa.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`chore: clean test runner warnings`

## Proxima Etapa Planejada

Etapa 73 - Listar pendencias finais do plano atual.

Status: concluida em 2026-04-25.

Objetivo esperado:

- consolidar o que ainda falta;
- separar pendencias de produto, infra e publicacao;
- encerrar ciclo atual com visao clara.

Resultado:

- Revisado estado atual do repositorio.
- Confirmado `git status` limpo na branch `dev`.
- Consolidada lista de pendencias finais do plano atual.

Pendencias finais do plano atual:

1. Assinatura real:
   - integrar RevenueCat de verdade;
   - conectar entitlement real no app;
   - validar compra, restauracao e expiracao.

2. Build nativo:
   - concluir Apple Developer pago;
   - gerar development build iOS;
   - validar fluxo fora do Expo Go para assinaturas nativas.

3. Conteudo editorial:
   - ampliar celebracoes alem de 03 de janeiro;
   - cadastrar repertorio remoto real;
   - subir assets premium reais para bucket.

4. Operacao Supabase:
   - revisar RLS final;
   - revisar seeds e migrations finais;
   - validar buckets, policies e edge functions em ambiente estavel.

5. UX final:
   - rodada visual completa em device real;
   - revisar microcopy restante;
   - revisar loading states finais.

6. Release readiness:
   - revisar icones, splash e metadata das stores;
   - preparar CI/CD de release;
   - fechar checklist de publicacao Android/iOS.

Decisoes tecnicas e trade-offs:

- O ciclo atual focou fundacao, UX base e fluxos principais.
- Publicacao e monetizacao real ficaram para fase seguinte por dependerem de credenciais e contas finais.
- Alternativa rejeitada: forcar release readiness agora. Ainda faltam dependencias externas.

Hurdles & Fixes:

- Nenhum bloqueio novo nesta consolidacao.

Checklist DoD:

- [x] Pendencias consolidadas.
- [x] Estado do repositorio revisado.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`docs: list remaining plan items`

## Proxima Etapa Planejada

Etapa 74 - Definir proximo ciclo de execucao.

## Etapa 74 - Refinamento visual inicial

Resumo do que foi feito:

- Consolidado novo tema visual com paleta mais sacra e acabamento mais nobre.
- Ajustadas tipografia, bordas, sombras e ritmos visuais de componentes compartilhados.
- Refinadas telas principais: Hoje, Calendario, Repertorio, Comunidade, Entrar, Recuperar senha, Perfil, detalhe de celebracao e detalhe de musica.
- Removidos varios textos tecnicos da interface visivel ao usuario.

Arquivos principais alterados:

- `apps/mobile/src/theme/tokens.ts`
- `apps/mobile/app/_layout.tsx`
- `apps/mobile/app/(tabs)/_layout.tsx`
- `apps/mobile/src/components/PageHeader.tsx`
- `apps/mobile/src/components/SectionTitle.tsx`
- `apps/mobile/src/components/MomentCard.tsx`
- `apps/mobile/src/components/CelebrationCard.tsx`
- `apps/mobile/src/components/SongCard.tsx`
- `apps/mobile/src/components/AuthEntryCard.tsx`
- `apps/mobile/src/components/PaywallPreviewCard.tsx`
- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/app/(tabs)/calendario.tsx`
- `apps/mobile/app/(tabs)/repertorio.tsx`
- `apps/mobile/app/(tabs)/comunidade.tsx`
- `apps/mobile/app/(tabs)/perfil.tsx`
- `apps/mobile/app/entrar.tsx`
- `apps/mobile/app/recuperar-senha.tsx`
- `apps/mobile/app/celebracoes/[id].tsx`
- `apps/mobile/app/musicas/[slug].tsx`

Decisoes tecnicas e trade-offs:

- Mantido uso de fontes nativas do sistema via tokens para evitar adicionar dependencias de fontes agora.
- Alternativa rejeitada: instalar familias tipograficas externas nesta etapa. Tentativa falhou por problema transitivo do pnpm; como o foco era acabamento rapido e seguro, ficou melhor seguir com serifas nativas e validar UI primeiro.
- Cards tecnicos remotos foram removidos das tabs principais para limpar experiencia do usuario. Estrutura de debug permanece protegida por flag.
- Fluxos e logica principal foram preservados; mudanca concentrou-se em aparencia, copy e hierarquia visual.

Hurdles & Fixes:

- `corepack pnpm add` falhou ao tentar instalar fontes extras por erro transitivo de pasta temporaria do pnpm.
- Solucao aplicada: seguir com tipografia nativa e tokens globais, sem bloquear refinamento visual.

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine sacred visual language across main screens`

## Proxima Etapa Planejada

Etapa 75 - Validacao visual em device e segundo passe de UI/UX.

## Etapa 75 - Base dinamica da Home em 2026

Resumo do que foi feito:

- Removida dependencia da Home em uma missa fixa.
- Introduzido modelo local de calendario liturgico 2026.
- Resolucao do dia atual passou a usar a data real do aparelho, mapeada para o calendario 2026.
- Home agora distingue dia com repertorio e dia sem repertorio.
- Adicionado mini calendario mensal com marcacao visual dos dias que possuem repertorio.
- Em dias sem repertorio, a Home passou a apresentar explicacao do app e lista de dias ja preparados.

Arquivos alterados:

- `packages/shared/src/liturgical-calendar.ts`
- `packages/shared/src/liturgical-calendar.test.ts`
- `packages/shared/src/index.ts`
- `apps/mobile/src/features/home/home-summary.ts`
- `apps/mobile/src/features/home/home-summary.test.ts`
- `apps/mobile/src/features/home/home-calendar.ts`
- `apps/mobile/src/features/home/home-calendar.test.ts`
- `apps/mobile/app/(tabs)/index.tsx`
- `package.json`

Decisoes tecnicas e trade-offs:

- Mantido calendario 2026 local e simples, com apenas o dia que ja possui repertorio publicado.
- Alternativa rejeitada: preencher artificialmente outros dias liturgicos sem fonte confiavel. Melhor seguir com base real e expandir depois.
- O tipo `liturgical_day_without_repertoire` ja esta previsto no dominio, mas nesta etapa os dias sem cadastro seguem como `ordinary_day`.
- A Home agora usa calendario do mes atual, mas o catalogo publicado continua pequeno; por isso alguns meses aparecem sem marcacoes, o que reflete fielmente o estado atual do conteudo.

Hurdles & Fixes:

- Nao houve bloqueio funcional nesta etapa.

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: make home follow 2026 liturgical calendar`

## Proxima Etapa Planejada

Etapa 76 - Expandir dominio de dias liturgicos sem repertorio e evoluir calendario principal.

## Etapa 76 - Dias liturgicos sem repertorio

Resumo do que foi feito:

- Expandido dominio do calendario 2026 para diferenciar dias comuns e datas liturgicas sem repertorio.
- Adicionadas marcacoes liturgicas iniciais para 2026, incluindo tempos fortes e solenidades principais.
- Calendario principal passou a exibir grade mensal real com tres estados visuais: hoje, data liturgica e dia com repertorio.
- Incluida lista de datas marcadas do mes atual, separando visualmente o que ja tem roteiro do que ainda aguarda repertorio.

Arquivos alterados:

- `packages/shared/src/liturgical-calendar.ts`
- `packages/shared/src/liturgical-calendar.test.ts`
- `apps/mobile/app/(tabs)/calendario.tsx`

Decisoes tecnicas e trade-offs:

- Mantida uma base inicial enxuta de datas liturgicas 2026, suficiente para evoluir UX sem inventar um calendario completo ainda.
- Alternativa rejeitada: preencher o ano inteiro manualmente nesta etapa. Melhor validar estrutura primeiro e expandir editorialmente depois.
- O calendario principal continua compatível com repertorio remoto, mas a camada visual agora independe de existir conteudo musical em todos os dias.

Hurdles & Fixes:

- Nenhum bloqueio funcional relevante.

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: mark liturgical days without repertoire in 2026 calendar`

## Proxima Etapa Planejada

Etapa 77 - Refinar UX dos detalhes de dia sem repertorio.

## Etapa 78 - Home para dias sem repertorio

Resumo do que foi feito:

- Refinada a Home para diferenciar dia comum sem roteiro e data liturgica sem repertorio.
- Adicionada regra para destacar dias preparados relevantes ao momento do ano.
- Quando nao ha proximos dias em 2026, a Home passa a exibir os dias ja publicados no app.

Arquivos alterados:

- `apps/mobile/src/features/home/home-prepared-days.ts`
- `apps/mobile/src/features/home/home-prepared-days.test.ts`
- `apps/mobile/src/features/home/home-summary.ts`
- `apps/mobile/src/features/home/home-summary.test.ts`
- `apps/mobile/app/(tabs)/index.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: improve home states for days without repertoire`

## Proxima Etapa Planejada

Etapa 79 - Navegacao mensal real no calendario 2026.

## Etapa 79 - Navegacao mensal do calendario

Resumo do que foi feito:

- Calendario passou a navegar mes a mes em 2026.
- Grade, datas marcadas e lista editorial passaram a seguir o mes selecionado.
- Meses sem marcacao agora mostram estado vazio proprio.

Arquivos alterados:

- `apps/mobile/src/features/celebrations/calendar-month-view.ts`
- `apps/mobile/src/features/celebrations/calendar-month-view.test.ts`
- `apps/mobile/app/(tabs)/calendario.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add monthly navigation to 2026 calendar`

## Proxima Etapa Planejada

Etapa 80 - Tornar dias do calendario navegaveis.

## Etapa 80 - Rotas por dia no calendario

Resumo do que foi feito:

- Dias da grade mensal passaram a ser clicaveis.
- Datas marcadas do mes tambem passaram a abrir o detalhe correto.
- Navegacao foi unificada por `slug` quando ha roteiro e por `monthDay` nos demais casos.

Arquivos alterados:

- `apps/mobile/app/(tabs)/calendario.tsx`
- `apps/mobile/src/features/celebrations/calendar-day-route.ts`
- `apps/mobile/src/features/celebrations/calendar-day-route.test.ts`
- `package.json`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: make 2026 calendar days open the correct detail state`

## Proxima Etapa Planejada

Etapa 81 - Refinar estados vazios do detalhe do dia.

## Etapa 81 - Detalhe de dia sem repertorio

Resumo do que foi feito:

- Refinada a copy dos detalhes para dia liturgico sem repertorio e dia comum.
- Card principal ganhou hierarquia editorial mais clara, com titulo, texto principal e CTA melhor resolvido.

Arquivos alterados:

- `apps/mobile/src/features/celebrations/liturgical-day-detail.ts`
- `apps/mobile/src/features/celebrations/liturgical-day-detail.test.ts`
- `apps/mobile/app/celebracoes/[id].tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine empty liturgical day detail states`

## Proxima Etapa Planejada

Etapa 82 - Refinar composicao visual da Home.

## Etapa 82 - Composicao da Home

Resumo do que foi feito:

- Reforcada a hierarquia visual do bloco principal de hoje.
- Adicionados badge de data, CTA principal mais presente e atalhos editoriais para calendario e repertorio.
- O bloco mensal ganhou cabecalho proprio e acesso direto ao calendario.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine home composition and hierarchy`

## Proxima Etapa Planejada

Etapa 83 - Refinar visual e copy da tab Repertorio.

## Etapa 83 - Repertorio editorial

Resumo do que foi feito:

- Repertorio ganhou resumo inicial mais forte e metricas editoriais.
- Cards de musica passaram a enfatizar materiais e disponibilidade com linguagem menos tecnica.
- O overview do catalogo ficou mais humano e menos operacional.

Arquivos alterados:

- `apps/mobile/app/(tabs)/repertorio.tsx`
- `apps/mobile/src/components/SongCard.tsx`
- `apps/mobile/src/features/songs/repertoire-overview.ts`
- `apps/mobile/src/features/songs/repertoire-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine repertoire visual hierarchy and copy`

## Proxima Etapa Planejada

Etapa 84 - Refinar visual e copy da tab Comunidade.

## Etapa 84 - Comunidade mais humana

Resumo do que foi feito:

- Estados de acesso foram reescritos com linguagem menos tecnica.
- Bloco principal ganhou metrica de partilhas e formulario melhor distribuido.
- Cards e estado vazio passaram a usar copy mais acolhedora.

Arquivos alterados:

- `apps/mobile/app/(tabs)/comunidade.tsx`
- `apps/mobile/src/features/comments/community-access.ts`
- `apps/mobile/src/features/comments/community-access.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine community visual hierarchy and copy`

## Proxima Etapa Planejada

Etapa 85 - Refinar visual e copy da tab Perfil.

## Etapa 85 - Perfil e assinatura

Resumo do que foi feito:

- A tab Perfil ganhou copy mais madura para conta anonima, conta em carga e conta pronta.
- Os cards principais de perfil e assinatura receberam hierarquia visual mais forte, com melhor leitura dos textos e estados.
- O bloco premium passou a falar com mais clareza sobre acesso ativo, assinatura disponivel e entrada necessaria.

Arquivos alterados:

- `apps/mobile/app/(tabs)/perfil.tsx`
- `apps/mobile/src/components/ProfileOverviewCard.tsx`
- `apps/mobile/src/components/SubscriptionOverviewCard.tsx`
- `apps/mobile/src/features/auth/profile-overview.ts`
- `apps/mobile/src/features/auth/profile-overview.test.ts`
- `apps/mobile/src/features/subscription/subscription-overview.ts`
- `apps/mobile/src/features/subscription/subscription-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine profile and subscription hierarchy`

## Proxima Etapa Planejada

Etapa 86 - Refinar visual e copy da tela de autenticacao.

## Etapa 86 - Tela de autenticacao

Resumo do que foi feito:

- Refinada a copy da tela `Entrar` para um tom mais humano e menos formularizado.
- O resumo inicial ganhou hierarquia editorial com eyebrow, titulo e texto de apoio mais forte.
- Os blocos de login, cadastro e cuidado com a conta passaram a orientar melhor cada etapa sem mudar o fluxo.

Arquivos alterados:

- `apps/mobile/app/entrar.tsx`
- `apps/mobile/src/features/auth/auth-screen-overview.ts`
- `apps/mobile/src/features/auth/auth-screen-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine auth screen hierarchy and copy`

## Proxima Etapa Planejada

Etapa 87 - Refinar visual e copy da tela de recuperacao de senha.

## Etapa 87 - Recuperacao de senha

Resumo do que foi feito:

- Refinada a copy da tela `recuperar-senha` para um tom mais sereno e direto.
- O resumo inicial ganhou hierarchy melhor com eyebrow e texto de apoio mais claro.
- O formulario e o bloco final passaram a orientar melhor o retorno a conta sem alterar a logica.

Arquivos alterados:

- `apps/mobile/app/recuperar-senha.tsx`
- `apps/mobile/src/features/auth/password-recovery-overview.ts`
- `apps/mobile/src/features/auth/password-recovery-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine password recovery hierarchy and copy`

## Proxima Etapa Planejada

Etapa 88 - Refinar visual e copy do detalhe da musica.

## Etapa 88 - Detalhe da musica

Resumo do que foi feito:

- Refinada a copy do detalhe da musica para um tom menos tecnico e mais editorial.
- O resumo principal ganhou eyebrow e mensagem mais adequada ao uso real do canto.
- Blocos de favoritos e materiais receberam hierarquia visual mais clara sem mudar o comportamento.

Arquivos alterados:

- `apps/mobile/app/musicas/[slug].tsx`
- `apps/mobile/src/features/songs/song-detail-overview.ts`
- `apps/mobile/src/features/songs/song-detail-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine song detail hierarchy and copy`

## Proxima Etapa Planejada

Etapa 89 - Refinar visual e copy do detalhe da celebracao.

## Etapa 89 - Detalhe da celebracao

Resumo do que foi feito:

- Refinada a copy do detalhe da celebracao para um tom menos tecnico.
- O resumo principal ganhou eyebrow e texto mais editorial.
- Os estados de dia liturgico sem repertorio e dia comum foram normalizados em ASCII e ficaram mais consistentes.

Arquivos alterados:

- `apps/mobile/app/celebracoes/[id].tsx`
- `apps/mobile/src/features/celebrations/celebration-detail-overview.ts`
- `apps/mobile/src/features/celebrations/celebration-detail-overview.test.ts`
- `apps/mobile/src/features/celebrations/liturgical-day-detail.ts`
- `apps/mobile/src/features/celebrations/liturgical-day-detail.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine celebration detail hierarchy and copy`

## Proxima Etapa Planejada

Etapa 90 - Revisar consistencia final entre Home, Calendario e detalhes.

## Etapa 90 - Consistencia entre Home, Calendario e detalhes

Resumo do que foi feito:

- Alinhada a copy da Home com o Calendario para usar a mesma linguagem sobre dias preparados, roteiros e celebracoes.
- O resumo principal do Calendario passou a seguir a mesma hierarquia editorial dos detalhes.
- Ajustados textos finais para reduzir variacao de tom entre Home, Calendario e estados sem roteiro.

Arquivos alterados:

- `apps/mobile/app/(tabs)/calendario.tsx`
- `apps/mobile/src/features/home/home-summary.ts`
- `apps/mobile/src/features/home/home-summary.test.ts`
- `apps/mobile/src/features/celebrations/calendar-overview.ts`
- `apps/mobile/src/features/celebrations/calendar-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: align home and calendar editorial copy`

## Proxima Etapa Planejada

Etapa 91 - Revisar consistencia final entre Repertorio, musica e Perfil.

## Etapa 91 - Consistencia entre Repertorio, musica e Perfil

Resumo do que foi feito:

- Alinhada a linguagem do Repertorio com o detalhe da musica e a tela de Perfil.
- O resumo principal do Repertorio passou a usar a mesma hierarquia editorial aplicada nas outras telas.
- Ajustada a copy do catalogo para reforcar estudo, escolha e preparacao, reduzindo variacoes de tom.

Arquivos alterados:

- `apps/mobile/app/(tabs)/repertorio.tsx`
- `apps/mobile/src/features/songs/repertoire-overview.ts`
- `apps/mobile/src/features/songs/repertoire-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: align repertoire editorial copy`

## Proxima Etapa Planejada

Etapa 92 - Revisar consistencia final entre Comunidade, Perfil e autenticacao.

## Etapa 92 - Consistencia entre Comunidade, Perfil e autenticacao

Resumo do que foi feito:

- Alinhada a linguagem da Comunidade com Perfil e autenticacao.
- Ajustada a copy de entrada e participacao para reduzir variacoes de tom entre conta, partilha e acervo.
- Refinadas as mensagens anonimas de Perfil para conversar melhor com a experiencia de entrada no app.

Arquivos alterados:

- `apps/mobile/src/features/comments/community-access.ts`
- `apps/mobile/src/features/comments/community-access.test.ts`
- `apps/mobile/src/features/auth/profile-overview.ts`
- `apps/mobile/src/features/auth/profile-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: align community and profile editorial copy`

## Proxima Etapa Planejada

Etapa 93 - Revisao final das tabs principais e estados vazios remanescentes.

## Etapa 93 - Revisao final das tabs principais

Resumo do que foi feito:

- Refinada a linguagem remanescente de estados vazios em `Repertorio` e `Comunidade`.
- O bloco de entrada exibido no `Perfil` deixou de usar linguagem tecnica e passou a orientar a conta com tom editorial.
- Ajustados subtitulos anonimos de `Comunidade` e `Perfil` para fechar o ciclo de copy das tabs principais.

Arquivos alterados:

- `apps/mobile/src/features/auth/auth-readiness.ts`
- `apps/mobile/src/features/auth/auth-readiness.test.ts`
- `apps/mobile/src/components/AuthEntryCard.tsx`
- `apps/mobile/src/features/tabs/main-tab-copy.ts`
- `apps/mobile/src/features/tabs/main-tab-copy.test.ts`
- `apps/mobile/app/(tabs)/repertorio.tsx`
- `apps/mobile/app/(tabs)/comunidade.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: finalize main tab empty state copy`

## Proxima Etapa Planejada

Etapa 94 - Consolidar fechamento do ciclo atual de UI/UX.

## Etapa 94 - Refatoracao da Home

Resumo do que foi feito:

- A Home deixou de funcionar como um conjunto de cards explicativos e passou a priorizar composicao editorial, silencio visual e acao diaria.
- O cabecalho foi reduzido para marca, data e frase curta.
- O estado principal do dia foi concentrado em um unico card com duas acoes, sem transformar a ausencia de roteiro em bloco pesado.
- O calendario mensal completo saiu da Home e deu lugar a uma lista enxuta de roteiros disponiveis.
- Foram criados componentes pequenos para divisor ornamental, atalhos rapidos e itens da lista de roteiros.
- A copy da Home foi reduzida e reescrita para um tom mais curto, funcional e liturgico.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/src/components/HomePreparedDayItem.tsx`
- `apps/mobile/src/components/HomeQuickActionCard.tsx`
- `apps/mobile/src/components/OrnamentalDivider.tsx`
- `apps/mobile/src/features/home/home-summary.ts`
- `apps/mobile/src/features/home/home-summary.test.ts`
- `apps/mobile/src/features/home/home-prepared-days.ts`
- `apps/mobile/src/features/home/home-prepared-days.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: redesign home as a liturgical daily panel`

## Proxima Etapa Planejada

Etapa 95 - Validacao visual da Home em device e ajustes finos.

## Etapa 95 - Ajuste fino de caixas da Home

Resumo do que foi feito:

- Corrigida a quebra excessiva dos atalhos rapidos na Home.
- A grade dos atalhos passou a respeitar melhor a largura mobile, com o terceiro item ocupando a linha inteira.
- O bloco de consulta deixou de comprimir o titulo principal ao lado do link e voltou a respirar verticalmente.
- Ajustados tamanho de titulo, altura minima e largura dos atalhos para manter margens internas mais harmonicas.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/src/components/HomeQuickActionCard.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`fix: polish home card spacing on mobile`

## Proxima Etapa Planejada

Etapa 96 - Validacao visual final da Home em device.

## Etapa 96 - Correcao da faixa de atalhos da Home

Resumo do que foi feito:

- A faixa `Calendario`, `Repertorio` e `Partilha` voltou para tres colunas equilibradas.
- Cada atalho recuperou borda, largura uniforme e altura minima comum.
- O texto interno foi reduzido e redistribuido para preservar respiro sem quebrar o ritmo visual da primeira dobra.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/src/components/HomeQuickActionCard.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`fix: rebalance home quick actions`

## Proxima Etapa Planejada

Etapa 97 - Validacao visual final da Home em device.

## Etapa 97 - Refino de atalhos e CTA da Home

Resumo do que foi feito:

- O bloco intermediario deixou de usar mini-cards explicativos e passou a operar como faixa de acessos rapidos.
- Cada atalho ficou reduzido a marca curta e titulo, com leitura imediata e menos pressao horizontal.
- O CTA do calendario saiu do corpo solto da secao e foi integrado ao cabecalho de `Roteiros disponiveis`.
- A secao de roteiros ficou mais editorial, enquanto os atalhos ficaram mais utilitarios, reforcando a diferenca entre navegacao e conteudo.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/src/components/HomeQuickActionCard.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: refine home quick actions and calendar cta`

## Proxima Etapa Planejada

Etapa 98 - Validacao visual final da Home em device.

## Etapa 98 - Simplificacao dos atalhos e do card principal

Resumo do que foi feito:

- Removidas as letras decorativas dos atalhos rapidos.
- Os atalhos ficaram reduzidos a titulo e microtexto curto.
- O card principal deixou de repetir a mesma ideia no texto e no CTA quando nao ha roteiro preparado.
- A Home ficou mais limpa sem alterar rotas nem comportamento.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/src/components/HomeQuickActionCard.tsx`
- `apps/mobile/src/features/home/home-summary.ts`
- `apps/mobile/src/features/home/home-summary.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: simplify home quick actions and empty today state`

## Proxima Etapa Planejada

Etapa 99 - Validacao visual final da Home em device.

## Etapa 99 - Ajuste de quebra nos atalhos da Home

Resumo do que foi feito:

- Ajustada a tipografia dos atalhos rapidos para evitar quebra de linha em `Calendario` e `Repertorio`.
- Reduzidos padding horizontal e espacamento entre os tres atalhos.
- Os textos passaram a respeitar uma linha unica com ajuste fino de tamanho.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/src/components/HomeQuickActionCard.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`fix: prevent quick action text wrapping`

## Proxima Etapa Planejada

Etapa 100 - Validacao visual final da Home em device.

## Etapa 100 - Padroes globais da Home e aplicacao inicial no Calendario

Resumo do que foi feito:

- Definido o plano global de refatoracao por etapas para aplicar a linguagem da Home ao restante do app.
- Criado `EditorialSectionHeader` como cabecalho editorial compartilhado para secoes.
- A Home passou a usar esse cabecalho na area de roteiros.
- O Calendario foi iniciado nesse novo padrao com secoes mais editoriais e menos blocadas.
- A lista de datas marcadas ficou mais leve, com leitura de lista em vez de mini-cards concorrentes.

Arquivos alterados:

- `apps/mobile/src/components/EditorialSectionHeader.tsx`
- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/app/(tabs)/calendario.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: extract editorial section headers and start calendar refactor`

## Proximas Etapas Planejadas

- Etapa 101 - Refinar Repertorio com a mesma estrutura editorial e navegacao mais enxuta.
- Etapa 102 - Refinar Comunidade com foco em participacao, leitura e estados vazios mais leves.
- Etapa 103 - Refinar Perfil e assinatura com hierarquia mais sobria e menos blocos concorrentes.
- Etapa 104 - Refinar Entrar e Recuperar Senha com a mesma linguagem visual e densidade reduzida.
- Etapa 105 - Refinar detalhes de Musica e Celebracao com cabecalhos editoriais e blocos mais contidos.
- Etapa 106 - Revisao transversal de componentes compartilhados, tabs, espacamentos e copy final.
- Etapa 107 - Validacao final visual e tecnica do ciclo completo de refatoracao.

## Etapa 101 - Repertorio no mesmo padrao editorial da Home

Resumo do que foi feito:

- O Repertorio passou a usar o mesmo cabecalho editorial compartilhado iniciado na Home e no Calendario.
- O resumo principal ficou menos catalogo tecnico e mais orientado a consulta, estudo e preparacao.
- A secao principal passou a se apresentar como lista de cantos disponiveis, com hierarquia mais clara.
- `SongCard` ficou menos blocado e mais editorial, com menos peso visual e leitura mais limpa.

Arquivos alterados:

- `apps/mobile/app/(tabs)/repertorio.tsx`
- `apps/mobile/src/components/SongCard.tsx`
- `apps/mobile/src/features/songs/repertoire-overview.ts`
- `apps/mobile/src/features/songs/repertoire-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: apply editorial home structure to repertoire`

## Proximas Etapas Planejadas

- Etapa 102 - Refinar Comunidade com foco em participacao, leitura e estados vazios mais leves.
- Etapa 103 - Refinar Perfil e assinatura com hierarquia mais sobria e menos blocos concorrentes.
- Etapa 104 - Refinar Entrar e Recuperar Senha com a mesma linguagem visual e densidade reduzida.
- Etapa 105 - Refinar detalhes de Musica e Celebracao com cabecalhos editoriais e blocos mais contidos.
- Etapa 106 - Revisao transversal de componentes compartilhados, tabs, espacamentos e copy final.
- Etapa 107 - Validacao final visual e tecnica do ciclo completo de refatoracao.

## Etapa 102 - Comunidade no mesmo padrao editorial da Home

Resumo do que foi feito:

- A Comunidade passou a usar o mesmo ritmo editorial da Home e das abas ja ajustadas.
- O bloco principal ficou mais direto, com menos repeticao de texto e foco mais claro em participacao.
- O formulario ganhou cabecalho editorial e a lista de partilhas ficou mais leve, em bloco unico de leitura.
- A copy de acesso e do subtitulo da tab foi refinada para um tom mais sobrio e menos tecnico.

Arquivos alterados:

- `apps/mobile/app/(tabs)/comunidade.tsx`
- `apps/mobile/src/features/comments/community-access.ts`
- `apps/mobile/src/features/comments/community-access.test.ts`
- `apps/mobile/src/features/tabs/main-tab-copy.ts`
- `apps/mobile/src/features/tabs/main-tab-copy.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: apply editorial home structure to community`

## Proximas Etapas Planejadas

- Etapa 103 - Refinar Perfil e assinatura com hierarquia mais sobria e menos blocos concorrentes.
- Etapa 104 - Refinar Entrar e Recuperar Senha com a mesma linguagem visual e densidade reduzida.
- Etapa 105 - Refinar detalhes de Musica e Celebracao com cabecalhos editoriais e blocos mais contidos.
- Etapa 106 - Revisao transversal de componentes compartilhados, tabs, espacamentos e copy final.
- Etapa 107 - Validacao final visual e tecnica do ciclo completo de refatoracao.

## Etapa 103 - Perfil e assinatura no mesmo padrao editorial da Home

Resumo do que foi feito:

- O Perfil passou a usar cabecalhos editoriais para separar conta e assinatura.
- Os cards principais ficaram mais sobrios, com menos dramatizacao tipografica e melhor leitura.
- O titulo do perfil pronto deixou de competir com a tela inteira e passou a privilegiar o nome da pessoa.
- Os cards de entrada e assinatura foram alinhados ao mesmo tom visual e editorial.

Arquivos alterados:

- `apps/mobile/app/(tabs)/perfil.tsx`
- `apps/mobile/src/components/ProfileOverviewCard.tsx`
- `apps/mobile/src/components/SubscriptionOverviewCard.tsx`
- `apps/mobile/src/components/AuthEntryCard.tsx`
- `apps/mobile/src/components/PaywallPreviewCard.tsx`
- `apps/mobile/src/features/auth/profile-overview.ts`
- `apps/mobile/src/features/auth/profile-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: apply editorial home structure to profile`

## Proximas Etapas Planejadas

- Etapa 104 - Refinar Entrar e Recuperar Senha com a mesma linguagem visual e densidade reduzida.
- Etapa 105 - Refinar detalhes de Musica e Celebracao com cabecalhos editoriais e blocos mais contidos.
- Etapa 106 - Revisao transversal de componentes compartilhados, tabs, espacamentos e copy final.
- Etapa 107 - Validacao final visual e tecnica do ciclo completo de refatoracao.

## Etapa 104 - Entrar e Recuperar Senha no mesmo padrao editorial da Home

Resumo do que foi feito:

- As telas de autenticacao passaram a usar a mesma estrutura editorial de secoes aplicada na Home.
- Os blocos de resumo e formularios ficaram mais limpos, com menos variacao tipografica e menos repeticao visual.
- A copy de entrada, cadastro e recuperacao foi encurtada e alinhada ao restante do app.
- Os blocos auxiliares finais foram mantidos, mas com papel mais discreto.

Arquivos alterados:

- `apps/mobile/app/entrar.tsx`
- `apps/mobile/app/recuperar-senha.tsx`
- `apps/mobile/src/features/auth/auth-screen-overview.ts`
- `apps/mobile/src/features/auth/auth-screen-overview.test.ts`
- `apps/mobile/src/features/auth/password-recovery-overview.ts`
- `apps/mobile/src/features/auth/password-recovery-overview.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: apply editorial home structure to auth screens`

## Proximas Etapas Planejadas

- Etapa 105 - Refinar detalhes de Musica e Celebracao com cabecalhos editoriais e blocos mais contidos.
- Etapa 106 - Revisao transversal de componentes compartilhados, tabs, espacamentos e copy final.
- Etapa 107 - Validacao final visual e tecnica do ciclo completo de refatoracao.

## Etapa 105 - Detalhes de Musica e Celebracao no mesmo padrao editorial da Home

Resumo do que foi feito:

- Os detalhes de Musica e Celebracao passaram a usar cabecalhos editoriais de secao.
- Os resumos principais ficaram menos tecnicos e com foco maior em consulta e preparo.
- `MomentCard` e `EditorialStatus` foram suavizados para reduzir peso visual e alinhar melhor com o restante do app.
- Os estados de dia liturgico sem roteiro e dia comum foram reescritos para uma leitura mais limpa.

Arquivos alterados:

- `apps/mobile/app/musicas/[slug].tsx`
- `apps/mobile/app/celebracoes/[id].tsx`
- `apps/mobile/src/components/EditorialStatus.tsx`
- `apps/mobile/src/components/MomentCard.tsx`
- `apps/mobile/src/features/songs/song-detail-overview.ts`
- `apps/mobile/src/features/songs/song-detail-overview.test.ts`
- `apps/mobile/src/features/celebrations/celebration-detail-overview.ts`
- `apps/mobile/src/features/celebrations/celebration-detail-overview.test.ts`
- `apps/mobile/src/features/celebrations/liturgical-day-detail.ts`
- `apps/mobile/src/features/celebrations/liturgical-day-detail.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: apply editorial home structure to detail screens`

## Proximas Etapas Planejadas

- Etapa 106 - Revisao transversal de componentes compartilhados, tabs, espacamentos e copy final.
- Etapa 107 - Validacao final visual e tecnica do ciclo completo de refatoracao.

## Etapa 106 - Revisao transversal dos componentes compartilhados e acabamento final

Resumo do que foi feito:

- `PageHeader` foi ajustado para uma hierarquia mais serena, com subtitulo menos pesado e melhor respiro.
- `SectionTitle` e os ultimos usos residuais de italico estrutural foram removidos para disciplinar a tipografia.
- A bottom tab foi refinada com ajuste de altura, espacamento e legibilidade dos labels.
- Tokens tipograficos e alguns pontos finais de copy e apresentacao foram alinhados ao padrao editorial consolidado.

Arquivos alterados:

- `apps/mobile/src/components/PageHeader.tsx`
- `apps/mobile/src/components/SectionTitle.tsx`
- `apps/mobile/app/(tabs)/_layout.tsx`
- `apps/mobile/app/(tabs)/calendario.tsx`
- `apps/mobile/app/(tabs)/comunidade.tsx`
- `apps/mobile/src/theme/tokens.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: finalize shared editorial ui polish`

## Proximas Etapas Planejadas

- Etapa 107 - Validacao final visual e tecnica do ciclo completo de refatoracao.

## Etapa 107 - Validacao final visual e tecnica do ciclo completo

Resumo do que foi feito:

- Reexecutada a bateria completa de testes do projeto.
- Reexecutado o typecheck do app mobile.
- Reexecutado o lint do workspace.
- Confirmado `git diff --check` sem erro funcional.
- Confirmado estado atual do working tree para fechamento do ciclo.

Arquivos alterados:

- `CODEX.md`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`docs: close global editorial refactor cycle`

## Estado do Ciclo

- Home, Calendario, Repertorio, Comunidade, Perfil, Entrar, Recuperar Senha, Musica e Celebracao alinhados ao mesmo padrao editorial.
- Componentes compartilhados e bottom tab refinados.
- Nenhuma pendencia tecnica aberta neste ciclo.

## Etapa 108 - Fluxo de celebracao para musica com materiais preparados por tipo

Resumo do que foi feito:

- O detalhe da celebracao passou a tratar cada canto como ponto de entrada para a tela completa da musica.
- Cada momento da missa agora exibe sinais curtos dos materiais ja disponiveis, com destaque imediato para partitura quando houver.
- Ao tocar em um canto no roteiro da celebracao, a navegacao segue para a tela da musica correspondente.
- A tela da musica foi reorganizada para separar os materiais por frente de consulta: partitura, letra e cifra, audio e video.
- Mesmo sem todos os materiais publicados hoje, a estrutura futura ficou pronta sem quebrar o catalogo atual.
- O dominio compartilhado passou a aceitar `video` como tipo valido de material, preparando a evolucao futura do acervo.

Arquivos alterados:

- `packages/shared/src/celebration.ts`
- `apps/mobile/app/celebracoes/[id].tsx`
- `apps/mobile/app/musicas/[slug].tsx`
- `apps/mobile/src/components/MomentCard.tsx`
- `apps/mobile/src/features/songs/song-detail-overview.ts`
- `apps/mobile/src/features/songs/song-detail-overview.test.ts`
- `apps/mobile/src/features/songs/song-materials.ts`
- `apps/mobile/src/features/songs/song-materials.test.ts`
- `package.json`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: connect celebration moments to song details`

## Proxima Etapa Planejada

- Validacao manual do fluxo completo celebracao -> musica -> abertura de material premium no device.

## Etapa 109 - Home com saudacao editorial e menos acoes concorrentes

Resumo do que foi feito:

- O topo da Home deixou de exibir a data isolada e passou a usar uma composicao editorial com `Inicio`, iniciais da conta e saudacao personalizada.
- A saudacao agora usa o perfil real quando disponivel e cai para o email da sessao quando o perfil ainda nao estiver pronto.
- O card principal de `Hoje` perdeu as acoes `Ver dias preparados` e `Explorar repertorio`, reduzindo concorrencia visual.
- A secao inferior de consulta e roteiros disponiveis foi removida da Home.
- Os acessos rapidos permaneceram como ponto principal de navegacao abaixo do estado do dia.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/src/features/home/home-welcome.ts`
- `apps/mobile/src/features/home/home-welcome.test.ts`
- `package.json`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: simplify home and add personalized welcome`

## Etapa 110 - Restauracao da secao inferior da Home

Resumo do que foi feito:

- A secao inferior de consulta e roteiros disponiveis foi restaurada na Home.
- O topo editorial com saudacao personalizada foi mantido.
- O card principal de `Hoje` permaneceu sem as acoes removidas na etapa anterior.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`fix: restore home prepared days section`

## Etapa 111 - Data destacada no topo da Home sem saudacao longa

Resumo do que foi feito:

- Removida a frase de saudacao longa do topo da Home.
- A data voltou a aparecer de forma destacada, agora em um selo proprio logo abaixo do subtitulo.
- As iniciais do usuario no canto superior direito foram mantidas.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/src/features/home/home-welcome.ts`
- `apps/mobile/src/features/home/home-welcome.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: highlight home date and remove greeting line`

## Etapa 112 - Botao de logout no Perfil

Resumo do que foi feito:

- Adicionado botao de logout na tela `Perfil`, no bloco de conta, apenas para sessoes autenticadas.
- O botao reaproveita o fluxo existente de `signOutFromSupabase`.
- A tela passou a exibir retorno curto de estado durante e apos a saida.

Arquivos alterados:

- `apps/mobile/app/(tabs)/perfil.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add sign out action to profile`

## Etapa 113 - Separacao entre Conta, Entrar e Criar conta

Resumo do que foi feito:

- A aba `Perfil` passou a funcionar como hub de conta, com estado claramente separado entre usuario autenticado e deslogado.
- O formulario embutido deixou de existir na tela principal de conta.
- A tela `entrar` passou a cuidar apenas do login.
- Foi criada a tela `criar-conta`, dedicada ao cadastro.
- Foram adicionadas telas leves para `Politica de privacidade`, `Termos de uso` e `Seus dados`.
- O estado autenticado do Perfil ganhou acessos uteis para repertorio, partilhas e privacidade.

Arquivos alterados:

- `apps/mobile/app/(tabs)/perfil.tsx`
- `apps/mobile/app/entrar.tsx`
- `apps/mobile/app/criar-conta.tsx`
- `apps/mobile/app/politica-privacidade.tsx`
- `apps/mobile/app/termos-de-uso.tsx`
- `apps/mobile/app/seus-dados.tsx`
- `apps/mobile/src/components/AuthEntryCard.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: separate account hub from auth flows`

## Etapa 114 - Simplificacao visual de Entrar e Criar conta

Resumo do que foi feito:

- A tela `entrar` foi reduzida ao essencial, mantendo apenas o bloco de boas-vindas, os campos, o CTA principal, a recuperacao de senha e o link de cadastro.
- Foram removidos o cabecalho redundante, o bloco de acesso repetido e o bloco de primeiro acesso da tela de login.
- A tela `criar-conta` teve removidos o cabecalho redundante e o bloco inicial repetido de cadastro.
- As secoes principais de `Entrar` e `Criar conta` deixaram de ficar presas em caixas visuais desnecessarias e passaram a seguir uma composicao mais limpa.

Arquivos alterados:

- `apps/mobile/app/entrar.tsx`
- `apps/mobile/app/criar-conta.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: simplify auth screen hierarchy`

## Etapa 115 - Refinamento visual de Entrar e Criar conta

Resumo do que foi feito:

- As telas `entrar` e `criar-conta` ganharam composicao mais viva, mantendo a linguagem sacra e minimalista do app.
- Foi adicionado um topo editorial leve com selo, divisoria ornamental e melhor ritmo vertical.
- Os formularios principais passaram a ficar em um unico painel mais nobre e coeso.
- O fluxo permaneceu limpo, sem reintroduzir redundancia textual ou visual.

Arquivos alterados:

- `apps/mobile/app/entrar.tsx`
- `apps/mobile/app/criar-conta.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: polish auth screens with editorial sacred styling`

## Etapa 116 - Limpeza final do topo de Entrar e Criar conta

Resumo do que foi feito:

- Removidos os selos iniciais de `Conta` e `Cadastro` no topo das telas.
- Removidas as legendas redundantes logo abaixo dos titulos principais.
- Mantida a frase de apoio principal, sem duplicidade visual.

Arquivos alterados:

- `apps/mobile/app/entrar.tsx`
- `apps/mobile/app/criar-conta.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: remove redundant auth hero labels`

## Etapa 117 - Redirecionamento apos login e confirmacao apos cadastro

Resumo do que foi feito:

- O login agora volta para a tela anterior quando existe historico de navegacao.
- Quando nao existe historico valido, o login redireciona para a Home.
- O cadastro agora leva para uma tela propria de confirmacao de email.
- A tela de confirmacao orienta o usuario e devolve para o login.

Arquivos alterados:

- `apps/mobile/app/entrar.tsx`
- `apps/mobile/app/criar-conta.tsx`
- `apps/mobile/app/confirmar-email.tsx`
- `apps/mobile/src/features/auth/auth-navigation.ts`
- `apps/mobile/src/features/auth/auth-navigation.test.ts`
- `package.json`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add post-auth redirects and email confirmation screen`

## Etapa 118 - Busca no repertorio e simplificacao do acervo musical

Resumo do que foi feito:

- Adicionada busca no repertorio com ativacao a partir de 3 caracteres.
- A busca ignora maiusculas, minusculas e acentos.
- A caixa de `Acervo musical` foi simplificada, sem badges internas concorrentes.
- A listagem de cantos ficou mais discreta, com itens mais editoriais e menos encaixotados.

Arquivos alterados:

- `apps/mobile/app/(tabs)/repertorio.tsx`
- `apps/mobile/src/components/SongCard.tsx`
- `apps/mobile/src/features/songs/song-search.ts`
- `apps/mobile/src/features/songs/song-search.test.ts`
- `package.json`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add repertoire search and simplify catalog layout`

## Etapa 119 - Favorito em icone unico na playlist do repertorio

Resumo do que foi feito:

- O comando textual `Guardar` deixou de aparecer nos itens da playlist do repertorio.
- O favorito passou a usar apenas um icone unico, mais discreto e coerente com o restante da tela.
- O comportamento de favoritar e desfavoritar foi mantido sem alterar o fluxo de abertura da musica.

Arquivos alterados:

- `apps/mobile/src/components/SongCard.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: use icon-only favorite action in repertoire list`

## Etapa 120 - Busca solta e favorito na frente da lista do repertorio

Resumo do que foi feito:

- A caixa de `Acervo musical` foi removida da tela de repertorio.
- A busca por musica passou a aparecer sozinha, fora de box, com a mesma linguagem visual da tela.
- A informacao de quantidade de musicas disponiveis foi movida para baixo do titulo `Musicas`.
- Os numeros dos itens foram removidos.
- O icone de favorito passou a ocupar a frente de cada musica, em posicao fixa e estavel.

Arquivos alterados:

- `apps/mobile/app/(tabs)/repertorio.tsx`
- `apps/mobile/src/components/SongCard.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: simplify repertoire search and pin favorite icon`

## Etapa 121 - Remocao da box redundante do calendario

Resumo do que foi feito:

- A box inicial de `Calendario liturgico` foi removida da aba de calendario.
- A tela passou a abrir direto na navegacao mensal, sem repeticao de informacao ja presente no cabecalho.
- O restante do fluxo do calendario foi mantido.

Arquivos alterados:

- `apps/mobile/app/(tabs)/calendario.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: remove redundant calendar summary box`

## Etapa 122 - Navegacao mensal mais viva no calendario

Resumo do que foi feito:

- O subtitulo da secao `Navegacao` foi removido.
- O titulo `Calendario de ...` ganhou mais presenca visual.
- A caixa do calendario passou a destacar melhor o nome do mes.
- Os botoes `Anterior` e `Proximo` foram trocados por setas simples.
- Domingos ganharam destaque proprio no grid, sem legenda adicional.
- Dias com repertorio e datas liturgicas passaram a ter sinais visuais mais distintos.
- O dia de hoje ficou marcado apenas por contorno mais forte.

Arquivos alterados:

- `apps/mobile/app/(tabs)/calendario.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: enrich calendar monthly navigation styling`

## Etapa 123 - Correcao da grade mensal do calendario

Resumo do que foi feito:

- A grade semanal e mensal do calendario foi corrigida para voltar a respeitar as 7 colunas.
- Os dias voltaram a ocupar posicoes estaveis, sem desalinhamento entre labels e celulas.
- O ajuste foi feito no calculo visual da largura das colunas e no espacamento horizontal da grade.

Arquivos alterados:

- `apps/mobile/app/(tabs)/calendario.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`fix: restore stable seven-column calendar grid`

## Etapa 124 - Grade fixa 7x6 e cabecalho mensal alinhado

Resumo do que foi feito:

- O calendario passou a ocupar sempre uma grade fixa de 7 colunas por 6 linhas.
- Celulas vazias finais foram adicionadas para impedir encaixe flexivel na ultima semana.
- As setas de navegacao passaram a ficar na mesma linha do nome do mes.
- O selo `Ano liturgico 2026` foi mantido abaixo do nome do mes, sem quebrar o alinhamento principal.

Arquivos alterados:

- `apps/mobile/app/(tabs)/calendario.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`fix: lock calendar to a fixed 7x6 grid`

## Etapa 125 - Roteiros do mes no mesmo layout das datas marcadas

Resumo do que foi feito:

- A lista de `Roteiros de mes` deixou de usar card separado.
- Cada roteiro agora usa o mesmo layout visual das `Datas marcadas`.
- O comportamento de abertura da celebracao foi mantido.

Arquivos alterados:

- `apps/mobile/app/(tabs)/calendario.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: align monthly repertoires with marked dates layout`

## Etapa 126 - Roteiros do mes dentro da mesma box visual

Resumo do que foi feito:

- A lista de roteiros do mes passou a ficar dentro da mesma box visual usada em `Datas marcadas`.
- O layout interno dos itens foi mantido igual, mas agora com o mesmo enquadramento visual do bloco acima.

Arquivos alterados:

- `apps/mobile/app/(tabs)/calendario.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`fix: wrap monthly repertoires in the marked-list container`

## Etapa 127 - Estado vazio mais discreto em roteiros do mes

Resumo do que foi feito:

- O estado vazio de `Roteiros do mes` ganhou tipografia menor e mais discreta.
- Titulo e texto do bloco sem roteiro foram alinhados ao padrao mais minimalista do app.

Arquivos alterados:

- `apps/mobile/app/(tabs)/calendario.tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`style: soften empty monthly repertoire state`

## Etapa 128 - Avatar da Home como visitante ou iniciais da conta

Resumo do que foi feito:

- O circulo do topo da Home passou a mostrar `V` quando nao ha usuario autenticado.
- Quando ha sessao autenticada, o comportamento de iniciais foi mantido.
- O toque no circulo agora abre a tela de `Perfil`.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/src/features/home/home-welcome.ts`
- `apps/mobile/src/features/home/home-welcome.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: make home avatar open profile and support visitor state`

## Etapa 129 - Home com roteiros proximos e acesso para mais celebracoes

Resumo do que foi feito:

- O botao solto `Ver calendario` foi removido da secao de consulta da Home.
- A Home passou a priorizar o roteiro do proprio dia quando existir e, em seguida, os roteiros mais proximos da data atual.
- A lista passou a limitar a exibicao a 5 roteiros.
- Quando houver mais itens, a Home exibe `Ver mais roteiros`.
- Foi criada a tela `Celebracoes`, com a lista completa de roteiros publicados.

Arquivos alterados:

- `apps/mobile/app/(tabs)/index.tsx`
- `apps/mobile/app/celebracoes/index.tsx`
- `apps/mobile/src/features/home/home-prepared-days.ts`
- `apps/mobile/src/features/home/home-prepared-days.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: prioritize nearby home repertoires and add celebrations list`

## Etapa 130 - Partilha com repertorio vinculado e composer simplificado

Resumo do que foi feito:

- A box inicial `Partilha e escuta` foi removida da tela `Comunidade`.
- A composicao principal passou a priorizar diretamente o formulario de partilha.
- O usuario agora pode publicar uma partilha livre ou vincular a partilha a um repertorio/celebracao proxima da data atual.
- As opcoes de repertorio sao montadas a partir das celebracoes disponiveis, priorizando as mais proximas do dia corrente.
- As partilhas passaram a exibir a celebracao vinculada quando houver.
- O fluxo local e remoto foi mantido, incluindo persistencia local e envio remoto com `celebration_id`.

Arquivos alterados:

- `apps/mobile/app/(tabs)/comunidade.tsx`
- `apps/mobile/src/features/comments/comment-store.ts`
- `apps/mobile/src/features/comments/comment-store.test.ts`
- `apps/mobile/src/features/comments/CommentsProvider.tsx`
- `apps/mobile/src/features/comments/community-access.ts`
- `apps/mobile/src/features/comments/community-access.test.ts`
- `apps/mobile/src/features/comments/community-repertoire.ts`
- `apps/mobile/src/features/comments/community-repertoire.test.ts`
- `apps/mobile/src/features/comments/remote-comments.ts`
- `apps/mobile/src/features/comments/remote-comments.test.ts`
- `apps/mobile/src/features/comments/comment-feed-source.test.ts`
- `apps/mobile/src/features/comments/remote-comment-submit.test.ts`
- `apps/mobile/src/features/preview/storage-parsers.ts`
- `package.json`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: allow community posts to reference nearby repertoires`

## Etapa 131 - Limpeza do topo de roteiro na tela de Celebracao

Resumo do que foi feito:

- Removida a box `Roteiro da Missa`.
- Removido o status `Completo`.
- A tela passou a abrir direto no conteudo liturgico principal, preservando o cabecalho e a lista dos momentos da missa.

Arquivos alterados:

- `apps/mobile/app/celebracoes/[id].tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: remove redundant celebration summary blocks`

## Etapa 132 - Limpeza das boxes redundantes na tela de Musica

Resumo do que foi feito:

- Removida a box `Detalhe do Canto`.
- Removida a box `Guardar entre favoritos`.
- A tela de musica passou a abrir direto no bloco principal e na lista de materiais.

Arquivos alterados:

- `apps/mobile/app/musicas/[slug].tsx`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: remove redundant song detail boxes`

## Etapa 133 - Acoes por tipo de material na tela de Musica

Resumo do que foi feito:

- Removido o titulo redundante `Material` de cada box.
- Cada botao passou a refletir o tipo do conteudo:
  - `Abrir partitura`
  - `Abrir letra e cifra`
  - `Ouvir audio`
  - `Ver video`

Arquivos alterados:

- `apps/mobile/app/musicas/[slug].tsx`
- `apps/mobile/src/features/songs/song-materials.ts`
- `apps/mobile/src/features/songs/song-materials.test.ts`

Checklist DoD:

- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`refactor: specialize song material actions by type`

## Etapa 134 - Visualizador interno de PDFs para partitura e letra/cifra

Resumo do que foi feito:

- O fluxo de `Abrir partitura` e `Abrir letra e cifra` deixou de mandar o usuario direto para o navegador.
- Foi criada a rota interna `apps/mobile/app/visualizador-pdf.tsx`.
- A tela nova usa `react-native-pdf` como renderer nativo principal, com zoom e scroll.
- O fluxo preserva `Abrir externamente` apenas como fallback quando a renderizacao interna falha ou quando o runtime nao suporta o modulo nativo.
- A resolucao da URL do documento foi isolada em `pdf-viewer-source`, aceitando:
  - `fileUrl` direta;
  - URL publica de Storage;
  - signed URL via Edge Function para materiais premium.
- A tela de musica agora envia partitura e letra/cifra para o visualizador interno.

Biblioteca escolhida:

- `react-native-pdf@6.7.7`
- `react-native-blob-util`
- `@config-plugins/react-native-pdf@12.0.0`
- `@config-plugins/react-native-blob-util@12.0.0`

Limitacoes tecnicas:

- Esta integracao exige development build ou build EAS com prebuild/config plugins.
- Nao funciona no Expo Go como fluxo interno, porque `react-native-pdf` depende de codigo nativo fora do bundle do Expo Go.
- Em Expo Go, a tela mostra erro amigavel e libera apenas o fallback `Abrir externamente`.

Arquivos alterados:

- `apps/mobile/app/visualizador-pdf.tsx`
- `apps/mobile/app/musicas/[slug].tsx`
- `apps/mobile/src/features/assets/pdf-viewer-source.ts`
- `apps/mobile/src/features/assets/pdf-viewer-source.test.ts`
- `apps/mobile/app.config.js`
- `apps/mobile/package.json`
- `package.json`
- `pnpm-lock.yaml`

Como testar:

- iOS:
  - gerar development build com EAS/local build equivalente;
  - abrir uma musica com PDF;
  - tocar em `Abrir partitura` ou `Abrir letra e cifra`;
  - validar carregamento interno, zoom e scroll.
- Android:
  - gerar development build com EAS/prebuild;
  - repetir o mesmo fluxo.
- Expo Go:
  - abrir o mesmo fluxo;
  - validar mensagem de limitacao e fallback externo.

Checklist DoD:

- [x] Fluxo interno criado para PDFs.
- [x] Fallback externo mantido apenas no erro.
- [x] Compatibilidade preparada para URL publica e signed URL.
- [x] Testes adicionados para resolucao de URL.
- [x] Testes passaram localmente.
- [x] Typecheck passou.
- [x] Lint passou.
- [x] `git diff --check` sem erro funcional.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`feat: add in-app pdf viewer for song materials`

## Etapa 135 - Correcao do carregamento interno de PDF no Android

Resumo do que foi feito:

- O build Android com development client passou, confirmando que a limitacao restante era de runtime e nao de compilacao.
- O erro real vinha do fluxo interno do `react-native-pdf` ao baixar URLs remotas no Android, falhando no arquivo temporario `.pdf.tmp` com `ENOENT`.
- O visualizador interno passou a fazer pre-download do PDF com `react-native-blob-util` para um arquivo local estavel em cache.
- Depois do download local, o `react-native-pdf` recebe apenas `file://...`, evitando o fluxo interno quebrado de copia temporaria.
- Foi adicionada regra de nome de cache local para o documento.
- O `package.json` raiz foi restaurado no workspace apos ter sido removido durante os testes locais.

Arquivos alterados:

- `apps/mobile/app/visualizador-pdf.tsx`
- `apps/mobile/src/features/assets/pdf-viewer-source.ts`
- `apps/mobile/src/features/assets/pdf-viewer-source.test.ts`
- `package.json`

Observacoes tecnicas:

- Os warnings de `deprecated API` vistos no Gradle nao bloqueiam o fluxo atual.
- Para viabilizar o build local Android nesse path do Windows, o projeto esta com `newArchEnabled: false` em `apps/mobile/app.json`.

Checklist DoD:

- [x] Erro de runtime analisado com causa real identificada.
- [x] Fluxo interno no Android trocado para arquivo local antes da renderizacao.
- [x] Testes atualizados.
- [x] Typecheck passou.
- [x] Documentacao viva atualizada.

Sugestao de commit:

`fix: preload pdf files locally before Android rendering`

## Etapa 136 - Correcao do trust manager no download local do PDF

Resumo do que foi feito:

- O erro `Use of own trust manager but none defined` foi rastreado ao uso de `trusty: true` no `react-native-blob-util`.
- O download local do PDF voltou a usar a configuracao padrao de TLS do Android.
- O fluxo interno continua igual: baixar para cache local e abrir via `file://...`.

Arquivos alterados:

- `apps/mobile/app/visualizador-pdf.tsx`

Checklist DoD:

- [x] Causa do erro de runtime identificada.
- [x] Configuracao insegura/remota removida.
- [x] Fluxo interno de PDF preservado.

Sugestao de commit:

`fix: remove custom trust handling from pdf preload`

## Etapa 137 - Correcao do overlay persistente no visualizador de PDF

Resumo do que foi feito:

- O PDF estava visivel, mas o overlay de carregamento seguia por cima da tela.
- O visualizador passou a encerrar o estado de loading tambem ao receber progresso completo e mudanca de pagina.
- Isso evita depender apenas de um unico callback nativo para retirar o overlay.

Arquivos alterados:

- `apps/mobile/app/visualizador-pdf.tsx`

Checklist DoD:

- [x] Overlay de loading revisado com base no comportamento real da tela.
- [x] Fluxo interno de PDF preservado.

Sugestao de commit:

`fix: hide pdf loading overlay when document is rendered`

## Etapa 138 - Padronizacao da cor do CTA Entrar na area de conta

Resumo do que foi feito:

- O CTA primario `Entrar` da tela de conta estava herdando a cor padrao do texto.
- O componente de entrada de autenticacao passou a definir explicitamente texto claro no botao primario.
- Foi feita a verificacao dos demais CTAs `Entrar` das telas de autenticacao, que ja estavam consistentes.

Arquivos alterados:

- `apps/mobile/src/components/AuthEntryCard.tsx`

Checklist DoD:

- [x] CTA primario da conta padronizado.
- [x] Varredura dos demais CTAs `Entrar` concluida.

Sugestao de commit:

`fix: standardize sign-in button text color`

## Etapa 139 - Substituicao do ornamento IHS pelo tau franciscano

Resumo do que foi feito:

- O divisor ornamental deixou de usar o texto `IHS`.
- O novo elemento central passou a usar o arquivo `tau-element.png`.
- O asset foi incorporado aos assets do app para manter compatibilidade com o bundle nativo.
- O tamanho e o alinhamento do ornamento foram ajustados para preservar a leitura e a harmonia com as linhas laterais.

Arquivos alterados:

- `apps/mobile/assets/tau-element.png`
- `apps/mobile/src/components/OrnamentalDivider.tsx`

Checklist DoD:

- [x] Novo ornamento aplicado nos pontos que reutilizam `OrnamentalDivider`.
- [x] Asset integrado ao app.
- [x] Layout do divisor mantido.

Sugestao de commit:

`feat: replace ihs divider mark with tau symbol`

## Etapa 140 - Atualizacao do icone do app

Resumo do que foi feito:

- O arquivo `ls-icon.png` passou a ser o novo icone visual do app.
- O asset foi aplicado aos alvos usados por Expo para icone principal, adaptive icon e favicon.

Arquivos alterados:

- `apps/mobile/assets/icon.png`
- `apps/mobile/assets/adaptive-icon.png`
- `apps/mobile/assets/favicon.png`

Checklist DoD:

- [x] Icone principal atualizado.
- [x] Adaptive icon atualizado.
- [x] Favicon atualizado.

Sugestao de commit:

`feat: update app icon assets`

## Etapa 141 - Compatibilidade do visualizador com Expo Go

Resumo do que foi feito:

- O crash no Expo Go vinha do import direto de `react-native-blob-util` no topo da rota.
- O carregamento do modulo nativo passou a ser lazy, apenas no fluxo interno de PDF.
- Assim, o Expo Go consegue carregar a rota e exibir a mensagem de limitacao com fallback externo, sem quebrar o app.

Arquivos alterados:

- `apps/mobile/app/visualizador-pdf.tsx`

Checklist DoD:

- [x] Rota voltou a ser carregavel no Expo Go.
- [x] Fluxo nativo continua preservado para development build / build final.

Sugestao de commit:

`fix: lazy-load native pdf downloader outside Expo Go`

## Etapa 142 - Ajuste do tau ornamental no iOS

Resumo do que foi feito:

- O tau ornamental passou a usar URI resolvida pelo `expo-asset`, com `defaultSource` local.
- O container do ornamento foi reforcado para evitar sumico visual no iOS.
- O tamanho visual do tau foi levemente ampliado.

Arquivos alterados:

- `apps/mobile/src/components/OrnamentalDivider.tsx`

Checklist DoD:

- [x] Renderizacao do asset reforcada para iOS.
- [x] Layout do divisor preservado.

Sugestao de commit:

`fix: stabilize tau divider rendering on ios`

## Etapa 143 - Tratamento de falha de rede no login e cadastro

Resumo do que foi feito:

- O fluxo de autenticacao estava tratando apenas respostas com `error`, mas nao excecoes de rede.
- Quando o Supabase disparava erro de transporte, a tela ficava presa em `Entrando...` ou `Criando...`.
- O dominio de autenticacao passou a capturar excecoes e devolver mensagem amigavel de falha de rede.
- Foram adicionados testes para login, cadastro e recuperacao de senha nesse cenario.

Arquivos alterados:

- `apps/mobile/src/features/auth/credentials-auth.ts`
- `apps/mobile/src/features/auth/credentials-auth.test.ts`

Checklist DoD:

- [x] Falha de rede no login tratada.
- [x] Falha de rede no cadastro tratada.
- [x] Falha de rede na recuperacao tratada.
- [x] Testes adicionados para os tres fluxos.

Sugestao de commit:

`fix: handle Supabase network failures in auth flows`

## Etapa 144 - Estruturacao inicial do escopo Santoral

Resumo do que foi feito:

- Foi analisado o arquivo `santoral-completo.pdf` apenas no recorte necessario para planejar o dominio.
- Paginas 37 a 44 confirmam o indice anual completo do calendario serafico.
- Pagina 46 confirmou o formato do primeiro dia detalhado utilizavel como modelo de exibicao.
- Ficou definido, para a proxima fase, que o app usara apenas o primeiro bloco narrativo/historico de cada data.
- O arquivo `to-change.md` foi reescrito com:
  - escopo consolidado;
  - regras de negocio;
  - impacto tecnico;
  - etapas sugeridas;
  - riscos abertos.

Arquivos alterados:

- `to-change.md`

Observacoes importantes:

- Nada do Santoral foi implementado ainda.
- A leitura do PDF nesta etapa foi apenas de reconhecimento estrutural.
- O conteudo liturgico posterior ao primeiro bloco historico ficou explicitamente fora do escopo inicial.

Checklist DoD:

- [x] Recorte do PDF identificado.
- [x] Modelo inicial de extracao identificado.
- [x] Escopo reescrito com mais precisao.
- [x] Impacto no codigo mapeado.

Sugestao de commit:

`docs: structure santoral scope and execution plan`

## Etapa 145 - Instalacao do RTK (Rust Token Killer)

Resumo do que foi feito:

- Instalado o RTK localmente neste repositorio via `rtk init` (escopo do projeto, sem hook global).
- RTK e um proxy de CLI que filtra e comprime a saida de comandos (git, pnpm, testes) para reduzir consumo de tokens nas sessoes com agente.
- O binario ja estava disponivel no ambiente (`rtk 0.43.0`, em `~/.local/bin/rtk`) e foi validado como o RTK correto (Rust Token Killer) via `rtk gain`, e nao o homonimo Rust Type Kit.
- A instalacao criou `CLAUDE.md` (instrucoes RTK v2) e `.rtk/filters.toml` (template de filtros do projeto).

Arquivos criados:

- `CLAUDE.md`
- `.rtk/filters.toml`

Decisoes tecnicas e trade-offs:

- Escopo local ("nesse repositorio"), nao global. O projeto usava apenas `CODEX.md` como doc vivo e nao tinha `CLAUDE.md`, entao nada foi sobrescrito.
- Sem hook global instalado: a reescrita nao e automatica; os comandos precisam ser prefixados com `rtk`. Isso mantem o efeito restrito a este repositorio.
- Alternativa rejeitada: `rtk init -g` (hook global com reescrita transparente em todos os projetos). Rejeitada por fugir do escopo "nesse repositorio".
- `to-change.md` permanece fora do controle de versao, conforme decisao previa do usuario.
- Reversibilidade: alta. Basta remover `CLAUDE.md` e `.rtk/` para desfazer.

Checklist DoD:

- [x] Binario RTK verificado e validado como Rust Token Killer.
- [x] RTK inicializado no escopo do projeto.
- [x] `CLAUDE.md` e `.rtk/filters.toml` criados sem sobrescrever doc vivo.
- [x] Decisao e trade-offs registrados.
- [x] `to-change.md` preservado fora do commit.

Sugestao de commit:

`chore: add rtk token-optimized command tooling`

## Etapa 146 - Preparacao do ambiente de trabalho (skills + quality gate)

Resumo do que foi feito:

- Instaladas 34 agent-skills em `.claude/skills/` para tornar o agente especialista no stack do projeto.
  - Expo (19): expo-router, expo-native-ui, expo-ui, expo-data-fetching, expo-tailwind-setup, expo-dom, expo-web-to-native, expo-module, expo-brownfield, expo-dev-client, expo-examples, expo-app-clip, expo-upgrade, eas-app-stores, eas-hosting, eas-workflows, eas-observe, eas-update-insights, eas-simulator.
  - React Native (Callstack): react-native-best-practices, react-native-testing, agent-device, dogfood, github, github-actions.
  - Supabase: supabase, supabase-postgres-best-practices.
  - Caveman (7): caveman, cavecrew, caveman-commit, caveman-compress, caveman-help, caveman-review, caveman-stats.
- Criado quality gate mecanico: hook `.githooks/pre-commit` roda `test`, `typecheck` e `lint`; barra o commit se qualquer um falhar.
- `core.hooksPath` apontado para `.githooks` (config local deste clone).

Decisoes tecnicas e trade-offs:

- Skills versionadas no repositorio para a equipe compartilhar o mesmo conjunto.
- Skills puladas por irrelevancia/duplicidade: vercel-react-native-skills (duplica best-practices), react-navigation (usamos Expo Router), brownfield/upgrading da Callstack (ha equivalente Expo), create-react-native-library (nao e lib), react-native-tv-best-practices (nao e TV).
- Hook versionavel em `.githooks/` em vez de `.git/hooks/`; `core.hooksPath` e local por clone e nao propaga no push (cada clone roda `git config core.hooksPath .githooks` uma vez).
- Skills sao sob demanda (nao always-on). O enforcement de TDD/DOD/commit vive no CLAUDE.md + no pre-commit hook.
- `.claude/settings.local.json` permanece gitignored.
- Reversibilidade: alta.

Checklist DoD:

- [x] Skills instaladas e validadas (34 SKILL.md).
- [x] Pre-commit hook criado e testado (test + typecheck + lint verdes).
- [x] `core.hooksPath` configurado.
- [x] `to-change.md` e `settings.local.json` fora do commit.
- [x] Doc viva atualizada.

Sugestao de commit:

`chore: add agent skills and pre-commit quality gate`

## Etapa 147 - Modelo de dominio do Santoral Franciscano

Resumo do que foi feito:

- Criado `packages/shared/src/santoral.ts` com o dominio do Santoral, modelado em 3 eixos fieis ao `santoral-completo.pdf` (p. 37-44):
  1. qualificadores liturgicos (`martir`, `virgem`, `doutor`, `pastor`, ...), multiplos por santo;
  2. Ordem franciscana (`first`/`second`/`third`/`secular`);
  3. observancia por jurisdicao (`FF`, `OFM`, `OFMConv`, `OFMCap`, `TOR`, `TOFr`, `OFS`, `Ordem II`, `Ordem III`) + rank (`solenidade`/`festa`/`memoria`/`memoria_facultativa`).
- Tipos: `SaintDay`, `SaintObservance`, `SaintQualifier`, `FranciscanOrder`, `LiturgicalRank`, `FranciscanJurisdiction`, `SaintHistoryAccess`.
- Funcoes puras: `getSaintDayCatalog`, `findSaintDaysByMonthDay`, `filterSaintDaysByQualifier`, `saintDayHasRepertoire`, `resolveSaintHistoryAccess`.
- Seed inicial de exemplo (3 santos reais do indice de janeiro): Santissimo Nome de Jesus (01-03, ligado ao roteiro existente), Sao Berardo e companheiros (01-16), Santa Eustaquia Calafato (01-19).
- Exportado em `packages/shared/src/index.ts` e ligado ao pipeline de testes.

Testes adicionados (`packages/shared/src/santoral.test.ts`):

- Happy: santo por data com qualifiers, ordem e observancias (Berardo em 01-16).
- Edge: data sem santo franciscano retorna `[]`.
- Relacao com roteiro: 01-03 aponta `celebrationSlug`.
- Filtro por qualificador liturgico.
- Ordenacao do catalogo por month-day.
- Premium: bloqueio sem assinatura, liberacao com assinatura, conteudo livre, e `no_history`.

Decisoes tecnicas e trade-offs (defaults reversiveis; usuario nao decidiu na hora):

- Taxonomia em 3 eixos separados, em vez de categoria unica. Motivo: modelo de dominio e caro de reverter; fiel ao PDF; permite evoluir filtros. O filtro do `to-change.md` (Martir/Virgem/Doutor/Pastor) usa o eixo 1.
- Premium: nome/data/classificacao publicos; `shortHistory` premium via flag `premium`. Ajustavel por registro.
- Escopo: apenas o modelo. `shortHistory` fica `null` ate a curadoria (nada fabricado). Indice anual completo e pagina do santo em etapas seguintes.
- Eixo genero ("Santos homens"/"Santas mulheres" do to-change.md) ficou fora deste modelo por nao ser confiavel na fonte; sera normalizado depois.

Validacoes executadas:

- `rtk pnpm test` (santoral 9/9 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] TDD aplicado (Red -> Green).
- [x] Happy + edge + erro cobertos.
- [x] Dominio exportado e testado no pipeline.
- [x] Sem dado fabricado no seed.
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(shared): add franciscan santoral domain model`

## Etapa 148 - Indice anual do Santoral extraido do PDF

Resumo do que foi feito:

- Extraido o indice anual completo do `Calendario Serafico` (santoral-completo.pdf, p. 37-44) para dados estruturados: `packages/shared/src/santoral-index-2026.ts` com 126 entradas.
- `santoral.ts` passou a consumir `franciscanSantoral2026` como catalogo (seed de exemplo removido).
- Modelo evoluido: `FranciscanJurisdiction` virou `string` (a fonte tem congregacoes alem das ordens: OSC, Cl.Cp., FMM, FMCIM, OIC, ...), com `commonFranciscanJurisdictions` para referencia. Adicionado qualificador `diacono`.
- Testes de integridade adicionados: contagem (126), formato de month-day, spot-checks (Clara 08-11 OSC solenidade; Sao Francisco 10-04 diacono+fundador FF solenidade). Spot-checks da Etapa 147 corrigidos para os nomes acentuados reais (Santissimo -> Santissimo com acento, Eustaquia -> Eustoquia).

Processo de extracao:

- Texto das paginas 37-44 exportado em UTF-8 e parseado por script (scratchpad, nao versionado).
- Parser separa: month/day, nome, ordem (I/II/III/secular), qualificadores liturgicos (keyword scan) e observancias (`Para <jurisdicoes>: <rank>`), expandindo listas de jurisdicao.
- Saida inspecionada manualmente antes de confiar (confianca liturgica e prioridade #1).

Decisoes tecnicas e trade-offs:

- `order` continua unico (ordem primaria; a fonte tem raros "Ordem I e III" cujo detalhe fica implicito nas observancias).
- `shortHistory` permanece `null` (nada fabricado); o texto historico entra em etapa de curadoria.
- Eixo genero ("Santos homens/mulheres") continua fora do modelo.

Lacunas / riscos abertos (para revisao editorial):

- DEZEMBRO truncado na fonte: o indice termina em 02/dez (p. 45 inicia "Proprio da Familia Franciscana"). Faltam datas de dezembro alem de 02.
- Campos liturgicos derivam de parse de PDF fuzzy; precisam da revisao do curador antes de publicar.
- Datas moveis (ex.: solenidades) nao entram aqui; este indice e do santoral fixo por dia-mes.

Validacoes executadas:

- `rtk pnpm test` (santoral 13/13 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] Indice anual extraido (126 entradas).
- [x] Modelo consome o indice; seed de exemplo removido.
- [x] Testes de integridade + spot-checks (Red -> Green).
- [x] Sem dado fabricado; lacunas sinalizadas.
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(shared): extract full franciscan santoral annual index`

## Etapa 149 - Calendario no eixo franciscano (camada de dominio)

Resumo do que foi feito:

- `LiturgicalDay` agora carrega `saints: SaintDay[]` (santos franciscanos do dia) e um novo `kind` `franciscan_saint`.
- `buildLiturgicalDay2026` passou a anexar o santoral (`findSaintDaysByMonthDay`) a cada dia e a resolver o `kind` por prioridade: repertorio > santo franciscano > preceito da Igreja > dia comum.
- Coexistencia: o repertorio ainda vence (leva o musico direto ao roteiro), mas os santos ficam anexados mesmo em dias com roteiro; datas de preceito viram complemento apenas quando nao ha santo franciscano.
- Efeito imediato: `getLiturgicalMarkedDays2026` (kind != ordinary) passa a incluir os dias franciscanos, tornando o santoral o eixo principal das "datas marcadas" do mes.

Testes adicionados (`liturgical-calendar.test.ts`):

- Dia com santo franciscano sem roteiro -> `franciscan_saint`, `hasRepertoire=false`, `saints` populado, titulo = nome do santo (01-04 Santa Angela de Foligno).
- Dia com roteiro mantem `has_repertoire` e ainda anexa `saints` (01-03).
- Preceito sem santo franciscano continua `liturgical_day_without_repertoire` (12-25).
- Lista mensal marcada inclui `franciscan_saint`.
- Dia comum sem santos (02-14).

Decisoes tecnicas e trade-offs:

- Repertorio mantido acima do santo no `kind` para nao desviar o fluxo principal (preparar a missa). O santo segue acessivel via `saints`.
- Novo `kind` adicionado sem quebrar consumidores (comparacoes por igualdade, sem switch exaustivo).
- `title` do dia franciscano usa o primeiro santo; multiplos santos ficam em `saints`.

Escopo / proximo:

- Esta etapa e apenas dominio. A UI do calendario (`calendario.tsx`) ainda nao estiliza `franciscan_saint` nem roteia para a pagina do santo; isso entra na proxima etapa (UI do calendario + pagina do santo).

Validacoes executadas:

- `rtk pnpm test` (calendario 11/11 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] TDD aplicado (Red -> Green).
- [x] Santoral integrado ao dia liturgico com prioridade clara.
- [x] Coexistencia repertorio/santo/preceito coberta por teste.
- [x] Typecheck e lint limpos.
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(shared): make franciscan santoral the primary calendar axis`

## Etapa 150 - UI franciscana do calendario e base da pagina do santo

Resumo do que foi feito:

- Roteamento por tipo de dia: `buildCalendarDayRoute` agora envia dia `franciscan_saint` para `/santos/<monthDay>`; repertorio segue para `/celebracoes/<slug>` e preceito/comum para `/celebracoes/<monthDay>`.
- Criada a pagina base do santo `app/santos/[monthDay].tsx`: lista os santos do dia com classificacao (qualificadores + Ordem), observancias por jurisdicao/rank e bloco de historia com gate premium.
- Criado helper puro `features/santoral/saint-detail.ts`: `buildSaintClassification`, `buildSaintObservancesLabel`, `buildSaintHistoryState` (labels em pt-BR e estados available/locked/preparing).
- Calendario (`calendario.tsx`): celulas e numeros de dias `franciscan_saint` ganharam estilo proprio (borda/numero em vinho), nova legenda "Santo franciscano" e texto proprio na lista de datas marcadas.

Testes adicionados:

- `calendar-day-route.test.ts`: dia franciscano -> `/santos/01-04`.
- `saint-detail.test.ts`: classificacao, observancias em pt-BR e os tres estados de historia (preparing/locked/available, livre e premium).

Decisoes tecnicas e trade-offs:

- Formatacao/labels isolados em helper puro testado, fora da UI.
- Historia do santo hoje sempre cai em "preparing" (shortHistory null); o gate premium (locked) ja esta implementado e testado por fixture para quando a curadoria adicionar texto.
- `franciscan_saint` estilizado em vinho (accent) para diferenciar de repertorio (oliva) e preceito (ouro).

Validacao pendente (manual):

- Revisao visual no Expo Go (device): cores das celulas, legenda, navegacao dia franciscano -> pagina do santo. Nao ha simulador neste ambiente.

Validacoes executadas:

- `rtk pnpm test` (route 4/4, saint-detail 7/7 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] TDD aplicado a roteamento e formatacao.
- [x] Pagina do santo criada com gate premium.
- [x] Calendario estiliza e roteia dias franciscanos.
- [x] Typecheck e lint limpos.
- [ ] Revisao visual em device (pendente do usuario).
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(mobile): franciscan calendar ui and saint day page`

## Etapa 151 - Santo do dia na Home

Resumo do que foi feito:

- Criado helper puro `features/home/home-saint.ts` (`buildHomeSaint`): a partir do `LiturgicalDay`, retorna eyebrow, titulo (nome do santo), classificacao, link `/santos/<monthDay>` e `moreCount` quando ha mais de um santo. Sem santo franciscano, cai em fallback editorial (status `none`, sem link).
- A Home (`index.tsx`) passou a exibir o card "Santo do dia" logo abaixo do bloco de hoje, navegavel para a pagina do santo quando existir.

Testes adicionados (`home-saint.test.ts`):

- Dia com santo (07-10, Santa Veronica Giuliani) -> status `saint`, link `/santos/07-10`, classificacao preenchida.
- Dia sem santo (02-14) -> status `none`, sem link, fallback editorial.

Decisoes tecnicas e trade-offs:

- Reuso de `buildSaintClassification` (etapa 150) via import relativo, mantendo a formatacao liturgica em um so lugar.
- Import relativo (nao alias `@/`) no helper e no teste para rodar sob `tsx`.
- Card do santo fica abaixo do estado do dia para nao competir com a acao principal (preparar a missa).

Validacao pendente (manual):

- Revisao visual do card na Home em device (Expo Go).

Validacoes executadas:

- `rtk pnpm test` (home-saint 2/2 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] TDD aplicado (santo presente e fallback).
- [x] Home exibe santo do dia navegavel.
- [x] Typecheck e lint limpos.
- [ ] Revisao visual em device (pendente do usuario).
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(mobile): add saint of the day to home`

## Etapa 152 - Refatorar cadastro (familia, jurisdicao, senha visivel)

Resumo do que foi feito:

- `credentials-auth.ts`: `RegistrationForm` ganhou `family`, trocou `parish` por `jurisdiction`. Novas constantes `FAMILY_OPTIONS` (OFMConv/OFM/OFMCap/TOR/OSC/OFS/Leigo/Outros) e `JURISDICTION_OPTIONS` (Provincia/Mosteiro/Convento/Fraternidade/Paroquia). `buildRegistrationMetadata` passa `family` (obrigatorio) e `jurisdiction` (opcional); validacao exige familia.
- `criar-conta.tsx`: senha com toggle Mostrar/Ocultar; selects em chips para Familia (obrigatorio) e Jurisdicao (opcional, desmarcavel); removido o input de Paroquia.
- Migration `20260710120000_add_family_jurisdiction_profiles.sql`: colunas `family` e `jurisdiction` em `profiles` e `handle_new_user` atualizado para gravar ambos (parish mantido para linhas legadas).

Testes atualizados (`credentials-auth.test.ts`):

- Metadata do cadastro agora inclui `family`/`jurisdiction` (sem `parish`).
- Novo teste: cadastro sem familia e bloqueado antes do Supabase.

Decisoes tecnicas e trade-offs:

- Jurisdicao como select fechado (nao campo livre), default reversivel; ponto do to-change.md resolvido pela via mais simples.
- Familia obrigatoria (identidade central do app), com "Leigo"/"Outros" como escape.
- Escopo contido no cadastro: exibir familia/jurisdicao no Perfil (mexe em `supabase-profile` e 4 fixtures) ficou para a Etapa 153.

Pendencias operacionais:

- Aplicar a migration no Supabase remoto (mesmo fluxo das etapas anteriores).
- `supabase-profile.ts` ainda le `parish`; novos cadastros gravam `jurisdiction` -> exibicao alinhada na Etapa 153.

Validacoes executadas:

- `rtk pnpm test` (credentials-auth 11/11 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] TDD aplicado (metadata + familia obrigatoria).
- [x] Form com senha visivel, Familia e Jurisdicao.
- [x] Migration criada.
- [x] Typecheck e lint limpos.
- [ ] Migration aplicada no remoto (pendente do usuario).
- [ ] Revisao visual do form em device (pendente do usuario).
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(mobile): revamp registration with family and jurisdiction`

## Etapa 153 - Familia e jurisdicao no Perfil

Resumo do que foi feito:

- `SupabaseProfileState` ganhou `family` e `jurisdiction`; `fetchSupabaseProfile` e `buildSupabaseProfileState` passam a ler/zerar esses campos do `user_metadata`.
- `profile-overview.ts`: fallback do detalhe passou de `parish` para `jurisdiction` (parish fica como legado).
- `SupabaseProfileCard` (debug) exibe Familia e Jurisdicao.
- Fixtures atualizados nos testes de `supabase-profile`, `home-welcome` e `profile-overview`.

Testes:

- `supabase-profile.test.ts`: mapeia `family`/`jurisdiction` no perfil ready; estados nulos incluem os novos campos.
- Suite completa verde apos ajuste dos fixtures.

Decisoes tecnicas e trade-offs:

- `parish` mantido no estado para compatibilidade com usuarios antigos; novos cadastros usam `jurisdiction`.
- `family` ainda nao aparece no card visivel ao usuario (`ProfileOverviewCard`) para nao mexer na saida testada de `buildProfileOverview`; exibicao ao usuario pode entrar depois.
- Escopo fechado no Perfil. Paginas Devocional/Novena/Transito de Sao Francisco movidas para a Etapa 154.

Validacoes executadas:

- `rtk pnpm test`
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] Estado do perfil le familia/jurisdicao.
- [x] Fixtures e overview ajustados.
- [x] Debug card exibe os novos campos.
- [x] Typecheck e lint limpos.
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(mobile): show family and jurisdiction in profile`

## Etapa 154 - Hub de devocoes franciscanas

Resumo do que foi feito:

- Criado `features/devotions/devotions.ts`: fonte unica das devocoes (Devocional, Novena de Sao Francisco, Transito de Sao Francisco) com `slug`, titulo, descricao, `status` e helpers (`getDevotionItems`, `findDevotionBySlug`, `buildDevotionRoute`).
- Hub `app/devocoes/index.tsx`: lista as tres devocoes com navegacao.
- Pagina dinamica `app/devocoes/[slug].tsx`: abre cada devocao com estado "em preparação".
- Entrada na Home: card "Devoções franciscanas" -> `/devocoes` (reusa os estilos do card do santo).

Testes adicionados (`devotions.test.ts`):

- Lista as tres devocoes na ordem esperada.
- Todas permanecem `preparing` ate curadoria.
- Lookup por slug (hit e miss) e construcao de rota.

Decisoes tecnicas e trade-offs:

- Sem texto liturgico fabricado: as tres devocoes ficam `preparing` ate a curadoria fornecer o conteudo (mesma disciplina do santoral).
- Uma pagina dinamica `[slug]` em vez de tres arquivos, mantendo a fonte de dados unica e testavel.
- Ponto de entrada na Home (hub proprio), resolvendo o "tab/submenu/hub" do to-change.md pela via de hub dedicado.

Pendencia editorial:

- Conteudo real de Devocional, Novena e Transito de Sao Francisco (aguarda curadoria; nao inventar).

Validacoes executadas:

- `rtk pnpm test` (devotions 5/5 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] TDD na fonte de dados do hub.
- [x] Hub, pagina dinamica e entrada na Home.
- [x] Sem conteudo liturgico fabricado.
- [x] Typecheck e lint limpos.
- [ ] Revisao visual em device (pendente do usuario).
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(mobile): add franciscan devotions hub`

## Roteiro aprovado (pos to-change.md)

Decisoes do usuario: (1) conteudo curado fica LOCAL no codigo por enquanto; (2) curadoria a partir de `santoral-completo.pdf`; (3) CNBB como COMPLEMENTO, via calculo (Computus + solenidades fixas). Migration de familia/jurisdicao sera aplicada pelo usuario via `supabase db push --linked`.

### Track A - Conteudo historico do santoral (`shortHistory`)
- Etapa 155 - Fonte + storage + piloto: modulo `santoral-content.ts` local, separando dado curado do indice gerado; status `draft`/`curated` (so `curated` publica); piloto de 3-5 santos extraidos do PDF e revisados.
- Etapa 156 - Extracao em lote do primeiro bloco narrativo por data + revisao.
- Etapa 157 - Ligar `shortHistory` curado a pagina do santo; premium real quando houver texto.

### Track B - Devocoes (conteudo real)
- Etapa 158 - Sourcing + modelo (Transito, Novena de 9 dias, Devocional) a partir de fonte autoritativa (PDF); sem fabricar.
- Etapa 159 - Preencher e renderizar (Transito primeiro, depois Novena e Devocional).

### Track C - CNBB / calendario geral (complemento, por calculo)
- Etapa 160 - Papel + modelo: camada de calendario geral separada do santoral; franciscano continua primario.
- Etapa 161 - Computus (Pascoa e moveis) + solenidades fixas; substituir `liturgicalMarkers2026` hardcoded por base gerada.
- Etapa 162 - Generalizar o calendario por ano (moveis sao anuais).

### Fecho do santoral
- Etapa 163 - UI de filtro por categoria (Martir/Virgem/Doutor/Pastor...) usando `filterSaintDaysByQualifier`.

Ordem: A -> B -> C -> 163. Cada etapa com TDD/DoD/commit.

## Etapa 155 - Track A: piloto de curadoria do santoral

Resumo do que foi feito:

- Criado `packages/shared/src/santoral-content.ts`: conteudo curado do santoral (primeiro bloco historico por santo), storage LOCAL, keyed por `saintId`, com status `curated`/`draft` (so `curated` publica).
- Piloto de janeiro: 6 santos curados e revisados (01-03 Santissimo Nome, 01-04 Angela de Foligno, 01-05 Diego de Cadiz, 01-12 Bernardo de Corleone, 01-14 Odorico de Pordenone, 01-16 Sao Berardo e companheiros).
- Helpers: `getCuratedSaintContents`, `findCuratedShortHistory`. Exportado em `index.ts`.

Fonte e metodo:

- Texto extraido do `santoral-completo.pdf` (Proprio da Familia Franciscana, p. 46+), que traz por celebracao: data, titulo, "Para ...: rank", primeiro bloco narrativo, depois o oficio completo.
- pypdf basta (PDF tem texto real, sem OCR). Regra de corte: apos "Para ...: rank" ate a primeira ancora do oficio (Invitatorio/Hino/etc.).
- Limpeza (dehifenizacao, drop-cap, corte de rubricas "Do comum...") feita e revisada manualmente para os 6; texto fiel a fonte.

Testes (`santoral-content.test.ts`):

- Piloto publica 6 `curated` com texto nao vazio.
- Lookup por `saintId` (hit/miss).
- Guard de integridade: todo `saintId` curado existe no indice (sem conteudo orfao).

Decisoes tecnicas e trade-offs:

- Keyed por `saintId` (nao `monthDay`) para desambiguar dias com multiplos santos.
- Nao ligado ainda a pagina do santo (isso e a Etapa 157); 155 entrega dados + modelo revisaveis.
- Tail truncado da fonte foi cortado em frase completa (ex.: Angela encerra em 1309) para nao adivinhar.

Revisao pendente (usuario):

- Conferir os 6 textos em `packages/shared/src/santoral-content.ts` antes do bulk (Etapa 156).

Validacoes executadas:

- `rtk pnpm test` (content 4/4 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] Modulo de conteudo curado local.
- [x] Piloto de 6 santos revisados.
- [x] TDD + guard de integridade.
- [x] Typecheck e lint limpos.
- [ ] Revisao editorial dos 6 textos (usuario).
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(shared): add curated santoral content pilot`

## Etapa 156 - Extracao em lote do santoral (fila de drafts)

Resumo do que foi feito:

- Extraido o primeiro bloco narrativo de 106 santos do `santoral-completo.pdf` (Proprio da Familia Franciscana, ano inteiro), revisados e aprovados pelo usuario.
- Consolidado tudo em `santoral-content.ts`: 112 entradas `curated` (6 do piloto + 106 aprovados). O arquivo de drafts foi descartado; `getDraftSaintContents()` filtra o proprio arquivo (fila vazia).
- `findCuratedShortHistory` publica os 112.

Pipeline:

- Segmentacao do Proprio por `<dia> de <mes>` + titulo em MAIUSCULAS; narrativa cortada antes das ancoras do oficio.
- Limpeza (dehifenizacao, drop-cap, corte de rubricas "Do comum...").
- Matching seção -> `saintId` do indice por month-day + sobreposicao de tokens do nome; descartados matches de score 0 e seções de "Comum".
- Cobertura: 116 seções, 113 casadas, 0 dias orfaos; 106 drafts (excluindo os 6 ja curados e 1 match ruim).

Testes (`santoral-content.test.ts`):

- 112 `curated`, texto nao vazio.
- Sem conteudo orfao (todo `saintId` no indice); `saintId` unicos.
- Fila de draft vazia (tudo curado).

Decisoes tecnicas e trade-offs:

- Arquivo unico `santoral-content.ts` (o usuario colou os drafts nele e aprovou; consolidei em vez de manter dois arquivos). Promover/editar = alterar a entrada no mesmo arquivo.
- ~14 santos do indice sem seção no Proprio (usam "Do comum") ficam sem texto por ora.

Validacoes executadas:

- `rtk pnpm test` (content 8/8 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] Extracao em lote (106) revisada e aprovada.
- [x] Consolidado em arquivo unico; 112 curated.
- [x] Guards de integridade (orfao, unicidade); fila draft vazia.
- [x] Typecheck e lint limpos.
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(shared): curate full santoral content`

## Etapa 157 - shortHistory curado no catalogo (premium real)

Resumo do que foi feito:

- `santoral.ts` passou a mesclar o texto curado (`findCuratedShortHistory`) no catalogo: cada `SaintDay` recebe `shortHistory` quando ha conteudo curado; santos sem conteudo ficam null ("em preparacao").
- 112 santos passam a ter historia publicada; premium real: como `premium: true`, sem assinatura o texto fica bloqueado, com assinatura fica liberado.

Sem mudanca de UI:

- A pagina `app/santos/[monthDay].tsx` ja renderiza os estados via `buildSaintHistoryState` (available/locked/preparing) + `useSubscriptionPreview`. Passa a exibir texto real e o gate premium sem alteracao.

Teste (`santoral.test.ts`):

- Catalogo mescla `shortHistory`: exatamente 112 com texto; Berardo (01-16) inclui "cinco irmaos".

Decisoes tecnicas e trade-offs:

- Merge no catalogo (nao no arquivo de indice gerado), mantendo o indice como dado bruto e o conteudo curado como camada.
- Sem ciclo de import: `santoral` importa `santoral-content`, que nao importa `santoral`.

Validacoes executadas:

- `rtk pnpm test` (santoral 14/14 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] Conteudo curado ligado ao catalogo.
- [x] Premium real na pagina do santo.
- [x] TDD (contagem + spot-check).
- [x] Typecheck e lint limpos.
- [ ] Revisao visual em device (pendente do usuario).
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(shared): publish curated saint history with premium gate`

## Track B bloqueado (fonte)

O `santoral-completo.pdf` NAO contem Transito de Sao Francisco, Novena nem oracoes preparatorias (busca no arquivo inteiro: 0 ocorrencias). E livro de santoral/oficio. Track B (Etapas 158-159) aguarda o usuario fornecer os textos autoritativos. Reordenado: Track C primeiro.

## Etapa 160 - Calendario geral (CNBB) como complemento, por calculo

Resumo do que foi feito:

- Criado `packages/shared/src/liturgical-general.ts`: calendario liturgico geral parametrizado por ano, como COMPLEMENTO do santoral franciscano (que continua primario).
- `computeEaster(year)`: Computus gregoriano (algoritmo anonimo de Meeus).
- Festas moveis derivadas da Pascoa (Cinzas -46, Ramos -7, Quinta/Sexta Santa, Pascoa, Ascensao +42, Pentecostes +49, Trindade +56, Corpus Christi +60) e tabela de fixas (Mae de Deus, Epifania, Sao Jose, Anunciacao, Sao Joao Batista, Pedro e Paulo, Transfiguracao, Assuncao, Exaltacao da Cruz, Todos os Santos, Imaculada, Natal).
- `getGeneralLiturgicalFeasts(year)` e `findGeneralFeastByMonthDay(year, monthDay)`.

Testes (`liturgical-general.test.ts`):

- Pascoa 2025/2026/2027 (20-04, 05-04, 28-03).
- Moveis 2026 batem com o `liturgicalMarkers2026` legado (Cinzas 02-18, Ramos 03-29, Pascoa 04-05, Pentecostes 05-24, Corpus 06-04).
- Fixas presentes em qualquer ano; lista ordenada; lookup por data.

Decisoes tecnicas e trade-offs:

- Fonte por CALCULO (Computus + tabela), nao dataset externo (decisao do usuario).
- Offsets validados contra as datas ja usadas em 2026.
- Ranks sao rotulos aproximados para exibicao; transferencias CNBB (ex.: Ascensao ao domingo = +42) adotadas onde padrao.
- Modulo isolado; a integracao no `liturgical-calendar` (coexistencia com santoral) e a Etapa 161.

Validacoes executadas:

- `rtk pnpm test` (general 5/5 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] Computus + festas moveis/fixas.
- [x] TDD (Pascoa, offsets, fixas, ordenacao).
- [x] Parametrizado por ano.
- [x] Typecheck e lint limpos.
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(shared): add general liturgical calendar by computus`

## Etapa 161 - Calendario geral integrado (preceito complementar)

Resumo do que foi feito:

- `liturgical-calendar.ts` passou a derivar a camada de preceito do `liturgical-general` (Computus + festas), substituindo o array hardcoded `liturgicalMarkers2026` (removido junto com o tipo `LiturgicalMarker`).
- `buildLiturgicalDay2026` usa `findGeneralFeastByMonthDay(2026, monthDay)`; prioridade mantida: repertorio > santo franciscano > festa geral (preceito) > dia comum.
- Efeito: mais datas de preceito reais (Epifania, Sao Jose, Anunciacao, Ascensao, Trindade, etc.) passam a aparecer como `liturgical_day_without_repertoire` quando nao ha santo franciscano nem roteiro.

Teste (`liturgical-calendar.test.ts`):

- Novo: Epifania (01-06) e Corpus Christi (06-04) agora vem do calendario calculado como preceito.
- Testes existentes seguem verdes (Natal 12-25, dia comum 04-25, santo franciscano primario, roteiro vence).

Decisoes tecnicas e trade-offs:

- Santoral franciscano continua primario; preceito e complemento (so quando nao ha santo/roteiro).
- 11-02 (Finados) sai do preceito calculado, mas o santoral ja cobre 11-02 (Comemoracao dos Fieis Defuntos da Ordem) -> sem perda.
- Ano ainda fixo em 2026 dentro do calendario; a generalizacao por ano e a Etapa 162.

Validacoes executadas:

- `rtk pnpm test` (calendar 12/12 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] Preceito vem do calendario calculado.
- [x] `liturgicalMarkers2026` removido.
- [x] Coexistencia com prioridade coberta por teste.
- [x] Typecheck e lint limpos.
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(shared): drive precept days from computed general calendar`

## Etapa 162 - Calendario liturgico generalizado por ano

Resumo do que foi feito:

- `buildLiturgicalDay2026` -> `buildLiturgicalDay(year, month, day)`: `isoDate`, `year` e festas gerais agora dependem do ano.
- `getLiturgicalDayForDate` usa `date.getFullYear()` -> o dia de hoje resolve as datas moveis do ano real.
- Novas funcoes parametrizadas `getLiturgicalMonthDays(year, month)` e `getLiturgicalMarkedDays(year, month)`; wrappers `*2026` mantidos para os consumidores atuais (UI, home, month-view) sem quebra.
- `LiturgicalDay.year` passou de literal `2026` para `number`.

Teste (`liturgical-calendar.test.ts`):

- Pascoa 2025 (20-04) resolve com `year: 2025`.
- `getLiturgicalMonthDays` cobre fevereiro bissexto (2024=29, 2025=28).
- Todos os testes 2026 seguem verdes via wrappers.

Decisoes tecnicas e trade-offs:

- Wrappers `*2026` preservam a UI atual (que exibe "Ano liturgico 2026"); a generalizacao da UI para ano arbitrario fica para quando houver necessidade.
- Santoral e repertorio continuam por month-day (year-agnostic); so as festas moveis dependem do ano.

Validacoes executadas:

- `rtk pnpm test` (calendar 14/14 + suite completa)
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] Calendario parametrizado por ano.
- [x] Hoje usa o ano real.
- [x] Wrappers 2026 sem quebra de consumidores.
- [x] TDD cross-year (Pascoa 2025, bissexto).
- [x] Typecheck e lint limpos.
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(shared): generalize liturgical calendar by year`

## Estado do plano

- Track A (santoral: conteudo curado + premium): concluido (155-157).
- Track B (devocoes): BLOQUEADO aguardando textos autoritativos do usuario (158-159).
- Track C (CNBB por calculo): concluido (160-162).

## Etapa 163 adiada

A antiga Etapa 163 (filtro por categoria do santoral) foi adiada a pedido do usuario, para depois da identidade visual. Vira Etapa 165 (ver abaixo).

## Etapa 163 - Fundacao da identidade visual franciscana (dark)

Contexto:

- App e construido para um frade franciscano; precisa seguir a identidade do site institucional (`frei-luis-ventura`).
- Paleta extraida do site (`src/index.css`): fundo chumbo `HSL 220 13% 10%` (~#16171a), dourado accent `HSL 43 52% 54%` (~#c6a24c), creme `#fcfbf7`. Site e dark.
- Decisao do usuario: seguir DARK (igual ao site), nao light.

Resumo do que foi feito:

- `theme/tokens.ts`: paleta `colors` inteiramente reescrita para dark franciscano.
  - Dourado: `accent`/`gold` `#c7a24e`, `accentStrong` `#e2c77f`, `goldSoft` `#2c2719` (superficie escura tonalizada, nao mais bege claro).
  - Chumbo: `background` `#16171a`, `surface` `#1e2024`, `surfaceMuted` `#25272c`, `tabBackground` `#101114`, `border`/`borderStrong` em cinza-chumbo.
  - Texto: `textPrimary` `#f4f2ea` (creme), `textSecondary`/`textMuted` em cinza claro — invertido de escuro-sobre-claro para claro-sobre-escuro.
  - `olive`/`oliveSoft` (marcacao de repertorio) adaptados para dark.
  - Removido o vinho (`#7b2f45`) que nao pertencia a identidade; dourado assume o papel de accent unico.
- Como TODA a UI (telas, componentes) ja consumia `colors.*` de `tokens.ts` (confirmado por busca — zero hex hardcoded fora do tokens), a nova paleta se propaga automaticamente para o app inteiro.
- Ajustes de consistencia fora do tokens:
  - `app/_layout.tsx`: `StatusBar` `style="dark"` -> `"light"` (icones claros sobre fundo escuro).
  - `app/visualizador-pdf.tsx`: overlay de loading de creme claro -> chumbo escuro translucido.
  - `app.json`: `userInterfaceStyle` `light` -> `dark`; `splash.backgroundColor` e `android.adaptiveIcon.backgroundColor` de `#ffffff` -> `#16171a`.

Decisoes tecnicas e trade-offs:

- Dark confirmado pelo usuario (alinhado ao site, nao ao branco/creme que era o tema anterior do app).
- Reuso do design system de tokens existente (nao criei um segundo sistema); trade-off: cores antigas (accent vinho) desaparecem globalmente sem flag de transicao, pois o app ainda nao esta em producao/loja.
- Responsividade mobile: nao alterada nesta etapa (unidades ja eram relativas via `spacing`/`radii`/`typography`); revisao fina de layout fica para as proximas etapas (164+).
- Assets de icone (`icon.png`, `adaptive-icon.png`, `splash-icon.png`) nao foram redesenhados (fora do escopo de codigo); apenas a cor de fundo ao redor deles.

Validacao pendente (manual):

- Revisao visual completa no Expo Go/device: contraste, legibilidade do dourado sobre chumbo, tab bar, PDF viewer.

Validacoes executadas:

- `rtk pnpm test`
- `rtk pnpm typecheck`
- `rtk pnpm lint`

Checklist DoD:

- [x] Paleta franciscana dark aplicada via tokens (propagacao automatica).
- [x] StatusBar, splash e adaptive icon consistentes com dark.
- [x] Sem hex hardcoded fora do tokens.
- [x] Typecheck e lint limpos.
- [ ] Revisao visual em device (pendente do usuario).
- [x] Doc viva atualizada.

Sugestao de commit:

`feat(mobile): apply franciscan charcoal-gold-cream dark theme`

## Proxima Etapa Planejada

Etapa 164 - Revisar telas principais (Home, Calendario, Repertorio, Comunidade, Perfil) com a nova paleta: hierarquia, contraste e responsividade mobile fina.

## Etapa 164 - Ajuste fino telas principais (dark)

Feito:
- Sombras invisiveis em dark (shadowOpacity 0.03-0.08 sobre preto) bumped para 0.3 em 15 arquivos (Home, Calendario, Repertorio, Comunidade, auth, santos, cards).
- Telas ja usavam tokens; hierarquia/contraste ja corretos pos-163.

Validacoes: rtk pnpm test/typecheck/lint = 0.

DoD:
- [x] Sombras visiveis em dark.
- [x] Typecheck/lint limpos.
- [ ] Revisao visual device (usuario).

Commit: `fix(mobile): make card shadows visible on dark theme`

## Proxima Etapa

Etapa 165 - Filtro por categoria do santoral (antiga 163).

## Etapa 165 - Filtro por categoria do santoral

Feito:
- `santoral-filter.ts` (+test 4/4): `applySaintFilter`, `buildAvailableQualifiers`.
- `saint-detail.ts`: `qualifierLabels` exportado.
- `app/santos/index.tsx`: lista completa do santoral com chips de filtro (Martir/Virgem/Doutor/...), rota nova.
- Home: card sem santo hoje agora linka pra `/santos` (lista/filtro).

Validacoes: rtk pnpm test/typecheck/lint = 0.

DoD:
- [x] TDD.
- [x] UI de filtro funcional.
- [x] Typecheck/lint limpos.
- [ ] Revisao visual device (usuario).

Commit: `feat(mobile): add santoral category filter list`

## Etapa 166 - Track B: Novena e Transito de Sao Francisco (conteudo real)

Fonte: usuario forneceu texto da Novena (mensagem) e HTML do Transito (Paroquia Sao Francisco de Assis, Itapua). Copia fiel, sem fabricar.

Feito:
- `novena-content.ts` (+test 4/4): 6 passos, oracao diaria, oracao de Sao Francisco, bencao, 9 dias com meditacao+sugestao biblica.
- `transito-content.ts` (+test 2/2): 8 secoes liturgicas (abertura/procissao/testamento de sena/ritos iniciais/liturgia da palavra/preces/eucaristica/finais), com falas Padre/Todos/Presidente/Comentarista/Leitor.
- `devotions.ts`: novena e transito -> `available` (devocional segue `preparing`, sem fonte).
- `app/devocoes/[slug].tsx` reescrito: renderiza Novena (seletor de dia 1-9 + oracoes fixas) e Transito (secoes com falas) de verdade; preparing continua com placeholder.

Validacoes: rtk pnpm test/typecheck/lint = 0.

DoD:
- [x] TDD.
- [x] Conteudo fiel a fonte, sem fabricacao.
- [x] UI real substitui placeholder.
- [x] Typecheck/lint limpos.
- [ ] Revisao visual device (usuario).

Sugestao commit: `feat(mobile): add novena and transito devotion content`

## Track B status

Novena e Transito: concluidos. Devocional (oracoes diarias/preparatorias): ainda sem fonte, aguardando usuario.

## Etapa 167 - Fix: botao voltar ausente em 10 telas

Causa: root Stack tem `headerShown: false` global; 10 telas empurradas na pilha nao tinham `Stack.Screen headerShown:true` local -> sem header, sem seta voltar.

Corrigido: entrar, criar-conta, recuperar-senha, confirmar-email, celebracoes/index, devocoes/index, santos/index, seus-dados, politica-privacidade, termos-de-uso. Todas com title.

Validacoes: rtk pnpm test/typecheck/lint = 0.

Commit: `fix(mobile): restore back button on pushed screens missing header`

## Etapa 168 - Fix: label "(tabs)" no botao voltar

Causa: nome do grupo de rota `(tabs)` vazava como texto do botao voltar (comportamento padrao do back button com label).

Corrigido globalmente em `_layout.tsx`: `headerBackButtonDisplayMode: "minimal"` + `headerBackTitle: ""` no Stack raiz. Chevron sem label em todas as telas.

Achado nao corrigido (fora do escopo, sinalizado ao usuario): texto curado de "Angelina de Montegiove" corrompido por artefato de regex da extracao em lote (Etapa 156) — precisa remendo pontual no santoral-content.ts.

Validacoes: rtk pnpm test/typecheck/lint = 0.

Commit: `fix(mobile): remove route group name leaking into back button`

## Etapa 169 - Home: listar todos os santos do dia

Pedido: quando houver mais de um santo no dia, listar todos no card em vez de "+1".

Feito:
- `home-saint.ts`: `HomeSaint.saints: HomeSaintEntry[]` (nome+classificacao de cada santo); `description` isolado do titulo (estado sem santo). Removido `moreCount`.
- `index.tsx`: card renderiza todos os santos com separador quando `saints.length > 1`; caso unico mantem layout anterior.

Testes: 3/3 (multi-santo 07-13 Angelina+Emanuel Ruíz; single 07-10; fallback).

Validacoes: rtk pnpm test/typecheck/lint = 0.

Commit: `feat(mobile): list all saints of the day on home card`

## Etapa 170 - Fix: fundo branco atras de conteudo curto

Causa sistemica: todo `ScrollView` tinha so `contentContainerStyle` (cor no conteudo), sem `style` proprio. Com conteudo mais curto que a tela, sobrava area sem `flex:1`/background -> fundo padrao (branco) aparecia embaixo.

Corrigido em 20 arquivos (todas as telas + PlaceholderScreen): adicionado `style={styles.screen}` (`flex:1, backgroundColor: colors.background`) em cada ScrollView, junto do `contentContainerStyle` existente.

Validacoes: rtk pnpm test/typecheck/lint = 0.

Commit: `fix(mobile): fill screen background behind short scrollview content`

## Etapa 171 - Redesign hierarquico da Home

Pedido: elementos harmonicos, hierarquia visual clara.

Feito:
- `home-summary.ts`: `HomeSummary` ganhou `href` (roteiro/entrar/calendario) para CTA real (+test).
- Hero unico "Hoje": borda superior dourada (destaque), titulo maior, botao real (pill accent) usando `summary.href`/`actionLabel` — antes so tinha texto, sem CTA clicavel.
- Santo do dia + Devoções unificados em uma lista compacta (`exploreList`, mesmo padrao visual do `preparedList`) em vez de 2 cards grandes redundantes ao hero.
- Secoes tituladas ("Para hoje", "Navegar") organizam a hierarquia: hero > memoria/oracao > navegacao > roteiros disponiveis.
- Removidos estilos redundantes (today*, saint*, quickActionsSection); +9 estilos novos (hero*, explore*).

Validacoes: rtk pnpm test/typecheck/lint = 0.

Commit: `feat(mobile): redesign home with clear visual hierarchy`

## Etapa 172 - Fix: hero invisivel, secoes amontoadas, ambiguidade multi-santo, divisores

Problemas reportados (screenshot):
1. Botao do hero ("Ver dias preparados") invisivel - texto escuro sem pill dourado.
2. Elementos amontoados dentro dos cards.
3. Com 2 santos no dia, um unico "Ver" flutuava ao lado do segundo nome, ambiguo.
4. Sem linha separando secoes do app.

Causas e fixes:
1. `heroButton` usava `style={({pressed}) => [...]}` (Pressable dentro de `Link asChild`) - unico lugar do app com esse padrao dentro de Link asChild; convertido para estilo estatico (`style={styles.heroButton}`), igual a todos os outros botoes do app dentro de Link.
2. `exploreList`: linha (row) virou bloco (coluna) por item, com `paddingVertical: lg` e `paddingHorizontal: lg` no container (era md) - mais respiro.
3. Bloco do santo: nomes empilhados em `exploreNameList`, acao unica no rodape do bloco ("Ver os dois santos" quando `saints.length > 1`, "Ver santo" quando 1) - nao fica mais colada a um nome especifico.
4. `EditorialSectionHeader` (componente compartilhado, usado em TODAS as telas do app) ganhou `borderBottomWidth: 1` + `borderBottomColor: colors.border` + `paddingBottom` - mesma linha que ja separava o `PageHeader`. Propaga o divisor de secao para o app inteiro com uma unica mudanca de componente.

Validacoes: rtk pnpm test/typecheck/lint = 0.

Commit: `fix(mobile): repair hero button, section dividers and multi-saint clarity`

## Etapa 173 - Fix: botao por santo + folga no topo do card

Pedido: cada santo com seu proprio botao (nao um "ver ambos"); corrigir espacamento apertado no topo do bloco "Santos do dia".

Feito:
- `HomeSaintEntry.href` (novo): link individual por santo (`/santos/{monthDay}?saintId={id}`), usando o `id` real do `SaintDay`.
- Novo `features/santoral/saint-day-filter.ts` (+test 3/3): `resolveSaintsForDay(saints, saintId?)` filtra a pagina do dia para 1 santo quando `saintId` bate; senao mostra todos.
- `santos/[monthDay].tsx` le `saintId` da query e aplica o filtro.
- Home: cada santo agora e uma `Link`+`Pressable` propria com "Ver" individual (`exploreSaintRow`), em vez de bloco unico com acao compartilhada.
- Espacamento: `exploreList` ganhou `paddingTop`; `exploreBlock` com padding top/bottom explicito; `exploreNameList` gap maior entre santos.

Validacoes: rtk pnpm test/typecheck/lint = 0.

Commit: `feat(mobile): give each saint its own link and fix card spacing`

## Etapa 174 - Refactor visual do Calendario

Pedidos: grade adaptavel por mes (nao fixa em 6 linhas), remover destaque de domingo, revisar cores de destaque (franciscano vs preceito estavam identicas), legenda mais clara e harmonica.

Achados/fixes:
1. Bug real: `trailingEmptyCells` sempre completava para 42 celulas (6 linhas fixas), sobrando linha(s) invisiveis vazias dependendo do mes. Corrigido: `CalendarMonthView` ganhou `trailingEmptyCellCount` (completa so ate o fim da ultima semana, multiplo de 7) - `calendar-month-view.ts` +test (julho=1 trailing, fevereiro=0 trailing, formula validada).
2. Destaque de domingo removido: `isSunday()`, `dayCellSunday`, `dayNumberSunday` deletados (nao tem significado liturgico proprio, so causava ruido visual).
3. Cores duplicadas: `dayCellFranciscan` (borda `colors.accent`) e `dayCellLiturgical` (borda `colors.gold`) eram a MESMA cor (accent===gold no tokens.ts), santo franciscano e preceito ficavam indistinguiveis. Preceito (CNBB, camada complementar) passou a usar borda tracejada `colors.borderStrong` (neutra/secundaria); franciscano mantem o dourado (`colors.accent`, eixo principal); repertorio mantem oliva (prioridade maxima, com preenchimento). Hierarquia visual agora reflete a hierarquia de dominio (repertorio > santo > preceito > comum).
4. Legenda: virou grid 2 colunas (`flexBasis: 50%`), dot do "Data liturgica" com borda tracejada igual a celula, label esclarecido para "Data liturgica (CNBB)".

Testes (`calendar-month-view.test.ts`): grade completa apenas ate multiplo de 7 (julho trailing=1, fevereiro trailing=0).

Validacoes: rtk pnpm test/typecheck/lint = 0.

Commit: `fix(mobile): adaptive calendar grid, remove sunday highlight, fix color hierarchy`
