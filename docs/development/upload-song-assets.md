# Upload Song Assets

## Objetivo

Enviar os PDFs locais do modelo inicial para o bucket privado `song-assets`.

O script usa os registros remotos de `song_assets` como fonte do `storage_path`.
Isso evita divergencia entre o nome local do arquivo e o caminho esperado pela Edge Function.

## Script

```text
scripts/upload-song-assets.ps1
```

## Pre-requisitos

- `.env.local` na raiz do projeto;
- `EXPO_PUBLIC_SUPABASE_URL` configurado;
- `SUPABASE_SERVICE_ROLE` configurado;
- bucket privado `song-assets` criado;
- seed remoto aplicado;
- PDFs disponiveis em `C:\Users\myPC\Desktop\dev\personal\frei-luis`.

O service role e lido apenas do `.env.local`. Ele nao deve ser impresso nem versionado.

## Dry Run

```powershell
.\scripts\upload-song-assets.ps1 -DryRun
```

## Upload

```powershell
.\scripts\upload-song-assets.ps1
```

## Comportamento

- consulta `song_assets` publicados do tipo `score_pdf`;
- encontra o PDF local correspondente pelo slug da musica;
- faz upload para `song-assets/<storage_path>`;
- usa `x-upsert: true`, portanto pode ser executado novamente.

## Normalizacao De Caminhos

O arquivo local de `por-teu-nome-o-senhor` veio com encoding instavel no nome.

O caminho remoto foi normalizado para:

```text
Por teu nome, o Senhor.pdf
```

Migration:

```text
supabase/migrations/20260421193000_normalize_por_teu_nome_asset_path.sql
```

## Validacao

No Supabase Dashboard:

```text
Storage -> song-assets
```

Resultado esperado:

- PDFs visiveis no bucket privado;
- nomes iguais aos `storage_path` cadastrados em `song_assets`.

Validacao remota executada em 2026-04-21:

- `Aleluia, bendizei o seu nome.pdf`;
- `Benndito seja o nome do Senhor (Salmo Responsotial).pdf`;
- `Fazei em Nomedo Senhor.pdf`;
- `Por teu nome, o Senhor.pdf`;
- `Vamos em nome do Senhor.pdf`.

## Hurdle Resolvido

O primeiro upload real falhou no asset `por-teu-nome-o-senhor`.

Causa:

- `storage_path` remoto tinha caracteres invalidos para chave do Storage.

Correcao:

- migration `20260421193000_normalize_por_teu_nome_asset_path.sql`;
- patch remoto aplicado no registro de `song_assets`;
- upload reexecutado com sucesso.

## Proximo Passo

Depois do upload, o teste real da Edge Function ainda precisa de:

- usuario autenticado no app;
- registro em `profiles`;
- assinatura ativa em `subscriptions` para o usuario;
- toque em `Abrir material` no app.
