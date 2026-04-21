# Favoritos remotos

Leitura remota inicial dos favoritos por usuario autenticado.

## Regra atual

- Sem sessao Supabase, a tela mostra estado aguardando autenticacao.
- Com sessao valida, app tenta ler `favorite_songs`.
- Se tabela ainda nao existir, preview local continua sendo fonte principal.

## Objetivo

Preparar transicao dos favoritos em memoria para favoritos por usuario.
