# Feed remoto de comentarios

Etapa criada para aproximar a aba `Comunidade` do comportamento remoto sem
perder o preview local.

## Regra atual

- Se Supabase responder comentarios remotos, a tela mostra comentarios remotos
  no topo.
- Comentarios locais continuam visiveis no mesmo aparelho.
- Se feed remoto vier vazio, preview local continua como fallback.
- Se leitura remota falhar, preview local continua ativo.

## Motivo

Comentarios locais ainda nao sao sincronizados com Supabase. Enquanto schema,
RLS e escrita remota nao estiverem completos, a experiencia mais segura e
manter feed misto e reversivel.
