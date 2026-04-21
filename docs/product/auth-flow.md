# Fluxo De Autenticacao

Este documento registra a direcao atual de UX para autenticacao.

## Objetivo

Permitir cadastro e login real com Supabase Auth usando email e senha.

## Direcao Inicial

- Metodo inicial: email e senha.
- Magic link foi removido do fluxo principal porque atrapalha testes locais e Expo Go.
- Telefone entra como dado de perfil, nao como SMS auth.
- Apple Sign In entra antes do lancamento iOS com compras reais.
- Google pode entrar depois da primeira versao autenticada.

## Dados Do Cadastro

Obrigatorios:

- nome completo;
- email;
- senha;
- telefone;
- estado;
- cidade.

Opcionais:

- paroquia;
- pastoral ou banda.

Esses dados sao enviados no `user_metadata` do Supabase Auth. A migration
`20260421200000_expand_profiles_for_registration.sql` prepara colunas em
`profiles` para persistir os mesmos dados quando o trigger `handle_new_user`
rodar.

Status remoto:

- migration aplicada via `supabase db push --linked --include-all --yes`;
- `profiles` possui colunas para telefone, estado, cidade, paroquia e pastoral/banda.

## Dependencias

- Sessao valida no Supabase Auth.
- Persistencia local segura da sessao, futura em development build.
- Protecao de rotas premium.
- Modelo de usuario inicial.

## UX Inicial

- Tab `Perfil` mostra estado de sessao.
- Card de estabilidade resume se sessao e perfil remoto estao coerentes.
- CTA leva para tela `Entrar`.
- Tela `Entrar` alterna entre login e cadastro.
- Login usa `signInWithPassword`.
- Cadastro usa `signUp` com metadata.
- Recuperacao inicial usa `resetPasswordForEmail` a partir do email digitado no login.
- Recuperacao envia `redirectTo` para `louvor-serafico://recuperar-senha`.
- Tela `recuperar-senha` permite definir nova senha quando ha sessao de recuperacao valida.

## Fora Do Escopo Agora

- personalizacao do template de email no Supabase
- login social
- refresh token manual
- onboarding autenticado
