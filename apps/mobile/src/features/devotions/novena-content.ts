// Novena a Sao Francisco de Assis. Texto curado, fonte fornecida pelo usuario.
// Nao fabricar/editar conteudo sem nova fonte.

export type NovenaStep = string;

export type NovenaDay = {
  day: number;
  meditation: string;
  suggestion: string;
};

export const novenaSteps: NovenaStep[] = [
  "Fazer o sinal da cruz",
  "Rezar a oração para todos os dias",
  "Rezar a oração de cada dia",
  "Rezar 3 Pai-Nossos, 3 Ave-Marias, 3 Glórias ao Pai",
  "Meditar e comentar um texto do Novo Testamento (ver sugestões)",
  "Rezar a oração e bênção de São Francisco",
];

export const novenaDailyPrayer =
  "Absolvei, Senhor, eu Vos suplico, o meu espírito, e pela suave e ardente força de Vosso amor, desfeiçoai-me de todas as coisas que existem debaixo do céu, a fim de que eu possa morrer por Vosso amor, ó Deus, que por meu amor Vos dignastes morrer.";

export const novenaPrayerOfFrancis =
  "Senhor, fazei-me instrumento de vossa paz.\nOnde houver ódio, que eu leve o amor.\nOnde houver ofensa, que eu leve o perdão.\nOnde houver discórdia, que eu leve a união.\nOnde houver dúvida, que eu leve a fé.\nOnde houver erro, que eu leve a verdade.\nOnde houver desespero, que eu leve a esperança.\nOnde houver tristeza, que eu leve a alegria.\nOnde houver trevas, que eu leve a luz.\n\nÓ Mestre, fazei que eu procure mais consolar que ser consolado, compreender que ser compreendido, amar que ser amado.\n\nPois é dando que se recebe, é perdoando que se é perdoado e é morrendo que se vive para a vida eterna.";

export const novenaBlessing =
  "O Senhor vos abençoe e vos guarde.\nO Senhor vos mostre a Sua face e se compadeça de vós.\nAmém.\nO Senhor volva Seu rosto para vós e dê a paz.\nO Senhor vos abençoe.\nAmém.\nQue o Senhor Deus, pelos méritos de São Francisco, vos conceda toda a paz e todo o bem.\nAmém.";

export const novenaDays: NovenaDay[] = [
  {
    day: 1,
    meditation:
      "Meu amigo e protetor São Francisco, em vossa juventude, cantáveis alegremente pelas ruas de Assis, participando das boas alegrias dos jovens de vossa idade e fazendo grande projetos de conquistas e aventuras, ensinai-me a encontrar a alegria que vem de Deus e fazer-me nela viver continuamente.\n\nAfastai de mim toda a tristeza que me torna fechado ao próximo.\n\nQue a minha alegria e o meu espírito comunicativo deem testemunho da alegre presença de Deus em minha vida.",
    suggestion: "Jo 6,41-51",
  },
  {
    day: 2,
    meditation:
      "Meu amigo e protetor São Francisco, o encontro com um leproso, a quem fostes beijar e a quem destes generosa esmola, num gesto de autossuperação, marcou o começo de vossa conversão e da vida maravilhosa, que, a partir de então, iniciastes, causando admiração ao mundo inteiro. Pelo vosso espírito de renúncia e penitência, ensinai-me a vencer as paixões e más inclinações, canalizando essas energias para o caminho do bem, a fim de que alcance minha plena realização humana, na perfeição a que Deus me chamou.",
    suggestion: "Rm 8,18-22",
  },
  {
    day: 3,
    meditation:
      "Grande patriarca Francisco, conta-se que, na igrejinha de São Damião, enquanto estáveis em oração, o crucifixo vos falou: “Francisco, vai e restaura a minha Igreja”. Foi uma ordem profética. Com vosso exemplo e com os numerosos seguidores que tivestes ainda em vida, nova aurora despertou para a Igreja. Pelo amor que tivestes à Igreja de Cristo, ensinai-me a ser-lhe fiel, vivendo em união com ele, apoiando-a por palavras e pelo testemunho da Igreja, levando uma vida de verdadeiro cristão.",
    suggestion: "1Cor 12,31;13,4-13",
  },
  {
    day: 4,
    meditation:
      "Ó São Francisco, vós vos tornastes um apaixonado do amor de Cristo e saístes pelo mundo a lamentas que “o Amor não é amado”, e vos apresentastes aos homens como o “Amante do Grande Rei”. Livrai-me da indiferença e comunicai-me vosso entusiasmo para que aprenda a amar a Nosso Senhor e saiba encontrá-Lo na natureza e nos acontecimentos de cada dia.",
    suggestion: "Mc 16,1-8 ou Mt 28,1-10",
  },
  {
    day: 5,
    meditation:
      "São Francisco, enviastes vossos primeiros discípulos pelo mundo inteiro, a fim de que apregoassem a Boa Nova do Reino de Deus. Alcançai-me do Senhor o espírito apostólico e o zelo missionário, para que me interesse por Sua obra e procure colaborar com a Igreja, a fim de que o Reino de Cristo se estabeleça na Terra.",
    suggestion: "Mc 9,33-41",
  },
  {
    day: 6,
    meditation:
      "São Francisco, na contemplação e meditação da Paixão de Nosso Senhor Jesus Cristo, encontrastes vigorosa motivação para vos entregardes a Deus numa vida desprovida de conforto e segurança. Submetestes vosso corpo a rudes penitências para experimentar uma parte dos padecimentos que Cristo enfrentou por amor de nós. A lembrança da Paixão do Senhor vos arrancava sentidas lágrimas de arrependimento e de gratidão. De vós quero aprender a grande lição do Crucificado: que, no sofrimento aceito livremente e por amor, atingimos nossa purificação.\n\nEnsinai-me a aceitar os males e contrariedades que não posso evitar, para, por meio deles, expiar, com Jesus, os males que o pecado inflige ao mundo.",
    suggestion: "Mc 9,25-30 ou Rm 8,9-13",
  },
  {
    day: 7,
    meditation:
      "São Francisco, fostes chamado “o Pobrezinho de Assis”. Abandonastes os bens e o conforto do mundo e vivestes na maior pobreza para mais perfeitamente imitar a Jesus, que nasceu pobre em Belém e na cruz foi despojado de tudo. Ajudai-me a superar o fascínio e os atrativos que os bens da terra exercem sobre mim. Que saiba repartir do que é meu com os mais necessitados, e assim mereça gozar da liberdade dos filhos de Deus.",
    suggestion: "Jo 19,31-37 ou Ef 3,8-12.14-19",
  },
  {
    day: 8,
    meditation:
      "São Francisco, fostes o grande amigo da natureza. No Cântico do Sol, convidastes a todas as criaturas para cantarem louvores a Deus. Para vós, a natureza era o livro aberto onde se leem a bondade e a beleza de Deus, que tudo criou com amor de Pai. Fazei que, para mim, as criaturas não sejam pedras de tropeço, mas degraus que me levem para junto do Criador. Dai-me a graça de não me prender exageradamente às criaturas nem a mim mesmo. E que, de coração livre, possa levantar voo para as alturas do amor de Deus.",
    suggestion: "Jo 14,1-12 ou 1Pd 2,4-10",
  },
  {
    day: 9,
    meditation:
      "Meu grande São Francisco, apesar da ingratidão dos homens que se fecham ao amor de Deus, soubestes viver em contínua alegria. Estáveis consciente de que o amor do Pai nos predestinou à felicidade do céu. Tão grande foi vosso amor a Cristo, vossa identificação com o Amado atingiu incomparável perfeição. Ensinai-me a encarar a vida com seriedade e alegria. Quero assumir com amor e alegria as responsabilidades que ele me impõe. Que seja compreensivo e alegre no relacionamento com o próximo. Que não esqueça minha vocação de filho de Deus chamado para servir. Fazei que, a vosso exemplo, eu me deixe arrastar pelo amor de Cristo, caminhando decidido e alegre ao seu encontro, todos os dias da vida.",
    suggestion: "Mt 15,21-28 ou Rm 16,25-27",
  },
];

export function findNovenaDay(day: number): NovenaDay | undefined {
  return novenaDays.find((item) => item.day === day);
}
