# Favoritos Locais

Este documento registra a primeira camada de favoritos no app.

## Objetivo

Liberar favoritos locais antes da persistencia real.

## Regras

- Favoritos existem apenas em memoria.
- Favoritos dependem de sessao teste ativa.
- Favoritos aparecem no Repertorio e no detalhe da musica.
- Reiniciar app limpa favoritos locais.

## Uso Atual

- Tela de musica permite salvar ou remover favorito.
- Tab `Repertorio` mostra contagem local.
- Card de musica mostra selo `Favorito`.

## Fora Do Escopo

- sincronizacao remota
- persistencia local
- favoritos por usuario real
