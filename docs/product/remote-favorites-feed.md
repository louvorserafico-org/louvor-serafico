# Feed remoto de favoritos

Etapa criada para unir preview local e favoritos remotos por usuario.

## Regra atual

- Favoritos remotos entram no conjunto final quando existirem.
- Favoritos locais continuam visiveis no mesmo aparelho.
- Se feed remoto vier vazio, preview local continua ativo.
- Se leitura remota falhar, preview local continua ativo.

## Motivo

Escrita remota ainda nao foi implementada. Enquanto isso, manter uniao entre
local e remoto evita perda de UX durante migracao gradual.
