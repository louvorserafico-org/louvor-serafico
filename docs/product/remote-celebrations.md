# Calendario Remoto De Celebracoes

Primeira tentativa de leitura remota de celebracoes.

## Estado Atual

- cliente consulta `public.celebrations`
- projeto responde `404`
- tabela ainda nao existe no schema remoto

## Decisao

- manter calendario local
- expor estado remoto em `Calendario`
- nao trocar fonte local antes do schema real
