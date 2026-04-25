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
};

export function buildCalendarMonthView(
  monthNumber: number,
  celebrations: Celebration[],
): CalendarMonthView {
  const monthDays = getLiturgicalMonthDays2026(monthNumber);
  const markedDays = getLiturgicalMarkedDays2026(monthNumber);
  const leadingEmptyCellCount = new Date(Date.UTC(2026, monthNumber - 1, 1)).getUTCDay();

  return {
    celebrations: celebrations.filter((item) => Number(item.dateMonthDay.slice(0, 2)) === monthNumber),
    leadingEmptyCellCount,
    markedDays,
    monthDays,
    monthLabel: getLiturgicalMonthLabel(monthNumber),
    monthNumber,
  };
}
