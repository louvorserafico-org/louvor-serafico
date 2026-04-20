# Revisao visual Android

Use este checklist para validar o app no Android Studio Emulator.

## Preparacao

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm android
```

Mantenha apenas Android Studio aberto. Nao abrir BlueStacks junto.

## Checklist

- [x] App abre sem tela vermelha.
- [x] Tab Hoje carrega.
- [x] CTA "Abrir celebracao" navega.
- [x] Cards da missa navegam.
- [x] Detalhe da celebracao abre.
- [x] Tab Repertorio carrega.
- [x] Lista mostra seis cantos.
- [x] Canto com material pendente aparece.
- [x] Card de musica navega.
- [x] Detalhe de musica abre.
- [x] Tabs Calendario, Comunidade e Perfil abrem.
- [x] Textos nao estouram.
- [x] Scroll funciona.
- [x] Nenhum erro aparece no Metro.

## Relato

Se houver erro, registrar:

- Tela.
- Acao feita.
- Resultado esperado.
- Resultado real.
- Log do Metro.
- Print, se possivel.
