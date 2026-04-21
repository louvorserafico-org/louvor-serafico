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

## Deploy Futuro

Quando for usar CLI:

```powershell
npx supabase functions deploy create-asset-signed-url --project-ref engvbvdtdcveoebgrexl
```

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

A funcao precisa estar implantada no Supabase para o fluxo funcionar em dispositivo real.

Enquanto a funcao nao estiver implantada, o app continua seguro: ele nao expoe caminho privado nem tenta usar service role no cliente.
