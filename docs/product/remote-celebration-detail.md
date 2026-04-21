# Detalhe remoto de celebracao

Etapa prepara detalhe remoto com recomendacoes e musicas.

## Regra atual

- Tela tenta carregar celebracao remota por slug.
- Quando houver dados remotos, detalhe usa recomendacoes reais.
- Quando nao houver, fallback local continua ativo.

## Motivo

Calendario remoto ja existe. Detalhe precisa acompanhar mesma estrategia
incremental sem quebrar fluxo local.
