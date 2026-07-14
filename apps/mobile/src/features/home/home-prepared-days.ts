import type { Celebration, LiturgicalDay } from "@louvor-serafico/shared";

export type HomePreparedDays = {
  hasMore: boolean;
  helperText: string;
  items: Celebration[];
  title: string;
};

export function buildHomePreparedDays(
  celebrations: Celebration[],
  today: LiturgicalDay,
): HomePreparedDays {
  const sorted = [...celebrations].sort((first, second) => {
    const firstDistance = getDayDistance(first.dateMonthDay, today.monthDay);
    const secondDistance = getDayDistance(second.dateMonthDay, today.monthDay);

    if (firstDistance !== secondDistance) {
      return firstDistance - secondDistance;
    }

    const firstIsFutureOrToday = first.dateMonthDay >= today.monthDay ? 0 : 1;
    const secondIsFutureOrToday = second.dateMonthDay >= today.monthDay ? 0 : 1;

    if (firstIsFutureOrToday !== secondIsFutureOrToday) {
      return firstIsFutureOrToday - secondIsFutureOrToday;
    }

    return first.dateMonthDay.localeCompare(second.dateMonthDay);
  });

  return {
    hasMore: sorted.length > 5,
    helperText: "Os roteiros já publicados seguem disponiveis para consulta.",
    items: sorted.slice(0, 5),
    title: "Roteiros disponiveis",
  };
}

function getDayDistance(firstMonthDay: string, secondMonthDay: string) {
  return Math.abs(getDayOfYear(firstMonthDay) - getDayOfYear(secondMonthDay));
}

function getDayOfYear(monthDay: string) {
  const [month, day] = monthDay.split("-").map(Number);
  const date = new Date(Date.UTC(2026, (month ?? 1) - 1, day ?? 1));
  const yearStart = new Date(Date.UTC(2026, 0, 1));

  return Math.round((date.getTime() - yearStart.getTime()) / 86_400_000);
}
