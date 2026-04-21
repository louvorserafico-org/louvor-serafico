# Development build

Etapa prepara o caminho para testar modulos nativos fora do Expo Go.

## Quando usar

Use development build quando entrarmos em:

- RevenueCat
- compras Apple/Google
- modulo nativo nao suportado pelo Expo Go
- comportamento real de assinatura

## Fluxo atual

Expo Go continua sendo o fluxo principal:

```powershell
corepack pnpm dev
```

## Fluxo futuro

Rodar dentro do app mobile:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\apps\mobile
npx eas-cli build --profile development --platform ios
```

Depois instalar build no iPhone e iniciar Metro:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
corepack pnpm dev
```

No terminal Expo, usar modo development build quando necessario.

## Observacao

Esta etapa nao instala RevenueCat. O objetivo e deixar EAS preparado sem quebrar
o ciclo atual de validacao com Expo Go.
