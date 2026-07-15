import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Celebration } from "@louvor-serafico/shared";
import { getInitialCelebrationCatalog } from "../../../../../packages/shared/src/celebration.ts";
import { getLiturgicalDayForDate } from "../../../../../packages/shared/src/liturgical-calendar.ts";

import { buildHomePreparedDays } from "./home-prepared-days.ts";

describe("home prepared days", () => {
  it("returns upcoming prepared days when there are future items", () => {
    const result = buildHomePreparedDays(
      getInitialCelebrationCatalog(),
      getLiturgicalDayForDate(new Date("2026-01-01T12:00:00.000Z")),
    );

    assert.equal(result.title, "Roteiros disponiveis");
    assert.equal(result.items[0]?.slug, "Santíssimo-nome-de-jesus");
    assert.equal(result.hasMore, false);
  });

  it("falls back to published days when the year has no future prepared items", () => {
    const result = buildHomePreparedDays(
      getInitialCelebrationCatalog(),
      getLiturgicalDayForDate(new Date("2026-04-25T12:00:00.000Z")),
    );

    assert.equal(result.title, "Roteiros disponiveis");
    assert.equal(result.items[0]?.slug, "Santíssimo-nome-de-jesus");
    assert.equal(result.hasMore, false);
  });

  it("keeps the closest available routes and limits the list to five items", () => {
    const celebrations = buildCelebrations([
      "01-03",
      "01-08",
      "01-15",
      "01-20",
      "01-25",
      "02-02",
      "02-10",
    ]);

    const result = buildHomePreparedDays(
      celebrations,
      getLiturgicalDayForDate(new Date("2026-01-18T12:00:00.000Z")),
    );

    assert.deepEqual(
      result.items.map((item) => item.dateMonthDay),
      ["01-20", "01-15", "01-25", "01-08", "02-02"],
    );
    assert.equal(result.hasMore, true);
  });
});

function buildCelebrations(monthDays: string[]): Celebration[] {
  return monthDays.map((monthDay, index) => ({
    dateLabel: monthDay,
    dateMonthDay: monthDay,
    id: `celebration-${index + 1}`,
    recommendations: [],
    slug: `celebration-${index + 1}`,
    songs: [],
    title: `Celebração ${index + 1}`,
  }));
}
