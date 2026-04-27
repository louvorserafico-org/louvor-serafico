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
      helperText: "Consulte as celebracoes ja publicadas e percorra o ano liturgico com mais clareza.",
      title: "Calendario de celebracoes",
    };
  }

  return {
    eyebrow: `${input.localCount} celebracoes`,
    helperText: "O calendario inicial segue disponivel para consulta enquanto novos roteiros sao publicados.",
    title: "Calendario de celebracoes",
  };
}
