# Supabase setup

Guia inicial para preparar ambiente Supabase sem ainda integrar no app.

## Variaveis locais

Criar arquivo `.env.local` na raiz:

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE=
SUPABASE_DB_URL=
```

Regras:

- `EXPO_PUBLIC_*` podem ser lidas pelo app.
- `SUPABASE_SERVICE_ROLE` nao pode ir para bundle mobile.
- `SUPABASE_DB_URL` nao deve ser usada no app mobile.

## Link do projeto

Comando util:

```bash
supabase link --project-ref <project-ref>
```

## MCP

Referencia recebida do usuario:

```text
codex mcp add supabase --url https://mcp.supabase.com/mcp?project_ref=<project-ref>
```

Observacao:

- Nao foi configurado nesta etapa.
- Etapa atual e apenas documental.

## Proximo uso real

Supabase entra quando fizermos:

- schema inicial
- migrations
- auth
- leitura remota do catalogo
