# Preparacao RevenueCat

Etapa documental e de configuracao leve para assinatura real.

## Regra atual

- Expo Go continua sendo fluxo principal de teste.
- RevenueCat nao foi instalado nesta etapa.
- Chaves publicas futuras ficam em variaveis `EXPO_PUBLIC_`.
- SDK RevenueCat exigira development build quando entrar.

## Variaveis futuras

- `EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY`
- `EXPO_PUBLIC_REVENUECAT_GOOGLE_API_KEY`

## Motivo

RevenueCat depende de modulo nativo. Preparar configuracao agora reduz risco,
mas instalar o SDK antes do development build quebraria o ritmo atual com Expo
Go.
