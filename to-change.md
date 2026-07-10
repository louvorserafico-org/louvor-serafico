## Escopo consolidado

Este arquivo reorganiza as mudancas solicitadas.

Objetivo:
- migrar o calendario atual para um calendario franciscano utilitario;
- incorporar o Santoral Franciscano como base principal;
- manter o app simples para consulta diaria;
- separar o que sera livre e o que sera premium.

## Fonte analisada

Arquivo:
- `C:\Users\myPC\Desktop\dev\personal\frei-luis\santoral-completo.pdf`

Recorte validado:
- pagina 37: inicio do calendario completo;
- paginas 37 a 44: indice anual do Santoral;
- pagina 45: inicio do Proprio da Familia Franciscana;
- pagina 46: primeiro dia completo utilizavel como modelo de extracao;

Conclusao da leitura:
- paginas 37 a 44 servem como base de indexacao anual;
- pagina 46 mostra o padrao do conteudo diario;
- para o app, por enquanto, usaremos apenas:
  - data;
  - nome do santo/dia;
  - classificacao liturgica visivel no topo;
  - primeiro bloco historico/narrativo do dia;
- nao usaremos agora:
  - invitatorio;
  - hinos;
  - salmodia;
  - antifonas;
  - leitura integral do oficio;
  - blocos liturgicos posteriores ao primeiro texto historico.

## Regra editorial do Santoral

Cada data franciscana devera possuir:
- identificador da data;
- nome principal do santo/dia;
- familia/categoria;
- classificacao liturgica;
- texto curto historico inicial;
- indicacao de disponibilidade de roteiro;
- indicacao de premium quando houver pagina detalhada.

Observacao:
- mesmo sem roteiro musical, a data precisa existir no calendario;
- o calendario deve exibir a data franciscana de qualquer forma;
- o roteiro musical e camada adicional.

## Calendario franciscano

### Objetivo

Substituir o foco do calendario atual.

Hoje:
- calendario liturgico geral com destaque para celebracoes cadastradas.

Novo alvo:
- calendario franciscano como calendario principal;
- mostrar apenas datas franciscanas no mes;
- datas de preceito da Igreja ficam como excecao complementar;
- toda data franciscana deve ser listada mesmo sem repertorio.

### Regras funcionais

- o calendario mensal deve mostrar somente datas franciscanas;
- datas de preceito da Igreja podem aparecer, mas sem roubar o foco do Santoral;
- datas com repertorio devem ter destaque visual mais forte;
- datas sem repertorio continuam clicaveis;
- ao clicar:
  - se houver roteiro, abrir fluxo atual da celebracao;
  - se nao houver roteiro, abrir detalhe do santo/dia;

### Filtros previstos

Categorias:
- Martir
- Virgem
- Doutor
- Pastor
- Santos homens
- Santas mulheres

Observacao tecnica:
- essa taxonomia ainda precisa ser normalizada no dominio;
- o PDF nao entrega esse filtro pronto em formato de categoria unica consistente;
- sera necessario definir mapeamento interno.

### Impacto tecnico

- novo dominio de santoral;
- ajuste do month view;
- nova logica de clique por tipo de data;
- coexistencia entre:
  - data franciscana;
  - data com roteiro;
  - data de preceito.

## Home

### Objetivo

Adicionar o Santo do dia.

### Regras

- a Home deve exibir o santo do dia conforme o Santoral;
- se o dia nao tiver santo franciscano, definir fallback editorial;
- quando houver detalhe disponivel:
  - mostrar nome;
  - mostrar acesso ao detalhe;
- quando houver roteiro no mesmo dia:
  - harmonizar santo do dia com celebracao do dia.

### Impacto

- reorganizacao do topo ou do card principal;
- nova dependencia do dominio santoral;
- decisao futura sobre o que fica livre e premium.

## Pagina dedicada do santo

### Objetivo

Criar pagina propria para cada santo/dia franciscano.

### Conteudo minimo

- nome do santo/dia;
- data;
- classificacao liturgica;
- primeira secao historica do PDF;
- imagem/foto quando houver fonte definida;

### Escopo atual do PDF

Do PDF, por enquanto, interessa apenas:
- primeiro bloco narrativo apos o titulo da data.

Exemplo observado:
- pagina 46:
  - data;
  - titulo `Santissimo Nome de Jesus`;
  - classificacao;
  - primeiro bloco historico;
- todo o restante da pagina nao entra nesta fase.

### Regra premium

Este conteudo devera estar em camada premium.

Ponto em aberto:
- decidir se a Home mostra apenas teaser;
- decidir se a pagina bloqueia inteira ou parcialmente;
- decidir se o nome do santo continua publico.

## Base CNBB

### Intencao

Atualizar base do calendario com referencia CNBB.

### Necessidade de clarificacao

Ainda precisa ser definido:
- se CNBB sera fonte primaria;
- se CNBB sera apenas cruzamento de validacao;
- como conciliar CNBB com o Santoral Franciscano;
- se a base sera manual, local ou remota.

### Risco

Sem essa definicao:
- calendario pode nascer com duplicidade de criterio;
- pode haver conflito entre calendario geral e franciscano.

## Repertorio

### Ajuste solicitado

Listar musicas por ordem alfabetica.

### Impacto

- revisar fonte local e remota;
- revisar interacao com busca;
- revisar interacao com favoritos;
- confirmar se favoritos continuam so marcacao visual ou alteram a ordem.

## Cadastro

### Ajustes visuais e funcionais

- adicionar visualizacao de senha;
- normalizar todos os campos;
- melhorar consistencia de entrada.

### Novos campos / novos valores

Campo novo:
- Familia

Valores:
- OFMConv.
- OFM
- OFMCap.
- TOR
- OSC
- OFS
- Leigo
- Outros

Campo atual:
- Paroquia

Substituir por:
- Jurisdicao

Valores esperados:
- Provincia
- Mosteiro
- Convento
- Fraternidade
- Paroquia

### Impacto tecnico

- `RegistrationForm`
- validacao
- copy
- inputs do formulario
- normalizadores
- possivel ajuste no metadata salvo no Supabase

Ponto em aberto:
- se `Jurisdicao` sera campo livre com sugestao;
- ou select fechado;
- ou select de tipo + texto complementar.

## Novas paginas

### Devocional

Conteudo previsto:
- oracoes diarias;
- oracoes preparatorias.

### Novena de Sao Francisco

Nova pagina dedicada.

### Transito de Sao Francisco

Nova pagina dedicada.

### Impacto

- novas rotas;
- nova navegacao;
- definir se entram na tab atual, submenu, ou hub proprio.

## Etapas sugeridas

### Etapa 144

Modelar dominio do Santoral:
- tipos;
- estrutura minima;
- regra de categoria;
- regra de premium;
- regra de relacionamento com roteiro.

### Etapa 145

Estruturar index anual do Santoral:
- meses;
- datas;
- nomes;
- classificacoes;
- cobertura completa.

### Etapa 146

Extrair modelo do detalhe diario:
- usar pagina 46 como referencia;
- capturar apenas primeiro bloco narrativo;
- definir parser/manual seed.

### Etapa 147

Refatorar calendario:
- datas franciscanas como eixo principal;
- preceitos como complemento;
- destaque forte para repertorio.

### Etapa 148

Adicionar santo do dia na Home.

### Etapa 149

Criar pagina dedicada do santo/dia.

### Etapa 150

Ordenar repertorio alfabeticamente.

### Etapa 151

Refatorar cadastro:
- senha visivel;
- normalizadores;
- familia;
- jurisdicao.

### Etapa 152

Criar paginas:
- Devocional
- Novena de Sao Francisco
- Transito de Sao Francisco

## Riscos identificados

- taxonomia de categorias ainda nao consolidada;
- premium ainda sem regra final;
- fonte de imagem dos santos ainda indefinida;
- base CNBB ainda ambigua no papel tecnico;
- convivencia entre celebracao, santoral e preceito exigira regra clara de prioridade.
