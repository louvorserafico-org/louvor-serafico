# Grant Test Subscription

## Objetivo

Ativar uma assinatura premium manual para teste real do fluxo:

```text
app -> Edge Function -> subscriptions -> Storage signed URL
```

Esse fluxo e temporario. A fonte definitiva de assinatura sera RevenueCat.

## Script

```text
scripts/grant-test-subscription.ps1
```

## Pre-requisitos

- `.env.local` com `EXPO_PUBLIC_SUPABASE_URL`;
- `.env.local` com `SUPABASE_SERVICE_ROLE`;
- usuario ja autenticado ao menos uma vez no app;
- linha correspondente criada em `public.profiles`.

## Encontrar Profile ID

No app:

```text
Perfil -> User ID
```

Use esse valor como `ProfileId`.

## Ativar Premium De Teste

```powershell
.\scripts\grant-test-subscription.ps1 -ProfileId "uuid-do-user"
```

Opcionalmente, mudar validade:

```powershell
.\scripts\grant-test-subscription.ps1 -ProfileId "uuid-do-user" -Days 7
```

## Comportamento

- valida se `profiles.id` existe;
- procura assinatura `manual_test` com entitlement `premium_content`;
- atualiza se ja existir;
- cria se nao existir;
- marca status como `active`;
- define `expires_at` em UTC.

## Seguranca

O script usa service role localmente.

Ele nao deve ser chamado pelo app mobile e nao substitui RevenueCat.

## Validacao No App

1. Iniciar app no Expo Go.
2. Entrar com email real.
3. Copiar `User ID` na tela Perfil.
4. Rodar o script.
5. No Perfil, manter premium preview ativo se necessario para liberar a UI atual.
6. Abrir uma musica.
7. Tocar em `Abrir material`.

Resultado esperado:

- Edge Function valida assinatura ativa;
- app recebe signed URL;
- PDF abre no dispositivo.
