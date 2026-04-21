param(
  [Parameter(Mandatory = $true)]
  [string]$ProfileId,

  [int]$Days = 30
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

if ($ProfileId -notmatch "^[0-9a-fA-F-]{36}$") {
  throw "ProfileId deve ser UUID."
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $repoRoot ".env.local"

if (-not (Test-Path $envFile)) {
  throw ".env.local nao encontrado na raiz do projeto."
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

$profileResponse = Invoke-WebRequest `
  -Uri "$supabaseUrl/rest/v1/profiles?id=eq.$ProfileId&select=id,display_name" `
  -Headers $headers `
  -Method Get

$profiles = $profileResponse.Content | ConvertFrom-Json

if ($profiles.Count -eq 0) {
  throw "Profile nao encontrado. Primeiro faca login real no app para criar profiles.id."
}

$expiresAt = (Get-Date).ToUniversalTime().AddDays($Days).ToString("o")
$existingResponse = Invoke-WebRequest `
  -Uri "$supabaseUrl/rest/v1/subscriptions?profile_id=eq.$ProfileId&provider=eq.manual_test&entitlement=eq.premium_content&select=id" `
  -Headers $headers `
  -Method Get

$existing = $existingResponse.Content | ConvertFrom-Json
$body = @{
  provider = "manual_test"
  customer_id = "manual-test-$ProfileId"
  entitlement = "premium_content"
  status = "active"
  expires_at = $expiresAt
} | ConvertTo-Json -Compress

$writeHeaders = @{
  apikey = $serviceRole
  Authorization = "Bearer $serviceRole"
  Prefer = "return=representation"
}

if ($existing.Count -gt 0) {
  $subscriptionId = $existing[0].id
  $response = Invoke-WebRequest `
    -Uri "$supabaseUrl/rest/v1/subscriptions?id=eq.$subscriptionId&select=id,profile_id,status,expires_at" `
    -Headers $writeHeaders `
    -Method Patch `
    -ContentType "application/json" `
    -Body $body
} else {
  $insertBody = @{
    profile_id = $ProfileId
    provider = "manual_test"
    customer_id = "manual-test-$ProfileId"
    entitlement = "premium_content"
    status = "active"
    expires_at = $expiresAt
  } | ConvertTo-Json -Compress

  $response = Invoke-WebRequest `
    -Uri "$supabaseUrl/rest/v1/subscriptions?select=id,profile_id,status,expires_at" `
    -Headers $writeHeaders `
    -Method Post `
    -ContentType "application/json" `
    -Body $insertBody
}

$response.Content
