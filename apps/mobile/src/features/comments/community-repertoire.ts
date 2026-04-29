import type { Celebration } from "@louvor-serafico/shared";

export type CommunityRepertoireOption = {
  dateLabel: string;
  id: string;
  title: string;
};

export function buildCommunityRepertoireOptions(
  celebrations: Celebration[],
  today: Date,
): CommunityRepertoireOption[] {
  const monthDay = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return [...celebrations]
    .sort((first, second) => {
      const firstDistance = getDayDistance(first.dateMonthDay, monthDay);
      const secondDistance = getDayDistance(second.dateMonthDay, monthDay);

      if (firstDistance !== secondDistance) {
        return firstDistance - secondDistance;
      }

      const firstFutureBias = isFutureOrToday(first.dateMonthDay, monthDay) ? 0 : 1;
      const secondFutureBias = isFutureOrToday(second.dateMonthDay, monthDay) ? 0 : 1;

      if (firstFutureBias !== secondFutureBias) {
        return firstFutureBias - secondFutureBias;
      }

      return first.dateMonthDay.localeCompare(second.dateMonthDay);
    })
    .slice(0, 5)
    .map((celebration) => ({
      dateLabel: celebration.dateLabel,
      id: celebration.id,
      title: celebration.title,
    }));
}

function getDayDistance(firstMonthDay: string, secondMonthDay: string) {
  return Math.abs(getDayOfYear(firstMonthDay) - getDayOfYear(secondMonthDay));
}

function isFutureOrToday(firstMonthDay: string, secondMonthDay: string) {
  return getDayOfYear(firstMonthDay) >= getDayOfYear(secondMonthDay);
}

function getDayOfYear(monthDay: string) {
  const [month, day] = monthDay.split("-").map(Number);
  return Math.floor((Date.UTC(2026, month - 1, day) - Date.UTC(2026, 0, 1)) / (1000 * 60 * 60 * 24));
}
