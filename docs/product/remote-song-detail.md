# Detalhe remoto de musica

Etapa prepara detalhe remoto com materiais cadastrados.

## Regra atual

- Tela tenta carregar musica remota por slug.
- Quando houver dados remotos, detalhe usa materiais remotos.
- Quando nao houver, fallback local continua ativo.

## Motivo

Catalogo remoto ja existe. Detalhe precisa carregar assets para preparar
controle premium e storage.
