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
      eyebrow: `${input.remoteCount} celebrações`,
      helperText: "Consulte as celebrações já publicadas e percorra o ano litúrgico com mais clareza.",
      title: "Calendário de celebrações",
    };
  }

  return {
    eyebrow: `${input.localCount} celebrações`,
    helperText: "O calendário inicial segue disponível para consulta enquanto novos roteiros são publicados.",
    title: "Calendário de celebrações",
  };
}
