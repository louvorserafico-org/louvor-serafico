# Paywall Preview

## Objetivo

Criar uma primeira experiencia clara de paywall no perfil, sem integrar pagamento real ainda.

O foco desta etapa e UX e regra de apresentacao:

- usuario anonimo deve ser chamado a entrar;
- usuario autenticado sem premium deve ser chamado a assinar;
- usuario premium deve entender que os materiais estao liberados.

## Decisao

O paywall atual continua usando estado local de preview.

Isso preserva Expo Go e evita antecipar RevenueCat antes do development build.

## Fluxo Atual

Na tab `Perfil`:

- o card de paywall aparece apos o bloco de conta;
- se nao houver sessao, o botao leva para `Entrar`;
- se houver sessao, o botao alterna o premium preview;
- materiais premium continuam sendo liberados conforme `hasActiveSubscription`.

## Limites

Este paywall nao processa compra real.

Fluxo real futuro:

1. development build;
2. SDK RevenueCat;
3. offering real;
4. entitlement real;
5. backend/Edge Function valida acesso premium.

## DoD

- [x] Copy de paywall testada.
- [x] Estados anonimo, autenticado e premium cobertos.
- [x] Card integrado ao perfil.
- [x] RevenueCat ainda nao instalado.
