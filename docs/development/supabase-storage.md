# Supabase Storage

## Bucket

Bucket inicial:

```text
song-assets
```

Configuracao:

- privado;
- limite inicial de 20 MB por arquivo;
- tipos permitidos: PDF, MP3, JPEG e PNG.

Migration:

```text
supabase/migrations/20260421120000_create_song_assets_bucket.sql
```

## Regra De Seguranca

O bucket nao deve ter leitura publica.

Tambem nao deve existir policy permitindo leitura direta para todo usuario autenticado. Isso permitiria que qualquer usuario logado acessasse arquivos premium sem passar pela regra de assinatura.

## Fluxo Seguro

1. App pede material premium.
2. Edge Function recebe usuario e `assetId`.
3. Edge Function valida assinatura.
4. Edge Function gera signed URL curta com service role.
5. App abre o link temporario.

## Aplicacao Manual

Se o CLI falhar por DNS, aplique a migration pelo Supabase Dashboard:

```text
SQL Editor -> New query
```

Execute:

```text
supabase/migrations/20260421120000_create_song_assets_bucket.sql
```

Se aparecer `must be owner of table objects`, confirme que a migration nao contem `comment on table storage.objects`. Usuarios do dashboard podem criar bucket e policies, mas nao sao donos da tabela interna `storage.objects`.

## Validacao

No SQL Editor:

```sql
select id, name, public, file_size_limit, allowed_mime_types
from storage.buckets
where id = 'song-assets';
```

Resultado esperado:

- `public = false`;
- `file_size_limit = 20971520`;
- bucket retornado.

## Upload Inicial

Os PDFs locais do repertório inicial podem ser enviados com:

```powershell
.\scripts\upload-song-assets.ps1
```

Guia:

```text
docs/development/upload-song-assets.md
```

## Limite Atual

O botao `Abrir material` chama a Edge Function `create-asset-signed-url`.

Ele ainda pode retornar erro enquanto a funcao nao estiver implantada ou enquanto o usuario nao tiver sessao Supabase real. Isso e esperado e seguro.

A funcao planejada foi criada em:

```text
supabase/functions/create-asset-signed-url/index.ts
```

Ela ja foi integrada ao app. O passo operacional pendente e o deploy remoto.
