# Publicacao remota de comentarios

Etapa prepara escrita remota em `comments`.

## Regra atual

- Se houver sessao Supabase real, envio tenta publicar comentario remoto.
- Se nao houver sessao real, preview local continua disponivel com sessao teste.
- Feed remoto recarrega apos publicacao bem-sucedida.

## Motivo

Migracao precisa manter UX local enquanto autenticacao real ainda convive com
preview local.
