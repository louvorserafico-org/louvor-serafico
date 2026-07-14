// Celebração do Transito de São Francisco de Assis. Texto curado, fonte oficial:
// - "I Vesperas de São Francisco de Assis" (Liturgia das Horas, Próprio da Conferencia
//   da Família Franciscana do Brasil), rezadas na tarde/noite de 03 de outubro (início do
//   dia litúrgico de 04 de outubro).
// - "Transitus do Seráfico Pai São Francisco de Assis - Forma Abreviada" (celebração
//   dramatizada tradicional, celebrada durante as visperas do dia 03 de outubro).
// Não fabricar/editar conteúdo sem nova fonte. Ordem: Visperas primeiro (oração oficial),
// Transitus dramatizado em seguida.

export type TransitoLine = {
  speaker?: string;
  text: string;
};

export type TransitoPart = "vesperas" | "transitus";

export type TransitoSection = {
  id: string;
  lines: TransitoLine[];
  part: TransitoPart;
  title: string;
};

export const transitoSections: TransitoSection[] = [
  // ---- I Vésperas de São Francisco de Assis (Liturgia das Horas) ----
  {
    id: "vesperas-abertura",
    part: "vesperas",
    title: "Abertura",
    lines: [
      { text: "I Vésperas do dia 04 de outubro, conforme a Liturgia das Horas (Próprio da Conferência da Família Franciscana do Brasil)." },
      { speaker: "Dirigente", text: "Vinde ó Deus em meu auxílio." },
      { speaker: "Todos", text: "Socorrei-me sem demora." },
      { speaker: "Dirigente", text: "Glória ao Pai e ao Filho e ao Espírito Santo." },
      { speaker: "Todos", text: "Como era no princípio, agora e sempre. Amém. Aleluia." },
    ],
  },
  {
    id: "vesperas-hino",
    part: "vesperas",
    title: "Hino",
    lines: [
      {
        text: "A noite já descia, Assis amortalhava; em pleno chão deitado Francisco agonizava.\n\nO mundo na penumbra aos poucos se escondia, porém a sua alma em luz e amor ardia.\n\nO céu ele contempla, deitado em terra nua, pois quer cantar a morte, cantando o sol e a lua.\n\nSeus filhos se lamentam, ao ver chegar a hora; frei Ângelo suspira, e Clara ao longe chora.\n\n“Vem hora desejada!” exclama em voz forte, “Senhor seja louvado por nossa irmã, a Morte!”\n\n“Francisco não és belo!” irmão Masseo dizia. A morte é que embeleza e a vida principia.\n\nLouvemos ao Espírito, ao Pai e ao Filho unido! No seio da Trindade Francisco é recebido.",
      },
    ],
  },
  {
    id: "vesperas-salmodia",
    part: "vesperas",
    title: "Salmodia",
    lines: [
      {
        text: "Antífona 1: Francisco, homem católico e todo apostólico, foi enviado para anunciar o Evangelho de paz.",
      },
      {
        text: "Salmo 111 (112) — A felicidade do justo. Feliz o homem que respeita o Senhor e que ama com carinho a sua lei! Sua descendência será forte sobre a terra, abençoada a geração dos homens retos. Haverá glória e riqueza em sua casa, e permanece para sempre o bem que fez. Ele é correto, generoso e compassivo, como luz brilha nas trevas para os justos. Feliz o homem caridoso e prestativo, que resolve seus negócios com justiça. Porque jamais vacilará o homem reto, sua lembrança permanece eternamente! Ele não teme receber notícias más: confiando em Deus, seu coração está seguro. Seu coração está tranquilo e nada teme, e confusos há de ver seus inimigos. Ele reparte com os pobres os seus bens, permanece para sempre o bem que fez, e crescerão a sua glória e seu poder. O ímpio, vendo isto, se enfurece, range os dentes e de inveja se consome; mas os desejos do malvado dão em nada. Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém!",
      },
      {
        text: "Antífona 1: Francisco, homem católico e todo apostólico, foi enviado para anunciar o Evangelho de paz.",
      },
      {
        text: "Antífona 2: Em sua vida sustentou a casa do Senhor e durante os seus dias o templo restaurou.",
      },
      {
        text: "Salmo 147 (147B) — Restauração de Jerusalém. Glorifica o Senhor, Jerusalém! Ó Sião, canta louvores ao teu Deus! Pois reforçou com segurança as tuas portas, e os teus filhos em teu seio abençoou; a paz em teus limites garantiu e te dá como alimento a flor do trigo. Ele envia suas ordens para a terra, e a palavra que ele diz corre veloz; ele faz cair a neve como lã e espalha a geada como cinza. Como de pão lança as migalhas do granizo, a seu frio as águas ficam congeladas. Ele envia sua palavra e as derrete, sopra o vento e de novo as águas correm. Anuncia a Jacó sua palavra, seus preceitos e suas leis a Israel. Nenhum povo recebeu tanto carinho, a nenhum outro revelou os seus preceitos. Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém.",
      },
      {
        text: "Antífona 2: Em sua vida sustentou a casa do Senhor e durante os seus dias o templo restaurou.",
      },
      {
        text: "Antífona 3: Arrancai-me, Senhor, da prisão. Muitos justos virão rodear-me pelo bem que fizestes por mim.",
      },
      {
        text: "Salmo 141 (142) — Vós sois o meu refúgio, Senhor! Em voz alta ao Senhor eu imploro, em voz alta suplico ao Senhor! Eu derramo na sua presença o lamento da minha aflição, diante dele coloco minha dor! Quando em mim desfalece a minh'alma, conheceis, ó Senhor, meus caminhos! Na estrada por onde eu andava contra mim ocultaram ciladas. Se me volto à direita e procuro, não encontro quem cuide de mim, e não tenho aonde fugir; não importa a ninguém minha vida! A vós grito, Senhor, a vós clamo e vos digo: 'Sois vós meu abrigo, minha herança na terra dos vivos'. Escutai meu clamor, minha prece, porque fui por demais humilhado! Arrancai-me, Senhor, da prisão, e em louvor bendirei vosso nome! Muitos justos virão rodear-me pelo bem que fizestes por mim. Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém!",
      },
      {
        text: "Antífona 3: Arrancai-me, Senhor, da prisão. Muitos justos virão rodear-me pelo bem que fizestes por mim.",
      },
    ],
  },
  {
    id: "vesperas-leitura",
    part: "vesperas",
    title: "Leitura breve e responsório",
    lines: [
      {
        text: "Leitura breve (Rm 8, 10-11): Se, porém, Cristo está em vós, enquanto o corpo está morto por causa do pecado, o espírito está vivo por causa da justiça. E se o Espírito daquele que ressuscitou Jesus dentre os mortos habita em vós, aquele que ressuscitou Cristo dentre os mortos vivificará também vossos corpos mortais, pelo seu espírito que habita em vós.",
      },
      {
        text: "Responsório breve — ℟. Francisco, o pobre, Francisco, o humilde, * Entra rico nos céus. ℟. Francisco. ℣. Com hinos celestes é honrado e louvado. * Entra rico. Glória ao Pai. ℟. Francisco.",
      },
    ],
  },
  {
    id: "vesperas-magnificat",
    part: "vesperas",
    title: "Cântico evangélico (Magnificat)",
    lines: [
      {
        text: "Antífona: Submetendo-se Francisco totalmente ao Criador, dominou as criaturas, usando-as retamente para a glória do Autor.",
      },
      {
        text: "Cântico evangélico (Magníficat, Lc 1,46-55) — A alegria da alma no Senhor. A minha alma engrandece ao Senhor e se alegrou o meu espírito em Deus meu Salvador; pois ele viu a pequenez de sua serva, desde agora as gerações hão de chamar-me de bendita. O Poderoso fez por mim maravilhas e Santo é o seu nome! Seu amor, de geração em geração chega a todos que o respeitam; demonstrou o poder de seu braço, dispersou os orgulhosos; derrubou os poderosos de seus tronos e os humildes exaltou; de bens saciou os famintos, e despediu, sem nada, os ricos. Acolheu Israel, seu servidor, fiel ao seu amor, como havia prometido a nossos pais, em favor de Abraão e de seus filhos, para sempre. Glória ao Pai e ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",
      },
      {
        text: "Antífona: Submetendo-se Francisco totalmente ao Criador, dominou as criaturas, usando-as retamente para a glória do Autor.",
      },
    ],
  },
  {
    id: "vesperas-preces",
    part: "vesperas",
    title: "Preces",
    lines: [
      {
        speaker: "Dirigente",
        text: "Invoquemos a Deus Pai, fonte de toda santidade, para que, pelos exemplos e intercessão do Bem-aventurado Pai Francisco, nos conduza a uma vida santa; e digamos: Nós vos rogamos, ouvi-nos!",
      },
      {
        text: "Pai santo, que tornastes vosso filho Francisco perfeito imitador do vosso Filho; fazei que também nós, seguindo seus passos, observemos fielmente o Evangelho de Cristo.",
      },
      {
        text: "Pai santo, dirigi nossos passos pelo caminho da paz, mostrado a nós por nosso pai Francisco; para que vivamos com sinceridade de coração, em obediência, sem próprio e em castidade.",
      },
      {
        text: "Pai santo, que dispersais os soberbos e exaltais os humildes; fazei que sigamos o Pai seráfico na humildade.",
      },
      {
        text: "Pai santo, que assinalastes vosso servo Francisco com os sagrados estigmas da Paixão do vosso Filho; ensinai-nos a gloriar-nos sempre com verdadeira alegria da cruz de nosso Senhor Jesus Cristo.",
      },
      {
        text: "Pai Santo, que pelas preces do Bem-aventurado Francisco concedestes o perdão aos pecadores; mostrai com bondade aos nossos irmãos e irmãs falecidos a luz da vossa face.",
      },
      { speaker: "Dirigente", text: "Rezemos com amor e confiança a oração que o Senhor Jesus nos ensinou:" },
      { speaker: "Todos", text: "Pai Nosso..." },
    ],
  },
  {
    id: "vesperas-oracao-final",
    part: "vesperas",
    title: "Oração e bênção final",
    lines: [
      {
        text: "Ó Deus, que fizestes o seráfico Pai São Francisco assemelhar-se ao Cristo por uma vida de humildade e pobreza, concedei que, trilhando o mesmo caminho, sigamos fielmente o vosso Filho, unindo-nos convosco na perfeita alegria. Por nosso Senhor Jesus Cristo, vosso Filho, na unidade do Espírito Santo.",
      },
      { speaker: "Todos", text: "Amém!" },
      { speaker: "Dirigente", text: "O Senhor esteja convosco!" },
      { speaker: "Todos", text: "Ele está no meio de nós." },
      { speaker: "Dirigente", text: "Abençoe-vos o Deus todo-poderoso, Pai e Filho e Espírito Santo." },
      { speaker: "Todos", text: "Amém." },
      { speaker: "Dirigente", text: "Ide em paz e o Senhor vos acompanhe." },
      { speaker: "Todos", text: "Graças a Deus!" },
    ],
  },

  // ---- Transitus do Seráfico Pai São Francisco de Assis (forma abreviada) ----
  {
    id: "transitus-apresentacao",
    part: "transitus",
    title: "Apresentação",
    lines: [
      {
        text: "Forma abreviada da Celebração do Transitus de São Francisco de Assis, a ser celebrado durante as vésperas, no dia 03 de outubro.",
      },
      {
        speaker: "Animador",
        text: "A celebração do Transitus de São Francisco de Assis, costume tradicional da Ordem Franciscana, recorda os últimos instantes da vida e o momento da morte de nosso Pai Seráfico. Na véspera da sua festa, como irmãos e filhos do Santo Patriarca de Assis, revisitamos seus ensinamentos como meio para o nosso crescimento na vida em Deus.\n\nErgamos o nosso canto de louvor e súplica àquele que, por vocação, escolhemos como Guia e Pai. (Todos de pé)",
      },
    ],
  },
  {
    id: "transitus-hino",
    part: "transitus",
    title: "Hino",
    lines: [
      {
        text: "1. Punha-se o sol, vinha à noite, como um esposo feliz, Francisco a morte esperava, nu, sobre o solo de Assis.\n\n2. Jogral da santa alegria, chamara o fogo de irmão: o amor em chamas consome seu triunfal coração.\n\n3. Os filhos choram em torno, erguendo triste clamor: \"Por que seu pobre rebanho queres deixar sem Pastor?”\n\n4. Porém as mãos elevando responde de olhos nos céus: \"Mandar-vos-ei doce orvalho, a santa Graça de Deus”.\n\n5. Isto dizendo, o espírito deixa-lhe o corpo mortal e logo ascende ao convívio do reino celestial.\n\n6. Dai-nos, Trindade Bendita, chegarmos um dia ao céu, seguindo as santas pegadas do Pai que o Cristo nos deu. Amém.",
      },
    ],
  },
  {
    id: "transitus-saudacao",
    part: "transitus",
    title: "Saudação inicial",
    lines: [
      { speaker: "Celebrante", text: "Em nome do Pai e do Filho e do Espírito Santo." },
      { speaker: "Todos", text: "Amém." },
      {
        speaker: "Celebrante",
        text: "A vós todos que viestes celebrar conosco a gloriosa passagem do servo de Deus da vida terrena para a eternidade, nossa saudação evangélica e franciscana de PAZ e BEM!",
      },
      { speaker: "Todos", text: "Paz e Bem! (Todos sentados)" },
      {
        speaker: "Animador",
        text: "O jovem e ardoroso Francisco alimentou ideais de grandeza e de nobreza. Aspirou pela honra e pela glória. Sonhou ser coroado cavaleiro. Decidiu pôr-se a serviço dos poderosos para chegar ao poder. Mas, desde o momento em que, tocado pela graça, percebendo em tudo isso que estava preferindo o servo ao Senhor, decidiu-se a abandonar tudo para unicamente servir ao Senhor. Ele mesmo diz na Regra não-Bulada: \"Outra coisa não desejamos, nem queiramos, nem nos alegre, senão o nosso Criador, Redentor e Salvador, o único e verdadeiro Deus que é o bem pleno, o sumo e verdadeiro bem\" (RnB, 23).",
      },
    ],
  },
  {
    id: "transitus-salmo-111",
    part: "transitus",
    title: "Antífona e Salmo 111",
    lines: [
      {
        speaker: "Animador",
        text: "Saudemos o Pai São Francisco, “luz de vossa pátria, modelo dos Frades Menores, espelho de virtudes, caminho dos justos, regra dos costumes”, entoando o Salmo 111.",
      },
      { text: "Antífona: Francisco, homem católico e todo apostólico, foi enviado para anunciar o Evangelho de paz." },
      {
        text: "Salmo 111 — Feliz o homem que respeita o Senhor e que ama com carinho a sua lei! Sua descendência será forte sobre a terra, abençoada a geração dos homens retos! Haverá glória e riqueza em sua casa, e permanece para sempre o bem que fez. Ele é correto, generoso e compassivo, como luz brilha nas trevas para os justos. Feliz o homem caridoso e prestativo, que resolve seus negócios com justiça. Porque jamais vacilará o homem reto, sua lembrança permanece eternamente! Ele não teme receber notícias más: confiando em Deus, seu coração está seguro. Seu coração está tranquilo e nada teme, e confusos há de ver seus inimigos. Ele reparte com os pobres os seus bens, permanece para sempre o bem que fez, e crescerão a sua glória e seu poder. O ímpio, vendo isto, se enfurece, range os dentes e de inveja se consome; mas os desejos do malvado dão em nada. Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém!",
      },
      { text: "Antífona: Francisco, homem católico e todo apostólico, foi enviado para anunciar o Evangelho de paz." },
    ],
  },
  {
    id: "transitus-primeira-leitura",
    part: "transitus",
    title: "Primeira leitura",
    lines: [
      {
        speaker: "Animador",
        text: "A Igreja sempre reconheceu em São Francisco o homem providencial que Deus suscitou para renovar a vida cristã pela fidelidade ao Evangelho. Foi um autêntico renovador da humanidade, por sua vida e costume sustentou a casa de Deus.",
      },
      {
        text: "1ª Leitura: O Papa Inocêncio tinha visto em sonho que a Basílica de Latrão estava para ruir, mas fora sustentado por um religioso, homem pequeno e desprezível, que a sustentava com seu ombro para não cair. Quando Francisco se apresentou ao Sumo Pontífice para pedir a aprovação da Regra dos Frades Menores, reconhecendo nele o humilde religioso da visão, disse o Papa: \"Na verdade este é o homem que, por sua obra e doutrina, haverá de sustentar a Igreja\". Foi por isso que aquele senhor acedeu tão facilmente ao seu pedido e, a partir daí, cheio de devoção a Deus, sempre teve especial predileção pelo servo de Cristo (II Celano, 17).",
      },
    ],
  },
  {
    id: "transitus-salmo-147",
    part: "transitus",
    title: "Antífona e Salmo 147",
    lines: [
      {
        speaker: "Animador",
        text: "Sentindo-nos parte da Igreja que se renova na medida em que acolhemos o Reino de Deus em nossas vidas e dele damos testemunho, cantemos o salmo 147.",
      },
      { text: "Antífona: Em sua vida sustentou a casa de Deus e em seus dias fortificou o seu templo." },
      {
        text: "Salmo 147 — Glorifica o Senhor, Jerusalém! Ó Sião, canta louvores ao teu Deus! Pois reforçou com segurança as tuas portas, e os teus filhos em teu seio abençoou; a paz em teus limites garantiu e te dá como alimento a flor do trigo. Ele envia suas ordens para a terra, e a palavra que ele diz corre veloz; ele faz cair a neve como lã e espalha a geada como cinza. Como de pão lança as migalhas do granizo, a seu frio as águas ficam congeladas. Ele envia sua palavra e as derrete, sopra o vento e de novo as águas correm. Anuncia a Jacó sua palavra, seus preceitos e suas leis a Israel. Nenhum povo recebeu tanto carinho, a nenhum outro revelou os seus preceitos. Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém.",
      },
      { text: "Antífona: Em sua vida sustentou a casa de Deus e em seus dias fortificou o seu templo." },
    ],
  },
  {
    id: "transitus-ultimos-momentos",
    part: "transitus",
    title: "Os últimos momentos",
    lines: [
      {
        speaker: "Animador",
        text: "Outubro de 1226, casa do Bispo de Assis. Francisco está em seus últimos momentos. A hemorragia da qual padecia permaneceu até de manhã.",
      },
      {
        speaker: "Francisco",
        text: "Aproxima-se aquela que está para me buscar e levar para a eternidade. Na Porciúncula entreguei a minha vida, na Porciúncula eu desejo entregar a minha alma. Levem-me para lá onde repousarei no Senhor. Irmão, cante aquele cântico: “Louvado sejas, Senhor...”. (Enquanto se canta, pode-se fazer um cortejo para outro espaço/capela).",
      },
      {
        text: "Cântico das Criaturas: Louvado sejas, Senhor, pelo Senhor irmão sol. Louvado sejas Senhor, ele é na vida um farol.\n\nLouvado sejas, Senhor, pela irmã lua e as estrelas. Louvado sejas, Senhor, são preciosas e belas.\n\nLouvado sejas, Senhor, pelo irmão vento e o tempo. Louvado sejas, Senhor, por quem nos dá o sustento.\n\nLouvado sejas, Senhor, pela irmã água nossa irmã. Louvado sejas, Senhor, é tão humilde e tão casta.\n\nLouvado sejas, Senhor, pelo irmão fogo tão forte. Louvado sejas, Senhor, dissipa as trevas da noite.\n\nLouvado sejas, Senhor, pela nossa mãe, irmã terra. Louvado sejas, Senhor, por tudo quanto ela encerra.\n\nLouvado sejas, Senhor, por todos quantos perdoam. Louvado sejas, Senhor, pelos que sempre abençoam.",
      },
      {
        speaker: "Francisco",
        text: "Irmãos, façam silêncio... “Louvado sejas, meu Senhor, pela irmã morte corporal, da qual homem algum pode escapar. Ai daqueles que morrem em pecado mortal. Felizes os que estão em sua santíssima vontade, porque a morte segunda não lhes fará mal”.",
      },
      {
        speaker: "Todos (cantando)",
        text: "“Louvado sejas, Senhor, pela irmã morte corporal. Louvado sejas, Senhor, ela é nossa vida imortal. Pela irmã morte corporal, ela é nossa vida imortal”.",
      },
    ],
  },
  {
    id: "transitus-testamento",
    part: "transitus",
    title: "O Testamento de Sena",
    lines: [
      {
        speaker: "Animador",
        text: "Pensando em tantos irmãos que o Senhor lhe concedera, o Serafim de Assis ditou o maravilhoso Testamento de Sena, como manifestação do grande amor que nutria para com todos.",
      },
      {
        speaker: "Francisco",
        text: "Escreve que abençoo a todos os meus irmãos, tanto os que estão na Ordem agora como aqueles que nela entrarem até o fim do mundo. E como, por causa da fraqueza e da enfermidade não posso falar, manifesto brevemente nestas três frases a todos os meus irmãos, atuais e futuros, qual o meu propósito e meu querer, a saber: que em sinal de minha memória, de minha benção e de nossa aliança, sempre se amem como eu os tenho amado e ainda amo; que guardem sempre amor e fidelidade a nossa senhora dona Pobreza; que sempre se mantenham submissos e prontos a servir aos prelados e clérigos da santa Mãe Igreja.",
      },
    ],
  },
  {
    id: "transitus-jacoba",
    part: "transitus",
    title: "A visita de Jacoba e o hábito emprestado",
    lines: [
      {
        speaker: "Animador",
        text: "Francisco tinha uma grande estima por uma senhora muito piedosa, chamada Jacoba de Settesoli. Ela fazia uns doces dos quais gostava muito. Por isso, pediu aos frades:",
      },
      {
        speaker: "Francisco",
        text: "Irmãos, ide à senhora Jacoba e pedi-lhe que mande aquele pano de cor cinza para uma túnica e os doces que me preparou tantas vezes quando eu ia a Roma.",
      },
      {
        speaker: "Animador",
        text: "Porém, antes que os frades se colocassem a caminho, a senhora Jacoba chegou e lhe entregou exatamente o que o santo desejara.",
      },
      {
        speaker: "Jacoba",
        text: "Querido pai, quando estava a rezar foi-me dito em espírito para vir até aqui lhe trazer este pano e estes doces de que tanto gostas.",
      },
      { speaker: "Animador", text: "Em seguida, Francisco fez um pedido:" },
      {
        speaker: "Francisco",
        text: "Irmão guardião, tira-me o hábito e deita-me no chão, pois nessa hora quero assemelhar-me ao meu Senhor Jesus Cristo.",
      },
      {
        speaker: "Frei Ângelo",
        text: "Pai, peço-te que, em nome da santa obediência, aceites o hábito ofertado da parte da comunidade.",
      },
      { speaker: "Francisco", text: "Mas Cristo não teve veste emprestada por ninguém." },
      { speaker: "Frei Ângelo", text: "Pai, ordeno-te, em nome da santa obediência, que aceite a nossa oferta." },
      {
        speaker: "Francisco",
        text: "Se for em nome da santa obediência que prometi observar por toda a minha vida, aceito a caridade deste hábito como empréstimo generoso da comunidade.",
      },
      {
        speaker: "Animador",
        text: "Depois, mandou que jogassem cinzas em cima dele, porque em breve seria pó e cinzas. (Joga-se cinzas em Francisco)",
      },
      {
        speaker: "Francisco",
        text: "Meus irmãos, comecemos a servir ao Senhor e ao povo de Deus, porque até agora pouco ou nada temos feito.",
      },
    ],
  },
  {
    id: "transitus-salmo-141",
    part: "transitus",
    title: "Antífona e Salmo 141",
    lines: [
      {
        speaker: "Animador",
        text: "Procurando sentir em nós os sentimentos que invadiam a alma de Francisco que se despedia do mundo, bem como a emoção dos que o viam partir, cantemos o Salmo 141.",
      },
      {
        text: "Antífona: Ó alma santíssima em cujo pensamento acorrem os cidadãos dos céus, os coros dos anjos exultam e a gloriosa Trindade convida dizendo: permanece conosco para sempre.",
      },
      {
        text: "Salmo 141 — Em voz alta ao Senhor eu imploro, em voz alta suplico ao Senhor! Eu derramo na sua presença o lamento da minha aflição, diante dele coloco minha dor! Quando em mim desfalece a minh'alma, conheceis, ó Senhor, meus caminhos! Na estrada por onde eu andava contra mim ocultaram ciladas. Se me volto à direita e procuro, não encontro quem cuide de mim, e não tenho aonde fugir; não importa a ninguém minha vida! A vós grito, Senhor, a vós clamo e vos digo: 'Sois vós meu abrigo, minha herança na terra dos vivos'. Escutai meu clamor, minha prece, porque fui por demais humilhado! Arrancai-me, Senhor, da prisão, e em louvor bendirei vosso nome! Muitos justos virão rodear-me pelo bem que fizestes por mim. Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém!",
      },
      {
        text: "Antífona: Ó alma santíssima em cujo pensamento acorrem os cidadãos dos céus, coros dos anjos exultam e a gloriosa Trindade convida dizendo: permanece conosco para sempre.",
      },
    ],
  },
  {
    id: "transitus-morte-carta",
    part: "transitus",
    title: "A morte de Francisco e a carta de Frei Elias",
    lines: [
      { speaker: "Francisco", text: "“Bem-vinda, irmã morte!” (Os frades/atores se retiram em silêncio)" },
      {
        speaker: "Animador",
        text: "Cumpridos, por fim, em Francisco, todos os desígnios divinos, sua alma santíssima, livre já dos liames e abismada no fulgor da claridade divina, adormeceu tranquilamente no Senhor. Frei Elias, testemunha ocular e substituto do santo no governo da Ordem nascente, escreveu a seguinte carta:",
      },
      {
        text: "3ª Leitura — Carta de Frei Elias sobre a morte de São Francisco: Ao estimado irmão em Cristo Frei Gregório e a todos os Frades. Frei Elias, pecador, manda sua saudação.\n\nAntes mesmo de começar a falar, eu suspiro e choro porque aquilo que eu temia se abateu sobre mim e se abateu sobre vocês... Quero dizer, despediu-se de nós o nosso consolador, aquele que nos levava como ovelhas em seus braços cheios de ternura, \"e mudou-se, como se fosse um peregrino, nas alturas do céu\", ele que fora tão privilegiado por Deus e amado pelos homens.\n\nA presença de nosso irmão e pai Francisco era verdadeira luz, não somente para os mais achegados a ele em razão da vida e da fé, mas também para os mais afastados: luz provinda da suprema luz para dissipar as trevas e \"guiar no caminho da paz e da eterna salvação os que jazem na sombra da morte\".\n\nAté nos mais longínquos confins da terra o seu nome é celebrado e seus maravilhosos feitos são objeto de admiração no universo todo.\n\nE agora transmito a vocês uma grande notícia a respeito de um milagre verdadeiramente novo. De fato, no decorrer da história, nunca se conheceu ter acontecido um fato semelhante a não ser em Cristo, Filho de Deus. Não muito tempo antes de morrer, Francisco apareceu crucificado, levando em seu corpo as cinco chagas iguais aos estigmas de Cristo.\n\nPortanto, meus irmãos, bendigam ao Senhor e agradeçam-no porque manifestou a nós a sua misericórdia, e guardem a memória de Francisco nosso pai e irmão para glória daquele que quis glorificá-lo diante dos homens e dos anjos.\n\nE orem a ele mesmo para que, pela sua intercessão, o Senhor nos conceda participar de sua santa Graça. Amém.",
      },
    ],
  },
  {
    id: "transitus-preces",
    part: "transitus",
    title: "Preces",
    lines: [
      {
        speaker: "Celebrante",
        text: "Irmãos caríssimos, lembrando os grandes feitos que o Senhor realizou em Francisco e por Francisco, apresentemos, cheios de confiança, a Deus Pai nossos pedidos, rezando depois de cada intenção: Senhor, escutai a nossa prece.",
      },
      {
        text: "1. Pelo Santo Padre o Papa, pelos bispos e sacerdotes do mundo inteiro, pelos quais São Francisco nutria grande respeito, veneração e amor, para que saibam cumprir com responsabilidade a missão de apóstolos e pastores da Santa Igreja, rezemos ao Senhor.",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
      {
        text: "2. Pelos governantes, para que reconheçam que a autoridade procede de Deus, saibam respeitar os direitos humanos e se preocupem pela solução dos problemas sociais com justiça, compreensão e retidão de consciência, rezemos ao Senhor.",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
      {
        text: "3. Por todos os povos, para que acolham com humildade de espírito a mensagem de amor anunciada por Cristo e proclamada por Francisco, rezemos ao Senhor.",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
      {
        text: "4. Por todas as comunidades e fraternidades franciscanas, para que sejam estimuladas a dar ao mundo testemunho de fraternidade, pobreza, amor e alegria, encarnando em si as virtudes do bem-aventurado Francisco, rezemos ao Senhor.",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
      {
        text: "5. Por todos nós, para que, a exemplo de Francisco, saibamos viver o Evangelho de Jesus Cristo e possamos ser instrumentos de paz, união, esperança e luz no mundo em que vivemos, rezemos ao Senhor.",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
      {
        text: "6. Por aqueles que já foram visitados pela irmã morte e descansam no Senhor, para que, pelos méritos e preces de São Francisco, sejam conduzidos à glória da ressurreição, rezemos ao Senhor.",
      },
      { speaker: "Todos", text: "Senhor, escutai nossa prece." },
      { speaker: "Celebrante", text: "Rezemos juntos a oração que Nosso Senhor Jesus Cristo nos ensinou: Pai nosso..." },
    ],
  },
  {
    id: "transitus-oracao-final",
    part: "transitus",
    title: "Oração final e bênção",
    lines: [
      {
        speaker: "Celebrante",
        text: "Senhor Deus, que por meio de Francisco de Assis, pobre e humilde, destes à vossa Igreja uma viva imagem de Cristo, concedei-nos a graça de seguir vosso Filho Jesus no caminho do Evangelho e possamos permanecer sempre unidos a vós na caridade e na alegria. Por nosso Senhor Jesus Cristo vosso Filho, que é Deus e convosco vive e reina, na unidade do Espírito Santo, por todos os séculos dos séculos.",
      },
      { speaker: "Todos", text: "Amém." },
      { speaker: "Celebrante", text: "O Senhor esteja convosco." },
      { speaker: "Todos", text: "Ele está no meio de nós." },
      { speaker: "Celebrante", text: "Deus vos abençoe e vos guarde." },
      { speaker: "Todos", text: "Amém." },
      { speaker: "Celebrante", text: "Ele vos mostre a sua face e se compadeça de vós." },
      { speaker: "Todos", text: "Amém." },
      { speaker: "Celebrante", text: "Volva para vós o seu olhar e vos dê a sua paz." },
      { speaker: "Todos", text: "Amém." },
      {
        speaker: "Celebrante",
        text: "E a bênção de Deus todo-poderoso, Pai e Filho e Espírito Santo desça sobre vós e permaneça para sempre.",
      },
      { speaker: "Todos", text: "Amém." },
      { speaker: "Celebrante", text: "Ide em paz e o Senhor vos acompanhe." },
      { speaker: "Todos", text: "Graças a Deus." },
    ],
  },
];
