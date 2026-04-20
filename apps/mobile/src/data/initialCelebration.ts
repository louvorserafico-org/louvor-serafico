import { standardMassMoments } from "@louvor-serafico/shared";

const celebrationSongs = [
  "Fazei em nome do Senhor",
  "Bendito seja o nome do Senhor",
  "Aleluia, bendizei o seu nome",
  "Invocando o nome do Senhor",
  "Por teu nome, o Senhor",
  "Vamos em nome do Senhor",
];

export const initialCelebration = {
  dateLabel: "03 de janeiro",
  title: "Missa do Santissimo Nome de Jesus",
  moments: standardMassMoments.map((moment, index) => ({
    moment,
    songTitle: celebrationSongs[index] ?? "Canto nao definido",
  })),
} as const;
