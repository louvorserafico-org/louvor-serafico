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
      cardTitle: "Roteiro em preparação",
      ctaLabel: "Voltar ao calendário",
      eyebrow: day.dateLabel.toLowerCase(),
      helperText: "Esta celebração já aparece no calendário litúrgico, mas o roteiro musical deste dia ainda está sendo preparado.",
      note: "Consulte outros dias marcados para encontrar roteiros já publicados enquanto este material e concluido.",
      title: day.title,
    };
  }

  return {
    cardTitle: "Sem roteiro publicado",
    ctaLabel: "Abrir calendário",
    eyebrow: day.dateLabel.toLowerCase(),
    helperText: "Hoje não há celebração com roteiro musical publicado no app.",
    note: "Use o calendário para encontrar as próximas datas preparadas e organizar o ministério com antecedência.",
    title: day.title,
  };
}
