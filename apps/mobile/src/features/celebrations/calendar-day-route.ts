import type { LiturgicalDay } from "@louvor-serafico/shared";

export function buildCalendarDayRoute(day: LiturgicalDay): string {
  return `/celebracoes/${day.celebrationSlug ?? day.monthDay}`;
}
