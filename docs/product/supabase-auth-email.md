# Email Auth Supabase

Primeira camada real de autenticacao.

## Escopo Atual

- envio de acesso por email
- Supabase `signInWithOtp`
- sem sessao remota aplicada no resto do app

## Decisoes

- email como primeiro metodo real
- `shouldCreateUser: true`
- preview local continua separado

## Limites

- sem validacao de sessao autenticada nas telas
- sem logout real
- sem perfil remoto ainda
