import assert from "node:assert/strict";
import { describe, it } from "node:test";

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
    assert.equal(result.items[0]?.slug, "santissimo-nome-de-jesus");
  });

  it("falls back to published days when the year has no future prepared items", () => {
    const result = buildHomePreparedDays(
      getInitialCelebrationCatalog(),
      getLiturgicalDayForDate(new Date("2026-04-25T12:00:00.000Z")),
    );

    assert.equal(result.title, "Roteiros disponiveis");
    assert.equal(result.items[0]?.slug, "santissimo-nome-de-jesus");
  });
});
