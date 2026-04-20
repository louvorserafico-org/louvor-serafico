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

- [ ] App abre sem tela vermelha.
- [ ] Tab Hoje carrega.
- [ ] CTA "Abrir celebracao" navega.
- [ ] Cards da missa navegam.
- [ ] Detalhe da celebracao abre.
- [ ] Tab Repertorio carrega.
- [ ] Lista mostra seis cantos.
- [ ] Canto com material pendente aparece.
- [ ] Card de musica navega.
- [ ] Detalhe de musica abre.
- [ ] Tabs Calendario, Comunidade e Perfil abrem.
- [ ] Textos nao estouram.
- [ ] Scroll funciona.
- [ ] Nenhum erro aparece no Metro.

## Relato

Se houver erro, registrar:

- Tela.
- Acao feita.
- Resultado esperado.
- Resultado real.
- Log do Metro.
- Print, se possivel.
