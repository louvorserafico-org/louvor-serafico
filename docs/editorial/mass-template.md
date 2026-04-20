# Modelo Editorial Da Missa

Este documento registra o modelo liturgico-musical inicial para o Louvor
Serafico.

## Principio

O app nao deve ser apenas um catalogo de musicas. O dominio principal e a
celebracao liturgica; a musica aparece em funcao da celebracao e do momento da
missa.

## Missa Padrao

Ordem inicial:

1. Canto de entrada.
2. Salmo Responsorial.
3. Aclamacao ao Evangelho.
4. Apresentacao das oferendas.
5. Canto de comunhao.
6. Canto final.

Nomes tecnicos sugeridos para codigo futuro:

```text
entrance_chant
responsorial_psalm
gospel_acclamation
offertory
communion_chant
final_chant
```

## Caso Editorial Inicial

Data:

```text
03 de janeiro
```

Celebracao:

```text
Missa do Santissimo Nome de Jesus
```

Roteiro:

```text
1. Canto de entrada
   Fazei em nome do Senhor

2. Salmo Responsorial
   Bendito seja o nome do Senhor

3. Aclamacao ao Evangelho
   Aleluia, bendizei o seu nome

4. Apresentacao das oferendas
   Invocando o nome do Senhor

5. Canto de comunhao
   Por teu nome, o Senhor

6. Canto final
   Vamos em nome do Senhor
```

## PDFs Encontrados Na Pasta De Referencia

Pasta:

```text
C:\Users\myPC\Desktop\dev\personal\frei-luis
```

Arquivos observados:

```text
Aleluia, bendizei o seu nome.pdf
Benndito seja o nome do Senhor (Salmo Responsotial).pdf
Fazei em Nomedo Senhor.pdf
Por teu nome, Ã³ Senhor.pdf
Vamos em nome do Senhor.pdf
```

## Lacunas Editoriais Encontradas

- O PDF de `Invocando o nome do Senhor` nao foi encontrado na pasta de
  referencia.
- `Benndito` provavelmente deveria ser `Bendito`.
- `Responsotial` provavelmente deveria ser `Responsorial`.
- `Nomedo` provavelmente deveria ser `Nome do`.
- `Ã³` indica possivel problema de encoding em `o` com acento.

## Regra Editorial Recomendada

Conteudo bruto nao deve entrar direto no app. Antes de publicar, cada item deve
passar por normalizacao editorial:

- Titulo normalizado.
- Slug.
- Momento da missa.
- Celebracao.
- Tipo de asset.
- Status editorial.
- Fonte/autoria/licenca.

## Extensoes Futuras

Datas ou celebracoes especiais, como Pascoa, Natal, Assuncao de Nossa Senhora e
festas franciscanas, devem poder:

- Usar a missa padrao.
- Adicionar momentos especiais.
- Destacar sugestoes especificas.
- Sobrescrever a obrigatoriedade de algum momento, quando fizer sentido.

Isso deve ser modelado como extensao do template, nao como lista solta.
