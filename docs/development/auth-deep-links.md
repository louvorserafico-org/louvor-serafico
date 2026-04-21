# Deep Links De Autenticacao

## Objetivo

Registrar as URLs que o Supabase Auth pode usar para retornar ao app.

## Scheme Do App

O app usa o scheme definido em `apps/mobile/app.json`:

```text
louvor-serafico
```

## URLs Atuais

```text
louvor-serafico://recuperar-senha
louvor-serafico://auth/callback
```

## Uso Atual

A recuperacao de senha usa:

```text
louvor-serafico://recuperar-senha
```

Essa URL e enviada no `redirectTo` de `resetPasswordForEmail`.

## Configuracao No Supabase

Adicionar em Auth > URL Configuration > Redirect URLs:

```text
louvor-serafico://recuperar-senha
louvor-serafico://auth/callback
```

## Limite Atual

A rota interna `recuperar-senha` foi criada e chama `auth.updateUser` para
trocar a senha quando o app recebe uma sessao valida pelo link de recuperacao.

Se o usuario abrir a tela manualmente, sem vir do email, o Supabase deve
retornar erro de sessao ausente.
