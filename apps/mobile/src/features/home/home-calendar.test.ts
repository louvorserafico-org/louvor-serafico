import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getLiturgicalDayForDate } from "../../../../../packages/shared/src/liturgical-calendar.ts";

import { buildHomeCalendar } from "./home-calendar.ts";

describe("home calendar", () => {
  it("builds current month grid with marked repertoire days", () => {
    const result = buildHomeCalendar(getLiturgicalDayForDate(new Date("2026-01-03T12:00:00.000Z")));

    assert.equal(result.monthLabel, "janeiro");
    assert.equal(result.markedCount, 1);
    assert.equal(result.cells.find((cell) => cell.key === "01-03")?.hasRepertoire, true);
  });

  it("marks today even when month has no repertoire", () => {
    const result = buildHomeCalendar(getLiturgicalDayForDate(new Date("2026-04-25T12:00:00.000Z")));

    assert.equal(result.monthLabel, "abril");
    assert.equal(result.markedCount, 0);
    assert.equal(result.cells.find((cell) => cell.key === "04-25")?.isToday, true);
  });
});
