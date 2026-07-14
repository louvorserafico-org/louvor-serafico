// Novena a Sao Francisco de Assis. Fonte: "NOVENA DE SAO FRANCISCO DE ASSIS - 2026", subsidio
// oficial da Provincia Sao Maximiliano Maria Kolbe do Brasil (OFM Conv.), Brasilia-DF, 21/05/2026,
// para o 8o centenario da passagem de Sao Francisco. Texto do "Rito Fora da Liturgia da Missa",
// Anexo A (Ladainha) e Anexo C (cantos de Frei Luis Ventura, OFM Conv.), extraido verbatim do PDF.
// Nao fabricar/editar conteudo sem nova fonte.

export type NovenaDay = {
  day: number;
  theme: string;
  reference: string;
  reading: string;
};

export const novenaDays: NovenaDay[] = [
  {
    day: 1,
    theme: "São Francisco reconciliado com Deus",
    reference: "2Cel 2,6",
    reading:
      'Antes de sua conversão, Francisco tinha um grande sonho de ser cavaleiro. Em certa noite, quando ele estava dormindo, alguém lhe falou pela segunda vez por meio de uma visão, investigando com solicitude para onde queria ir. Contando-lhe seu propósito e dizendo-lhe que ia combater na Apúlia, foi solicitamente interrogado por ele acerca de quem poderia fazê-lo melhor: se o senhor ou o servo. "O senhor", respondeu Francisco. E o outro: "Então, por que buscas o servo no lugar do senhor?" Perguntou Francisco: "Que queres que eu faça, Senhor?" E o Senhor: "Volta para a terra em que nasceste, porque é espiritualmente que vou fazer cumprir a visão que tiveste".',
  },
  {
    day: 2,
    theme: "São Francisco reconciliado consigo mesmo",
    reference: "T, 1",
    reading:
      'Diz São Francisco em seu testamento: "O Senhor deu a mim, Frei Francisco, começar a fazer penitência assim: como estivesse em pecado, parecia-me demasiadamente amargo ver leprosos. E o próprio Senhor me conduziu entre eles e fiz misericórdia com eles. E afastando-me deles, aquilo que me parecia amargo, converteu-se em doçura da alma e do corpo; e, em seguida, detive-me por um pouco e saí do mundo."',
  },
  {
    day: 3,
    theme: "São Francisco reconciliado com o leproso",
    reference: "LTC 4,1-6",
    reading:
      'Quando, certo dia, orava fervorosamente ao Senhor, foi-lhe respondido: "Francisco, se queres conhecer minha vontade, é necessário que desprezes e odeies todas as coisas que amaste carnalmente e desejaste possuir. Depois que começares a fazer isto, o que antes te parecia suave e doce, te será insuportável e amargo, enquanto que daquilo que antes tinhas horror, haurirás grande doçura e imensa suavidade". Jubiloso por estas coisas e confortado no Senhor, quando cavalgava perto de Assis, encontrou um leproso. E porque estava acostumado a ter muito horror dos leprosos, fazendo violência a si mesmo, apeou do cavalo e ofereceu-lhe um denário, beijando-lhe a mão. Recebendo dele o ósculo da paz, montou de novo e seguiu seu caminho. Daí por diante, começou a desprezar-se sempre mais, até chegar perfeitamente à vitória sobre si mesmo com a graça de Deus.',
  },
  {
    day: 4,
    theme: "São Francisco reconciliado com a cruz",
    reference: "1Cel 29",
    reading:
      'Depois de alguns dias, ao passar perto da igreja de São Damião, foi-lhe dito em espírito que nela entrasse para orar. Tendo entrado, começou a rezar com fervor diante de uma imagem do Crucificado, a qual piedosa e benignamente lhe falou: "Francisco, não vês que minha casa está se destruindo? Vai, pois, e restaura-a para mim". Trêmulo e atônito disse: "De boa vontade o farei, Senhor". Entendeu que se dizia daquela igreja que, por ser muito antiga, ameaçava cair logo. Ficou tão cheio de contentamento e tão iluminado por aquela alocução que sentiu em sua alma ter sido realmente o Cristo crucificado quem lhe falou.',
  },
  {
    day: 5,
    theme: "São Francisco reconciliado com a pobreza",
    reference: "CAs 51,5-11",
    reading:
      'Dizia São Francisco aos frades: "Irmãos caríssimos e filhinhos meus, não se envergonhem de ir pedir esmola, porque o Senhor se fez pobre por nós neste mundo; por isso é que nós, seguindo o seu exemplo e o de sua Santíssima Mãe, escolhemos o caminho da mais verdadeira pobreza. Esta é a nossa herança que o Senhor Jesus Cristo nos adquiriu e deixou, a nós e a todos que, pelo seu exemplo, querem viver na santa Pobreza". E falou-lhes: "Em verdade vos digo, muitos dos mais nobres e mais sábios deste mundo virão para essa Ordem e terão como grande honra ir pedir esmola. Por isso, ide pedir esmola, com confiança e ânimo alegre, com a bênção do Senhor Deus. E deveis ir com mais liberdade e de ânimo alegre do que alguém que oferecesse cem moedas por uma, visto que ofereceis o amor de Deus àqueles que pedis esmola, quando dizeis: Dai-nos esmola por amor do Senhor Deus, pois, em comparação com Ele, o céu e a Terra não são nada".',
  },
  {
    day: 6,
    theme: "São Francisco reconciliado com a obediência",
    reference: "1Cel 29",
    reading:
      'São Francisco nos ensina: "Disse o Senhor a Adão: Come de toda árvore; da árvore da ciência do bem e do mal, porém, não comas. Podia, pois, comer de toda árvore do paraíso, porque, enquanto nada fazia contra a obediência, não pecava. Come, pois, da árvore da ciência do bem aquele que se apropria de sua vontade e se exalta pelos bens que o Senhor diz e opera nele. E assim, por sugestão do diabo e transgressão do mandato, fez-se o pomo da ciência do mal. Por isso, importa que sustente a pena."',
  },
  {
    day: 7,
    theme: "São Francisco reconciliado com a castidade",
    reference: "2Cel 117",
    reading:
      'Certa vez, o demônio armou para São Francisco uma gravíssima tentação de luxúria. Mas ele, logo que percebeu a tentação, tirou a roupa e se açoitou duramente com uma corda, dizendo: "Vamos, irmão asno, é assim que te deves comportar, é assim que tens de ser castigado". Quando viu que a tentação não ia embora nem com as disciplinas, apesar de já estar com o corpo todo marcado de sangue, abriu a cela, saiu para fora no bosque e mergulhou, despido, na neve alta. Depois encheu as mãos de neve e fez com ela sete torrões em forma de bolas. Colocou-os à sua frente e começou a dizer a seu corpo: "Eis! Esse maior é tua mulher, esses outros quatro são teus dois filhos e duas filhas, os outros dois são o servo e a criada que precisas ter para o teu serviço. Apressa-te a vestir a todos, que estão morrendo de frio. Mas, se te parecer molesto todo esse cuidado por eles, sirva solicitamente só ao Senhor!". O diabo foi logo embora, confundido, e o Santo voltou para a cela glorificando a Deus.',
  },
  {
    day: 8,
    theme: "São Francisco reconciliado com as criaturas",
    reference: "Atos 40",
    reading:
      'Havia certo lobo que causava muito pânico na cidade de Gubbio. E eis que aquele terrível lobo correu contra São Francisco de boca inteiramente aberta. São Francisco ergueu contra ele o sinal-da-cruz e, contendo afastado, tanto de si como do seu companheiro, o lobo, pela virtude divina, reteve-lhe a corrida e fechou-lhe a boca cruelmente escancarada. E, por fim, chamando-o disse: "Vem cá, irmão lobo! E ordeno-te, da parte de Cristo, que não faças mal nem a mim nem a outro". Coisa admirável! Imediatamente, feita a cruz, o lobo fechou aquela terrível boca! E dada a ordem, imediatamente prostrou-se aos pés do Santo, com a cabeça inclinada, já do lobo feito um cordeiro.',
  },
  {
    day: 9,
    theme: "São Francisco reconciliado com a morte",
    reference: "1Cel 29",
    reading:
      'São Francisco passou em ação de graças os poucos dias que ainda restavam até sua morte, ensinando seus filhos muito amados a louvar a Cristo em sua companhia. Ele mesmo, o quanto pôde, entoou o Salmo: "Com minha voz clamei ao Senhor, com minha voz implorei o Senhor", etc. Convidou também todas as criaturas ao louvor de Deus por meio de palavras que compusera em outros tempos, exortando-as ele mesmo ao amor de Deus. Chegou a exortar para o louvor até a própria morte, terrível e aborrecida para todos, e, correndo alegre ao seu encontro, convidou-a a ser sua hóspede: "Bem-vinda seja, minha irmã morte!".',
  },
];

export function findNovenaDay(day: number): NovenaDay | undefined {
  return novenaDays.find((item) => item.day === day);
}

export const novenaGreeting =
  "A vós, irmãos e irmãs, que vieram celebrar conosco a novena em honra do nosso Seráfico Pai São Francisco de Assis nesse Jubileu de sua páscoa, a nossa saudação franciscana de Paz e Bem!";

export const novenaReconciliationText =
  "A Igreja sempre reconheceu em São Francisco o homem providencial que Deus suscitou para renovar a vida cristã pela fidelidade ao Evangelho. Além disso, Francisco foi o Irmão de todo irmão, ele soube reconhecer em tudo a presença do Altíssimo e Bom Senhor. Foi um homem perfeitamente reconciliado consigo mesmo, com Deus, com o mundo e até mesmo com a morte, a quem também chamou de irmã.";

export const novenaCollectPrayer =
  "Ó Deus, que fizestes o Seráfico Pai São Francisco de Assis assemelhar-se ao Cristo por uma vida de humildade e pobreza, concedei que, trilhando o mesmo caminho, sigamos fielmente o vosso Filho, unindo-nos convosco na perfeita alegria. Por nosso Senhor Jesus Cristo, Vosso Filho, na unidade do Espírito Santo. Amém.";

export const novenaFinalPrayer =
  "Eterno Deus Onipotente, justo e misericordioso, concedei-nos a nós míseros praticar por vossa causa o que reconhecermos ser a vossa vontade e querer sempre o que vos agrade, a fim de que, interiormente purificados, iluminados e abrasados pelo fogo do Espírito Santo, possamos seguir as pegadas de vosso Filho, Nosso Senhor Jesus Cristo, e por vossa graça, unicamente, chegar até vós, ó Altíssimo, que em Trindade perfeita e Unidade simples viveis e reinais na glória como Deus onipotente por toda a eternidade. Amém.";

export const novenaClosingVersicle = {
  celebrant: "Rogai por nós, Seráfico Pai São Francisco de Assis",
  people: "Para que sejamos dignos das promessas de Cristo",
};

export const novenaLadainhaInvocations: string[] = [
  "Senhor, tende piedade de nós.",
  "Cristo, tende piedade de nós.",
  "Senhor, tende piedade de nós.",
  "Jesus Cristo, ouvi-nos.",
  "Jesus Cristo, atendei-nos.",
  "Deus Pai dos céus, tende piedade de nós,",
  "Deus Filho, Redentor do mundo,",
  "Deus Espírito Santo,",
  "Santíssima Trindade, que sois um só Deus,",
  "Santa Maria, Virgem Imaculada, rogai por nós,",
  "São Francisco Seráfico,",
  "São Francisco, Pai sapientíssimo,",
  "São Francisco, Pai dos pobres,",
  "São Francisco, irmão universal,",
  "São Francisco, que desprezastes o mundo,",
  "São Francisco, espelho da penitência,",
  "São Francisco, vencedor dos vícios,",
  "São Francisco, imitador de Cristo,",
  "São Francisco, com as chagas de Jesus adornado,",
  "São Francisco, amante da pobreza,",
  "São Francisco, mestre da obediência,",
  "São Francisco, espelho puríssimo de castidade,",
  "São Francisco, norma da humildade,",
  "São Francisco, pai rico de graças,",
  "São Francisco, caminho dos que erram,",
  "São Francisco, auxílio dos enfermos,",
  "São Francisco, arauto da paz,",
  "São Francisco, coluna da Igreja,",
  "São Francisco, protetor da fé,",
  "São Francisco, herói valente de Cristo,",
  "São Francisco, baluarte dos que pelejam,",
  "São Francisco, escudo inexpugnável,",
  "São Francisco, martelo dos hereges,",
  "São Francisco, apóstolos dos infiéis,",
  "São Francisco, sustentáculo dos fracos,",
  "São Francisco, ressuscitador dos mortos,",
  "São Francisco, patrono da ecologia,",
  "São Francisco, saúde dos leprosos,",
  "São Francisco, serafim do mais ardente amor,",
];

export const novenaLadainhaClosing = {
  lambOfGod: [
    "Cordeiro de Deus, que tirais o pecado do mundo, perdoai-nos, Senhor.",
    "Cordeiro de Deus que tirais o pecado do mundo, ouvi-nos, Senhor.",
    "Cordeiro de Deus que tirais o pecado do mundo, tende piedade de nós.",
  ],
  versicle: "V. Rogai por nós São Francisco.",
  response: "R. Para que sejamos dignos das promessas de Cristo.",
  prayer:
    "Ó Deus que fizeste o seráfico pai São Francisco assemelhar-se ao Cristo por uma vida de humildade e pobreza, concedei que, trilhando o mesmo caminho, sigamos fielmente o Vosso Filho, unindo-nos convosco na perfeita alegria. Por Nosso Senhor Jesus Cristo, Vosso Filho, na unidade do Espírito Santo. Amém.",
};

export type NovenaSong = {
  title: string;
  lyrics: string[];
};

export const novenaSongs: NovenaSong[] = [
  {
    title: "Francisco de Assis",
    lyrics: [
      "Celebramos tua vida Francisco\nÉs imagem do Cristo\nToda a terra hoje canta e celebra feliz\nTua Páscoa Francisco de Assis",
      "1. Toda terra unida canta um hino de louvor\nAo onipotente e altíssimo Senhor\nÉ Francisco nosso inspirador",
      "2. Ó Francisco, teu legado é vivo hoje aqui\nAnos se passaram morte nunca foi seu fim\nE saudade o mundo tem de ti",
      "3. Se o amor não é amado nós vamos amar\nQual Francisco o Evangelho ao mundo anunciar\nVamos ó irmãos recomeçar",
    ],
  },
  {
    title: "Altíssimo, glorioso Deus",
    lyrics: [
      "Altíssimo, glorioso Deus,\nilumina as trevas do meu coração\nDá-me, fé reta,\nesperança certa, e perfeita caridade\nPara que eu cumpra tua santa vontade",
    ],
  },
  {
    title: "Francisco Serafim do amor",
    lyrics: [
      "Cantamos louvores a ti, ó Serafim do amor\nA ti São Francisco de Assis de Cristo seguidor",
      "1. Cantamos tua glória no Céu, na Terra cantamos a ti,\ntua vida é exemplo para se seguir.\nO Santo Evangelho encarnou e a Paixão de Cristo em ti\nse fez carne viva pelo Serafim.",
      "2. Cantamos tua doce paz e o teu ardente amor\ne por teu viver louvamos o Senhor.\nCantamos as chagas em ti nas mãos, nos pés, coração,\nés um outro Cristo, imagem da Paixão.",
      "3. Cantamos-te, Arauto do Rei que pobre e humilde se fez\nem ti Cristo se revela outra vez.\nAos Céus suba o nosso louvor, ó santo de Deus sem igual,\nensina a fraternidade universal.",
      "4. Cantamos-te Altíssimo Pai, da Terra e do Céu Criador,\nao Filho do Pai e ao Santificador.\nÀ Santa Trindade o louvor, a glória, a exaltação,\nao Deus Trino e Onipotente a adoração.",
    ],
  },
];
