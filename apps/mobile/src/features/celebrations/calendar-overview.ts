type CalendarOverviewInput = {
  localCount: number;
  remoteCount: number;
  sourceMode: "local" | "remote";
};

export type CalendarOverview = {
  eyebrow: string;
  helperText: string;
  title: string;
};

export function buildCalendarOverview(input: CalendarOverviewInput): CalendarOverview {
  if (input.sourceMode === "remote") {
    return {
      eyebrow: `${input.remoteCount} celebracoes`,
      helperText: "Calendario remoto ativo para consulta liturgica.",
      title: "Celebracoes publicadas",
    };
  }

  return {
    eyebrow: `${input.localCount} celebracoes`,
    helperText: "Catalogo local ativo enquanto calendario remoto evolui.",
    title: "Calendario inicial",
  };
}
