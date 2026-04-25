import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getLiturgicalDayForDate,
  getLiturgicalMonthDays2026,
  getLiturgicalMonthLabel,
} from "./liturgical-calendar.ts";

describe("liturgical calendar 2026", () => {
  it("marks january 3 as a day with repertoire", () => {
    const result = getLiturgicalDayForDate(new Date("2026-01-03T12:00:00.000Z"));

    assert.equal(result.kind, "has_repertoire");
    assert.equal(result.celebrationSlug, "santissimo-nome-de-jesus");
    assert.equal(result.hasRepertoire, true);
  });

  it("marks ordinary days without repertoire", () => {
    const result = getLiturgicalDayForDate(new Date("2026-04-25T12:00:00.000Z"));

    assert.equal(result.kind, "ordinary_day");
    assert.equal(result.celebrationSlug, null);
    assert.equal(result.hasRepertoire, false);
  });

  it("builds full month days for 2026", () => {
    const result = getLiturgicalMonthDays2026(1);

    assert.equal(result.length, 31);
    assert.equal(result[2]?.monthDay, "01-03");
    assert.equal(result[2]?.hasRepertoire, true);
  });

  it("returns month label in portuguese", () => {
    assert.equal(getLiturgicalMonthLabel(4), "abril");
  });
});
