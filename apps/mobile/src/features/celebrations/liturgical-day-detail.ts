import type { LiturgicalDay } from "@louvor-serafico/shared";

export type LiturgicalDayDetail = {
  cardTitle: string;
  ctaLabel: string;
  eyebrow: string;
  helperText: string;
  note: string;
  title: string;
};

export function buildLiturgicalDayDetail(day: LiturgicalDay): LiturgicalDayDetail {
  if (day.kind === "liturgical_day_without_repertoire") {
    return {
      cardTitle: "Repertorio em preparacao",
      ctaLabel: "Voltar ao calendario",
      eyebrow: day.dateLabel.toLowerCase(),
      helperText:
        "Esta celebracao ja aparece no calendario liturgico, mas o roteiro musical deste dia ainda esta sendo preparado.",
      note:
        "Consulte outros dias marcados para encontrar roteiros ja publicados enquanto este material e concluido.",
      title: day.title,
    };
  }

  return {
    cardTitle: "Dia sem roteiro publicado",
    ctaLabel: "Abrir calendario",
    eyebrow: day.dateLabel.toLowerCase(),
    helperText: "Hoje nao ha celebracao com roteiro musical publicado no app.",
    note:
      "Use o calendario para encontrar as proximas datas preparadas e organizar o ministerio com antecedencia.",
    title: day.title,
  };
}
