import { findCelebrationByDate } from "./celebration.ts";
import { findSaintDaysByMonthDay, type SaintDay } from "./santoral.ts";

export type LiturgicalDayKind =
  | "has_repertoire"
  | "franciscan_saint"
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
  saints: SaintDay[];
  title: string;
  year: 2026;
};

type LiturgicalMarker = {
  monthDay: string;
  title: string;
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

const liturgicalMarkers2026: LiturgicalMarker[] = [
  { monthDay: "01-01", title: "Santa Maria, Mãe de Deus" },
  { monthDay: "01-03", title: "Missa do Santíssimo Nome de Jesus" },
  { monthDay: "02-18", title: "Quarta-feira de Cinzas" },
  { monthDay: "03-29", title: "Domingo de Ramos" },
  { monthDay: "04-02", title: "Quinta-feira Santa" },
  { monthDay: "04-03", title: "Sexta-feira da Paixão" },
  { monthDay: "04-05", title: "Domingo da Páscoa" },
  { monthDay: "05-24", title: "Pentecostes" },
  { monthDay: "06-04", title: "Corpus Christi" },
  { monthDay: "08-15", title: "Assunção de Nossa Senhora" },
  { monthDay: "11-02", title: "Comemoração de Todos os Fiéis Defuntos" },
  { monthDay: "11-01", title: "Todos os Santos" },
  { monthDay: "12-08", title: "Imaculada Conceição" },
  { monthDay: "12-25", title: "Natal do Senhor" },
];

export function getLiturgicalDayForDate(date: Date): LiturgicalDay {
  return buildLiturgicalDay2026(date.getMonth() + 1, date.getDate());
}

export function getLiturgicalMonthDays2026(monthNumber: number): LiturgicalDay[] {
  const dayCount = new Date(Date.UTC(2026, monthNumber, 0)).getUTCDate();

  return Array.from({ length: dayCount }, (_, index) => buildLiturgicalDay2026(monthNumber, index + 1));
}

export function getLiturgicalMarkedDays2026(monthNumber: number): LiturgicalDay[] {
  return getLiturgicalMonthDays2026(monthNumber).filter((item) => item.kind !== "ordinary_day");
}

export function getLiturgicalMonthLabel(monthNumber: number): string {
  return monthNames[monthNumber - 1] ?? "mes";
}

function buildLiturgicalDay2026(monthNumber: number, dayNumber: number): LiturgicalDay {
  const isoDate = `2026-${String(monthNumber).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
  const monthDay = `${String(monthNumber).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
  const celebration = findCelebrationByDate(monthDay);
  const saints = findSaintDaysByMonthDay(monthDay);
  const primarySaint = saints[0];
  const marker = liturgicalMarkers2026.find((item) => item.monthDay === monthDay);
  const utcDate = new Date(`${isoDate}T00:00:00.000Z`);
  const dateLabel = capitalizeMonthLabel(monthFormatter.format(utcDate));

  // Prioridade: repertorio > santo franciscano > preceito da Igreja > dia comum.
  // O santoral franciscano e o eixo principal; o repertorio ainda vence porque
  // leva o musico direto ao roteiro. Os santos ficam anexados em qualquer caso.

  if (celebration) {
    return {
      celebrationSlug: celebration.slug,
      dateLabel,
      dayNumber,
      hasRepertoire: true,
      isoDate,
      kind: "has_repertoire",
      monthDay,
      monthNumber,
      saints,
      title: celebration.title,
      year: 2026,
    };
  }

  if (primarySaint) {
    return {
      celebrationSlug: null,
      dateLabel,
      dayNumber,
      hasRepertoire: false,
      isoDate,
      kind: "franciscan_saint",
      monthDay,
      monthNumber,
      saints,
      title: primarySaint.name,
      year: 2026,
    };
  }

  if (marker) {
    return {
      celebrationSlug: null,
      dateLabel,
      dayNumber,
      hasRepertoire: false,
      isoDate,
      kind: "liturgical_day_without_repertoire",
      monthDay,
      monthNumber,
      saints: [],
      title: marker.title,
      year: 2026,
    };
  }

  return {
    celebrationSlug: null,
    dateLabel,
    dayNumber,
    hasRepertoire: false,
    isoDate,
    kind: "ordinary_day",
    monthDay,
    monthNumber,
    saints: [],
    title: "Dia comum",
    year: 2026,
  };
}

function capitalizeMonthLabel(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
