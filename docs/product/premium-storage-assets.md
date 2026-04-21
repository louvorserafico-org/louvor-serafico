# Premium Storage Assets

## Objetivo

Preparar o app para abrir materiais armazenados no Supabase Storage usando links temporarios.

Esta etapa ainda nao fecha o modelo final de assinatura. Ela cria a base tecnica para:

- resolver se o usuario pode acessar um material;
- pedir um link temporario para o arquivo;
- abrir o link no dispositivo;
- manter o bucket configuravel por ambiente.

## Decisao

O bucket padrao sera `song-assets`, configuravel por:

```text
EXPO_PUBLIC_SUPABASE_ASSET_BUCKET=song-assets
```

O nome do bucket pode ser publico. Caminhos internos e arquivos premium continuam sendo tratados como conteudo protegido.

O bucket deve ser privado. A migration inicial de Storage esta em:

```text
supabase/migrations/20260421120000_create_song_assets_bucket.sql
```

## Segurança

O app agora possui uma funcao local para gerar signed URL via Supabase Storage.

Importante: para producao, conteudo premium nao deve depender apenas de estado local ou regra no cliente. O fluxo final recomendado e:

1. usuario autentica;
2. app consulta assinatura real;
3. app chama uma Edge Function ou backend interno;
4. backend valida assinatura no servidor;
5. backend gera signed URL curta;
6. app abre o arquivo.

Enquanto a assinatura real ainda nao existe, esta etapa deve ser vista como preparacao tecnica e UX de acesso, nao como protecao final de receita.

## UX atual

Na tela de musica:

- materiais bloqueados continuam exibindo mensagem premium;
- materiais liberados mostram botao `Abrir material`;
- ao tocar, o app tenta gerar um link temporario;
- se Storage nao estiver configurado, exibe mensagem clara.

## Hurdles & Fixes

- Evitamos criar policy permissiva no Storage agora, porque isso poderia liberar premium para qualquer usuario autenticado.
- Criamos apenas o bucket privado, sem leitura direta publica.
- Mantivemos signed URL com expiracao curta, inicialmente 300 segundos.
- O caminho final seguro deve passar por backend/Edge Function antes de monetizacao real.

## DoD

- [x] Resolver signed URL com TDD.
- [x] Bloquear premium sem acesso.
- [x] Retornar erro claro sem Storage.
- [x] Documentar risco de seguranca.
- [x] Manter Expo Go funcionando.
