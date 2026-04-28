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
      helperText: "Dias ja preparados para consulta.",
      items: upcoming.slice(0, 3),
      title: "Roteiros disponiveis",
    };
  }

  return {
    helperText: "Os roteiros ja publicados seguem disponiveis para consulta.",
    items: sorted.slice(0, 3),
    title: "Roteiros disponiveis",
  };
}
