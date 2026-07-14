import { filterSaintDaysByQualifier, type SaintDay, type SaintQualifier } from "@louvor-serafico/shared";

export type SaintFilterOption = "all" | SaintQualifier;

export function applySaintFilter(days: SaintDay[], filter: SaintFilterOption): SaintDay[] {
  if (filter === "all") {
    return days;
  }

  return filterSaintDaysByQualifier(days, filter);
}

export function buildAvailableQualifiers(days: SaintDay[]): SaintQualifier[] {
  const seen = new Set<SaintQualifier>();

  for (const day of days) {
    for (const qualifier of day.qualifiers) {
      seen.add(qualifier);
    }
  }

  return Array.from(seen);
}
