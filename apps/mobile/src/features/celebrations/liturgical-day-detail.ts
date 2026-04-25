import type { LiturgicalDay } from "@louvor-serafico/shared";

export type LiturgicalDayDetail = {
  ctaLabel: string;
  eyebrow: string;
  helperText: string;
  title: string;
};

export function buildLiturgicalDayDetail(day: LiturgicalDay): LiturgicalDayDetail {
  if (day.kind === "liturgical_day_without_repertoire") {
    return {
      ctaLabel: "Ver calendario",
      eyebrow: day.dateLabel.toLowerCase(),
      helperText:
        "Esta data litúrgica já está registrada no calendário, mas o repertório musical ainda será preparado.",
      title: day.title,
    };
  }

  return {
    ctaLabel: "Ver calendario",
    eyebrow: day.dateLabel.toLowerCase(),
    helperText:
      "Hoje não há celebração com roteiro publicado. Consulte os próximos dias preparados no calendário.",
    title: day.title,
  };
}
