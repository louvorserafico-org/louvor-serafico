# Estrategia De TDD

TDD sera usado como padrao para regras de negocio, dominio e fluxos criticos.
O objetivo nao e burocracia; e criar confianca no crescimento do app.

## Ciclo

1. Red: escrever ou ajustar um teste que falha.
2. Green: implementar o minimo para passar.
3. Refactor: melhorar o codigo mantendo testes verdes.

## Onde TDD E Obrigatorio

- Ordem dos momentos da missa.
- Validacao de celebracao completa/incompleta.
- Montagem do repertório musical por celebracao.
- Filtros por data, tempo liturgico e tipo de celebracao.
- Classificacao premium/free.
- Liberacao de assets premium.
- Validacao de formularios.
- Permissoes de comentarios.
- Regras de assinatura.
- Normalizacao de slugs e nomes editoriais.

## Cobertura Minima Por Entrega

Quando houver comportamento testavel:

- Happy path.
- Um edge case.
- Um caso de erro, quando aplicavel.

## Onde Seremos Pragmaticos

UI puramente visual nao precisa comecar sempre por teste automatizado. Para o
inicio do app, validacoes manuais no Android Emulator podem ser suficientes para
telas simples. A logica por tras da UI, porem, deve ser testada.

## Exemplos De Testes De Dominio

- Dada a Missa do Santíssimo Nome de Jesus, os momentos devem aparecer na ordem
  Entrada, Salmo, Aclamacao, Ofertorio, Comunhao e Final.
- Dada uma celebracao sem musica em um momento obrigatorio, a validacao editorial
  deve marcar a celebracao como incompleta.
- Dado um usuario sem assinatura ativa, assets premium nao devem retornar URL de
  acesso.

## Excecao Da Etapa 0

A Etapa 0 e documental. Nao ha comportamento executavel novo; portanto, nao ha
teste automatizado nesta etapa. Esta excecao deve ficar registrada em
`CODEX.md`.
