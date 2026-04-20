# Arquitetura Inicial

Este documento registra a direcao arquitetural inicial do Louvor Serafico.

## Decisao Principal

Usar um monorepo leve com foco inicial no app mobile.

O repositorio pode conter app, documentacao, pacotes compartilhados, schema,
migrations e funcoes futuras. Porem, o primeiro produto entregavel e o app
mobile.

## Stack Recomendada

- React Native.
- Expo.
- TypeScript.
- Expo Router.
- Supabase como BaaS.
- RevenueCat para assinaturas.
- TanStack Query para dados remotos/cache.
- Zustand para estado local simples.
- Zod para validacao.
- React Hook Form para formularios.
- Sentry futuramente para observabilidade.

## Backend

Supabase deve ser usado como Backend-as-a-Service:

- Postgres.
- Auth.
- Storage.
- Row Level Security.
- Migrations.
- Edge Functions quando necessario.

Supabase nao deve ser usado apenas como bucket/auth. O dominio liturgico-musical
e relacional e se beneficia de Postgres.

## Assinaturas

RevenueCat deve ser a camada principal para integrar assinaturas com Apple e
Google.

O app nao deve confiar apenas em estado local para liberar conteudo premium. O
backend deve validar entitlement ou manter estado derivado confiavel por webhook
quando a integracao chegar nessa etapa.

## Midia

No inicio:

- PDFs, partituras e audios premium em Supabase Storage.
- Buckets privados para conteudo premium.
- URLs assinadas temporarias.

Futuro possivel:

- Cloudflare R2/CDN se o volume de midia crescer.

## Estrutura Desejada

Estrutura alvo conceitual:

```text
louvor-serafico/
  apps/
    mobile/
  packages/
    shared/
    ui/
  supabase/
    migrations/
    seed/
    functions/
  docs/
    architecture/
    development/
    editorial/
    product/
    workflow/
  CODEX.md
  README.md
```

## Decisao Sobre Legado

O repositorio restaurado possui uma estrutura antiga. Ela nao sera usada como
fonte de verdade.

Alternativas:

1. Limpar o repositorio e recriar o esqueleto com Expo moderno.
2. Reaproveitar parcialmente a estrutura antiga.

Decisao recomendada:

- Preferir limpeza/substituicao controlada na etapa de bootstrap tecnico, com
  autorizacao explicita do usuario.

Motivo:

- Reduz risco de carregar decisoes antigas.
- Evita acoplamento com configuracoes que talvez nao reflitam o produto atual.
- Mantem rastreabilidade desde o novo inicio.

## Principios De Crescimento

- Comecar simples.
- Modelar dominio antes de telas complexas.
- Evitar backend proprio no MVP.
- Evitar admin completo no inicio.
- Criar testes para regras antes de multiplicar conteudo.
- Atualizar documentacao sempre que comandos ou estrutura mudarem.
