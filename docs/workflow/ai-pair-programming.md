# AI Pair Programming

Este projeto sera desenvolvido com programacao em par assistida por IA,
inspirada em praticas de Extreme Programming, TDD, pequenos incrementos,
feedback frequente e documentacao viva.

## Papeis

Usuario:

- Dono do produto.
- Dono final da arquitetura.
- Curador liturgico e editorial.
- Validador de experiencia, conteudo e prioridade.

Codex:

- Par tecnico executor.
- Arquiteto colaborador.
- Responsavel por propor alternativas, implementar incrementos, rodar
  validacoes e manter rastreabilidade.
- Responsavel por atualizar documentacao viva a cada etapa.

## Contrato De Trabalho

- Nao fazer big bang changes.
- Nao implementar varias features de uma vez.
- Nao instalar dependencias sem justificativa.
- Nao criar abstracoes antes da necessidade real.
- Nao tratar codigo legado como fonte de verdade sem aprovacao.
- Nao aceitar "funcionou" sem validacao compativel com a etapa.
- Registrar problemas reais em `Hurdles & Fixes`.

## Ciclo Por Etapa

1. Ler `CODEX.md` e `docs/`.
2. Extrair requisitos, regras, limites e criterios de aceitacao.
3. Propor plano curto, com no maximo 10 itens.
4. Escrever testes primeiro quando houver comportamento testavel.
5. Implementar o minimo para passar.
6. Rodar validacoes.
7. Refatorar com seguranca.
8. Atualizar `CODEX.md`.
9. Encerrar com checklist DoD e sugestao de commit.

## Decisoes E Trade-Offs

Toda decisao relevante deve registrar:

- Decisao tomada.
- Motivo.
- Alternativa rejeitada.
- Por que a alternativa foi rejeitada.
- Nivel de reversibilidade.

## Regra Para Incerteza

Quando houver duvida:

- Se a decisao for arriscada ou irreversivel, pedir decisao do usuario.
- Se a decisao for pequena e reversivel, assumir a opcao mais simples e
  documentar.

## Output Esperado Em Cada Etapa

- Lista de arquivos alterados/criados.
- Testes adicionados e o que cobrem.
- Validacoes executadas.
- Atualizacao de `CODEX.md`.
- Checklist DoD.
- Sugestao de commit.
