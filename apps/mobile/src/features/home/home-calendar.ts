import { getLiturgicalMonthDays2026, getLiturgicalMonthLabel, type LiturgicalDay } from "@louvor-serafico/shared";

export type HomeCalendarCell = {
  dayNumber: number | null;
  hasRepertoire: boolean;
  isToday: boolean;
  key: string;
};

export type HomeCalendar = {
  cells: HomeCalendarCell[];
  markedCount: number;
  monthLabel: string;
};

export function buildHomeCalendar(day: LiturgicalDay): HomeCalendar {
  const monthDays = getLiturgicalMonthDays2026(day.monthNumber);
  const firstDayWeekday = new Date(Date.UTC(2026, day.monthNumber - 1, 1)).getUTCDay();
  const leadingEmptyCells = Array.from({ length: firstDayWeekday }, (_, index) => ({
    dayNumber: null,
    hasRepertoire: false,
    isToday: false,
    key: `empty-${index}`,
  }));
  const dayCells = monthDays.map<HomeCalendarCell>((item) => ({
    dayNumber: item.dayNumber,
    hasRepertoire: item.hasRepertoire,
    isToday: item.monthDay === day.monthDay,
    key: item.monthDay,
  }));

  return {
    cells: [...leadingEmptyCells, ...dayCells],
    markedCount: monthDays.filter((item) => item.hasRepertoire).length,
    monthLabel: getLiturgicalMonthLabel(day.monthNumber),
  };
}
