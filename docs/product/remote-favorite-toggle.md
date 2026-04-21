# Sincronizacao remota de favoritos

Etapa prepara escrita remota em `favorite_songs`.

## Regra atual

- Se houver sessao Supabase real, toggle tenta salvar ou remover favorito remoto.
- Se nao houver sessao real, preview local continua disponivel.
- Provider recarrega favoritos remotos apos sucesso.

## Motivo

Migracao gradual precisa manter favorito local enquanto sessao teste ainda
convive com autenticacao real.
