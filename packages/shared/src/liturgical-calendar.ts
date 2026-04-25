import { findCelebrationByDate } from "./celebration.ts";

export type LiturgicalDayKind =
  | "has_repertoire"
  | "liturgical_day_without_repertoire"
  | "ordinary_day";

export type LiturgicalDay = {
  celebrationSlug: string | null;
  dateLabel: string;
  dayNumber: number;
  hasRepertoire: boolean;
  isoDate: string;
  kind: LiturgicalDayKind;
  monthDay: string;
  monthNumber: number;
  title: string;
  year: 2026;
};

const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  timeZone: "UTC",
});

const monthNames = [
  "janeiro",
  "fevereiro",
  "marco",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
] as const;

export function getLiturgicalDayForDate(date: Date): LiturgicalDay {
  return buildLiturgicalDay2026(date.getMonth() + 1, date.getDate());
}

export function getLiturgicalMonthDays2026(monthNumber: number): LiturgicalDay[] {
  const dayCount = new Date(Date.UTC(2026, monthNumber, 0)).getUTCDate();

  return Array.from({ length: dayCount }, (_, index) => buildLiturgicalDay2026(monthNumber, index + 1));
}

export function getLiturgicalMonthLabel(monthNumber: number): string {
  return monthNames[monthNumber - 1] ?? "mes";
}

function buildLiturgicalDay2026(monthNumber: number, dayNumber: number): LiturgicalDay {
  const isoDate = `2026-${String(monthNumber).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
  const monthDay = `${String(monthNumber).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
  const celebration = findCelebrationByDate(monthDay);
  const utcDate = new Date(`${isoDate}T00:00:00.000Z`);

  if (celebration) {
    return {
      celebrationSlug: celebration.slug,
      dateLabel: capitalizeMonthLabel(monthFormatter.format(utcDate)),
      dayNumber,
      hasRepertoire: true,
      isoDate,
      kind: "has_repertoire",
      monthDay,
      monthNumber,
      title: celebration.title,
      year: 2026,
    };
  }

  return {
    celebrationSlug: null,
    dateLabel: capitalizeMonthLabel(monthFormatter.format(utcDate)),
    dayNumber,
    hasRepertoire: false,
    isoDate,
    kind: "ordinary_day",
    monthDay,
    monthNumber,
    title: "Dia comum",
    year: 2026,
  };
}

function capitalizeMonthLabel(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
