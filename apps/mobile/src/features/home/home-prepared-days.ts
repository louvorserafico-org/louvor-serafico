import type { Celebration, LiturgicalDay } from "@louvor-serafico/shared";

export type HomePreparedDays = {
  helperText: string;
  items: Celebration[];
  title: string;
};

export function buildHomePreparedDays(
  celebrations: Celebration[],
  today: LiturgicalDay,
): HomePreparedDays {
  const sorted = [...celebrations].sort((first, second) =>
    first.dateMonthDay.localeCompare(second.dateMonthDay),
  );
  const upcoming = sorted.filter((item) => item.dateMonthDay >= today.monthDay);

  if (upcoming.length > 0) {
    return {
      helperText: "Os próximos roteiros já publicados aparecem aqui para facilitar a preparação do ministério.",
      items: upcoming.slice(0, 3),
      title: "Próximos dias preparados",
    };
  }

  return {
    helperText: "Estes são os roteiros já publicados no app enquanto novos dias litúrgicos são preparados.",
    items: sorted.slice(0, 3),
    title: "Dias já publicados",
  };
}
