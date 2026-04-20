# Definition Of Done

Definition of Done define quando uma etapa esta realmente pronta. O objetivo e
evitar falso pronto, reduzir regressao e manter o projeto sempre rastreavel.

## DoD Base

Uma etapa so esta pronta quando:

- O objetivo combinado foi entregue.
- O escopo nao cresceu sem aprovacao.
- Testes relevantes passam.
- TypeScript passa, quando houver codigo TypeScript.
- Lint/format passam, quando configurados.
- Nao ha TODO solto introduzido.
- Nao ha codigo morto introduzido.
- Erros e logs sao uteis, quando aplicavel.
- `CODEX.md` foi atualizado.
- Divergencias com `docs/` foram registradas.
- Hurdles reais foram documentados.
- O proximo passo ficou claro.

## DoD Para Documentacao

- Documento criado ou atualizado com objetivo claro.
- Decisoes e trade-offs registrados.
- Lacunas registradas.
- Links/paths importantes documentados.
- Nenhuma implementacao fora do escopo foi feita.

## DoD Para Codigo

- Testes criados antes da implementacao quando houver regra de negocio.
- Happy path coberto.
- Pelo menos um edge case coberto.
- Pelo menos um caso de erro coberto quando aplicavel.
- Implementacao minima para passar.
- Refatoracao pequena e segura, se necessaria.
- Sem secrets hardcoded.
- Sem dependencia nova sem justificativa.
- Scripts e comandos atualizados na documentacao quando mudarem.

## DoD Para UI Mobile

- Tela roda localmente.
- Layout foi validado no Android Emulator quando aplicavel.
- Estados de loading, vazio e erro foram considerados para telas com dados.
- Acessos premium/auth nao dependem apenas de bloqueio visual.
- Texto cabe nos elementos principais em telas pequenas.

## DoD Para Conteudo Editorial

- Celebracao tem data, nome, slug e classificacao.
- Celebracao tem template de missa associado.
- Momentos obrigatorios foram avaliados.
- Cada musica tem titulo normalizado, momento e fonte/asset quando houver.
- Arquivos brutos foram normalizados antes de virar conteudo publicado.
- Conteudo incompleto fica como draft.
- Problemas de direitos autorais/licenca ficam registrados.
