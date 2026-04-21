# Catalogo Remoto De Musicas

Primeira tentativa de leitura remota de musicas.

## Estado Atual

- cliente consulta `public.songs`
- projeto responde `404`
- tabela ainda nao existe no schema remoto

## Decisao

- manter catalogo local
- expor estado remoto em `Repertorio`
- nao trocar fonte local antes do schema real
