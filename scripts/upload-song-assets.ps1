param(
  [string]$ReferenceDir = "C:\Users\myPC\Desktop\dev\personal\frei-luis",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Read-EnvFile {
  param([string]$Path)

  $values = @{}
  Get-Content $Path | ForEach-Object {
    if ($_ -match "^\s*#" -or $_ -notmatch "=") {
      return
    }

    $parts = $_.Split("=", 2)
    $values[$parts[0].Trim()] = $parts[1].Trim()
  }

  return $values
}

function Escape-StoragePath {
  param([string]$Path)

  return ($Path -split "/" | ForEach-Object {
    [System.Uri]::EscapeDataString($_)
  }) -join "/"
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $repoRoot ".env.local"

if (-not (Test-Path $envFile)) {
  throw ".env.local nao encontrado na raiz do projeto."
}

if (-not (Test-Path $ReferenceDir)) {
  throw "Pasta de referencia nao encontrada: $ReferenceDir"
}

$envValues = Read-EnvFile $envFile
$supabaseUrl = $envValues["EXPO_PUBLIC_SUPABASE_URL"]
$serviceRole = $envValues["SUPABASE_SERVICE_ROLE"]

if (-not $supabaseUrl -or -not $serviceRole) {
  throw "EXPO_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE sao obrigatorios em .env.local."
}

$headers = @{
  apikey = $serviceRole
  Authorization = "Bearer $serviceRole"
}

$sourcePatternsBySlug = @{
  "fazei-em-nome-do-senhor" = "Fazei em Nomedo Senhor.pdf"
  "bendito-seja-o-nome-do-senhor" = "Benndito seja o nome do Senhor*.pdf"
  "aleluia-bendizei-o-seu-nome" = "Aleluia, bendizei o seu nome.pdf"
  "por-teu-nome-o-senhor" = "Por teu nome*.pdf"
  "vamos-em-nome-do-senhor" = "Vamos em nome do Senhor.pdf"
}

$assetsUri = "$supabaseUrl/rest/v1/song_assets?select=storage_path,songs(slug)&asset_type=eq.score_pdf&status=eq.published"
$assets = Invoke-RestMethod -Uri $assetsUri -Headers $headers -Method Get

foreach ($asset in $assets) {
  $slug = $asset.songs.slug
  $storagePath = $asset.storage_path

  if (-not $sourcePatternsBySlug.ContainsKey($slug)) {
    Write-Output "SKIP $slug sem mapeamento local."
    continue
  }

  $sourcePattern = $sourcePatternsBySlug[$slug]
  $sourceFile = Get-ChildItem -Path $ReferenceDir -File -Filter $sourcePattern | Select-Object -First 1

  if (-not $sourceFile) {
    throw "Arquivo local nao encontrado para $slug com padrao $sourcePattern."
  }

  $escapedPath = Escape-StoragePath $storagePath
  $uploadUri = "$supabaseUrl/storage/v1/object/song-assets/$escapedPath"

  if ($DryRun) {
    Write-Output "DRY-RUN $($sourceFile.Name) -> song-assets/$storagePath"
    continue
  }

  $uploadHeaders = @{
    apikey = $serviceRole
    Authorization = "Bearer $serviceRole"
    "x-upsert" = "true"
  }

  Invoke-WebRequest `
    -Uri $uploadUri `
    -Headers $uploadHeaders `
    -Method Post `
    -ContentType "application/pdf" `
    -InFile $sourceFile.FullName `
    | Out-Null

  Write-Output "UPLOADED $($sourceFile.Name) -> song-assets/$storagePath"
}
