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
- Supabase CLI via npx

## Instalação

```bash
pnpm install
```

## Configuração do Supabase (Remoto)

### 1. Login no Supabase
```bash
npx supabase login
```

### 2. Vincular Projeto
```bash
npx supabase link --project-ref xfgrqnrvkjgmngcvtndi
```

### 3. Aplicar Migrations
```bash
npx supabase db push
```

## Rodar os Apps Localmente

```bash
pnpm dev
# Admin: http://localhost:3000
# Mobile: QRCode
```

## Deploy do Admin (GitHub Pages)

O Painel Admin está configurado para ser implantado automaticamente no GitHub Pages via GitHub Actions.

### Passos para ativar:
1. Vá para o repositório no GitHub.
2. Acesse **Settings > Pages**.
3. Em "Source", mantenha "Deploy from a branch" (mas a Action mudará isso para "GH Actions" automaticamente ou você pode selecionar "GitHub Actions" se disponível).
4. **Importante:** Configure as chaves do Supabase nos **Secrets** do repositório (Settings > Secrets and variables > Actions):
   - `NEXT_PUBLIC_SUPABASE_URL`: Sua URL do projeto.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Sua chave anônima (mesma do .env.local).

Ao fazer push na branch `main`, o workflow iniciará o build e deploy.

> **Nota:** Como o GitHub Pages serve em um subdiretório (se não usar domínio customizado), certifique-se de acessar pela URL correta fornecida pela Action. Se encontrar problemas de 404 em rotas profundas ao recarregar, lembre-se que é uma limitação de SPA em hospedagem estática, mas a navegação interna funcionará.

## Gestão de Acesso (Promover Admin)

```sql
select promote_admin_by_email('seu.email@exemplo.com');
```

Feito para honra e glória de Deus!
