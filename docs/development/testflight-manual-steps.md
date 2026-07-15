# Passo a passo manual — coletar credenciais pro TestFlight

Guia de execução pra você (Frei), fora do Claude Code. Cada passo diz
exatamente onde clicar e o que anotar. No fim, uma tabela resume tudo que
precisa ser cadastrado como secret no GitHub — você cadastra os valores lá
diretamente (nunca me envie os valores por aqui, só me avise "prontos").

Tempo estimado: 30-45 min, a maior parte é espera de propagação da Apple.

---

## Passo 1 — Confirmar o Team no Apple Developer

1. Acesse https://developer.apple.com/account.
2. Faça login com o Apple ID que assinou o Apple Developer Program.
3. No menu lateral, clique em **Membership Details** (ou "Membership" no
   topo, dependendo do layout).
4. Confirme que aparece um **Team ID** — uma string de 10 caracteres
   (letras+números, ex.: `A1B2C3D4E5`).
   - Se não aparecer nenhum Team, a assinatura ainda não processou — aguarde
     alguns minutos/horas e tente de novo.
5. **Anote o Team ID.** Vai virar o secret `APPLE_TEAM_ID`.

## Passo 2 — Registrar o bundle ID (App ID)

1. Ainda em developer.apple.com/account, vá em **Certificates, IDs &
   Profiles** (menu lateral).
2. Clique em **Identifiers** → botão **+** (novo).
3. Escolha **App IDs** → **Continue** → tipo **App** → **Continue**.
4. Preencha:
   - **Description**: `Louvor Serafico` (livre, é só um rótulo interno).
   - **Bundle ID**: escolha **Explicit**, digite exatamente
     `com.louvorserafico.app`.
5. Em **Capabilities**, não marque nada por enquanto (sem push notification,
   sem in-app purchase ainda — isso entra quando integrarmos RevenueCat de
   verdade).
6. Clique **Continue** → **Register**.
   - Se o bundle ID já aparecer na lista de Identifiers, pule este passo —
     já está registrado.

## Passo 3 — Criar o app no App Store Connect

1. Acesse https://appstoreconnect.apple.com.
2. Vá em **Apps** → botão **+** → **New App**.
3. Preencha:
   - **Platforms**: iOS.
   - **Name**: `Louvor Seráfico` (se já estiver em uso por outro app na
     loja mundial, a Apple pede pra trocar — nomes de app são únicos
     globalmente; tenha uma 2ª opção em mente, ex.: "Louvor Seráfico App").
   - **Primary Language**: Portuguese (Brazil).
   - **Bundle ID**: selecione `com.louvorserafico.app` (o que você registrou
     no Passo 2 — deve aparecer no dropdown).
   - **SKU**: qualquer identificador único interno, ex.: `louvorserafico-ios-01`.
   - **User Access**: pode deixar "Full Access" (padrão).
4. Clique **Create**.
5. Depois de criado, abra o app e vá em **App Information** (menu lateral).
6. No topo ou na URL do navegador, tem um número de 9-10 dígitos — esse é o
   **Apple ID do app** (também chamado de `ascAppId`). Ex.: na URL
   `https://appstoreconnect.apple.com/apps/1234567890/...`, o número
   `1234567890` é o que você quer.
7. **Anote esse número.** Vai virar o secret `ASC_APP_ID`.

> Não precisa preencher screenshots, descrição de loja, categoria completa
> etc. agora — isso só é obrigatório pra submissão de **App Store**, não pro
> TestFlight interno. Testers internos recebem a build assim que ela é
> processada, sem revisão da Apple.

## Passo 4 — Gerar a API Key do App Store Connect

Esta é a credencial que permite ao GitHub Actions enviar builds sem digitar
usuário/senha/2FA da Apple toda vez.

1. Em appstoreconnect.apple.com, vá em **Users and Access** (ícone de
   pessoas, menu lateral ou topo).
2. Clique na aba **Integrations** → **App Store Connect API**.
3. Se for a primeira vez, pode pedir pra você aceitar um termo — aceite.
4. Clique **Generate API Key** (ou o **+**).
5. Preencha:
   - **Name**: `EAS CI` (livre).
   - **Access**: role **App Manager** (suficiente pra build/submit; não
     precisa de Admin).
6. Clique **Generate**.
7. Uma linha nova aparece na tabela com:
   - **Key ID** — string curta, ex.: `ABC123DEFG`. **Anote.**
   - **Issuer ID** — um UUID no topo da página (é o mesmo pra todas as keys
     da conta), ex.: `69a6de70-...`. **Anote.**
   - Um botão **Download API Key** — clique **uma única vez**. O arquivo
     `.p8` (ex.: `AuthKey_ABC123DEFG.p8`) só pode ser baixado nesse momento;
     se perder, precisa gerar outra key.
8. Salve o arquivo `.p8` baixado em local seguro (não vai pro Git).

## Passo 5 — Converter o arquivo `.p8` pra base64

O GitHub Secrets só aceita texto, então o arquivo `.p8` precisa virar uma
string base64 antes de colar no secret.

**No Windows (PowerShell)**, com o arquivo baixado (ajuste o caminho):

```powershell
certutil -encode "C:\Users\myPC\Downloads\AuthKey_ABC123DEFG.p8" "C:\Users\myPC\Downloads\AuthKey_base64.txt"
```

Abra `AuthKey_base64.txt` num editor de texto, copie **só o conteúdo entre**
`-----BEGIN CERTIFICATE-----` **e** `-----END CERTIFICATE-----` (sem essas
linhas de cabeçalho/rodapé, só as linhas de texto no meio) — isso é o valor
do secret `ASC_API_KEY_P8_BASE64`.

> Alternativa mais simples: me avise que você tem o arquivo `.p8` pronto e eu
> te passo o comando exato rodando aqui no terminal, se preferir que eu faça
> essa conversão localmente (o arquivo não sai da sua máquina, só a
> transformação de formato).

## Passo 6 — Gerar o Expo Access Token

1. Acesse https://expo.dev e faça login com a conta que já tem o projeto
   `louvor-serafico` (ID `284adad1-985f-4fb9-975b-585181d1594d`).
2. Clique no seu avatar (canto superior direito) → **Account settings** (ou
   acesse diretamente https://expo.dev/accounts/[sua-conta]/settings/access-tokens).
3. Vá em **Access Tokens** → **Create Token**.
4. Dê um nome, ex.: `github-actions-ci`.
5. Copie o token gerado **na hora** (só aparece uma vez).
6. **Guarde.** Vai virar o secret `EXPO_TOKEN`.

## Passo 7 — Convidar os primeiros testers internos

1. Em appstoreconnect.apple.com, abra o app → **TestFlight** (menu lateral).
2. Em **Internal Testing**, clique **+** ao lado de "Testers" (ou crie um
   grupo primeiro, se pedir).
3. Adicione os Apple IDs (e-mails) das pessoas que vão testar — precisam ser
   usuários já convidados pra sua equipe no App Store Connect
   (**Users and Access → +**) com pelo menos o papel de "Developer" ou
   superior, OU testers internos simples (dependendo da versão da UI, o
   fluxo pode pedir pra convidar como membro da equipe primeiro).
4. Isso pode ficar pra depois do primeiro build também — não bloqueia o
   pipeline, só bloqueia quem consegue *instalar* a build depois de pronta.

## Passo 8 — Cadastrar os secrets no GitHub

1. Acesse https://github.com/louvorserafico-org/louvor-serafico/settings/secrets/actions.
2. Clique **New repository secret** pra cada linha da tabela abaixo.

| Nome exato do secret | Valor (o que você anotou) |
|---|---|
| `EXPO_TOKEN` | Token do Passo 6 |
| `APPLE_TEAM_ID` | Team ID do Passo 1 |
| `ASC_APP_ID` | Número do Passo 3 |
| `ASC_API_KEY_ID` | Key ID do Passo 4 |
| `ASC_API_KEY_ISSUER_ID` | Issuer ID do Passo 4 |
| `ASC_API_KEY_P8_BASE64` | Conteúdo base64 do Passo 5 |
| `EXPO_PUBLIC_SUPABASE_URL` | Mesmo valor do seu `.env.local` |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Mesmo valor do seu `.env.local` |
| `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Mesmo valor do seu `.env.local` |
| `EXPO_PUBLIC_SUPABASE_ASSET_BUCKET` | Mesmo valor do seu `.env.local` (ou `song-assets`) |
| `EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY` | Pode deixar vazio/placeholder por enquanto |

## Passo 9 — Verificar o ícone do app

1. Confira `apps/mobile/assets/icon.png` — está em 1200x1200px hoje.
2. A Apple/EAS espera 1024x1024px exato pro ícone da App Store.
3. Se você tiver a arte original, me manda (ou o arquivo redimensionado) e eu
   troco no repo — ou eu mesmo redimensiono o PNG atual se não houver perda
   perceptível de qualidade (ele já é quadrado, é só reamostrar).

## Passo 10 — Me avisar

Quando os Passos 1-9 estiverem prontos (secrets cadastrados no GitHub, ícone
resolvido), me avise. Eu então:

1. Completo `apps/mobile/eas.json` com o profile de submit.
2. Crio `.github/workflows/release-ios.yml`.
3. Rodamos o workflow manualmente juntos e acompanhamos o primeiro build.

---

## Checklist rápido (marque conforme for fazendo)

- [ ] Passo 1 — Team ID confirmado.
- [ ] Passo 2 — Bundle ID `com.louvorserafico.app` registrado.
- [ ] Passo 3 — App criado no App Store Connect + `ASC_APP_ID` anotado.
- [ ] Passo 4 — API Key gerada (`.p8` baixado, Key ID e Issuer ID anotados).
- [ ] Passo 5 — `.p8` convertido pra base64.
- [ ] Passo 6 — Expo Access Token gerado.
- [ ] Passo 7 — Testers internos convidados (pode ficar pra depois).
- [ ] Passo 8 — Todos os secrets cadastrados no GitHub.
- [ ] Passo 9 — Ícone 1024x1024 resolvido.
- [ ] Passo 10 — Avisou o Claude que está tudo pronto.
