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

Objetivo esperado:

- Criar cliente Supabase no mobile.
- Ler variaveis publicas do ambiente.
- Ainda sem auth.
- Ainda sem salvar dados.
