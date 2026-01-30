# Louvor Seráfico

Monorepo para o aplicativo de partituras e músicas sacras "Louvor Seráfico".

## Estrutura

- **apps/mobile**: Aplicativo Expo (React Native).
- **apps/admin**: Painel Administrativo (Next.js App Router).
- **packages/shared**: Schemas Zod, tipos TypeScript e utilitários.
- **packages/ui**: Componentes de UI e sistema de design.
- **supabase**: Migrations e seeds do banco de dados.

## Pré-requisitos

- Node.js >= 18
- PNPM (`npm install -g pnpm`)
- Supabase CLI (`npm install -g supabase`)

## Instalação

```bash
pnpm install
```

## Desenvolvimento Local

### 1. Iniciar Banco de Dados

```bash
supabase start
```
Isso iniciará o Postgres, Auth, Storage e aplicará as migrations automaticamente.

### 2. Configurar Variáveis de Ambiente

Copie os exemplos para os arquivos reais:

**Admin:**
```bash
cp apps/admin/.env.example apps/admin/.env.local
```
Preencha com as URLs fornecidas pelo `supabase start` (Studio URL, API URL, Anon Key).

**Mobile:**
```bash
cp apps/mobile/.env.example apps/mobile/.env
```

### 3. Rodar os Apps

Para rodar tudo junto:
```bash
pnpm dev
```

Ou individualmente:
```bash
# Admin
pnpm --filter admin dev

# Mobile
pnpm --filter mobile start
```

## Banco de Dados e Permissions (RLS)

O sistema utiliza Row Level Security (RLS) em todas as tabelas.

- **Leitura Pública**: Músicas publicadas, Assets de músicas publicadas, Tags e Stats.
- **Escrita**: Apenas Admins podem criar/editar músicas e assets.
- **Usuários**: Podem gerenciar seus próprios favoritos e avaliações.

### Promover Admin

Como não há interface pública para criar admins, você deve promover um usuário existente via SQL.

1. Faça Login/Signup no App ou Admin.
2. Rode o comando SQL no dashboard do Supabase (ou local):

```sql
select promote_admin_by_email('seu.email@exemplo.com');
```

## Checklist de Produção

- [ ] Configurar Projeto no Supabase Dashboard (Cloud).
- [ ] Linkar projeto local: `supabase link --project-ref seu-ref`.
- [ ] Pushar migrations: `supabase db push`.
- [ ] Configurar variáveis de ambiente no Vercel (Admin) e EAS (Mobile).
- [ ] Revisar políticas de Storage (Public vs Draft).

Feito para honra e glória de Deus!
