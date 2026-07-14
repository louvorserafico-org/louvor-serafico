import {
  resolveSaintHistoryAccess,
  type FranciscanOrder,
  type LiturgicalRank,
  type SaintDay,
  type SaintQualifier,
} from "@louvor-serafico/shared";

export const qualifierLabels: Record<SaintQualifier, string> = {
  martir: "Mártir",
  virgem: "Virgem",
  doutor: "Doutor",
  pastor: "Pastor",
  bispo: "Bispo",
  presbitero: "Presbítero",
  religioso: "Religioso",
  eremita: "Eremita",
  secular: "Secular",
  fundador: "Fundador",
  diacono: "Diácono",
};

const orderLabels: Record<FranciscanOrder, string> = {
  first: "Ordem I",
  second: "Ordem II",
  third: "Ordem III",
  secular: "Ordem Secular",
};

const rankLabels: Record<LiturgicalRank, string> = {
  solenidade: "Solenidade",
  festa: "Festa",
  memoria: "Memória",
  memoria_facultativa: "Memória facultativa",
};

export type SaintHistoryStatus = "available" | "locked" | "preparing";

export type SaintHistoryState = {
  status: SaintHistoryStatus;
  text: string;
};

export function buildSaintClassification(day: SaintDay): string {
  const parts = day.qualifiers.map((qualifier) => qualifierLabels[qualifier]);

  if (day.order) {
    parts.push(orderLabels[day.order]);
  }

  return parts.length > 0 ? parts.join(" · ") : "Dia franciscano";
}

export function buildSaintObservancesLabel(day: SaintDay): string {
  return day.observances
    .map((observance) => `${observance.jurisdiction}: ${rankLabels[observance.rank]}`)
    .join(" · ");
}

export function buildSaintHistoryState(day: SaintDay, hasActiveSubscription: boolean): SaintHistoryState {
  const access = resolveSaintHistoryAccess(day, hasActiveSubscription);

  if (access.reason === "no_history") {
    return {
      status: "preparing",
      text: "O texto histórico deste dia está em preparação.",
    };
  }

  if (access.reason === "subscription_required") {
    return {
      status: "locked",
      text: "A história deste santo está disponível para assinantes.",
    };
  }

  return {
    status: "available",
    text: day.shortHistory ?? "",
  };
}
