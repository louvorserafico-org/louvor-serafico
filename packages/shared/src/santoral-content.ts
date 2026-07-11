// Conteudo curado do santoral: o primeiro bloco historico de cada santo, extraido e
// revisado do `santoral-completo.pdf` (Proprio da Familia Franciscana). Storage LOCAL.
//
// Regra: apenas entradas `curated` sao publicadas; `draft` fica retido ate revisao
// editorial. Piloto (Etapa 155): janeiro. Extracao em lote nas etapas seguintes.
//
// Cada `saintId` deve existir no indice (`santoral-index-2026.ts`); o teste garante
// que nao ha conteudo orfao.

export type SaintContentStatus = "curated" | "draft";

export type SaintContent = {
  saintId: string;
  shortHistory: string;
  status: SaintContentStatus;
};

const saintContents: SaintContent[] = [
  {
    saintId: "saint-01-03-santissimo-nome-de-jesus",
    shortHistory:
      "O Santíssimo Nome de Jesus, invocado pelos cristãos desde os princípios da Igreja, no século XIV começou a ser venerado nas celebrações litúrgicas. São Bernardino de Sena e seus discípulos propagaram com empenho o seu culto em toda parte, pela Itália e por toda a Europa: no século XVI, sua festa foi introduzida na Liturgia. Assim, no ano de 1530, pela primeira vez o Papa Clemente VII concedeu à Ordem dos Frades Menores celebrar o Santíssimo Nome de Jesus com Ofício eclesiástico.",
    status: "curated",
  },
  {
    saintId: "saint-01-04-santa-angela-de-foligno-religiosa",
    shortHistory:
      "Ângela nasceu na Úmbria em 1248. Deixando as vaidades do mundo, às quais por tempos se entregara, professou na Ordem Terceira da Penitência, de São Francisco, levando consigo muitas outras senhoras. Distinguiu-se por seu fervoroso amor de Deus e do próximo, sobretudo dos pobres, e por sua humildade, paciência e pobreza. Cumulada por Deus de dons celestes, entregou-se com extremos de piedade à contemplação dos mistérios da vida de Cristo, deixando alguns escritos de apreciada doutrina espiritual, pelo que mereceu ser chamada de “Mestra dos Teólogos”. Morreu em Foligno, no ano de 1309.",
    status: "curated",
  },
  {
    saintId: "saint-01-05-bem-aventurado-diego-jose-de-cadiz-presbitero",
    shortHistory:
      "Diogo nasceu aos 29 de março de 1743 em Cádiz, Espanha. Em 1757, ingressou na Ordem dos Frades Menores Capuchinhos, em Sevilha. Após a sua ordenação sacerdotal, percorreu incansavelmente toda a Espanha como pregador popular, realizando verdadeiros milagres de conversão. Escreveu numerosas obras. Morreu no dia 24 de março de 1801 e foi beatificado por Leão XIII em 1894.",
    status: "curated",
  },
  {
    saintId: "saint-01-12-sao-bernardo-de-corleone-religioso",
    shortHistory:
      "Bernardo nasceu aos 6 de fevereiro de 1605 em Corleone, Sicília. Em sua juventude aprendeu a profissão de sapateiro, mas demonstrava também grande interesse em armas e lutas. Provocado por um adversário, feriu-o gravemente. Isso se constituiu para ele em início de nova vida. Entrou na Ordem dos Frades Menores Capuchinhos, tornando-se irmão leigo. Distinguiu-se prontamente por seu espírito de sacrifício e pelo fervor religioso, conformando-se a Cristo crucificado com heroica caridade e dignos frutos de penitência. Sua morte ocorreu aos 12 de janeiro de 1667, em Palermo. Foi beatificado em 1768 por Clemente XII. O Papa São João Paulo II o canonizou em 10 de junho de 2001.",
    status: "curated",
  },
  {
    saintId: "saint-01-14-bem-aventurado-odorico-de-pordenone-presbitero",
    shortHistory:
      "Odorico nasceu em Vilanova de Pordenone em 1265. Sacerdote da Ordem Primeira Franciscana, uniu uma exemplar austeridade de vida com um infatigável zelo pastoral. Foi um dos mais ilustres missionários da Ordem. Primeiro esteve na Ásia Menor, em seguida, o encontramos entre os tártaros, depois na China e na Índia. Converteu muitíssimos à fé em Cristo. Mereceu o título de Apóstolo dos Chineses. Voltando à Europa a fim de referir ao Papa a sua atuação nas missões do Extremo Oriente, morreu em Udine, em 1331. Seu culto foi aprovado por Bento XIV em 1755.",
    status: "curated",
  },
  {
    saintId: "saint-01-16-sao-berardo-e-seus-companheiros-protomartires",
    shortHistory:
      "Discípulos de São Francisco partiram para a Espanha em 1219, a fim de pregarem o Evangelho aos maometanos; presos, foram levados a Marrocos, onde continuaram a sua pregação. Presos novamente, na cidade de Marrakesh, foram postos em cadeias e torturados, até serem condenados à morte pelo próprio rei da região, no ano de 1220. São Francisco de Assis, ao saber do martírio, exclamou: “Já posso dizer que tenho cinco irmãos autênticos menores!” Santo Antônio de Pádua, presente no translado das suas relíquias para Coimbra, decidiu ser franciscano. Foram canonizados por Sisto IV em 1481.",
    status: "curated",
  },
];

export function getCuratedSaintContents(): SaintContent[] {
  return saintContents.filter((content) => content.status === "curated");
}

export function findCuratedShortHistory(saintId: string): string | null {
  const content = saintContents.find(
    (item) => item.saintId === saintId && item.status === "curated",
  );

  return content ? content.shortHistory : null;
}
