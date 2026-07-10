// Dominio do Santoral Franciscano.
//
// Modelagem em 3 eixos, fiel ao "Calendario Serafico" (santoral-completo.pdf, p. 37-44):
//   1. qualificadores liturgicos (martir, virgem, doutor, pastor, ...), multiplos por santo;
//   2. Ordem franciscana (I/II/III/secular);
//   3. observancia por jurisdicao + rank liturgico (ex.: "Para OFMCap.: Memoria").
//
// Regra premium (default reversivel): nome, data e classificacao sao publicos; o
// primeiro bloco historico (`shortHistory`) e premium quando `premium` for true.
//
// Escopo desta etapa: modelo + funcoes puras + seed inicial de exemplo. O indice anual
// completo e o texto historico de cada dia entram em etapas seguintes.

export type FranciscanOrder = "first" | "second" | "third" | "secular";

export type SaintQualifier =
  | "martir"
  | "virgem"
  | "doutor"
  | "pastor"
  | "bispo"
  | "presbitero"
  | "religioso"
  | "eremita"
  | "secular"
  | "fundador";

export type LiturgicalRank = "solenidade" | "festa" | "memoria" | "memoria_facultativa";

export type FranciscanJurisdiction =
  | "FF"
  | "OFM"
  | "OFMConv"
  | "OFMCap"
  | "TOR"
  | "TOFr"
  | "OFS"
  | "Ordem II"
  | "Ordem III";

export type SaintObservance = {
  jurisdiction: FranciscanJurisdiction;
  rank: LiturgicalRank;
};

export type SaintDay = {
  id: string;
  monthDay: string;
  name: string;
  qualifiers: SaintQualifier[];
  order: FranciscanOrder | null;
  observances: SaintObservance[];
  shortHistory: string | null;
  premium: boolean;
  celebrationSlug: string | null;
};

export type SaintHistoryAccessReason = "available" | "no_history" | "subscription_required";

export type SaintHistoryAccess = {
  canRead: boolean;
  reason: SaintHistoryAccessReason;
};

const saintDayCatalog: SaintDay[] = [
  {
    id: "saint-santissimo-nome-de-jesus",
    monthDay: "01-03",
    name: "Santissimo Nome de Jesus",
    qualifiers: [],
    order: null,
    observances: [{ jurisdiction: "FF", rank: "memoria" }],
    shortHistory: null,
    premium: true,
    celebrationSlug: "santissimo-nome-de-jesus",
  },
  {
    id: "saint-berardo-e-companheiros",
    monthDay: "01-16",
    name: "Sao Berardo e seus companheiros, protomartires",
    qualifiers: ["martir"],
    order: "first",
    observances: [
      { jurisdiction: "OFM", rank: "festa" },
      { jurisdiction: "FF", rank: "memoria" },
    ],
    shortHistory: null,
    premium: true,
    celebrationSlug: null,
  },
  {
    id: "saint-eustaquia-calafato",
    monthDay: "01-19",
    name: "Santa Eustaquia Calafato, virgem",
    qualifiers: ["virgem"],
    order: "second",
    observances: [{ jurisdiction: "Ordem II", rank: "memoria_facultativa" }],
    shortHistory: null,
    premium: true,
    celebrationSlug: null,
  },
];

export function getSaintDayCatalog(): SaintDay[] {
  return [...saintDayCatalog].sort((first, second) => first.monthDay.localeCompare(second.monthDay));
}

export function findSaintDaysByMonthDay(monthDay: string): SaintDay[] {
  return getSaintDayCatalog().filter((day) => day.monthDay === monthDay);
}

export function filterSaintDaysByQualifier(days: SaintDay[], qualifier: SaintQualifier): SaintDay[] {
  return days.filter((day) => day.qualifiers.includes(qualifier));
}

export function saintDayHasRepertoire(day: SaintDay): boolean {
  return day.celebrationSlug !== null;
}

export function resolveSaintHistoryAccess(
  day: SaintDay,
  hasActiveSubscription: boolean,
): SaintHistoryAccess {
  if (!day.shortHistory) {
    return { canRead: false, reason: "no_history" };
  }

  if (day.premium && !hasActiveSubscription) {
    return { canRead: false, reason: "subscription_required" };
  }

  return { canRead: true, reason: "available" };
}
