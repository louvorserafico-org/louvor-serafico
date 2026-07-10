import type { LiturgicalDay } from "@louvor-serafico/shared";

export function buildCalendarDayRoute(day: LiturgicalDay): string {
  if (day.kind === "franciscan_saint") {
    return `/santos/${day.monthDay}`;
  }

  return `/celebracoes/${day.celebrationSlug ?? day.monthDay}`;
}
