# Sessao Local De Preview

Este documento registra a sessao fake controlada usada antes do login real.

## Objetivo

Liberar UX condicionada para favoritos e comentarios sem depender de Auth real.

## Regras

- Sessao local nao representa autenticacao valida.
- Sessao local existe apenas para acelerar UX e navegacao protegida.
- Favoritos e comentarios continuam sem persistencia.
- Estados possiveis: `guest`, `signed_in`, `booting`.

## Uso Atual

- Tab `Perfil` pode ativar ou encerrar sessao teste.
- Tela de musica libera card de favoritos quando sessao teste esta ativa.
- Tab `Comunidade` libera estado de comentario quando sessao teste esta ativa.

## Fora Do Escopo

- token real
- refresh session
- persistencia segura
- RLS
- perfil remoto do usuario
