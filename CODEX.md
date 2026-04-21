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
