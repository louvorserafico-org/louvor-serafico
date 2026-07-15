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

  it("completes the grid only to the next full week, not a fixed 6-row grid", () => {
    // Julho 2026: comeca quarta (leading=3), tem 31 dias -> 3+31=34 -> completa até 35 (trailing=1).
    const july = buildCalendarMonthView(7, getInitialCelebrationCatalog());
    assert.equal(july.leadingEmptyCellCount, 3);
    assert.equal(july.trailingEmptyCellCount, 1);
    assert.equal((july.leadingEmptyCellCount + july.monthDays.length + july.trailingEmptyCellCount) % 7, 0);

    // Fevereiro 2026: comeca domingo (leading=0), tem 28 dias -> soma 28, já multiplo de 7 -> trailing=0.
    const february = buildCalendarMonthView(2, getInitialCelebrationCatalog());
    assert.equal(february.leadingEmptyCellCount, 0);
    assert.equal(february.trailingEmptyCellCount, 0);
  });

  it("lists marked days with prepared repertoire first, keeping the rest in date order", () => {
    const result = buildCalendarMonthView(1, getInitialCelebrationCatalog());

    assert.equal(result.markedDays[0]?.kind, "has_repertoire");

    const firstNonRepertoireIndex = result.markedDays.findIndex((day) => day.kind !== "has_repertoire");
    const rest = result.markedDays.slice(firstNonRepertoireIndex);
    assert.equal(
      rest.every((day) => day.kind !== "has_repertoire"),
      true,
    );
  });

  it("returns empty celebration list for month without published repertoire", () => {
    const result = buildCalendarMonthView(4, getInitialCelebrationCatalog());

    assert.equal(result.monthLabel, "abril");
    assert.equal(result.celebrations.length, 0);
    assert.equal(result.markedDays.some((item) => item.kind === "liturgical_day_without_repertoire"), true);
  });
});
