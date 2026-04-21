# Validar Recuperacao De Senha

## Objetivo

Validar o fluxo de recuperacao de senha com Supabase Auth.

## Importante Sobre Expo Go

Expo Go nao e o ambiente ideal para validar o retorno completo por custom
scheme `louvor-serafico://recuperar-senha`.

No Expo Go, valide:

- botao `Esqueci minha senha`;
- envio do email pelo Supabase;
- mensagens de erro da tela `recuperar-senha` quando aberta sem sessao valida.

Para validar o fluxo completo email -> app -> nova senha, use development build
ou build instalada.

## Configuracao Supabase

Em Auth > URL Configuration > Redirect URLs, adicionar:

```text
louvor-serafico://recuperar-senha
louvor-serafico://auth/callback
```

## Validacao Parcial No Expo Go

1. Rodar o app:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm dev
```

2. Abrir no iPhone pelo Expo Go.
3. Ir para `Perfil`.
4. Abrir `Entrar`.
5. Digitar email existente.
6. Tocar `Esqueci minha senha`.
7. Confirmar mensagem `Email de recuperacao enviado.`
8. Confirmar recebimento do email.

## Validacao Da Tela Sem Sessao

Abrir manualmente a rota `recuperar-senha`, quando acessivel no ambiente de
teste, e tentar atualizar a senha.

Resultado esperado:

- senha curta mostra erro local;
- confirmacao diferente mostra erro local;
- senha valida sem sessao de recuperacao mostra erro do Supabase.

## Validacao Completa Em Development Build

1. Gerar development build:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm build:development:ios
```

2. Instalar development build no iPhone.
3. Garantir que o scheme `louvor-serafico` esta registrado.
4. Solicitar recuperacao de senha pelo app.
5. Abrir email no iPhone.
6. Tocar no link de recuperacao.
7. Confirmar que o app abre na tela `Redefinir senha`.
8. Informar nova senha e confirmacao.
9. Confirmar mensagem `Senha atualizada.`
10. Sair da conta, se necessario.
11. Entrar com a nova senha.

## DoD Manual

- [ ] Email de recuperacao enviado.
- [ ] Link usa redirect configurado.
- [ ] Tela `recuperar-senha` abre no ambiente correto.
- [ ] Senha curta bloqueada.
- [ ] Confirmacao divergente bloqueada.
- [ ] Senha atualizada com sessao valida.
- [ ] Login com nova senha funciona.
