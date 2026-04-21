# Persistencia Local De Preview

Este documento registra persistencia local para estados de preview.

## Objetivo

Manter sessao teste, favoritos e comentarios entre reloads.

## Solucao Atual

- AsyncStorage no app mobile.
- Sessao teste persistida localmente.
- Favoritos persistidos localmente.
- Comentarios locais persistidos localmente.

## Escopo Atual

- preview local
- sem backend
- sem sincronizacao
- sem criptografia adicional

## Limites

- dados podem ser limpos ao remover app
- nao representa sessao real
- nao substitui Supabase Auth
