# Development build

Etapa prepara o caminho para testar modulos nativos fora do Expo Go.

## Quando usar

Use development build quando entrarmos em:

- RevenueCat
- compras Apple/Google
- modulo nativo nao suportado pelo Expo Go
- comportamento real de assinatura
- validacao de custom scheme/deep links

## Fluxo atual

Expo Go continua sendo o fluxo principal:

```powershell
corepack pnpm dev
```

## Fluxo futuro

Rodar na raiz do monorepo:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm build:development:ios
```

Depois instalar build no iPhone e iniciar Metro:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm dev
```

No terminal Expo, usar modo development build quando necessario.

## Fluxo De Deep Links

1. Gerar e instalar development build no iPhone.
2. Iniciar Metro com `corepack pnpm dev`.
3. No terminal Expo, pressionar `s` se precisar alternar para development build.
4. Solicitar recuperacao de senha.
5. Abrir o link recebido por email no mesmo iPhone.
6. Confirmar abertura do app em `recuperar-senha`.

URLs que precisam estar no Supabase:

```text
louvor-serafico://recuperar-senha
louvor-serafico://auth/callback
```

## Observacao

Esta etapa nao instala RevenueCat. O objetivo e deixar EAS preparado sem quebrar
o ciclo atual de validacao com Expo Go.

## Bloqueio Atual

A build iOS depende de Apple Developer Program pago. Sem Team associado ao
Apple ID, o EAS interrompe a autenticacao no Apple Developer Portal.

Checklist:

- `docs/development/eas-apple-checklist.md`
