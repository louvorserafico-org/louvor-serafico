// Dominio do Santoral Franciscano.
//
// Modelagem em 3 eixos, fiel ao "Calendário Seráfico" (santoral-completo.pdf, p. 37-44):
//   1. qualificadores liturgicos (martir, virgem, doutor, pastor, ...), multiplos por santo;
//   2. Ordem franciscana (I/II/III/secular);
//   3. observancia por jurisdição + rank litúrgico (ex.: "Para OFMCap.: Memória").
//
// Regra premium (default reversivel): nome, data e classificação são públicos; o
// primeiro bloco historico (`shortHistory`) e premium quando `premium` for true.
//
// O indice anual completo vive em `santoral-index-2026.ts` (gerado do PDF). O texto
// historico de cada dia (`shortHistory`) entra em etapa seguinte.

import { franciscanSantoral2026 } from "./santoral-index-2026.ts";
import { findCuratedShortHistory } from "./santoral-content.ts";

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
  | "fundador"
  | "diacono";

export type LiturgicalRank = "solenidade" | "festa" | "memória" | "memoria_facultativa";

// Jurisdição franciscana da observancia. Aberto (string) porque a fonte inclui
// congregacoes além das ordens (OSC, Cl.Cp., FMM, FMCIM, OIC, ...).
export type FranciscanJurisdiction = string;

// Valores comuns observados no Calendário Seráfico, para referencia/UI.
export const commonFranciscanJurisdictions = [
  "FF",
  "OFM",
  "OFMConv",
  "OFMCap",
  "TOR",
  "TOFr",
  "OFS",
  "OSC",
  "Cl.Cp.",
  "Ordem II",
  "Ordem III",
] as const;

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

// Mescla o texto historico curado (santoral-content) no indice. Santos sem conteúdo
// curado permanecem com `shortHistory` null (estado "em preparação").
const saintDayCatalog: SaintDay[] = franciscanSantoral2026.map((saint) => {
  const curated = findCuratedShortHistory(saint.id);
  return curated ? { ...saint, shortHistory: curated } : saint;
});

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
