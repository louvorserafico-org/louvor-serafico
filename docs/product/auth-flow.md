# Fluxo Inicial De Autenticacao

Este documento registra a primeira decisao de UX para autenticacao.

## Objetivo

Preparar fluxo de entrada antes da implementacao real de login, sessao e regras
premium.

## Direcao Inicial

- Metodo inicial: email.
- Primeiro fluxo desejado: magic link ou OTP curto.
- Senha tradicional fica fora do MVP.
- Apple Sign In entra antes do lancamento iOS com compras reais.
- Google pode entrar depois da primeira versao autenticada.

## Dependencias

- Sessao valida no Supabase Auth.
- Persistencia local segura da sessao.
- Protecao de rotas premium.
- Modelo de usuario inicial.

## UX Inicial

- Tab `Perfil` mostra readiness da autenticacao.
- CTA leva para tela `Entrar`.
- Tela `Entrar` funciona como base visual e documental.
- Sem login real nesta etapa.

## Fora Do Escopo Agora

- cadastro real
- recuperacao de conta
- login social
- refresh token manual
- onboarding autenticado
