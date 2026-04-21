# Checklist EAS E Apple

## Estado Atual

O comando de build iOS chegou ate a autenticacao Apple, mas foi bloqueado
porque a conta Apple ainda nao possui time associado.

Erro recebido:

```text
Authentication with Apple Developer Portal failed!
You have no team associated with your Apple account, cannot proceed.
(Do you have a paid Apple Developer account?)
```

## Causa

Para gerar build iOS fisica pelo EAS, a Apple exige uma conta Apple Developer
paga e vinculada a um Team.

## Comando Ja Preparado

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm build:development:ios
```

## Antes De Retomar

- [ ] Pagar Apple Developer Program.
- [ ] Confirmar que o Apple ID aparece com Team ativo.
- [ ] Confirmar acesso ao App Store Connect.
- [ ] Confirmar bundle id `com.louvorserafico.app`.
- [ ] Rodar novamente `corepack pnpm build:development:ios`.
- [ ] Permitir que EAS gerencie certificados/provisioning profiles.
- [ ] Instalar build no iPhone.
- [ ] Validar deep link `louvor-serafico://recuperar-senha`.

## Enquanto Apple Fica Pendente

Continuar desenvolvimento e validacao pelo Expo Go:

```powershell
corepack pnpm dev
```

Fluxos que seguem validaveis no Expo Go:

- login;
- cadastro;
- logout;
- leitura remota Supabase;
- favoritos;
- comentarios;
- acesso premium por assinatura manual;
- envio do email de recuperacao.

Fluxos bloqueados ate development build:

- retorno real por custom scheme;
- validacao completa de recuperacao de senha;
- RevenueCat;
- compras Apple/Google.
