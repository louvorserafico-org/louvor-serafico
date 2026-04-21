# Rodar No iPhone Com Expo Go

Este guia descreve o fluxo padrao de teste manual no iPhone usando Expo Go.

## Pre-requisitos

- iPhone conectado na mesma rede Wi-Fi do computador.
- App Expo Go instalado no iPhone.
- Projeto com dependencias instaladas.
- Terminal aberto na raiz do repositorio.

## Workspace

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
```

## Iniciar Metro

```powershell
corepack pnpm dev
```

Esperado:

- terminal mostra QR code
- Metro sobe em `exp://...:8081`

## Abrir No iPhone

1. Abrir Expo Go.
2. Escanear QR code mostrado no terminal.
3. Aguardar bundle inicial.

## Comandos Uteis No Terminal

- `s`: trocar modo no Expo CLI.
- `r`: recarregar app.
- `m`: abrir menu do Expo.
- `j`: abrir debugger.

## Fluxo De Teste Atual

1. Rodar `corepack pnpm dev`.
2. Abrir app no Expo Go.
3. Navegar ate tab `Perfil`.
4. Validar card local do Supabase.
5. Validar card de leitura remota do Supabase.

## Se QR Code Nao Funcionar

1. Confirmar mesma rede Wi-Fi.
2. Fechar e reabrir Expo Go.
3. Parar Metro com `Ctrl + C`.
4. Rodar `corepack pnpm dev` novamente.
5. Pressionar `s` se precisar trocar modo no Expo CLI.

## Se Bundle Travar

1. Pressionar `r` no terminal.
2. Fechar Expo Go e abrir novamente.
3. Reiniciar Metro.

## Se Supabase Aparecer Pendente

Se a tab `Perfil` mostrar `Supabase pendente`, reinicie o Metro limpando cache:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\apps\mobile
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm start -- --clear
```

O app mobile le `.env.local` da raiz do monorepo via `app.config.js`. Somente variaveis `EXPO_PUBLIC_*` entram no bundle.

## Checklist Rapido

- [ ] Metro iniciado sem erro.
- [ ] QR code exibido.
- [ ] Expo Go abriu app.
- [ ] Navegacao basica funcionando.
- [ ] Tab `Perfil` abriu.
- [ ] Estado local Supabase visivel.
- [ ] Leitura remota Supabase visivel.

## Recuperacao De Senha

Expo Go permite validar o envio do email de recuperacao, mas o retorno completo
por `louvor-serafico://recuperar-senha` deve ser validado em development build.

Guia:

- `docs/development/validate-password-recovery.md`
