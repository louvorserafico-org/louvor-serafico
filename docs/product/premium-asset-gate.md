# Gate premium de materiais

Etapa prepara bloqueio visual e regra central para materiais premium.

## Regra atual

- Material livre pode ser exibido sem autenticacao.
- Material premium exige assinatura ativa.
- Usuario autenticado sem assinatura ve chamada para assinar.
- Usuario anonimo ve chamada para entrar.

## Motivo

Antes de RevenueCat e storage privado, o app precisa centralizar regra de acesso
para nao espalhar `if premium` pelas telas.
