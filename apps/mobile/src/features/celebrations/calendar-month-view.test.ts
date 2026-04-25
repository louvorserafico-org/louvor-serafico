import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getInitialCelebrationCatalog } from "../../../../../packages/shared/src/celebration.ts";

import { buildCalendarMonthView } from "./calendar-month-view.ts";

describe("calendar month view", () => {
  it("builds january with marked days and celebrations", () => {
    const result = buildCalendarMonthView(1, getInitialCelebrationCatalog());

    assert.equal(result.monthLabel, "janeiro");
    assert.equal(result.markedDays.length >= 2, true);
    assert.equal(result.celebrations[0]?.slug, "santissimo-nome-de-jesus");
  });

  it("returns empty celebration list for month without published repertoire", () => {
    const result = buildCalendarMonthView(4, getInitialCelebrationCatalog());

    assert.equal(result.monthLabel, "abril");
    assert.equal(result.celebrations.length, 0);
    assert.equal(result.markedDays.some((item) => item.kind === "liturgical_day_without_repertoire"), true);
  });
});
