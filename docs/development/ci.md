# CI

## Objetivo

Validar alteracoes que chegam na `main` com as mesmas verificacoes usadas localmente.

## Workflow

Arquivo:

```text
.github/workflows/ci.yml
```

Eventos:

- push em `main`;
- pull request direcionado para `main`.

A branch `dev` nao dispara CI. Ela fica livre para iteracoes locais e validacoes manuais durante o pareamento.

Checks:

- `pnpm install --frozen-lockfile`;
- `pnpm test`;
- `pnpm typecheck`;
- `pnpm lint`.

## Decisoes

Usamos Node 24 porque o ambiente local atual tambem usa Node 24.

Usamos Corepack e pnpm `10.10.0`, fixado no `packageManager` do projeto.

Nao adicionamos build mobile nesta etapa. O objetivo do CI inicial e proteger regras de dominio, TypeScript e checks leves. Build EAS deve ser uma etapa separada.

## DoD

- [x] Workflow criado.
- [x] Comandos locais refletidos no CI.
- [x] Sem secrets no workflow.
- [x] Sem build nativo prematuro.
