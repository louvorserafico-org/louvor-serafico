# Plano: CI/CD para TestFlight via GitHub Actions

## Correção de premissa

O Expo Go **não** publica na App Store nem no TestFlight. Expo Go é só o
cliente de desenvolvimento (sandbox) usado no dia a dia com `corepack pnpm dev`.

Quem gera o binário instalável e envia pro TestFlight é o **EAS** (Expo
Application Services), em dois comandos separados:

- `eas build` — compila o app nativo na nuvem da Expo e gera um `.ipa`.
- `eas submit` — pega esse `.ipa` e envia pro App Store Connect, que
  disponibiliza pro TestFlight.

O GitHub Actions só orquestra esses dois comandos (`eas-cli`) de forma não
interativa. Ele não builda o app nativamente por conta própria — quem builda é
a nuvem da Expo.

## Estado atual do repo (já pronto)

- `apps/mobile/eas.json` já existe com profiles `development`, `preview`,
  `production` e `submit.production`.
- `app.config.js` já tem `extra.eas.projectId` (`284adad1-985f-4fb9-975b-585181d1594d`)
  — o projeto EAS já está criado e linkado.
- `app.json` já define `ios.bundleIdentifier: com.louvorserafico.app`.
- `eas.json` usa `appVersionSource: "remote"` — a EAS controla versão/build
  number automaticamente, sem precisar de commit a cada release.
- `.github/workflows/ci.yml` já roda testes/typecheck/lint em toda PR/push pra
  `main`. Vamos criar um segundo workflow, separado, só pro release iOS.
- Não há SDK do RevenueCat instalado ainda (`revenuecat-config.ts` só lê env
  vars) — o app pode ir pro TestFlight sem compras nativas funcionando; isso é
  uma etapa futura, não bloqueia hoje.
- `docs/development/eas-apple-checklist.md` registra o bloqueio anterior
  ("sem Team associado ao Apple ID") — resolvido agora que o Apple Developer
  Program foi pago.

## Decisões já validadas com o Frei

- **Gatilho**: manual, via `workflow_dispatch` no GitHub Actions. Nenhuma
  build automática em push/merge — só quando alguém disparar manualmente.
- **Submit**: automático. A mesma execução do workflow builda e já envia pro
  TestFlight (`eas build --auto-submit`), sem passo manual extra depois.

## Pré-requisitos manuais (fora do repositório)

Estes passos só podem ser feitos por você, fora do Claude Code, porque exigem
login humano em portais da Apple/Expo e não podem ser automatizados com
segurança.

> Passo a passo detalhado, com onde clicar em cada tela:
> `docs/development/testflight-manual-steps.md`.

### 1. Apple Developer Portal (developer.apple.com)

- [x] Apple Developer Program pago (já feito).
- [ ] Confirmar que o Apple ID aparece com **Team** ativo (Membership → Team ID
      visível). Anote o **Team ID** (10 caracteres, ex.: `A1B2C3D4E5`).
- [ ] Confirmar que o bundle ID `com.louvorserafico.app` está registrado em
      **Certificates, Identifiers & Profiles → Identifiers**. Se não existir,
      criar um App ID novo com esse bundle identifier (capabilities: nenhuma
      especial por enquanto — sem push, sem in-app purchase até integrarmos
      RevenueCat de verdade).

### 2. App Store Connect (appstoreconnect.apple.com)

- [ ] Criar o registro do app: **Apps → +  → New App**, plataforma iOS,
      bundle ID `com.louvorserafico.app`, nome "Louvor Seráfico" (ou variação,
      se o nome já estiver em uso por outro dev — nomes são globais na loja),
      SKU (ex.: `louvor-serafico-ios`), idioma primário pt-BR.
- [ ] Preencher a aba **App Information** mínima (categoria, classificação
      etária/idade — questionário de conteúdo). Sem isso o TestFlight interno
      já funciona, mas o **TestFlight externo** (testers fora da sua equipe)
      exige uma revisão relâmpago da Apple na primeira vez.
- [ ] Gerar uma **App Store Connect API Key**: Users and Access → Integrations
      → App Store Connect API → **+ Generate API Key**, papel "App Manager".
      Isso baixa um arquivo `.p8` **uma única vez** (não dá pra baixar de novo
      depois) — guarde em local seguro. Anote também o **Key ID** e o
      **Issuer ID** mostrados na mesma tela.
      > Esta API Key é o método recomendado pro EAS submeter sem digitar
      > usuário/senha/2FA da Apple a cada vez — essencial pra rodar dentro do
      > GitHub Actions sem interação humana.
- [ ] Convidar os primeiros testers internos (App Store Connect → seu app →
      TestFlight → Internal Testing → grupo com os usuários Apple ID que vão
      testar). Testers internos não passam por revisão da Apple, aparecem
      quase na hora.

### 3. Conta Expo / EAS (expo.dev)

- [ ] Confirmar que o projeto `louvor-serafico` (ID
      `284adad1-985f-4fb9-975b-585181d1594d`) está sob a organização/conta
      Expo certa em https://expo.dev.
- [ ] Gerar um **Expo Access Token**: expo.dev → conta → Access Tokens →
      **Create Token**. Esse token autentica o `eas-cli` dentro do GitHub
      Actions sem login interativo.

### 4. Segredos no GitHub (Settings → Secrets and variables → Actions)

Depois de ter os itens acima, cadastrar estes secrets no repositório
(`louvorserafico-org/louvor-serafico`):

| Secret | De onde vem | Uso |
|---|---|---|
| `EXPO_TOKEN` | Access Token do expo.dev (passo 3) | Autentica o `eas-cli` no CI |
| `APPLE_TEAM_ID` | Team ID do Apple Developer Portal (passo 1) | `eas.json` submit profile |
| `ASC_APP_ID` | ID numérico do app no App Store Connect (aparece na URL do app, ou em App Information → General Information) | `eas.json` submit profile |
| `ASC_API_KEY_ID` | Key ID da API Key (passo 2) | Autentica `eas submit` sem senha |
| `ASC_API_KEY_ISSUER_ID` | Issuer ID da API Key (passo 2) | Autentica `eas submit` sem senha |
| `ASC_API_KEY_P8_BASE64` | Conteúdo do arquivo `.p8` baixado, convertido pra base64 (`certutil -encode` no Windows ou `base64` no mac/linux) | O workflow decodifica e escreve o arquivo `.p8` temporariamente antes do `eas submit` |
| `EXPO_PUBLIC_SUPABASE_URL` | Já existe no `.env.local` | Baked no bundle JS pelo `app.config.js` |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Já existe no `.env.local` | idem |
| `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Já existe no `.env.local` | idem |
| `EXPO_PUBLIC_SUPABASE_ASSET_BUCKET` | Já existe no `.env.local` (ou usa default `song-assets`) | idem |
| `EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY` | Placeholder por enquanto (pode ficar vazio até integrarmos RevenueCat de verdade) | idem |

> Nenhum desses secrets deve ir pro `.env.local` do CI em texto puro no
> workflow — todos ficam só em GitHub Secrets, injetados como variáveis de
> ambiente na hora do build.

### 5. Ajuste de asset (verificar antes do primeiro build)

`apps/mobile/assets/icon.png` está em **1200x1200**. A Apple/EAS espera
**1024x1024 exato** pro ícone da App Store — o build pode falhar ou a EAS pode
reamostrar de forma não previsível. Recomendo re-exportar o ícone em
1024x1024 antes do primeiro build de produção.

## Mudanças a fazer no repositório (posso executar quando você der sinal)

### 1. `apps/mobile/eas.json` — completar o profile de submit

Adicionar as credenciais de submit (via variáveis de ambiente, não em texto
puro no arquivo):

```json
{
  "submit": {
    "production": {
      "ios": {
        "appleTeamId": "$APPLE_TEAM_ID",
        "ascAppId": "$ASC_APP_ID",
        "ascApiKeyPath": "./asc-api-key.p8",
        "ascApiKeyId": "$ASC_API_KEY_ID",
        "ascApiKeyIssuerId": "$ASC_API_KEY_ISSUER_ID"
      }
    }
  }
}
```

### 2. Novo workflow `.github/workflows/release-ios.yml`

```yaml
name: Release iOS (TestFlight)

on:
  workflow_dispatch:
    inputs:
      profile:
        description: "Perfil de build EAS"
        required: true
        default: "production"
        type: choice
        options:
          - production
          - preview

jobs:
  build-and-submit:
    name: Build + Submit to TestFlight
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/mobile

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Enable Corepack
        run: corepack enable

      - name: Prepare pnpm
        run: corepack prepare pnpm@10.10.0 --activate

      - name: Install dependencies
        working-directory: .
        run: pnpm install --frozen-lockfile

      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Write App Store Connect API key
        run: echo "${{ secrets.ASC_API_KEY_P8_BASE64 }}" | base64 -d > asc-api-key.p8

      - name: Build and submit (iOS)
        env:
          EXPO_PUBLIC_SUPABASE_URL: ${{ secrets.EXPO_PUBLIC_SUPABASE_URL }}
          EXPO_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.EXPO_PUBLIC_SUPABASE_ANON_KEY }}
          EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY }}
          EXPO_PUBLIC_SUPABASE_ASSET_BUCKET: ${{ secrets.EXPO_PUBLIC_SUPABASE_ASSET_BUCKET }}
          EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY: ${{ secrets.EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY }}
          APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
          ASC_APP_ID: ${{ secrets.ASC_APP_ID }}
          ASC_API_KEY_ID: ${{ secrets.ASC_API_KEY_ID }}
          ASC_API_KEY_ISSUER_ID: ${{ secrets.ASC_API_KEY_ISSUER_ID }}
        run: eas build --platform ios --profile ${{ inputs.profile }} --non-interactive --auto-submit

      - name: Clean up API key file
        if: always()
        run: rm -f asc-api-key.p8
```

Pontos de atenção nesse desenho:

- Roda em `ubuntu-latest` — build iOS acontece nos servidores da Expo, não
  precisa de macOS runner (isso é uma vantagem grande do EAS Build sobre
  builds nativas "cruas").
- `--non-interactive` é obrigatório em CI — sem ele o `eas-cli` tenta
  perguntar coisas no terminal e trava o job.
- `--auto-submit` builda e já submete pro TestFlight na mesma chamada
  (decisão que você validou acima). Se um dia você quiser revisar antes,
  troca por dois passos: `eas build ...` seguido de `eas submit --latest`
  como job separado (com approval manual do GitHub Environments no meio).
- Primeira execução: a EAS pode pedir pra gerar certificado de distribuição
  e provisioning profile automaticamente (comportamento padrão,
  `credentialsSource: remote`) — como é não-interativo, ela usa os defaults e
  gera tudo sozinha na primeira vez, sem perguntar.

### 3. `docs/development/eas-apple-checklist.md`

Atualizar pra refletir que o bloqueio foi resolvido (Apple Developer pago) e
apontar pra este documento como o plano vigente.

## Ordem de execução recomendada

1. Você completa os pré-requisitos manuais (seções 1-4 acima) — isso não
   depende de mim.
2. Me avisa quando tiver: Team ID, ASC App ID, API Key (`.p8` + Key ID +
   Issuer ID) e o Expo Access Token.
3. Eu cadastro as mudanças de código (`eas.json` + workflow), você cadastra
   os secrets no GitHub (nunca vou pedir pra você me mandar os valores em
   texto — só o nome de cada secret que precisa existir).
4. Rodamos o workflow manualmente uma primeira vez e acompanhamos o log do
   `eas build` (o link do build aparece no log, dá pra acompanhar em
   expo.dev também).
5. Confirmamos que o build aparece em App Store Connect → TestFlight →
   processando (leva alguns minutos pro Apple processar antes de liberar pros
   testers).
6. Adicionamos testers ao grupo interno e validamos a instalação real num
   iPhone.

## Fora de escopo por enquanto

- RevenueCat / compras reais (app vai pro TestFlight com paywall em modo
  preview, sem compra nativa funcional).
- Build automática por push/tag (decisão: só manual, por ora).
- Build Android (o pedido de hoje é só TestFlight/iOS).
