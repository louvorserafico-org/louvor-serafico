// Calendário litúrgico geral (referencia CNBB) como COMPLEMENTO do santoral franciscano.
// Datas móveis derivam da Páscoa (Computus gregoriano, algoritmo anônimo de Meeus);
// datas fixas vem de uma tabela. Parametrizado por ano.
//
// Papel: o eixo principal continua sendo o santoral franciscano; estas festas gerais
// entram como camada de preceito. Ranks são rotulos aproximados para exibição.

export type GeneralFeastRank = "solenidade" | "festa" | "memória";
export type GeneralFeastKind = "fixed" | "movable";

export type GeneralFeast = {
  kind: GeneralFeastKind;
  monthDay: string;
  rank: GeneralFeastRank;
  title: string;
};

// Domingo de Páscoa no calendário gregoriano.
export function computeEaster(year: number): { day: number; month: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return { day, month };
}

type MovableSpec = { offset: number; rank: GeneralFeastRank; title: string };

const movableSpecs: MovableSpec[] = [
  { offset: -46, rank: "memória", title: "Quarta-feira de Cinzas" },
  { offset: -7, rank: "festa", title: "Domingo de Ramos" },
  { offset: -3, rank: "festa", title: "Quinta-feira Santa" },
  { offset: -2, rank: "festa", title: "Sexta-feira Santa da Paixão do Senhor" },
  { offset: 0, rank: "solenidade", title: "Domingo da Páscoa" },
  { offset: 42, rank: "solenidade", title: "Ascensão do Senhor" },
  { offset: 49, rank: "solenidade", title: "Pentecostes" },
  { offset: 56, rank: "solenidade", title: "Santíssima Trindade" },
  { offset: 60, rank: "solenidade", title: "Corpus Christi" },
];

type FixedSpec = { day: number; month: number; rank: GeneralFeastRank; title: string };

const fixedSpecs: FixedSpec[] = [
  { day: 1, month: 1, rank: "solenidade", title: "Santa Maria, Mãe de Deus" },
  { day: 6, month: 1, rank: "solenidade", title: "Epifania do Senhor" },
  { day: 19, month: 3, rank: "solenidade", title: "São José" },
  { day: 25, month: 3, rank: "solenidade", title: "Anunciação do Senhor" },
  { day: 24, month: 6, rank: "solenidade", title: "Natividade de São João Batista" },
  { day: 29, month: 6, rank: "solenidade", title: "São Pedro e São Paulo" },
  { day: 6, month: 8, rank: "festa", title: "Transfiguração do Senhor" },
  { day: 15, month: 8, rank: "solenidade", title: "Assunção de Nossa Senhora" },
  { day: 14, month: 9, rank: "festa", title: "Exaltação da Santa Cruz" },
  { day: 1, month: 11, rank: "solenidade", title: "Todos os Santos" },
  { day: 8, month: 12, rank: "solenidade", title: "Imaculada Conceição" },
  { day: 25, month: 12, rank: "solenidade", title: "Natal do Senhor" },
];

function toMonthDay(month: number, day: number): string {
  return `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function shiftFromEaster(year: number, offset: number): string {
  const easter = computeEaster(year);
  const date = new Date(Date.UTC(year, easter.month - 1, easter.day + offset));
  return toMonthDay(date.getUTCMonth() + 1, date.getUTCDate());
}

export function getGeneralLiturgicalFeasts(year: number): GeneralFeast[] {
  const movable: GeneralFeast[] = movableSpecs.map((spec) => ({
    kind: "movable",
    monthDay: shiftFromEaster(year, spec.offset),
    rank: spec.rank,
    title: spec.title,
  }));

  const fixed: GeneralFeast[] = fixedSpecs.map((spec) => ({
    kind: "fixed",
    monthDay: toMonthDay(spec.month, spec.day),
    rank: spec.rank,
    title: spec.title,
  }));

  return [...movable, ...fixed].sort((first, second) => first.monthDay.localeCompare(second.monthDay));
}

export function findGeneralFeastByMonthDay(year: number, monthDay: string): GeneralFeast | undefined {
  return getGeneralLiturgicalFeasts(year).find((feast) => feast.monthDay === monthDay);
}
