// Celebracao do Transito de Sao Francisco de Assis. Texto curado, fonte fornecida
// pelo usuario (Paroquia Sao Francisco de Assis - Itapua, Vila Velha - ES).
// Nao fabricar/editar conteudo sem nova fonte.

export type TransitoLine = {
  speaker?: string;
  text: string;
};

export type TransitoSection = {
  id: string;
  lines: TransitoLine[];
  title: string;
};

export const transitoSections: TransitoSection[] = [
  {
    id: "abertura",
    title: "Antes da procissão",
    lines: [
      { text: "18h45: Terço (Terço dos Homens)" },
      { text: "19h15: Início da procissão" },
      {
        text: "Irmãos e irmãs, sejam bem-vindos ao nosso encontro de irmãos.\n\nA vós todos que viestes celebrar conosco a gloriosa passagem do servo de Deus da vida terrena para a eternidade, nossa saudação evangélica e franciscana de PAZ e BEM!\n\nA Celebração do Trânsito, na véspera da festa de São Francisco de Assis, é um costume tradicional da Ordem Franciscana que nos leva a celebrar o dom da vida e aceitar a morte como irmã, caminho único para a ressurreição. Nesta celebração, somos também convidados a acolher e a aprender com os salutares ensinamentos que o Santo de Assis nos deixou a ponto de valorizarmos a vida presente como oportunidade única de alcançarmos à futura.\n\nEm louvor a Deus que, por amor, nos presenteou como padroeiro e guia espiritual São Francisco de Assis, cantemos para iniciar nossa procissão.",
      },
    ],
  },
  {
    id: "procissao",
    title: "Durante a procissão",
    lines: [
      { text: "Iniciamos a procissão cantando:" },
      {
        text: "Senhor, fazei-me instrumento de vossa paz\nOnde houver ódio, que eu leve o amor\nOnde houver ofensa, que eu leve o perdão\nOnde houver discórdia, que eu leve a união\nOnde houver dúvida, que eu leve a fé\nOnde houver erro, que eu leve a verdade\nOnde houver desespero, que eu leve a esperança\nOnde houver tristeza, que eu leve alegria\nOnde houver trevas, que eu leve a luz\n\nÓ, Mestre, fazei que eu procure mais\nConsolar do que ser consolado\nCompreender que ser compreendido\nAmar que ser amado\n\nPois é dando que se recebe\nÉ perdoando que se é perdoado\nE é morrendo que se vive para a vida eterna",
      },
      { text: "Em forma de poesia, recitamos:" },
      { speaker: "Padre", text: "A noite já descia, Assis amortalhava," },
      { speaker: "Todos", text: "em pleno chão deitado Francisco agonizava." },
      { speaker: "Padre", text: "O mundo na penumbra aos poucos se escondia," },
      { speaker: "Todos", text: "porém a sua alma em luz e amor ardia." },
      { speaker: "Padre", text: "O céu ele contempla deitado em terra nua," },
      { speaker: "Todos", text: "pois quer cantar a morte, cantando o sol e a lua." },
      { speaker: "Padre", text: "Seus filhos se lamentam o ver chegada a hora;" },
      { speaker: "Todos", text: "Frei Ângelo suspira Clara ao longe chora." },
      { speaker: "Padre", text: "Vem, hora desejada! exclama com voz forte," },
      { speaker: "Todos", text: "“Senhor, sejas louvado por nossa irmã, a Morte!" },
      { speaker: "Padre", text: "“Francisco, não és belo!” Irmão Masseo dizia." },
      { speaker: "Todos", text: "A morte é que embeleza, e a vida principia." },
      { speaker: "Padre", text: "Louvemos ao Espírito ao Pai e ao Filho unido" },
      { speaker: "Todos", text: "No seio da Trindade, Francisco é recebido." },
      {
        speaker: "Padre",
        text: "A vida e morte de Francisco foi um louvor a Deus. O Evangelho tinha se tornado sua vida. A semelhança com Cristo se fizera tão grande, que ele trazia em seu corpo os estigmas do Senhor. Francisco todo católico e todo apostólico. Por Deus foi enviado para preparar o Evangelho da Paz.",
      },
      {
        speaker: "Todos",
        text: "Com São Francisco, também nós louvamos a Deus. O Evangelho será a nossa vida e nossos passos andarão à procura do Senhor.",
      },
      {
        text: "CANTO — Vem Irmã Morte (estilo do ofício das comunidades):\n\nEu sou da terra, eu sou do céu. A morte me espera, oculta num véu.\nVem, irmã morte, vem, realizar, todo o meu sonho, sonho de amar.\n\nA incerteza, fere meu ser. Quero a certeza de sempre viver.\nVem, irmã morte, vem, realizar, todo o meu sonho, sonho de amar.\n\nTriste é morrer, morrer preso à terra. Belo é saber que o céu me espera.\nVem, irmã morte, vem, realizar, todo o meu sonho, sonho de amar.\n\nMorrer de amor, morrer pelo irmão, é fazer da morte total realização.\nVem, irmã morte, vem, realizar, todo o meu sonho, sonho de amar.",
      },
      {
        speaker: "Todos",
        text: "Louvado sejas, meu Senhor, pela vida e pela irmã morte corporal da qual homem algum pode escapar.",
      },
      { text: "PAI NOSSO – AVE-MARIA – GLÓRIA AO PAI" },
      {
        text: "CANTO:\n\nQuando o fogo do amor ardeu no peito\nVindo da luz tão radiante de Jesus\nNão resistiu a este amor puro e perfeito\nSeguiu feliz os estigmas da Cruz\n\nE na pobreza foi reerguer Santa Maria\nE nela toda igreja do Senhor\nNa eucaristia, na alegria, o dia a dia\nEle vivia o evangelho com fervor\n\nRef.: A gente pode ser muito mais feliz / Seguindo o exemplo de Francisco de Assis (bis)\n\nLá entre flores, encontrou a paz e harmonia\nCantando amores ao Deus da criação\nPássaros, ventos, animais, o Sol e a Lua\nE os arvoredos chamou todos de irmãos\n\nSorriu aos pobres, seus amigos preferidos\nViu Jesus Cristo no semblante do irmão\nCom os mais sofridos, mais amados, mais queridos\nNa sua mesa, ele repartiu o pão\n\nRef.: A gente pode ser muito mais feliz / Seguindo o exemplo de Francisco de Assis (bis)\n\nDepois vieram também Clara e Antônio\nE muitos outros com entusiasmo e ardor\nE tão somente pela fé em Jesus Cristo\nEles fizeram a revolução do amor\n\nE este amor foi tão amado por Francisco\nQue o seu ser se revestiu de luz\nE na explosão da graça, em felicidade\nCelebrou sua páscoa nos estigmas da Cruz\n\nRef.: A gente pode ser muito mais feliz / Seguindo o exemplo de Francisco de Assis (bis)",
      },
      { text: "PAI NOSSO – AVE-MARIA – GLÓRIA AO PAI" },
      {
        text: "CANTO:\n\nAltíssimo, glorioso Deus, ilumina as trevas do meu coração\nDá-me, fé reta, esperança certa, e perfeita caridade\nPara que eu cumpra tua santa vontade",
      },
    ],
  },
  {
    id: "dentro-da-igreja",
    title: "Dentro da igreja — Testamento de Sena",
    lines: [
      { text: "Antes da equipe de liturgia entrar na igreja, faz-se a leitura do Testamento de Sena de São Francisco:" },
      {
        speaker: "Leitor 1",
        text: "Com extrema rapidez se aproxima o momento da morte de São Francisco de Assis. Com 44 anos de idade, morre o pobrezinho de Assis, e nasce para Deus. Ouçamos, com veneração, a narrativa dos últimos momentos de sua vida, conforme descreve São Boaventura.",
      },
      {
        speaker: "Leitor 2",
        text: "Muito tempo antes, Francisco ficou sabendo a hora de sua morte e quando ela estava próxima, comunicou aos irmãos que deixaria em breve seu corpo, essa tenda em que sua alma havia feito acampamento, como lhe revelara o Senhor.",
      },
      {
        speaker: "Leitor 3",
        text: "Dois anos depois de ter recebido os estigmas, vinte anos após sua conversão pediu para ser transportado a Santa Maria da Porciúncula a fim de pagar seu tributo à morte e receber em troca e recompensa a eternidade, no mesmo local em que, pela Mãe de Deus, ele mesmo conhecerá o Espírito de graça e de perfeição.\n\nDizia São Francisco aos seus confrades e hoje fala a todos nós: “Escreve que abençoo a todos os meus irmãos, tanto os que estão na Ordem agora, como os que nela entrarem até o fim do mundo. E como, por causa da minha fraqueza de meus sofrimentos, já não lhes posso falar muito, quero elucidar em três frases a todos os meus irmãos, atuais e futuros, qual o meu propósito e meu querer, a saber: que em sinal de minha memória, de minha bênção e de nossa aliança, sempre se amem como eu os tenho amado e ainda amo; que guardem sempre amor e fidelidade a nossa Senhora dona Pobreza; que sempre se mantenham submissos e prontos a servir aos prelados e clérigos da santa mãe Igreja”.",
      },
      { text: "Toca-se o sino e iniciamos a missa." },
    ],
  },
  {
    id: "ritos-iniciais",
    title: "Ritos iniciais",
    lines: [
      { text: "Canto Inicial" },
      { speaker: "Presidente", text: "Em nome do Pai e do Filho e do Espírito Santo." },
      { speaker: "Todos", text: "Amém." },
      {
        speaker: "Presidente",
        text: "Irmãos e irmãs “nenhum de nós vive para si e ninguém morre para si. Se vivemos, vivemos para o Senhor; se morremos, morremos para o Senhor. Quer vivamos, quer morramos, pertencemos ao Senhor” (Rm 14,7-8). Que a graça de nosso Senhor Jesus Cristo, o amor do Pai e a comunhão do Espírito Santo estejam convosco.",
      },
      { speaker: "Todos", text: "Bendito seja Deus que nos reuniu no amor de Cristo." },
      {
        speaker: "Presidente",
        text: "Ato Penitencial (rezado). Irmãos e irmãs é momento de nos colocarmos nas mãos do Senhor, reconhecer os nossos erros e, como São Francisco, fazer a experiência da misericórdia do Senhor que nos ama infinitamente.",
      },
      {
        speaker: "Comentarista",
        text: "O jovem e ardoroso Francisco antes de sua conversão alimentou ideias de grandeza e de nobreza. Aspirou à honra e à glória. Sonhou a ser coroado cavaleiro. Decidiu pôr-se a serviço dos poderosos para chegar ao poder.",
      },
      {
        speaker: "Presidente",
        text: "Senhor, perdoai-nos pelas vezes que em meio aos apelos e desilusões do mundo não percebermos que só vós sois bom, só vós sois o bem e que todo o bem procede de Vós. Tende piedade de nós. Senhor, tende piedade de nós!",
      },
      {
        speaker: "Comentarista",
        text: "A Igreja sempre reconheceu em São Francisco o homem providencial que Deus suscitou para renovar a vida cristã pela fidelidade ao evangelho. O Papa Inocêncio tinha visto em sonhos que a Basílica Latrão estava para ruir, mas fora sustentada por um religioso, homem insignificante e desprezível, que a firmara com seus ombros para não cair.",
      },
      {
        speaker: "Presidente",
        text: "Cristo, perdoai-nos por não partilhar a riqueza dos dons que nos concedestes: nossos bens, nossas habilidades e nossos conhecimentos, nosso afeto e nossos sonhos. Tende piedade de nós. Cristo, tende piedade de nós.",
      },
      {
        speaker: "Comentarista",
        text: "Consumado pela penitência e pela enfermidade abraçadas com amor, São Francisco percebeu que o fim se aproximava. Foi pensando em tantos irmãos que o Senhor lhe concedera ditar o maravilhoso Testamento de Sena, como manifestação do grande amor que nutria para com todos.",
      },
      {
        speaker: "Presidente",
        text: "Senhor, perdoai-nos por fecharmos nossos olhos às necessidades e aos sofrimentos dos nossos irmãos e irmãs, dai-nos um coração sensível e mãos operantes diante do sofrimento das criaturas que fizestes com tanto amor e inspirai-nos palavras e ações para confortar os desanimados e oprimidos. Tende piedade de nós. Senhor, tende piedade de nós.",
      },
      { text: "Hino de Louvor" },
      { text: "Oração" },
    ],
  },
  {
    id: "liturgia-da-palavra",
    title: "Liturgia da Palavra",
    lines: [
      { text: "1ª Leitura (Br 1,15-22)" },
      { text: "Salmo Responsorial (Sl 78(79),1-2.3-5.8.9) — Por vosso nome e vossa glória, libertai-nos, ó Senhor!" },
      { text: "2ª Leitura (Hb 2,9-11)" },
      { text: "Aclamação ao Evangelho — Aleluia! Aleluia! Aleluia! Aleluia! (bis) — Oxalá ouvísseis hoje a sua voz: Não fecheis os corações como em Meriba!" },
      { text: "Evangelho (Lc 10,13-16)" },
      { text: "Homilia" },
      { text: "Profissão de Fé" },
    ],
  },
  {
    id: "oracao-dos-fieis",
    title: "Oração dos Fiéis",
    lines: [
      {
        speaker: "Presidente",
        text: "Irmãos caríssimos, lembrando os grandes feitos que o Senhor realizou em Francisco e por Francisco, apresentemos, cheios de confiança, a Deus Pai nossos pedidos;",
      },
      {
        text: "Pelo Santo Padre o Papa Leão, pelos bispos e sacerdotes do mundo inteiro, pelos quais São Francisco nutria grande respeito, veneração e amor, para que saibam cumprir com responsabilidade a missão de apóstolos e pastores da sua Igreja, rezemos ao Senhor;",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
      {
        text: "Senhor, por todos os povos e nações, para que acolham com humildade de espírito a mensagem de amor anunciada por Cristo e proclamada por Francisco, rezemos ao Senhor.",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
      {
        text: "Senhor, por todas as paróquias que têm São Francisco como padroeiro, para que sejam estimuladas a dar ao mundo testemunho de pobreza evangélica, amor e alegria, encarnando em si as virtudes do Santo de Assis, rezemos ao Senhor.",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
      {
        text: "Senhor, por todos nós, para que, a exemplo de São Francisco, saibamos viver o Evangelho de Jesus Cristo e possamos ser instrumento de paz, união, esperança luz no mundo em que vivemos, rezemos ao Senhor.",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
      {
        text: "Senhor, por aqueles que já foram visitados pela irmã morte e descansam no Senhor, para que, pelos méritos e preces de São Francisco, sejam conduzidos à glória da ressurreição, rezemos ao Senhor.",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
    ],
  },
  {
    id: "liturgia-eucaristica",
    title: "Liturgia Eucarística",
    lines: [
      { text: "Canto do Ofertório" },
      { text: "Orai, irmãos e irmãs" },
      { text: "Oração sobre as oferendas" },
      { text: "Oração Eucarística" },
      { text: "Paz" },
      { text: "Cordeiro" },
      { text: "Oração pós-comunhão" },
    ],
  },
  {
    id: "ritos-finais",
    title: "Ritos finais",
    lines: [
      { text: "Teatro do trânsito" },
      { text: "Avisos" },
      { text: "Bênção final com a Relíquia de São Francisco" },
    ],
  },
];
