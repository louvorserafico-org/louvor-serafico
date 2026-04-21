# Fallback De Catalogos

Catalogos agora tentam remoto antes do local.

## Escopo Atual

- `Repertorio` tenta remoto
- `Calendario` tenta remoto
- fallback local automatico

## Regra

- remoto com dados ganha prioridade
- remoto vazio cai para local
- remoto com erro cai para local
