// Conteúdo curado do santoral: o primeiro bloco historico de cada santo, extraido e
// revisado do `santoral-completo.pdf` (Próprio da Família Franciscana). Storage LOCAL.
//
// Regra: apenas entradas `curated` são publicadas; `draft` fica retido até revisão
// editorial. Piloto (Etapa 155): janeiro. Extração em lote nas etapas seguintes.
//
// Cada `saintId` deve existir no indice (`santoral-index-2026.ts`); o teste garante
// que não há conteúdo órfão.

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

  {
    saintId: "saint-01-19-santa-eustoquia-calafato-virgem",
    shortHistory: "Nasceu aos 25 de março de 1434, em Messina. No Batismo recebeu o nome de Esmeralda. Em 1444, sem ela o saber, o pai a deu em contrato de casamento a um viúvo que, no entanto, morreu inesperadamente, antes que se cumprisse o contrato. Enquanto isso, Esmeralda preparava-se para se consagrar ao celeste Esposo na vida religiosa, enfrentando acirrada oposição dos parentes e, em particular, do próprio pai. Morto este, entrou num mosteiro de Clarissas, recebendo o nome de Eustóquia. Fundou o Mosteiro de Monte Vergine com o intuito de restaurar a estrita observância da vida evangélica e o rigor da Altíssima Pobreza. Eleita abadessa em 1464, conduziu o Mosteiro com grande prudência e zelo dedicado até o fim da vida. Promoveu a vida litúrgica e, particularmente, o Ofício Divino e o Culto à Virgem Maria. Não tinha outro desejo senão o de estar escondida no Coração de Cristo, sua alegria e refúgio. Voou ao encontro do Esposo, para as núpcias eternas, no dia 20 de janeiro de 1485. Beatificada em 1782, foi canonizada pelo Papa São João Paulo II aos 11 de junho de 1988, na cidade de Messina.",
    status: "curated",
  },
  {
    saintId: "saint-01-20-bem-aventurado-joao-batista-triquerie-presbitero-e-martir",
    shortHistory: "João Batista Triquerie nasceu em 1737. Ingressou na Ordem dos Frades Menores Conventuais e foi ordenado presbítero. Ele se distinguiu por uma profunda vida de fé e por seu serviço e assistência às Clarissas e outras religiosas. Faz parte do glorioso e heroico grupo dos dezenove mártires de Laval, durante a Revolução Francesa. Quando esta foi declarada, João Batista recusou com firmeza pronunciar o juramento que impunha a lei civil, um juramento contrário à Igreja, à qual permaneceu fiel, mesmo custando-lhe a própria vida. Por isso, foi encarcerado e logo condenado à morte. Foi assassinado em 21 de janeiro de 1794, junto com outros sacerdotes e algumas religiosas, martirizados nas mesmas circunstâncias. Foram beatificados por Pio XII, em 19 de junho de 1955.",
    status: "curated",
  },
  {
    saintId: "saint-01-27-santa-angela-de-merici-virgem",
    shortHistory: "Nasceu por volta do ano de 1470, em Desenzano (Bréscia), Itália. Recebeu uma profunda formação religiosa e dedicou sua vida à piedade, às santas leituras e às obras de misericórdia. Sensível às carências da sociedade de seu tempo, seu trabalho centralizou-se na atuação sobre a família, por meio da tarefa mais importante e delicada: a formação cristã das mulheres. Mulher inquieta, Ângela peregrinou por toda a Itália e chegou também à Terra Santa. Foi admitida na Terceira Ordem Franciscana. Imitadora de Francisco de Assis, também a ela se uniram prontamente algumas mulheres com as quais fundou, em 1535, uma sociedade sob proteção de Santa Úrsula; daí passaram a ser chamadas de Ursulinas. Dedicaram-se à formação cristã de meninas pobres e tiveram fortíssima influência na sociedade de seu tempo. Morreu em 27 de janeiro de 1540 e foi canonizada por Pio VII, em 1807.",
    status: "curated",
  },
  {
    saintId: "saint-01-29-bem-aventurado-francisco-zirano-presbitero-e-martir",
    shortHistory: "Francisco Zirano nasceu em Sassari, em 1564, de uma família modesta. Tendo entrado na vida consagrada entre os Frades Menores Conventuais da cidade, tornou-se sacerdote em 1586. Seu zelo pela caridade para com o próximo foi orientado na vocação missionária em 1599, quando se comprometeu a libertar um primo e confrade que havia sido escravizado em Argel desde 1590, para protegê-lo de negar a fé. Chegou à África em julho de 1602 e, incapaz de operar redenções, durante a guerra que eclodiu entre o reino de Cabile de Cuco, um aliado da Espanha, e a regência turca da Argélia, foi capturado como espião e condenado à morte. Coagido a converter-se ao Islã para salvar sua vida, ele recusou, repetidamente e com firmeza, preferindo morrer esfolado vivo. Ele morreu em 25 de janeiro de 1603, proclamando sua fidelidade a Cristo e à vocação franciscana e invocando a luz da fé para os carrascos que a negaram. De comum dos mártires.",
    status: "curated",
  },
  {
    saintId: "saint-01-30-santa-jacinta-de-mariscotti-virgem",
    shortHistory: "Jacinta, de nobre família romana, nasceu perto de Viterbo, em 1585. Tendo professado ainda muito jovem entre as Irmãs da Ordem Franciscana Secular, descuidou-se por algum tempo no cumprimento de suas obrigações. Na convalescença de uma doença grave, caiu em si e abandonou de vez todas as vaidades do mundo. Ecastigando desde então seu corpo com aspérrima penitência, entregou-se inteiramente a obras de caridade, merecendo que Deus a ornasse de dons celestes. Morreu em Viterbo, no ano de 1640. Foi canonizada por Pio VII em 1807.",
    status: "curated",
  },
  {
    saintId: "saint-02-04-sao-jose-de-leonissa-presbitero",
    shortHistory: "José Desideri nasceu em Leonissa, Itália, em 1556. Entrando para a Ordem dos Frades Menores Capuchinhos, levou uma vida de enorme austeridade e muito zelo apostólico. Como missionário em Constantinopla, empenhou-se muito para confortar e consolar os escravos indefesos, tentando converter até mesmo o sultão. Por esse motivo, foi feito prisioneiro e torturado. Escapando, no entanto, à morte, retornou à sua pátria, onde continuou sua atividade apostólica. Morreu em Amatris aos 4 de fevereiro de 1612. Foi canonizado por Bento XIV .",
    status: "curated",
  },
  {
    saintId: "saint-02-06-sao-pedro-batista-sao-paulo-miki-e-seus-companheiros-martire",
    shortHistory: "Pedro Batista nasceu na Espanha no ano de 1542. Feitos os estudos eclesiásticos e ordenado sacerdote, partiu para o Oriente a fim de pregar o Evangelho, trabalhando por longos anos nas Ilhas Filipinas. Em 1593, mandado para o Japão com mais cinco confrades, dedicou-se ao trabalho de conversão dos japoneses, convertendo muitos à fé. Construiu igrejas e hospitais. Mas, por questões políticas e religiosas surgidas na região, todo o trabalho foi interrompido, e Pedro Batista foi preso e levado a Nagasaki, entre zombarias e ultrajes do povo, ali foi crucificado com seus confrades franciscanos, três jesuítas e quinze irmãos da Ordem Terceira, consumando o glorioso martírio no dia 5 de fevereiro de 1597. O Papa Pio IX os canonizou em 1862.",
    status: "curated",
  },
  {
    saintId: "saint-02-07-santa-coleta-virgem",
    shortHistory: "para Ordem II: Festa Para FF: Memória Coleta nasceu na França, no ano de 1381. Tendo falecido os pais, distribuiu todos os seus bens aos pobres e, revestida do hábito da Ordem Franciscana Secular, viveu por algum tempo como reclusa. Recebida, finalmente, pelas Clarissas, com a autorização do Sumo Pontífice, reformou, na primitiva forma de vida franciscana, muitos mosteiros e conventos da Segunda e da Primeira Ordens, inculcando, sobretudo, a prática da pobreza e da oração. Morreu aos 6 de março do ano de 1447 em Gante. Foi canonizada por Pio VII em 1808.",
    status: "curated",
  },
  {
    saintId: "saint-02-09-bem-aventurado-leopoldo-de-alpandeire-religioso",
    shortHistory: "Nasceu em Alpandeire (Málaga), em 24 de junho de 1864. Sendo já de idade adulta, vestiu o hábito dos Frades Menores Capuchinhos. Por um espaço de meio século, viveu em Granada, pedindo esmolas para o seu convento e para os pobres e para as missões, enquanto distribuía, ao mesmo tempo, a ajuda espiritual do consolo, conselho e bom exemplo de uma vida austera e pura. Rezava com fé extraordinária e devoção a oração das três Ave-Marias por todos os que lhe pediam ou se achegavam a ele. Depois de uma longa enfermidade, na qual resplandeceram, ainda mais, suas virtudes, morreu em Granada em 9 de fevereiro de 1956. Também em Granada, foi beatificado no dia 12 de setembro de 2010, pelo Cardeal delegado do Papa Bento XVI.",
    status: "curated",
  },
  {
    saintId: "saint-02-19-sao-conrado-de-placenca-eremita",
    shortHistory: "Nascido em Placença, por motivo de um acidente de caça, vendeu tudo quanto tinha e, com sua esposa, despediu-se do mundo. Tendo vestido o hábito da Ordem Franciscana Secular, partiu para a Sicília, onde, por perto de quarenta anos, viveu uma vida de paupérrima penitência. Morreu em 1351. Urbano VIII aprovou seu culto como santo em 1625.",
    status: "curated",
  },
  {
    saintId: "saint-02-25-bem-aventurado-sebastiao-de-aparicio-religioso",
    shortHistory: "Nasceu no ano de 1502, em Gudena (Espanha), de pais pobres, mas piedosos. Desde a adolescência levava para pastar um pequeno rebanho e aproveitava os momentos livres para orar e visitar igrejas ou capelas. Aos 15 anos foi contratado como serviçal por uma senhora rica de Salamanca, mas, não podendo suportar o ambiente frívolo da casa, apesar de bem remunerado, desistiu desse trabalho. Apreciava mais a vida campestre, em contato direto com a natureza, que lhe permitia subir até Deus. Durante oito anos trabalhou a serviço de dois agricultores e, com o ordenado, ajudava os pais na sua pobreza e amealhou modestos fundos para os dotes das irmãs. Com 31 anos de idade, falecidos os pais e casadas as irmãs, zarpou para a América. Chegado a Puebla, no México, retomou os trabalhos agrícolas. Para incrementar o comércio empreendeu viagens de transporte de mercadorias entre várias cidades. Rasgou vias de comunicação através de bosques impenetráveis, promoveu a construção duma importante estrada entre Zacatecas e a Cidade do México. Tudo quanto ganhava nestas suas empresas era patrimônio dos pobres. Socorria com generosidade os necessitados, transportava-os gratuitamente e às suas mercadorias, emprestava-lhes dinheiro a fundo perdido, ocupavase em libertar prisioneiros e escravos. Os índios o respeitavam e admiravam. Absorvido numa vida tão movimentada, encontrava sempre tempo para a oração e participação na Eucaristia. Com frequência o demônio o atormentava com tentações, mas sem nunca conseguir vencê-lo. Em 1552 passou a empresa a outros proprietários e, nos arrabaldes da Cidade do México, adquiriu uma quinta, voltando a dedicar-se à agricultura e criação de gado. Casou, mas, de comum acordo com a esposa, fez voto de castidade. Enviuvando após um ano, decidiu contrair segundas núpcias com uma virtuosa senhora, com a qual viveu igualmente em perfeita continência. Pouco depois, veio a falecer também esta segunda mulher. A 2 de julho de 1573, com 71 anos de idade, decidiu realizar um velho sonho. Pediu e recebeu o hábito de frade menor no convento da Cidade do México. Aí viveu ainda nada menos que 27 anos, sendo para todos exemplo de religioso humilde, obediente, dedicado à oração e à penitência. Deus glorificou sua vida exemplar. A 25 de fevereiro de 1600, aos 98 anos de idade, descansou serenamente no Senhor. Passou a ser venerado como santo, e o seu sepulcro tornou-se glorioso. Foi beatificado por Pio VI no dia 17 de maio de 1789.",
    status: "curated",
  },
  {
    saintId: "saint-03-02-santa-ines-de-praga-virgem",
    shortHistory: "Inês, filha de Premislau, rei da Boêmia, nasceu em Praga, pelo ano de 1205. Tendo recusado o casamento com o imperador, professou em 1236 entre as Clarissas do Mosteiro que havia fundado, e do qual por muitos anos foi abadessa. Santa Clara, que lhe consagrou singular amizade, escreveu-lhe várias cartas sobre assuntos de perfeição seráfica. Morreu em 6 de março de 1282. Foi canonizada pelo Papa São João Paulo II em 12 de novembro de 1989.",
    status: "curated",
  },
  {
    saintId: "saint-03-12-bem-aventurada-angela-salawa-virgem",
    shortHistory: "Ângela Saława nasceu a 9 de setembro de 1881 na cidade de Siepraw, perto de Cracóvia, na Polônia, para onde se transferiu em 1897, a fim de trabalhar no humilde serviço de empregada doméstica. Sentiu-se chamada por Deus à santidade no estado secular entre dificuldades da vida, a fim de participar da paixão de Cristo pela salvação das almas. Inscrita na Ordem Franciscana Secular, brilhou por uma piedade fervorosa para com Deus, pela paciência e a pobreza, cultivando a virgindade perpétua. Foi agraciada por Deus com dons místicos que foram transcritos num Diário espiritual por ela mesma escrito em nome da obediência. Morreu em Cracóvia a 12 de março de 1922 e na mesma cidade foi beatificada pelo Papa São João Paulo II, em 13 de agosto de 1991.",
    status: "curated",
  },
  {
    saintId: "saint-03-18-sao-salvador-de-horta-religioso",
    shortHistory: "Nasceu em dezembro de 1520, em Santa Colomba de Farnés, na Catalunha (Espanha). Ficou órfão muito cedo. Depois de um período de experiência na Abadia beneditina de Montserrat, escolheu definitivamente o caminho da pobreza, entrando no noviciado no convento dos Frades Menores de Barcelona, onde fez a profissão religiosa em 1542. Transferido para Tolosa, começou a ser conhecido pelos seus poderes como taumaturgo. Permaneceu doze anos em Horta, operando diversos milagres. Apesar de viver em humildade, sua fama de milagreiro causou incompreensões da parte dos confrades. Por vários anos, peregrinou de um convento a outro, e, por onde ele andava, se repetia para ele a mesma coisa: prodígios e novas inimizades. Foi até denunciado à Inquisição, que não encontrou nada contra ele. Conheceu um pouco de paz no convento de Santa Maria de Jesus, em Cagliari, onde chegou no ano de 1565. Morreu no dia 18 de março de 1567. Foi proclamado bem-aventurado, a pedido de Felipe II, rei da Espanha, no dia 15 de fevereiro de 1606, por Paulo V . Pio XI canonizou-o no dia 17 de abril de 1938.",
    status: "curated",
  },
  {
    saintId: "saint-04-05-santa-maria-crescencia-hoss-virgem",
    shortHistory: "Maria Crescência Höss nasceu em Kaufbeuren, região da Baviera, Alemanha, em 1682. Ingressou muito jovem no convento das Terciárias Franciscanas de sua cidade, Kaufbeuren. Era chamada de “Mãe dos Pobres” pelos católicos e luteranos que socorria no convento. Foi uma grande mestra na espiritualidade, tanto para os seculares como para as religiosas, modelo de piedade, paciência e diligência no trabalho. Com grande fama de santidade, durante a quaresma de 1744 adoeceu gravemente e, na noite de Páscoa do dia 5 de abril de 1744, recebeu o prêmio de suas virtudes no céu. Foi beatificada por Leão XIII em 7 de outubro de 1900 e canonizada pelo Papa São João Paulo II em 25 de novembro de 2001.",
    status: "curated",
  },
  {
    saintId: "saint-04-16-sao-benedito-jose-labre-secular-cordigero",
    shortHistory: "“Ocigano de Cristo”, este também é seu apelido, que demonstra claramente o que foram os trinta e cinco anos de vida de Benedito José Labre, treze deles caminhando e evangelizando pelas famosas e seculares estradas de Roma. Aliás, o antigo ditado popular que diz que “todos os caminhos levam a Roma” continua sendo assim para todos os cristãos. Entretanto, principalmente no século XVII, em qualquer um deles era possível cruzar com o peregrino Benedito José e nele encontrar o caminho que levava a Deus. Ele era francês, nasceu em Amettes, próximo a Arras, no dia 27 de março de 1748, o mais velho dos quinze filhos de um casal de agricultores pobres. Frequentou a modesta escola local, mas aprendeu latim com um tio materno. Ainda muito jovem, quis tornar-se monge trapista, mas não conseguiu o consentimento dos pais. Com dezoito anos, pediu ingresso no convento trapista de Santa Algegonda, mas os monges não aprovaram sua entrada. Percorreu a pé, então, centenas de quilômetros até a Normandia, debaixo de um inverno extremamente rigoroso, onde pediu admissão no Convento Cisterciense de Montagne. Também foi recusado ali, tentando, ainda, a entrada nos Cartuchos de Neuville e Sept-Fons, com o mesmo resultado. Foi então que, com vinte e dois anos, tomou a decisão mais séria da sua vida: seu mosteiro, já que não encontrava guarida em nenhum outro, seriam as estradas de Roma. No embornal de peregrino carregava apenas o Novo Testamento e um breviário, além de um terço nas mãos. Durante a noite, dormia nas ruínas do Coliseu e, de dia, percorria as estradas peregrinando nos lugares sagrados e evangelizando sem pedir esmolas. Quando recebia a caridade alheia, mesmo sem pedir, ainda dividia o que ganhava com os pobres. Isso lhe valeu, certa vez, algumas pancadas de um certo cidadão que encarou sua atitude como um insulto. Na maior parte dos dias, comia um pedaço de pão e ervas colhidas no caminho. Os maus-tratos do quotidiano, ou seja, a maneira insatisfatória de higiene a que se submetera durante muitos anos e as penitências que se autoimpusera, acabaram por causar o seu fim. Um dia, ainda muito jovem, seu corpo foi encontrado nos fundos da casa de um amigo arquiteto, perto da Igreja de Santa Maria dos Montes. Houve uma grande aglomeração de populares que admiravam e até veneravam o singelo peregrino. Benedito José acabou sendo sepultado ali mesmo, próximo daquela igreja, local que logo passou a ser procurado pelos devotos e peregrinos. Imediatamente, tornou-se palco de muitas graças e prodígios, por intercessão daquele que em vida percorreu o caminho da santidade. O Papa Leão XIII canonizou Benedito José Labre em 1881, determinando sua festa para o dia 16 de abril, data de sua morte no ano 1783.",
    status: "curated",
  },
  {
    saintId: "saint-04-21-sao-conrado-de-parzao-religioso",
    shortHistory: "Conrado Birndorf, batizado com o nome de João, nasceu na Baviera em 1818. Depois de uma juventude vivida na piedade cristã, professou em 1842 na Ordem dos Frades Menores Capuchinhos. Com grande zelo, caridade e paciência exerceu o ofício de porteiro no convento de Altötting durante 43 anos, até que, insigne em santidade, morreu no ano de 1894. Foi canonizado por Pio XI, em 1934.",
    status: "curated",
  },
  {
    saintId: "saint-04-23-bem-aventurado-egidio-de-assis-religioso",
    shortHistory: "Pertencente aos primeiros discípulos de São Francisco, Egídio era simples e manso. Peregrinando em espírito de devoção a diversos santuários, não deixava nunca de ganhar seu sustento, trabalhando e ajudando os lavradores no cultivo de suas terras. Gostava de levar vida eremítica, mas nem por isso se desinteressava do bem das almas. Passou os últimos anos de vida em Perusa, dedicando-se a exercícios de ascese e contemplação. Morreu em Perusa, no ano de 1262. Pio VI aprovou seu culto em 1777.",
    status: "curated",
  },
  {
    saintId: "saint-04-24-sao-fidelis-de-sigmaringa-presbitero-e-martir",
    shortHistory: "Fidélis nasceu em Sigmaringa, Alemanha, em 1578. Seu pai era burgomestre. Estudou filosofia e direito em Friburgo. Exerceu por vários anos a profissão de advogado, entrando depois para a Ordem dos Frades Menores Capuchinhos. Foi ordenado sacerdote em 1612, tornando-se um grande pregador da Contrarreforma. Em sua atividade de pregador, ele foi morto por um grupo de camponeses calvinistas, na Suíça, no dia 24 de abril de",
    status: "curated",
  },
  {
    saintId: "saint-04-28-bem-aventurado-luquesio-de-poggibonsi",
    shortHistory: "Luquésio, nascido em Castro Benício, na Etrúria, exercia a profissão de comerciante. Iluminado mais tarde pela graça divina, distribuiu seus bens aos pobres e, conforme a tradição, foi o primeiro a vestir o hábito da Ordem Franciscana Secular. Brilhou por sua caridade para com o próximo, pelo espírito de pobreza, por sua humildade e austeridade de vida. Morreu quase octogenário, pelo ano de 1260.",
    status: "curated",
  },
  {
    saintId: "saint-04-30-bem-aventurado-bento-de-urbino-presbitero",
    shortHistory: "Nasceu em Urbino, em 1560. Licenciado em Filosofia e em Direito, ingressou aos 23 anos na Ordem dos Frades Menores Capuchinhos, distinguindo-se por sua austeridade de vida, espírito de oração e pobreza. Dedicou-se com fervor e simplicidade à pregação. Morreu em Fossombrone em 30 de abril de 1625. Foi beatificado por Pio IX em 1867. Seu corpo é venerado na igreja dos Frades Capuchinhos em Fossombrone.",
    status: "curated",
  },
  {
    saintId: "saint-05-04-bem-aventurados-tomas-bullaker-e-seus-companheiros-martires",
    shortHistory: "Sob o nome de Mártires da Inglaterra costuma-se designar um grupo imenso de católicos, ao qual pertencem também os nossos cinco frades franciscanos que enfrentaram a morte durante a perseguição desencadeada por Henrique VIII após o cisma da Igreja da Inglaterra. Henrique VIII obrigava seus súditos a segui-lo, sob pena de perseguição. Os que se recusavam eram acusados de alta traição e condenados à morte. A Ordem franciscana, neste período, viu subir ao patíbulo numerosos frades. Entre esses, veneramos os cinco mártires mortos entre os anos 40 e 70 do século XVII: Bem-aventurado Tomás Bullaker (1602-1642), sacerdote franciscano de coração ardente, no dia 12 de outubro de 1642, depois de haver recebido a absolvição de um confrade, ao canto de Te Deum subiu ao patíbulo, onde foi enforcado e horrivelmente despedaçado. Bem-aventurado Henrique Heath (1599-1643) nasceu de família protestante e, após sua fulgurante conversão, tornou-se franciscano e sacerdote, levando uma vida austera, penitente, dedicando-se à pregação. No dia 7 de abril de 1642 negou-se a abjurar da fé. Foi barbaramente enforcado e esquartejado em Tiburn (Londres). Bem-aventurado Artur Bell (1591-1643), ministro provincial dos Frades Menores da Escócia e definidor geral da Ordem, recebeu a sentença de morte ao canto do Te Deum. No palco quis celebrar sua última missa, renovou sua profissão de fé e obteve a conversão do Capitão Tovers. Juntos sofreram o martírio. Bem-aventurado João Woodcock (1603-1640), nascido de pai protestante e de mãe católica, tão logo aderiu ao catolicismo, em 1631, fez-se frade menor e foi ordenado sacerdote, desenvolvendo",
    status: "curated",
  },
  {
    saintId: "saint-05-06-bem-aventurada-maria-catarina-troiani-religiosa-virgem-e-fun",
    shortHistory: "FRANCISCANAS MISSIONÁRIAS DO CORAÇÃO IMACULADO DE MARIA Para FMCIM: Festa Para FF: Memória facultativa A Bem-aventurada Maria Catarina Troiani nasceu em Giuliano de Roma, em 9 de janeiro de 1813. No batismo recebeu o nome de Costanza. Aos 5 anos de idade, por acontecimentos na família, Costanza foi confiada às Irmãs do Educandário de Ferentino, passando a se interessar muito pela vida religiosa. Em 8 de dezembro de 1829, aos 15 anos de idade, iniciou",
    status: "curated",
  },
  {
    saintId: "saint-05-08-bem-aventurado-jeremias-de-valaquia-religioso",
    shortHistory: "O Bem-aventurado Jeremias nasceu em Valaquia Menor, Romênia, em 1556. Aos 18 anos, deixou sua pátria e rumou para a Itália, onde viveu até sua morte. Em 8 de maio de 1579, emitiu a profissão religiosa na Ordem dos Frades Menores Capuchinhos de Nápoles. Exerceu vários ofícios em diferentes conventos, até que, em 1585, recebeu o encargo de enfermeiro do convento de Santo Efrém. Ali permaneceu mais de quarenta anos gastando sua vida servindo com generosidade, “alegria e serenidade em seu rosto”. Morreu em Nápoles em 5 de março de 1625, vítima da caridade e da obediência, por visitar um enfermo que se encontrava em Torre del Greco. Querido por ortodoxos e latinos, o irmão humilde capuchinho é hoje glória e esperança de sua pátria, Romênia. Foi beatificado pelo Papa São João Paulo II, em 30 de outubro de 1983.",
    status: "curated",
  },
  {
    saintId: "saint-05-09-santa-catarina-de-bolonha-virgem",
    shortHistory: "Catarina nasceu em Bolonha, no ano de 1413, e, depois de estudar letras e artes, em 1431, pediu para ser admitida pelas Clarissas de Ferrara. Encarregada da formação das noviças, iniciou-as nos melhores ensinamentos. Em 1456, fundou",
    status: "curated",
  },
  {
    saintId: "saint-05-11-santo-inacio-de-laconi-religioso",
    shortHistory: "Inácio, antes chamado Vicente, nasceu em Láconi, Sardenha, em 1701. Entrou na Ordem dos Frades Menores Capuchinhos em 1721. Durante 40 anos dedicou-se ao ofício de esmoler, dando sempre a todos um esplêndido exemplo de humildade e de caridade. Deus o enriqueceu de admiráveis dons sobrenaturais, que lhe valeram a admiração de todas as categorias de pessoas. Faleceu em Cagliari, aos 11 de maio de 1781. Pio XII o canonizou em 1951.",
    status: "curated",
  },
  {
    saintId: "saint-05-12-sao-leopoldo-mandic-presbitero",
    shortHistory: "Leopoldo Mandic nasceu em Castelnuovo de Cátaro, Montenegro, no dia 12 de maio de 1866. Vestiu o hábito capuchinho em Bassano da Grappa, a 2 de maio de 1884, sendo ordenado sacerdote em Veneza no dia 20 de setembro de 1890. Desejou ardentemente voltar para o meio de seu povo para obedecer a uma voz de Deus, percebida claramente desde 1887, que o chamava a promover a unidade da Igreja. Mas seus superiores lhe confiaram o ministério do confessionário, primeiramente em vários conventos do Vêneto e, depois, definitivamente, em Pádua, no convento de Santa Cruz dos Capuchinhos. Fechado num quartinho estreito, atendia todos os dias as pessoas que procuravam a reconciliação com Deus, vendo em cada uma o seu Oriente. Morreu aos 30 de julho de 1942. Foi beatificado por São Paulo VI, a 2 de maio de 1976, e canonizado em 16 de outubro de 1983, pelo Papa São João Paulo II.",
    status: "curated",
  },
  {
    saintId: "saint-05-13-sao-pedro-regalato-presbitero",
    shortHistory: "Nasceu em Valladolid em 1390. Aos 14 anos ingressou na Ordem Franciscana. Foi destinado ao eremitério de La Aguilera (Burgos) recém-fundado por Pedro de Villacreces, que tinha começado em Castilla a reforma da Ordem com a intenção de voltar ao estilo simples de vida de São Francisco e dos seus primeiros irmãos. Em 1412, foi ordenado sacerdote e celebrou a primeira missa na ermida primitiva de La Aguilera. Foi um promotor entusiasta do retorno à observância primitiva da Regra de São Francisco. Entregou-se apaixonadamente a viver o Evangelho e a compartilhar as necessidades e desejos das pessoas simples. Consumiu-se pelos enfermos, em especial pelos leprosos. Morreu em La Aguilera (Burgos) em 1456. Bento XIV o canonizou em 1746.",
    status: "curated",
  },
  {
    saintId: "saint-05-16-santa-margarida-de-cortona",
    shortHistory: "Nasceu em Laviano, na Toscana, em 1247. Na juventude, viveu por nove anos amasiada com um homem em Montepulciano. Tendo ele morrido, retirou-se ela para Cortona, vestiu o hábito da Ordem Franciscana Secular e, sob a orientação dos Frades Menores, encetou um novo caminho. Exercendo as obras de caridade, principalmente para com os doentes, e para melhor poder tratá-los, atraiu a si outras companheiras e fundou um hospital; em tudo, porém, insistiu no espírito de oração, no jejum e nas piedosas meditações. Com zelo, cultivou as virtudes da humildade e pobreza. Distinguiu-se por um admirável amor para com o mistério da Eucaristia e a paixão de Jesus Cristo. Morreu a 22 de fevereiro de 1297. Bento XIII a canonizou em 16 de maio de 1728.",
    status: "curated",
  },
  {
    saintId: "saint-05-17-sao-pascoal-bailao-religioso",
    shortHistory: "Nasceu na Espanha, no ano de 1540. Desde criança, pastor de rebanhos, cultivou a piedade, sobretudo para com a Eucaristia. Já adiantado em virtudes, foi admitido, em 1564, entre os Frades Menores e destinado a trabalhos humildes. Cumulado de dons divinos, ajudou a muitos com seu conselho e escreveu alguns opúsculos em que expôs os resultados de sua experiência religiosa. Morreu no ano de 1592. O Papa Alexandre",
    status: "curated",
  },
  {
    saintId: "saint-05-18-sao-felix-de-cantalicio-religioso",
    shortHistory: "Félix nasceu entre os sabinos na Itália, no ano de 1515, e tomou o hábito dos Frades Menores Capuchinhos em 1543. Por quarenta anos, exerceu, em Roma, o ofício de esmoler, distinguindo-se por admirável simplicidade, inocência e caridade. Adornado de dons do alto, morreu, em Roma, no ano de 1587. Clemente XI o canonizou em 1712.",
    status: "curated",
  },
  {
    saintId: "saint-05-19-sao-crispim-de-viterbo-religioso",
    shortHistory: "Crispim, batizado Pedro Fioretti, nasceu em Viterbo aos 13 de novembro de 1668 e recebeu o hábito religioso dos Frades Menores Capuchinhos no dia 22 de julho de 1693. Durante cerca de 40 anos exerceu o ofício de esmoler. Nesse serviço, ele deu um admirável exemplo de amor a Deus, de devoção a Nossa Senhora e de uma efetiva caridade para com o próximo. Morreu, em Roma, aos 19 de maio de 1750. Foi beatificado por Pio VII a 7 de setembro de 1806 e canonizado pelo Papa São João Paulo II no dia 20 de junho de 1982.",
    status: "curated",
  },
  {
    saintId: "saint-05-19-santa-maria-bernarda-virgem-e-fundadora",
    shortHistory: "MARIA AUXILIADORA Para FMM: Solenidade Para FF: Memória facultativa Nasceu no povoado de Auw, na Suíça, no dia 28 de maio de 1848, numa família de muita fé e sólidos valores. Aos 19 anos de idade se consagrou a Deus na vida religiosa contemplativa, no mosteiro de Maria Auxiliadora, em Altstätten, Suíça, e recebeu o nome de Maria Bernarda. Exerceu a missão de administradora, depois mestra de noviças e, em seguida, superiora do mosteiro. No dia 19 de junho de 1888, acompanhada de seis jovens religiosas, partiu para sempre de sua pátria, de sua família, de seu querido mosteiro, rumo à Diocese de Porto Velho, no Equador, marcando assim o início da Congregação das Irmãs Franciscanas Missionárias de Maria Auxiliadora. Viveu sua missão apostólica na educação, junto aos jovens, crianças e famílias abandonadas. Faleceu no dia 19 de maio de 1924, em Cartagena, Colômbia, onde até hoje se encontra seus restos mortais, no santuário a ela dedicado. No dia 29 de outubro de 1995, foi beatificada por sua Santidade São João Paulo II. Bento XVI a canonizou em Roma, no dia 12 de outubro de 2008. Somente quando solenidade: I Vésperas",
    status: "curated",
  },
  {
    saintId: "saint-05-20-sao-bernardino-de-sena-presbitero",
    shortHistory: "Nasceu em Massa Marítima, na Toscana, em 1380. Professou entre os Frades Menores e, ordenado sacerdote, exerceu o ministério da pregação por toda a Itália com grande fruto das almas. Propagou a devoção ao Santíssimo Nome de Jesus e prestou ótimos serviços à sua Ordem na promoção da disciplina e dos estudos, escrevendo, inclusive, tratados teológicos. Morreu em Áquila, no ano de 1444. Nicolau V o canonizou em 1450.",
    status: "curated",
  },
  {
    saintId: "saint-05-24-dedicacao-da-basilica-de-sao-francisco-em-assis",
    shortHistory: "Aigreja majestosamente construída na cidade de Assis, em honra do Pai São Francisco, cuja primeira pedra fora lançada pelo Papa Gregório IX em 1228, no dia seguinte ao da canonização do Santo, foi solenemente consagrada por Inocêncio IV , em 25 de maio de 1253. Para essa igreja já Gregório IX, em 1230, também a 25 de maio, havia trasladado solenemente os restos mortais do seráfico Patriarca, retirando-os da capela de São Jorge. Bento XIV , em 25 de março de 1754, elevou-a à dignidade de basílica patriarcal e capela papal. Tudo do comum da dedicação de uma igreja, exceto o que se segue:",
    status: "curated",
  },
  {
    saintId: "saint-05-27-bem-aventurado-jose-tous-y-soler-presbitero",
    shortHistory: "O Bem-aventurado José Tous y Soler nasceu em Igualada (Barcelona), diocese de Vic, no dia 31 de março de 1811; aos 16 anos, no dia 18 de fevereiro de 1827, vestiu o hábito capuchinho no noviciado de Sarriá. Desde os anos de sua formação, revelou-se um religioso de grande virtude, sólida piedade, de pronta obediência e de plena fidelidade ao carisma franciscano-capuchinho. No término de sua formação, foi enviado ao convento S. Madrona em Barcelona, onde se distinguiu pela fidelidade ao ministério sacerdotal e por uma profunda vida interior, alimentada por uma íntima relação com Jesus Crucificado, com Jesus Eucaristia e com Maria, a Mãe do Bom Pastor. No convento de S. Madrona é surpreendido pela revolta social de 1835. Com a supressão das ordens religiosas foi exilado. Em 1843, regressava à Espanha, retomando a vida conventual. Diante do desejo de algumas jovens de empenhar-se no serviço da educação cristã das crianças e dos jovens, em março de 1850 fundou o Instituto das Irmãs Capuchinhas da Mãe de Deus do Divino Pastor. Encontrou-se com a irmã morte em 27 de fevereiro de 1871, enquanto celebrava",
    status: "curated",
  },
  {
    saintId: "saint-05-28-santa-maria-ana-de-jesus-paredes-virgem",
    shortHistory: "Nasceu em Quito, no Equador, em 1614. Muito jovem, órfã de pai e mãe, consagrou-se a Deus na virgindade, mas não podendo entrar em mosteiro, entregou-se totalmente à oração, jejuns e outros exercícios de piedade. Admitida na Ordem Franciscana Secular, de ânimo alegre e bondoso, dedicou-se a obras de caridade na ajuda e proteção dos índios e dos negros. Morreu no dia 24 de maio de 1644.",
    status: "curated",
  },
  {
    saintId: "saint-05-30-santa-camila-batista-varano-virgem",
    shortHistory: "Nasceu em Camerino, no ano de 1458, filha do duque da cidade. Desejou, em 1481, entrar para as Clarissas Urbanianas, mas, pouco tempo depois, ela fundou um mosteiro em Camerino, do qual foi abadessa. Grande devota do",
    status: "curated",
  },
  {
    saintId: "saint-06-02-sao-felix-de-nicosia-religioso",
    shortHistory: "Nasceu em Nicósia (Enna) no dia 5 de novembro de 1715. Entrou muito jovem na Ordem Franciscana Secular e, depois de repetidas recusas, com 28 anos foi recebido entre os Frades Menores Capuchinhos, dando, desde o começo, exemplos de admirável santidade. Obediência e mansidão, grande espírito de penitência, devoção fervorosa a Jesus Eucaristia, à Virgem Imaculada e ao Seráfico Pai São Francisco foram as virtudes que nele resplandeceram em vivíssima luz. Depois do noviciado, em Mistretta (Messina), transcorreu toda sua vida na cidade natal onde exerceu o ofício de esmoler por cerca de quarenta anos, espalhando o perfume da caridade para com todos; conselheiro espiritual, guia e sustento de almas simples, mas também de doutos e eclesiásticos. Teve o dom da profecia e realizou numerosos milagres. No dia 31 de maio de 1787 pediu ao seu superior a obediência de morrer; tendo recebido o consentimento só no terceiro pedido, permanecendo luminoso no seu doce sorriso, murmurou, pela última vez, “seja por amor de Deus” e, inclinando a cabeça, expirou. Leão XIII o incluiu entre os bem-aventurados no dia 12 de fevereiro de 1888, e Bento XVI, entre os santos no dia 23 de outubro de 2005.",
    status: "curated",
  },
  {
    saintId: "saint-06-07-bem-aventurados-miguel-tomaszek-e-zbigniew-strza-kowski-pres",
    shortHistory: "Zbigniew Strzałkowski nasceu em Tarnów (Polônia) em 1958. Emitiu os votos na Ordem dos Frades Menores Conventuais em 1980 e foi ordenado presbítero em 1986;",
    status: "curated",
  },
  {
    saintId: "saint-06-08-bem-aventurado-nicolau-de-gesturi-religioso",
    shortHistory: "Nicolau, cujo nome de batismo era João Ângelo Salvador Medda, nasceu em Gésturi, na Itália, em 5 de agosto de 1882, na província de Cagliari, Arquidiocese de Oristano, no seio de uma numerosa família de honestos trabalhadores e ótimos cristãos. Aserviço do cunhado, após a morte de seus pais, foi acolhido na casa de sua irmã mais velha, empenhando-se nos trabalhos mais humildes do campo, distinguindo-se pela honestidade, piedade, ilibados costumes e austeridade de vida. Em 1911, aos 29 anos, munido de uma lisonjeira carta de seu pároco, foi acolhido entre os capuchinhos de Cagliari, recebendo o nome de Frei Nicolau. Ao término do noviciado, após emitir a profissão simples, recebeu o ofício de esmoler. Por 34 anos, desenvolveu esta missão em grande silêncio, com grande influência espiritual entre as pessoas, que acorriam a ele como a um verdadeiro homem de Deus. Morreu em Cagliari no dia 8 de junho de 1958. Foi beatificado por São João Paulo II no dia 3 de outubro de 1999.",
    status: "curated",
  },
  {
    saintId: "saint-06-12-bem-aventurada-iolanda-religiosa",
    shortHistory: "Nasceu na Hungria, pelo ano de 1235, e era filha do Rei Bela IV . Educada por sua irmã Cunegundes, casou-se em 1256 com Boleslau, de quem teve três filhas. Dedicou- -se às obras de caridade, sobretudo para com os doentes e pobres. Com a morte do marido, ingressou num mosteiro de Clarissas, onde se distinguiu por sua humildade e contemplação das coisas do alto. Morreu em 1298. Comum das santas mulheres ou das santas religiosas.",
    status: "curated",
  },
  {
    saintId: "saint-06-13-santo-antonio-de-padua-de-lisboa-presbitero-e-doutor-da-igre",
    shortHistory: "Nasceu na cidade de Lisboa, em Portugal, pelos fins do século XII. Professou entre os Cônegos Regulares de Santo Agostinho, passando, pouco depois da ordenação sacerdotal, para os Frades Menores, a fim de se dedicar à pregação da fé entre os povos da África. Pregando com grande fruto na França e mais tarde na Itália, converteu muitos hereges e foi o primeiro a ensinar Teologia aos irmãos em sua Ordem. Escreveu sermões cheios de doutrina e unção. Morreu em Pádua, no ano de 1231.",
    status: "curated",
  },
  {
    saintId: "saint-06-16-bem-aventurado-joao-de-parma-presbitero",
    shortHistory: "Nasceu em Parma, no ano de 1208, filho da nobre família dos Buralli. Entrou na Ordem dos Frades Menores com a idade de 25 anos. Por causa dos seus particulares dons intelectuais, foi enviado a Paris para estudar. Foi encarregado dos estudos teológicos da Ordem nas cidades de Bolonha, Nápoles e de Paris. No ano de 1247 foi eleito ministro geral e, nesse ofício, soube dar exemplo de muita humildade, prudência e de severa austeridade. O Papa Inocêncio IV enviou-o como legado pontifício a Constantinopla no ano de 1251 para estabelecer acordo de união com os gregos. Foi substituído no cargo de ministro por São Boaventura, em 1257; retirou-se no eremitério de Greccio, onde viveu uns trinta anos. Abandonou o seu eremitério para iniciar uma nova missão de reconciliação com a Grécia a pedido do Papa, mas durante a viagem adoeceu e morreu no dia 19 de março de 1289 na cidade de Camerino, onde foi sepultado na Igreja de São Francisco. Oseu túmulo foi meta de peregrinações, e ele foi venerado como santo. Oseu culto foi aprovado por Pio VI no dia 1º de março de 1777.",
    status: "curated",
  },
  {
    saintId: "saint-06-26-bem-aventurado-andre-jacinto-longhin-bispo",
    shortHistory: "Jacinto Longhin nasceu em Fiumicello de Campodarsego, na Itália, em 22 de novembro de 1863. Professou os votos na Ordem dos Frades Menores Capuchinhos em 1880, sendo ordenado presbítero em 1886. Em 1904, foi nomeado bispo de Treviso. Durante a Primeira Grande Guerra, foi um ponto de referência para a comunidade, os pobres, os soldados e os enfermos. Em 1928, foi nomeado arcebispo titular de Patraso. Faleceu em 26 de junho de 1936.",
    status: "curated",
  },
  {
    saintId: "saint-06-30-bem-aventurado-raimundo-lulio-martir",
    shortHistory: "Raimundo Lúlio nasceu pelo ano de 1235, na cidade Palma de Maiorca, uma ilha independente, depois incorporada ao Reino de Espanha. Abandonando tudo o que é da terra entrou na Ordem Franciscana Secular. Inflamado do zelo das almas, tratou da fundação de missionários. Escreveu sobre quase todas as disciplinas humanas, sendo chamado de Doutor Iluminado. Tendo feito uma viagem para Bugia, na África, foi encarcerado e, depois de muitos maus-tratos, foi apedrejado. Recolhido quase exânime, por um navio, expirou quando aportava à Ilha de Maiorca, aos 29 de junho de 1315.",
    status: "curated",
  },
  {
    saintId: "saint-07-04-santa-isabel-de-portugal",
    shortHistory: "Filha dos reis de Aragão, nasceu em 1271. Ainda muito jovem, foi dada em casamento ao rei de Portugal com quem teve dois filhos. Dedicou-se de modo particular à oração e às obras de misericórdia, e suportou muitas tristezas e dificuldades com grande fortaleza de ânimo. Depois da morte do marido, distribuiu os bens entre os pobres e tomou o hábito da Ordem Terceira de São Francisco. Morreu em 1336, quando intermediava um acordo de paz entre seu filho e seu genro. Como no comum das santas mulheres, exceto:",
    status: "curated",
  },
  {
    saintId: "saint-07-08-sao-gregorio-grassi-bispo-e-seus-companheiros-martires-da-or",
    shortHistory: "Entre os numerosos mártires mortos em 1900 na cruel perseguição desencadeada no império da China pelos fanáticos “Boxers” encontram-se três bispos franciscanos, Gregório Grassi, Antônio Fantosati e Francisco Fagolla; quatro presbíteros, Cesídio Giacomantonio, José Gambaro, Elias Facchini e Teodorico Balat e mais sete Franciscanas Missionárias de Maria e quinze da Ordem Franciscana Secular.",
    status: "curated",
  },
  {
    saintId: "saint-07-09-santos-nicolau-pick-wilaldo-e-seus-companheiros-martires",
    shortHistory: "N o mês de junho de 1572, os calvinistas, tendo-se apoderado da cidade de Gorcum, na Holanda, prenderam os Frades Menores daquele convento e vários outros sacerdotes. Depois, andaram com eles pelas ruas da cidade, expondo-os à irrisão do povo. Conduziram-nos, presos, a Brielle, onde o governador Lumey tentou por todos os meios levá-los a renegar a doutrina católica sobre a Eucaristia e o primado do Romano Pontífice na Igreja. Mas como eles persistissem, com coragem, na verdadeira fé, foram sujeitos a cruéis sofrimentos. Finalmente morreram enforcados, tendo seus corpos totalmente esquartejados.",
    status: "curated",
  },
  {
    saintId: "saint-07-10-santa-veronica-giuliani-virgem",
    shortHistory: "Verônica, chamada Úrsula no século, nasceu no ano de 1660 em Mercatelli, Itália, entrando em 1677 no mosteiro das Irmãs Capuchinhas de Tiferni em Città di Castello. Entregue à prática da mortificação e à contemplação dos mistérios divinos, procurou fazer-se conforme a Cristo Crucificado, merecendo ser ornada por Ele com os sagrados estigmas e outros sinais da paixão. Cumulada, em vida, de virtudes e graças místicas, terminou seus dias, com morte preciosa, em 1727.",
    status: "curated",
  },
  {
    saintId: "saint-07-12-sao-joao-jones-e-sao-joao-wall-presbiteros-e-martires",
    shortHistory: "João Jones, nascido na Inglaterra e professo entre os Frades Menores, viu-se obrigado a exilar-se na França e aí foi ordenado sacerdote. Depois de breve estadia em Roma, regressou à pátria e exerceu clandestinamente, em Londres, o ministério sacerdotal. Preso e encarcerado, padeceu duros tormentos, até que, aos 12 de julho de 1598, ele foi enforcado. João Wall nasceu na Inglaterra, mas, ordenado sacerdote na França, entrou na Ordem dos Frades Menores. Tendo voltado à pátria, exerceu por 22 anos o ministério sacerdotal, disfarçado com outro nome. Preso pelos inimigos, sofreu ásperas torturas no cárcere e, condenado à pena capital, foi morto a 22 de agosto de 1679.",
    status: "curated",
  },
  {
    saintId: "saint-07-13-bem-aventurada-angelina-de-montegiove-religiosa-e-fundadora",
    shortHistory: "da Beata Angelina: Festa Para TOR: Memória Angelina de Montegiove dos Condes Marsciano nasceu em 1357, perto de Orvieto, na Itália. Éconsiderada a fundadora da Terceira Ordem Franciscana Regular. De fato, ela foi a primeira a obter do Papa Bonifácio IX, em 1403, a autorização para viver em comunidade professando a Regra do Papa Nicolau IV . Ahumildade da Encarnação e a caridade da Paixão do Filho de Deus constituíram para Angelina e suas companheiras um tema de contínua meditação, assim como o haviam sido para São Francisco. Angelina morreu no dia 14 de julho de 1437, em Foligno. Seu corpo é venerado na Igreja de São Francisco em Foligno, onde eram sepultadas as Terciárias Franciscanas. Oculto que lhe é prestado desde tempos imemoráveis foi aprovado pelo Papa Leão XII em 1825. Numerosos mosteiros italianos e estrangeiros reconhecem-na como Mãe ao longo dos séculos, especialmente o de Foligno que, após três séculos de vida claustral segundo as orientações do Concílio de Trento, no século XX deu origem à Congregação das Terciárias Franciscanas da Beata Angelina.",
    status: "curated",
  },
  {
    saintId: "saint-07-14-sao-francisco-solano-presbitero",
    shortHistory: "Nasceu em 1549. Tendo professado na Ordem dos Frades Menores e ordenado sacerdote, desempenhou vários cargos e dedicou-se à pregação com grande fruto. Animado pelo zelo das almas, partiu para a América do Sul, e, nas regiões de Tucumán e do Peru, desenvolveu grande atividade, sobretudo em favor dos indígenas. Amuitos ele converteu à fé. Iniciou-os na vida da civilização e os defendeu contra os opressores. Esgotado pelo trabalho e pela penitência, morreu, em Lima, no ano de 1610.",
    status: "curated",
  },
  {
    saintId: "saint-07-15-sao-boa-ventura-bispo-e-doutor-da-igreja",
    shortHistory: "Nasceu pelo ano de 1218, em Bagnoregio, na Etrúria. Estudou Filosofia e Teologia em Paris. Laureado Mestre, ensinou os seus confrades da Ordem dos Menores com grande competência e proveito. Eleito ministro geral de sua Ordem, governou-a com sabedoria e prudência. Feito cardeal bispo de Albano, morreu em Lion, na França, no ano de 1274. Escreveu muitas obras sobre filosofia e teologia.",
    status: "curated",
  },
  {
    saintId: "saint-07-21-sao-lourenco-de-brindisi-presbitero-e-doutor-da-igreja",
    shortHistory: "Nasceu em 1559. Admitido entre os Frades Menores Capuchinhos, ensinou Teologia aos confrades e desempenhou vários cargos. Como pregador assíduo e eficaz, tornou-se notável na Europa. Escreveu muitas obras sobre a fé católica. Morreu em Lisboa no ano de 1619. Como na Liturgia das Horas, segundo o Rito Romano, exceto o que se segue: Quando for festa, ver como se organiza o ofício das festas (cf. IGLH, n. 231-233).",
    status: "curated",
  },
  {
    saintId: "saint-07-23-santa-cunegundes-religiosa",
    shortHistory: "Nasceu na Hungria em 1224, filha do Rei Bela IV . Em 1239, foi dada em casamento a Boleslau, príncipe de Cracóvia, com o qual se diz ter vivido em castidade perfeita. Morto o marido, entrou num mosteiro de Clarissas em 1279, e nele, depois, foi abadessa. Ajudou muito os pobres e doentes; por muito tempo dedicou-se à penitência e à oração. Morreu em 1292.",
    status: "curated",
  },
  {
    saintId: "saint-07-24-bem-aventurada-luisa-de-saboia-religiosa",
    shortHistory: "Nasceu em Gênova no ano de 1462, filha de Ama-deu II, duque de Saboia. Casada, passados alguns anos, ficou viúva. Então, em 1492, entrou no mosteiro das Clarissas em Orbe. Edificou suas irmãs pela piedade, humildade e perfeita abnegação de si mesma. Morreu em 1503.",
    status: "curated",
  },
  {
    saintId: "saint-07-27-bem-aventurada-maria-madalena-martinengo-virgem",
    shortHistory: "Maria Madalena nasceu em Bréscia na Itália, de família nobre, em 1687, tendo recebido no batismo o nome de Margarida. Admitida no mosteiro das Irmãs Capuchinhas, no ano de 1705, nele foi Mestra de noviças e depois abadessa. Refulgiu por exemplos de santidade. Deixou escrita uma excelente doutrina espiritual. Distinguiu-se pelos dons espirituais e pela conformidade com o Cristo crucificado. Morreu em 1737.",
    status: "curated",
  },
  {
    saintId: "saint-07-28-bem-aventurada-maria-teresa-kowalska-virgem",
    shortHistory: "Nasceu em Varsóvia (Polônia), em 1902. Recebeu o hábito das Monjas Clarissas Capuchinhas no convento de Przasnysz, em 12 de agosto de 1923. No ano seguinte, em 15 de agosto de 1924, emitiu os votos simples e, em 1927, os perpétuos. Não obstante a doença da qual foi acometida, ela foi sempre muito afável com todos, distinguindo-se pelo espírito de oração e pelo trabalho. Em 2 de abril de 1941, os alémães invadiram",
    status: "curated",
  },
  {
    saintId: "saint-07-30-bem-aventurado-francisco-solano-casey-presbitero",
    shortHistory: "Bernardo Francisco Casey nasceu em Prescott, Wisconsin (Estados Unidos) em 25 de novembro de 1870. Entrou aos 22 anos no seminário diocesano São Francisco de Sales de Milwaukee; mais tarde, em 1897, entrou na Ordem dos Frades Menores Capuchinhos, no Convento de São Boaventura em Detroit, onde assumiu o nome de Francisco Solano. Foi ordenado sacerdote em 24 de julho de 1904, com a cláusula de não confessar e não pregar em público. Passou os anos de seu ministério em Yonkers, Manhattan, no Convento de São Boaventura de Detroit e nos conventos de Brooklyn e Huntington, atraindo numerosas pessoas pela fama de suas virtudes e das graças extraordinárias atribuídas a",
    status: "curated",
  },
  {
    saintId: "saint-08-02-santa-maria-dos-anjos-da-porciuncula",
    shortHistory: "O Seráfico Pai Francisco, por singular devoção à Santíssima Virgem, consagrou especial afeição à capela de Nossa Senhora dos Anjos ou da Porciúncula. Aí deu início à Ordem dos Frades Menores e preparou a fundação das Clarissas; e aí completou felizmente o curso de seus dias sobre a terra. Foi também aí que o Santo Pai alcançou a célebre indulgência, que os sumos pontífices confirmaram e estenderam a outras muitas igrejas. Para celebrar tantos e tão grandes favores ali recebidos de Deus, instituiu-se também esta Festa Litúrgica, como aniversário da consagração da pequenina ermida.",
    status: "curated",
  },
  {
    saintId: "saint-08-07-bem-aventurados-agatangelo-e-cassiano-martires",
    shortHistory: "Agatângelo Noury nasceu em Tours, na França, em 1598. Abraçou a vida religiosa em 1619, entrando na Ordem dos Frades Menores Capuchinhos. Dedicou toda a sua vida às missões. Foi superior da missão do Cairo, onde muito trabalhou pela união dos coptas com a Igreja de Roma. Em 1637, foi superior da nova missão na Etiópia, tendo como colaborador Cassiano Lopez Netto, nascido em Nantes, em 1607. Cassiano professara na Ordem",
    status: "curated",
  },
  {
    saintId: "saint-08-08-santo-pai-domingos-presbitero-e-fundador-da-ordem-dos-pregad",
    shortHistory: "O Fundador da Ordem Dominicana nasceu em Caleruega, Castela, no ano de 1170. Obispo de Tolosa, Diogo de Azevedo, amigo de Domingos, havia fundado um centro missionário, para combater a heresia dos albigenses. Domingos era sacerdote dos Cônegos Regulares. Com a morte do bispo, Domingos assumiu a direção do centro missionário. Assim começou a surgir sua nova Ordem. Em 1216, o Papa Honório III aprovou a Regra para a sua Ordem. Domingos foi amigo íntimo de São Francisco de Assis, motivo pelo qual os discípulos de São Francisco celebram festivamente o Fundador da Ordem Dominicana. Domingos morreu em Bolonha, aos 6 de agosto de 1221. Como na Liturgia das Horas, segundo o Rito Romano.",
    status: "curated",
  },
  {
    saintId: "saint-08-11-santa-clara-de-assis-virgem",
    shortHistory: "Clara nasceu em Assis, no ano de 1193. Era de família nobre. Tomando conhecimento da conversão de Francisco, desejou viver como ele. Revestida por ele com o hábito da penitência, na Porciúncula, retirou-se depois para a capelinha de São Damião, onde, orientada por São Francisco, fundou com ele a Ordem II. Levou uma vida de pobreza heroica e oração constante. Ela realizou com suas Irmãs o ideal contemplativo de São Francisco de Assis. Após longa enfermidade, faleceu aos 11 de agosto de 1253. Seu corpo se conserva intacto, exposto em urna de vidro, na Basílica construída em sua homenagem, em Assis.",
    status: "curated",
  },
  {
    saintId: "saint-08-13-santa-dulce-lopes-pontes-virgem",
    shortHistory: "Santa Dulce Lopes Pontes, no século Maria Rita, nasceu no dia 26 de maio de 1914, na Cidade de Salvador, Bahia, de uma família cristã praticante, de profunda piedade e dedicada caridade. Desde criança cultivou grande bondade para os pobres e desvalidos. Ingressou na vida religiosa na Congregação das Irmãs Missionárias da Imaculada Conceição da Mãe de Deus, onde exerceu a função de professora e de auxiliar dos enfermos. Fundou a Obra Social Irmã Dulce e o Hospital Santo Antônio para cuidar dos aflitos e miseráveis. No dia 22 de maio de 1992, em Salvador, piedosamente descansou no Senhor após uma grave enfermidade e em grande fama de santidade. Foi beatificada em 22 de maio de 2011. Em solene celebração eucarística, foi canonizada pelo Papa Francisco, na Praça São Pedro, no dia 13 de outubro de 2019.",
    status: "curated",
  },
  {
    saintId: "saint-08-14-sao-maximiliano-maria-kolbe-presbitero-e-martir",
    shortHistory: "Maximiliano Maria Kolbe nasceu aos 7 de janeiro de 1894 na Polônia. Jovem ainda, ingressou na Ordem dos Frades Menores Conventuais, sendo ordenado sacerdote em Roma no ano de 1918. Levado por uma piedade filial a Nossa Senhora, fundou uma Pia União chamada “Milícia de Maria Imaculada”, que ele propagou amplamente, tanto na pátria como em outras regiões. Tendo chegado ao Japão como missionário, procurou dilatar a fé cristã, sempre sob os auspícios e a proteção da Virgem Imaculada. Finalmente, tendo voltado à Polônia, foi feito prisioneiro na Segunda Grande Guerra, e, conduzido ao campo de concentração de Auschwitz em Cracóvia, suportou atrozes sofrimentos. Aí consumou sua dinâmica existência em holocausto de amor no dia 14 de agosto de 1941. Foi beatificado por São Paulo VI em 1971 e canonizado por São João Paulo II no dia 10 de outubro de 1982.",
    status: "curated",
  },
  {
    saintId: "saint-08-17-santa-beatriz-da-silva-virgem-e-fundadora",
    shortHistory: "Beatriz, filha de pais portugueses, nasceu em Ceuta em 1424. Viveu por algum tempo na corte da Rainha Isabel, mas sofrendo perseguições de pessoas invejosas retirou-se da corte para um mosteiro em Toledo, onde permaneceu cerca de 30 anos. Em 1484, fundou um novo Instituto consagrado à Imaculada Conceição da Santíssima Virgem, que foi aprovado pelo Papa Inocêncio VIII em 1489. Faleceu no ano de 1490. Quando celebrado como Memória: do comum das virgens, exceto o que segue abaixo.",
    status: "curated",
  },
  {
    saintId: "saint-08-18-bem-aventurados-luis-armando-adam-e-nicolau-savouret-presbit",
    shortHistory: "Durante a Revolução Francesa, 829 sacerdotes diocesanos e religiosos, que se recusaram a pronunciar o juramento da Constituição Civil do Clero e desligar-se do Papa e da Igreja de Roma, foram presos em Rochefort em dois navios de carga, que jamais zarparam para destino algum e se converteram em autênticas e sórdidas prisões. As penalidades suportadas por estes prisioneiros foram tantas que, depois de nove meses, os mortos somavam 547. Os testemunhos recorridos sobre os prisioneiros levaram a Igreja a declarar bem-aventurados, com o título de mártires, a 64 dos sacerdotes falecidos em Rochefort, entre os quais se encontram os Frades Menores Conventuais Luís Armando Adam e Nicolau Savouret, mortos em 13 e 16 de julho de 1794, respectivamente. Todos eles foram beatificados pelo Papa São João Paulo II no dia 1º de outubro de 1995. De comum dos mártires: para vários mártires.",
    status: "curated",
  },
  {
    saintId: "saint-08-19-sao-luis-de-tolosa-bispo",
    shortHistory: "Filho de Carlos II, rei de Nápoles, e de Maria, filha do rei da Hungria, nasceu em 1274. Na juventude, quando refém do rei de Aragão, vivia na Catalunha, onde muito se familiarizou com os Frades Menores. Tendo recuperado a liberdade, despediu-se do mundo e do trono real. Ao mesmo tempo em que era feito Bispo de Tolosa, recebeu o hábito franciscano. Distinguiu-se pela pobreza, humildade e amor pelos pobres. Morreu em 1297.",
    status: "curated",
  },
  {
    saintId: "saint-08-23-bem-aventurado-bernardo-peroni-de-offida-religioso",
    shortHistory: "Domenico Peroni nasceu aos 7 de novembro de 1604 em Offida, nas Marcas. Desde pequeno cultivou intensamente a piedade. Aos 22 anos, entrou na Ordem dos Frades Menores Capuchinhos, competindo com os melhores na aquisição das mais belas virtudes franciscanas. Durante a sua longa vida, exerceu o ofício de cozinheiro, enfermeiro, esmoler, hortelão e porteiro. Aos 65 anos, foi mandado a Offida, onde trabalhou como esmoler, com alegria, como meio de penitência e apostolado para proveito das almas. Chegando a uma idade avançada e muito doente, transformou ainda mais a sua existência em oração e penitência. No leito de morte, recordou aos frades a obrigação de observar fielmente a regra, de amarem-se fraternalmente, de viverem sempre na paz e de terem grande caridade para com os pobres. Morreu em 22 de agosto de 1694. Foi beatificado por Pio VI em 25 de maio de 1795.",
    status: "curated",
  },
  {
    saintId: "saint-08-25-sao-luis-ix-rei-de-franca",
    shortHistory: "Nascido em 1214, foi feito rei da França aos 22 anos de idade. Casando-se, teve 11 filhos, aos quais ele mesmo deu ótima educação. Distinguiu-se pelo espírito de penitência e de oração, e por um grande amor pelos pobres. No seu governo, cuidou não apenas da paz dos povos e do bem temporal dos súditos, mas ainda do seu bem espiritual. Realizou expedições para a libertação do sepulcro de Cristo e morreu perto de Cartago, no ano de 1270.",
    status: "curated",
  },
  {
    saintId: "saint-09-02-bem-aventurados-joao-francisco-burte-severino-girault-apolin",
    shortHistory: "MÁRTIRES, DA ORDEM I Para TOR, TOFr e OFS: Memória Para OFMConv. e OFMCap.: Memória facultativa Entre os numerosos mártires da Revolução Francesa, são recordados em particular alguns intrépidos defensores da fé e heróis do sacerdócio católico, filhos da Ordem Seráfica, condenados à guilhotina, no dia 2 de setembro de 1792. Entre eles: João Francisco Burté, dos Frades Menores Conventuais; Apolinário Morel de Posat, capuchinho; Severino Girault, da Terceira Ordem Regular. Estes refulgiram, primeiro, pelo seu zelo sacerdotal e pela sua caridade para com os fugitivos e perseguidos e, depois, pela heroica fortaleza com que suportaram o martírio, dando admirável testemunho da sua fé. João Batista Triquerie, dos Frades Menores Conventuais, foi vítima da mesma perseguição, embora seu martírio tenha acontecido dois anos depois, no dia 21 de janeiro de 1794. Foram beatificados por Pio XI em 1926, ano centenário da morte de São Francisco.",
    status: "curated",
  },
  {
    saintId: "saint-09-04-santa-rosa-de-viterbo-virgem",
    shortHistory: "facultativa Santa Rosa, nascida em Viterbo no ano de 1223, abraçou ainda adolescente a Ordem Terceira de São Francisco. Distinguiu- -se pela pureza de vida, no exercício da caridade para com o próximo e no zelo da fé e da piedade cristã. Morreu em sua cidade natal aos 6 de março, e seu corpo foi trasladado a 4 de setembro de 1258 para a Igreja de Santa Maria das Rosas, que ficou sendo chamada também, por causa de seu nome, de Igreja de Santa Rosa.",
    status: "curated",
  },
  {
    saintId: "saint-09-17-impressao-das-chagas-de-nosso-pai-sao-francisco",
    shortHistory: "O Seráfico Pai Francisco, desde o início de sua conversão, dedicou especialíssima devoção e veneração a Cristo crucificado, devoção que até à morte ele inculcara a todos por palavras e exemplo. Quando, em 1224, Francisco se abismava em profunda contemplação no Monte Alverne, por um admirável e estupendo prodígio, o Senhor Jesus imprimiu-lhe no corpo as chagas de sua paixão. O Papa Bento XI concedeu à Ordem dos Menores que todos os anos, neste dia, celebrasse a memória de tão memorável prodígio, comprovado pelos mais fidedignos testemunhos.",
    status: "curated",
  },
  {
    saintId: "saint-09-18-sao-jose-de-copertino-presbitero",
    shortHistory: "São José nasceu em Copertino (Lecce), Itália, em 1603. Efoi recebido na Ordem dos Frades Menores Conventuais. Ordenado sacerdote em 1628, entregou-se com zelo às obras do ministério sagrado pela salvação das almas. Distinguiu-se por uma grande austeridade de vida e intenso espírito de oração. Sua vida foi assinalada por extraordinários êxtases e frequentes milagres que fizeram dele uma das figuras mais interessantes da mística cristã. Pela exuberância desses carismas celestes teve que trocar muitas vezes de convento, a fim de evitar fanatismos populares, mas sempre brilharam nele a humildade e uma incondicionada obediência. Grandíssima foi sua devoção para com Nossa Senhora. Morreu em Ósimo, nas Marcas, a 18 de setembro de 1663. Foi canonizado por Clemente XIII.",
    status: "curated",
  },
  {
    saintId: "saint-09-19-sao-francisco-maria-de-camporosso-religioso",
    shortHistory: "Francisco Maria Croese nasceu nas proximidades de Impéria, Itália, em 1804. Tendo entrado na Ordem dos Frades Menores Capuchinhos, andou durante 40 anos pedindo esmolas nas ruas de Gênova. Pela grande veneração que todos lhe tributavam, foi chamado de “Padre santo”, apesar de não ser sacerdote. Uma grande força de vontade e de amor o impeliram a pedir a Deus a sua própria imolação em favor dos genoveses, atacados pela peste, chamada “cólera”. Deus aceitou seu sacrifício, pois com a sua morte, ocorrida a 17 de setembro de 1866, extinguiu-se a peste. Foi canonizado pelo Papa São João XXIII.",
    status: "curated",
  },
  {
    saintId: "saint-09-22-santo-inacio-de-santhia-presbitero",
    shortHistory: "Inácio Belvisotti nasceu no dia 5 de junho de 1686 em Santhià (Piemonte), Itália, e foi batizado com o nome de Lourenço Maurício. Ordenado sacerdote diocesano, renunciou à paróquia e ao canonicato para ingressar, no dia 24 de maio de 1716, na Ordem dos Frades Menores Capuchinhos. Obedientíssimo e sempre respeitoso com os superiores, exerceu vários ofícios em santidade de vida e profundidade de doutrina, entre os quais o ofício de mestre de noviços e capelão militar. Durante muitos anos, residiu no convento do Monte dos Capuchinhos, em Turim, encarregado da direção espiritual e da assistência dos enfermos. Foi visitado pela irmã morte neste mesmo convento no dia 22 de setembro de 1777. Renomado pela prática heroica das virtudes e prodígios realizados, São Paulo VI o incluiu no catálogo dos bem-aventurados no dia 17 de abril de 1966, e São João Paulo II o proclamou santo em 19 de maio de 2002, Domingo de Pentecostes.",
    status: "curated",
  },
  {
    saintId: "saint-09-23-sao-pio-de-pietrelcina-presbitero",
    shortHistory: "Francisco Forgione nasceu em Pietrelcina, diocese de Benevento, no dia 25 de maio de 1887. Entrou como clérigo na Ordem dos Frades Menores Capuchinhos no dia 6 de janeiro de 1903; foi ordenado sacerdote no dia 10 de agosto de 1910, na catedral de Benevento. No dia 28 de julho de 1916 chegou a “San Giovanni”, no Gargano, onde, salvo poucas interrupções, permaneceu até a morte, em 1968. Na manhã da sexta-feira de 20 de setembro de 1918, enquanto rezava diante do crucifixo do coro da velha igrejinha, recebeu o dom dos estigmas, que permaneceram abertos e sangrando por meio século. Durante a vida, dedicou-se ao desenvolvimento do seu ministério sacerdotal. Fundou os chamados “Grupos de oração” e um moderno hospital, ao qual colocou o nome de “Casa alívio do sofrimento”. Morreu aos 23 de setembro de 1968. Foi beatificado por São João Paulo II, no dia 2 de maio de 1999, e canonizado pelo mesmo Pontífice, no dia 16 de junho de 2002.",
    status: "curated",
  },
  {
    saintId: "saint-09-24-encontro-do-corpo-de-santa-clara",
    shortHistory: "O Corpo de Clara, que voara aos céus no ano de 1253, foi sepultado na Igreja de São Jorge, sendo trasladado depois para a Igreja construída em sua honra. Em escavações ali realizadas em 1850 foram reconhecidos os seus despojos e expostos à veneração dos fiéis.",
    status: "curated",
  },
  {
    saintId: "saint-09-26-santo-elzeario-de-sabran-e-bem-aventurada-delfina-conjuges",
    shortHistory: "Elzeário, nascido na França, conde de Ariano dos Herpinos, casou com a Bem-aventurada Delfina de Glandèves, com quem, segundo se diz, viveu em perfeita virgindade. Entrou com a esposa na Ordem Terceira Franciscana, ilustrando-a com suas exímias virtudes. Partilhavam generosamente com os pobres suas abundantes riquezas, preocupados ao mesmo tempo com a vida de oração e das boas obras. Elzeário morreu em Paris a 27 de setembro de 1323, e Delfina, perto da cidade francesa de Apt, a 26 de novembro de 1358, após quase sete lustros de piedosa viuvez.",
    status: "curated",
  },
  {
    saintId: "saint-09-28-bem-aventurado-inocencio-de-berzo-presbitero",
    shortHistory: "Nasceu no dia 19 de março de 1844 em Nardo; morreu em Bérgamo no dia 3 de março de 1890; seus restos mortais repousam hoje no interior da Igreja Paroquial de Berzo. Tendo sido ordenado presbítero após os estudos regulares no seminário diocesano, após um curto período, ingressou na Ordem dos Frades Menores Capuchinhos. Peregrinou em vários conventos, mas foi, sobretudo, na permanência em Santíssima Anunciata que encontrou a sua estrada rumo à santidade. Esquecia-se e aniquilava-se em oração prolongada; na realização de humildes ofícios do ministério e daqueles ainda mais humildes que lhe eram atribuídos pela obediência estavam todo o seu ideal e o caminho",
    status: "curated",
  },
  {
    saintId: "saint-10-04-nosso-pai-sao-francisco-de-assis-diacono-fundador-de-tres-or",
    shortHistory: "Nasceu em Assis, no ano de 1182. Depois de uma juventude leviana, converteu-se, renunciou a todos os bens paternos e entregou-se inteiramente a Deus. Tendo abraçado a pobreza, levou uma vida evangélica, pregando a todos o amor de Deus. Aos que desejaram segui-lo, formou-os com normas excelentes, aprovadas pela Sé Apostólica. Deu início a uma Ordem de religiosas e a uma Ordem de penitentes inseridos no mundo, bem como à pregação entre os infiéis. I Vésperas",
    status: "curated",
  },
  {
    saintId: "saint-10-05-sao-benedito-o-negro-religioso",
    shortHistory: "Benedito, cognominado o Mouro, ou “o Negro”, como é conhecido no Brasil, nasceu na Sicília. De pais escravos, vindos da Etiópia para San Fratello na Sicília, vendeu seus bens e fez-se eremita franciscano nas vizinhanças de Palermo. Mais tarde, atendendo a um decreto de Pio IV , obrigando a todos os que seguissem a Regra de São Francisco a viverem em conventos de sua Ordem, Benedito obedeceu. No convento, dedicou-se a trabalhos humildes. Chegou a exercer o ofício de Superior, mesmo não sendo sacerdote e, mais tarde, vemo-lo novamente trabalhando na cozinha. Morreu no ano de 1589. Seu culto bem cedo se espalhou pela Itália, Espanha, Portugal, Brasil e México. Pio VIII inscreveu-o solenemente no rol dos santos.",
    status: "curated",
  },
  {
    saintId: "saint-10-06-santa-maria-francisca-das-cinco-chagas-virgem",
    shortHistory: "Maria Francisca nasceu em Nápoles, no ano de 1734. Vestindo o hábito da Ordem Terceira de São Francisco, castigava seu corpo com jejuns, vigílias e outras penitências. Com imensa caridade, socorreu os pobres e doentes. Manifestou grande devoção à Mãe de Deus e brilhou pela humildade. Adormeceu no Senhor aos 6 de outubro de 1791.",
    status: "curated",
  },
  {
    saintId: "saint-10-10-sao-daniel-presbitero-e-seus-companheiros-martires",
    shortHistory: "N o ano de 1227, tomaram o caminho de Marrocos, para ali pregarem o Evangelho, sete Frades Menores sob a direção de Daniel, oriundo da Calábria. Chegados a Ceuta, pregaram a fé cristã, primeiramente aos comerciantes italianos, e depois, também aos muçulmanos, percorrendo as ruas da cidade. Presos pelos inimigos, como se recusassem a renegar a fé, foram condenados à morte. Varões tementes a Deus recolheram seus restos mortais ultrajados e os sepultaram em Ceuta.",
    status: "curated",
  },
  {
    saintId: "saint-10-13-sao-serafim-de-montegranaro-religioso",
    shortHistory: "Serafim nasceu em Montegranaro, nas Marcas, Itália, em 1540. Após uma juventude cheia de trabalhos pesados, entrou como religioso irmão na Ordem dos Frades Menores Capuchinhos. Nos diversos conventos e ofícios a que foi destinado, viveu em constante trabalho e oração, com exemplar simplicidade e humildade, serviçal para com todos. Morreu em Áscoli, onde passou os seus últimos anos de vida, como mensageiro da paz e do bem. Morreu em 1604 e foi canonizado por Clemente XII.",
    status: "curated",
  },
  {
    saintId: "saint-10-19-sao-pedro-de-alcantara-presbitero",
    shortHistory: "Nasceu em 1499. Depois de estudos feitos em Salamanca, entrou para os Frades Menores e, ordenado sacerdote, desempenhou diversos cargos na Ordem. Em 1554, obteve a licença de consagrar-se a uma observância mais estrita da Regra. Começou, então, a acolher seguidores, aos quais iniciou numa vida de mais austera pobreza, jejum e penitência e de oração mais prolongada. Impulsionado pelo zelo das almas, dedicou-se com grande fruto à pregação. Ecom seus conselhos ajudou Santa Teresa de Ávila em sua atividade reformadora entre as Carmelitas. Deixou também obras escritas em que narra a própria experiência ascética, baseada sobretudo na devoção para com a paixão de Cristo. Morreu no dia 18 de outubro de 1562.",
    status: "curated",
  },
  {
    saintId: "saint-10-20-bem-aventurado-contardo-ferrini",
    shortHistory: "Contardo Ferrini nasceu em Milão, a 4 de abril de 1859. Tendo entrado na Ordem Terceira Franciscana ainda adolescente, conseguiu aliar à ciência humana a sabedoria dos santos. Foi brilhante em seus escritos e magistério e, mais ain-",
    status: "curated",
  },
  {
    saintId: "saint-10-22-bem-aventurada-josefina-leroux-virgem-e-martir",
    shortHistory: "Nasceu em Cambrai no ano de 1747 e professou na Ordem das Clarissas no ano de 1770. Em 1791, devido às leis de exclaustração promulgadas pela Revolução Francesa, foi obrigada a abandonar o mosteiro e refugiou-se em Valenciennes, no mosteiro das Ursulinas, onde se encontrava sua irmã. Mas, outra vez expulsa do mosteiro, foi condenada à morte em 1794.",
    status: "curated",
  },
  {
    saintId: "saint-10-23-sao-joao-de-capistrano-presbitero",
    shortHistory: "Nasceu em Capistrano, nos Abruzos, no ano de 1386. Estudou Direito em Perusa e exerceu por algum tempo a magistratura. Entrando na Ordem dos Frades Menores e, ordenado sacerdote, desenvolveu incansável atividade apostólica por toda a Europa, dedicando-se à reforma dos costumes entre os cristãos e lutando contra os hereges. Morreu em Ilok, na Croácia, em 1456.",
    status: "curated",
  },
  {
    saintId: "saint-10-25-santo-antonio-de-santana-galvao-presbitero",
    shortHistory: "Antônio de Sant’Ana Galvão nasceu em Guaratinguetá, estado de São Paulo, Brasil, em 1739. Entrou na Ordem dos Frades Menores em 1760, sendo ordenado sacerdote",
    status: "curated",
  },
  {
    saintId: "saint-10-26-bem-aventurado-boaventura-de-potenza-presbitero",
    shortHistory: "Boaventura nasceu em 1651, na cidade de Potenza, Itália. Tendo entrado na Ordem dos Frades Menores Conventuais, distinguiu-se pela austeridade de vida, pela obediência e pela grande abnegação de si mesmo. Foi assíduo pregador da Palavra de Deus e infatigável no atendimento das confissões dos penitentes. Distinguiu-se ainda pelo alto grau de sua caridade para com os encarcerados e condenados à morte. Morreu em 1711.",
    status: "curated",
  },
  {
    saintId: "saint-10-31-santo-angelo-de-acri-presbitero",
    shortHistory: "Lucas Antônio Falconi nasceu em Acri (Cosenza), Itália, em 19 de outubro de 1669. Aos 18 anos fez-se Frade Menor Capuchinho, mas com dúvidas, incertezas e outros projetos, motivo pelo qual, por duas vezes, deixou o noviciado, perseverando pela terceira vez. Ordenado sacerdote, dedicou-se à pregação, com grande proveito para as almas. Asua vida foi de contínua oração, a sua austeridade era a mais bela conformação ao quanto pregava fervorosamente aos fiéis. Toda a Calábria foi invadida por uma onda de forte luz e de santo fervor. Foi ministro provincial e, pelo seu modo de governar, foi chamado “o anjo da paz”. Éuma grande graça – dizia aos seus Frades – e uma grande glória sermos capuchinhos e verdadeiros filhos de São Francisco. Mas é preciso conhecer e levar sempre conosco cinco pérolas preciosas: austeridade, simplicidade, exata observância das Constituições e da Seráfica Regra, inocência de vida e caridade. Após 38 anos de infatigável apostolado, morreu em 30 de outubro de 1739 em Acri, onde um grande santuário guarda o seu venerado corpo. Leão XII o beatificou em 18 de dezembro de 1825, e Papa Francisco o canonizou em 15 de outubro de 2017.",
    status: "curated",
  },
  {
    saintId: "saint-11-06-bem-aventurado-afonso-lopez-presbitero-e-companheiros-martir",
    shortHistory: "Afonso Lopez deu sua vida como testemunho da fé, nos primeiros dias da perseguição religiosa na Espanha de 1936, junto com outros cinco Frades Menores Conventuais: Modesto Vegas, Dionísio Vicente, Pedro Rivera, presbíteros; Francisco Remón e Miguel Remón, irmãos leigos, todos membros da comunidade de Granollers. Afonso Lopez nasceu em Secorún (Huesca) em 1878. Tratando de dar resposta a sua vocação religiosa tentou ingressar nos Beneditinos, porém desistiu em seguida, incorporando-se aos Frades Menores Conventuais, em Granollers, em 1906. Fez seu noviciado em Ósimo (Itália) e ali emitiu sua profissão religiosa. Ordenado presbítero em 1911, regressou a Granollers, onde foi diretor das “Escolas Antonianas” e responsável da formação dos postulantes e noviços. Oministério da reconciliação e o acompanhamento espiritual foram igualmente campos prediletos de seu apostolado. Ao desencadear a perseguição religiosa em julho de 1936, foi preso e morto na tarde de 3 de agosto de 1936. Os demais irmãos de hábito receberam o martírio entre 27 de julho e os primeiros dias de setembro desse mesmo ano. Foram beatificados por São João Paulo II no dia 11 de março de 2001, no numeroso grupo de 233 mártires, sua maioria da comunidade valenciana, 50 deles membros da Família Franciscana.",
    status: "curated",
  },
  {
    saintId: "saint-11-07-bem-aventurada-maria-crucifixa-satellico-virgem",
    shortHistory: "Maria Crucifixa Satéllico nasceu em Veneza a 31 de dezembro de 1706 e foi batizada com o nome de Isabel. Em 1726, professou a Regra da Ordem de Santa Clara no mosteiro de Ostra Vetere, nas Marcas, Itália, e viveu",
    status: "curated",
  },
  {
    saintId: "saint-11-08-bem-aventurado-joao-duns-scotus-presbitero",
    shortHistory: "Nasceu em Duns, na Escócia, pelos fins de 1265 e, muito jovem ainda, foi recebido na Ordem de São Francisco de Assis. Foi ordenado presbítero no dia 17 de março de 1291. Após obter a graduação acadêmica na Universidade de Sorbonne, em Paris, foi professor nas universidades de Cambridge, Oxford, Paris e, finalmente, em Colônia. Verdadeiro filho do Poverello de Assis, investigou com grande sutileza a divina Revelação, produzindo muitas obras filosóficas e teológicas. Com vigor ardente, anunciou o mistério do Verbo Encarnado e foi incansável defensor da Imaculada Conceição da Virgem Maria e da autoridade do Romano Pontífice. Em 23 de junho de 1303, por se ter recusado a subscrever o libelo de Filipe IV o Belo, Rei da França, contra o Papa Bonifácio VIII, foi expulso de Paris, indo para Colônia, onde, a 8 de novembro de 1308, foi colhido por morte prematura, no auge de sua atividade magisterial. Agrande fama de santidade de que o insigne teólogo se viu cercado na vida, por causa de suas excepcionais virtudes cristãs, bem cedo lhe mereceu, não só no âmbito da Ordem Seráfica, mas também em Colônia, na Alemanha, onde está sepultado, e em Nola,",
    status: "curated",
  },
  {
    saintId: "saint-11-13-sao-diogo-de-alcala-religioso",
    shortHistory: "Nasceu pelo ano de 1400. Ainda jovem, consagrou-se à oração e ao trabalho como eremita. Entrando depois na Ordem dos Frades Menores, ocupou-se com trabalhos humildes. Em 1441, seguiu como missionário para as Ilhas Canárias, onde, no meio de grandes dificuldades, desempenhou também o cargo de superior. Em 1450, esteve por algum tempo em Roma, onde tratou dos assolados pela peste, alcançando, por suas orações, a cura de muitos deles. Tendo retornado à Espanha, morreu em Alcalá, no dia 12 de novembro de 1463.",
    status: "curated",
  },
  {
    saintId: "saint-11-14-sao-nicolau-tavelic-presbitero-e-seus-companheiros-martires",
    shortHistory: "Nicolau nasceu em Sebenic pelo ano de 1340. Exerceu primeiramente o ministério de pregador, na Bósnia, com seu confrade Deodato e, depois, em 1384, partiu com ele para a Palestina. Lá, com outros dois confrades, Pedro e Estêvão, prepararam uma exposição apologética sobre a fé cristã, e, fortalecidos pela oração, proferiram-na diante do Cádi de Jerusalém. Mandados retratar o que haviam dito, com decisão se recusaram: pelo que foram postos na prisão e condenados à morte. Seus corpos, retalhados, foram lançados ao fogo.",
    status: "curated",
  },
  {
    saintId: "saint-11-17-santa-isabel-da-hungria",
    shortHistory: "Filha de André, rei da Hungria, nasceu em 1207. Muito jovem ainda, foi dada em casamento a Luís, Landgrave da Turíngia, e dele teve três filhos. Dedicada à meditação das realidades celestes, depois da morte do marido abraçou a pobreza, mandou construir um hospital, onde ela mesma servia os enfermos. Morreu em Marburgo, no ano de 1231.",
    status: "curated",
  },
  {
    saintId: "saint-11-18-bem-aventurada-salome-de-cracovia-virgem",
    shortHistory: "Nasceu em Cracóvia, na Polônia, no ano de 1211. Ainda criança, foi dada em casamento a Colomano, filho do rei da Hungria e príncipe de Halícia, com o qual guardou perfeita virgindade. Morto o marido, entrou em 1245 no mosteiro das Clarissas de Cracóvia e nele se notabilizou por sua grande obediência e humildade. Morreu em 1268.",
    status: "curated",
  },
  {
    saintId: "saint-11-20-santa-ines-de-assis-virgem",
    shortHistory: "Inês nasceu em Assis no ano de 1197 e no batismo recebeu o nome de Catarina. Seguindo o exemplo de sua irmã Clara, abraçou em 1212 a vida de pobreza. Por alguns anos, ela exerceu a função de abadessa no mosteiro de Florença. Voltando a Assis, morreu pouco depois da irmã, provavelmente a 27 de agosto de 1253.",
    status: "curated",
  },
  {
    saintId: "saint-11-26-sao-leonardo-de-porto-mauricio-presbitero",
    shortHistory: "Nasceu em 1676. Estudou em Roma e depois entrou na Ordem dos Frades Menores. Ordenado sacerdote, percorreu quase toda a Itália, pregando sempre ao povo com grande proveito das almas. Escreveu muitas obras de utilidade para",
    status: "curated",
  },
  {
    saintId: "saint-11-27-sao-francisco-antonio-fasani-presbitero",
    shortHistory: "Francisco Antônio nasceu em 1681, em Lucera, Itália. Ainda jovem, foi admitido entre os Frades Menores Conventuais. Distinguiu-se logo pela vida íntegra, tornando-se também exemplo de austeridade e zelo sacerdotal. Eleito Ministro Provincial, renovou toda a vida dos seus irmãos. Propagou a devoção à Virgem Maria. Tornou-se famoso pelos seus dotes de oratória, como também pela grande caridade para com os pobres, os órfãos, os enfermos e encarcerados. Dotado de carismas especiais, faleceu em Lucera, aos 29 de novembro de 1742. Foi beatificado por Pio XII e canonizado por São João Paulo II a 13 de abril de 1986.",
    status: "curated",
  },
  {
    saintId: "saint-11-28-sao-tiago-das-marcas-presbitero",
    shortHistory: "Nasceu em Monteprandone, no ano de 1394. Estudou em Perusa, dedicando-se sobretudo ao Direito. Admitido entre os Frades Menores, estudou Teologia e, ordenado sacerdote, consagrou toda a sua vida à pregação. Percorreu a Itália e quase toda a Europa, propagando a devoção ao Santíssimo Nome de Jesus e desempenhando missões em favor da conversão dos hereges. Morreu em Nápoles, no ano de 1476.",
    status: "curated",
  },
  {
    saintId: "saint-11-29-todos-os-santos-da-ordem-serafica",
    shortHistory: "A Família Franciscana celebra a Festa de Todos os Santos franciscanos no aniversário da aprovação da Regra dos Frades Menores, pelo Papa Honório III, no dia 29 de novembro de 1223. Ao longo de oito séculos, a frondosa árvore franciscana não deixou de dar frutos de santidade, são mais de quinhentos santos e bem-aventurados reconhecidos pela Igreja. Santas e santos de todas as épocas, de todas as camadas sociais, de todas as culturas, que iluminaram com luz própria o universo da santidade da Igreja. Quem pode contar essa multidão de irmãs e irmãos seculares sem nome e sem rosto que viveram a santidade evangélica, que fizeram do projeto de Francisco a paixão de toda a sua vida? Éum imenso capital de santidade, de amor, de sacrifício e de entrega, que garante a perene atualidade de Francisco de Assis e mostra a vitalidade e autenticidade evangélica da mensagem franciscana. Esta festa é um motivo de gratidão a Deus e, ao mesmo tempo, uma convocação para atualizarmos no hoje da história a mensagem evangélica de Francisco, mediante a santidade de vida de todos nós que o temos por pai, inspirador, guia e exemplo.",
    status: "curated",
  },
  {
    saintId: "saint-12-02-bem-aventurado-rafael-chylinski-presbitero",
    shortHistory: "Nasceu em Wysoczka (Polônia) em 1694, recebendo o batismo com o nome de Melquior. Após os anos de formação, alistou-se no exército polonês, deixando-o em 1715 para entrar na Ordem dos Frades Menores Conventuais. Foi ordenado sacerdote em 1717. Destacou-se pela sua piedade e devoção, que soube unir de modo admirável com o exercício da pregação e do serviço heroico aos pobres e doentes. Aos pobres que acorriam numerosos distribuía alimentos e roupas, tendo o cuidado de distribuir-lhes, juntamente com o pão material, o pão da fé e da esperança. Durante os anos da peste (1736-1738), prestou seu serviço quase ininterruptamente aos doentes, passando a ser conhecido como “Apóstolo do Hospital de Cracóvia”. Morreu a 2 de dezembro de 1741. Foi beatificado pelo Papa São João Paulo II em Varsóvia, Polônia, a 9 de junho de 1991.",
    status: "curated",
  },
];

export function getCuratedSaintContents(): SaintContent[] {
  return saintContents.filter((content) => content.status === "curated");
}

// Fila de revisão: entradas ainda com status draft (vazia quando tudo está curado).
export function getDraftSaintContents(): SaintContent[] {
  return saintContents.filter((content) => content.status === "draft");
}

export function findCuratedShortHistory(saintId: string): string | null {
  const content = saintContents.find(
    (item) => item.saintId === saintId && item.status === "curated",
  );

  return content ? content.shortHistory : null;
}
