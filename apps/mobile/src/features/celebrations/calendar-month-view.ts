import {
  getLiturgicalMarkedDays2026,
  getLiturgicalMonthDays2026,
  getLiturgicalMonthLabel,
  type Celebration,
  type LiturgicalDay,
} from "@louvor-serafico/shared";

export type CalendarMonthView = {
  celebrations: Celebration[];
  leadingEmptyCellCount: number;
  markedDays: LiturgicalDay[];
  monthDays: LiturgicalDay[];
  monthLabel: string;
  monthNumber: number;
  trailingEmptyCellCount: number;
};

export function buildCalendarMonthView(
  monthNumber: number,
  celebrations: Celebration[],
): CalendarMonthView {
  const monthDays = getLiturgicalMonthDays2026(monthNumber);
  const markedDays = [...getLiturgicalMarkedDays2026(monthNumber)].sort((first, second) => {
    const firstRank = first.kind === "has_repertoire" ? 0 : 1;
    const secondRank = second.kind === "has_repertoire" ? 0 : 1;
    return firstRank - secondRank;
  });
  const leadingEmptyCellCount = new Date(Date.UTC(2026, monthNumber - 1, 1)).getUTCDay();
  // Completa somente até o fim da última semana (multiplo de 7), nunca uma
  // grade fixa de 6 linhas. O número de linhas varia por mes, de proposito.
  const trailingEmptyCellCount =
    (7 - ((leadingEmptyCellCount + monthDays.length) % 7)) % 7;

  return {
    celebrations: celebrations.filter((item) => Number(item.dateMonthDay.slice(0, 2)) === monthNumber),
    leadingEmptyCellCount,
    markedDays,
    monthDays,
    monthLabel: getLiturgicalMonthLabel(monthNumber),
    monthNumber,
    trailingEmptyCellCount,
  };
}
