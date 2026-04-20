# Rodar no Android local

Este guia resolve o erro visto ao rodar `corepack pnpm android`:

```text
could not connect to TCP port 5554
adb -s emulator-5554 emu avd name exited with non-zero code: 1
```

## Causa confirmada

O problema aconteceu porque BlueStacks e Android Studio estavam abertos ao
mesmo tempo. O Expo tentou usar um alvo Android exposto pelo ADB como
`emulator-5554`, mas esse alvo nao respondia ao console do Android Emulator na
porta TCP 5554.

No diagnostico local:

```powershell
adb devices -l
```

mostrou:

```text
emulator-5554 device product:NE2211 model:NE2211
```

O modelo `NE2211` indicava que o alvo nao era o AVD do Android Studio. O comando
abaixo falhou:

```powershell
adb -s emulator-5554 emu avd name
```

## Correcao rapida

Feche BlueStacks antes de rodar Expo.

No PowerShell:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" disconnect emulator-5554
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" devices -l
```

Depois disso, a lista deve ficar vazia ou mostrar apenas dispositivos reais.

## Abrir emulator correto

AVD encontrado nesta maquina:

```text
Medium_Phone_API_36.1
```

Abra pelo Android Studio:

```text
Android Studio > Device Manager > Medium_Phone_API_36.1 > Play
```

Ou pelo PowerShell:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd Medium_Phone_API_36.1
```

Espere o Android iniciar completamente.

Mantenha apenas o Android Studio aberto durante os testes do app.

## Validar emulator

Em outro PowerShell:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" devices -l
```

Resultado esperado:

```text
emulator-5554 device
```

E este comando deve retornar o nome do AVD:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" -s emulator-5554 emu avd name
```

## Rodar app

Na raiz do repo:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm android
```

## Alternativa segura

Se o `android` falhar, rode Metro sem tentar abrir o emulator automaticamente:

```powershell
cd C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico
$env:COREPACK_HOME='C:\Users\myPC\Desktop\dev\personal\frei-luis\louvor-serafico\.corepack'
corepack pnpm dev
```

Depois pressione:

```text
a
```

## Checklist

- [ ] Nenhum device fantasma aparece em `adb devices -l`.
- [ ] Emulator real foi aberto pelo Android Studio ou comando `emulator.exe`.
- [ ] `adb -s emulator-5554 emu avd name` retorna nome do AVD.
- [ ] `corepack pnpm android` roda a partir da raiz do repo.
