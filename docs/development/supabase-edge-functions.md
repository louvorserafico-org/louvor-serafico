# Supabase Edge Functions

## Funcao Inicial

Primeira funcao:

```text
create-asset-signed-url
```

Arquivo:

```text
supabase/functions/create-asset-signed-url/index.ts
```

## Objetivo

Gerar signed URL curta para arquivos do bucket privado `song-assets`.

## Contrato

Metodo:

```text
POST
```

Body:

```json
{
  "assetId": "uuid-do-asset"
}
```

Resposta de sucesso:

```json
{
  "expiresIn": 300,
  "signedUrl": "https://..."
}
```

## Regras

- exige `Authorization: Bearer <access_token>`;
- busca o usuario pelo token;
- busca `song_assets` por `assetId`;
- bloqueia asset nao publicado;
- se asset for premium, exige assinatura ativa em `subscriptions`;
- gera signed URL com expiracao de 300 segundos.

## Deploy

Comando usado:

```powershell
npx supabase functions deploy create-asset-signed-url --project-ref engvbvdtdcveoebgrexl --no-verify-jwt
```

Status atual:

- Supabase CLI autenticado localmente;
- funcao `create-asset-signed-url` implantada no projeto `engvbvdtdcveoebgrexl`;
- deploy validado pelo output do CLI em 2026-04-21.

Nota:

- `--no-verify-jwt` e necessario porque o gateway da Edge Function nao aceitou o token ES256 antes da funcao executar;
- a funcao continua exigindo `Authorization`;
- a validacao da sessao acontece dentro da funcao via `auth/v1/user`.

## Validacao Remota

Comando usado para listar funcoes:

```powershell
npx supabase functions list --project-ref engvbvdtdcveoebgrexl
```

Resultado esperado:

- `create-asset-signed-url`;
- status `ACTIVE`.

Smoke test sem autenticacao:

```powershell
Invoke-WebRequest -Uri "https://engvbvdtdcveoebgrexl.functions.supabase.co/create-asset-signed-url" -Method Post -ContentType "application/json" -Body '{"assetId":"00000000-0000-0000-0000-000000000000"}'
```

Resultado observado:

- HTTP `401`;
- mensagem do gateway: `Missing authorization header`.

Esse resultado e esperado. A plataforma bloqueia a chamada sem `Authorization` antes da funcao executar.

Smoke test de preflight:

```powershell
Invoke-WebRequest -Uri "https://engvbvdtdcveoebgrexl.functions.supabase.co/create-asset-signed-url" -Method Options
```

Resultado observado:

- HTTP `200`;
- body `ok`.

Secrets esperados no ambiente Supabase:

- `SUPABASE_URL`;
- `SUPABASE_SERVICE_ROLE_KEY`.

Esses secrets sao providos pelo ambiente Supabase em Edge Functions. Nao devem ir para o app mobile.

## Integracao Mobile

O app mobile chama esta funcao quando o usuario toca em `Abrir material` em um asset liberado pelo gate premium.

URL esperada:

```text
https://<project-ref>.functions.supabase.co/create-asset-signed-url
```

O app envia:

- `Authorization: Bearer <access_token>` da sessao Supabase real;
- body JSON com `assetId`.

Sem sessao Supabase real, o app retorna erro claro e nao tenta abrir o arquivo.

## Limites

O deploy ja foi realizado, mas o fluxo completo ainda depende de:

- usuario com sessao Supabase real;
- asset cadastrado em `song_assets`;
- arquivo existente no bucket privado `song-assets`;
- assinatura ativa em `subscriptions` para assets premium.

Sem essas condicoes, o app deve retornar erro claro e permanecer seguro.
