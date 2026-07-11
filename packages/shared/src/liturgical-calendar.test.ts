import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getLiturgicalDayForDate,
  getLiturgicalMonthDays2026,
  getLiturgicalMonthLabel,
  getLiturgicalMarkedDays2026,
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

  it("marks fixed liturgical days without repertoire", () => {
    const result = getLiturgicalDayForDate(new Date("2026-12-25T12:00:00.000Z"));

    assert.equal(result.kind, "liturgical_day_without_repertoire");
    assert.equal(result.title, "Natal do Senhor");
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

  it("returns marked days for a month", () => {
    const result = getLiturgicalMarkedDays2026(1);

    assert.equal(result.length >= 2, true);
    assert.equal(result.some((item) => item.kind === "has_repertoire"), true);
    assert.equal(result.some((item) => item.kind === "liturgical_day_without_repertoire"), true);
  });

  it("marks franciscan saint days as the primary axis", () => {
    const result = getLiturgicalDayForDate(new Date("2026-01-04T12:00:00.000Z"));

    assert.equal(result.kind, "franciscan_saint");
    assert.equal(result.hasRepertoire, false);
    assert.ok(result.saints.some((saint) => saint.name.includes("Ângela de Foligno")));
    assert.ok(result.title.includes("Ângela de Foligno"));
  });

  it("keeps repertoire priority but still attaches the day saints", () => {
    const result = getLiturgicalDayForDate(new Date("2026-01-03T12:00:00.000Z"));

    assert.equal(result.kind, "has_repertoire");
    assert.equal(result.saints.length >= 1, true);
  });

  it("keeps precept days as complement when no franciscan saint exists", () => {
    const result = getLiturgicalDayForDate(new Date("2026-12-25T12:00:00.000Z"));

    assert.equal(result.kind, "liturgical_day_without_repertoire");
    assert.deepEqual(result.saints, []);
  });

  it("marks franciscan days in the monthly marked list", () => {
    const result = getLiturgicalMarkedDays2026(1);

    assert.equal(result.some((item) => item.kind === "franciscan_saint"), true);
  });

  it("uses the computed general calendar for precept days", () => {
    const epiphany = getLiturgicalDayForDate(new Date("2026-01-06T12:00:00.000Z"));
    assert.equal(epiphany.kind, "liturgical_day_without_repertoire");
    assert.equal(epiphany.title, "Epifania do Senhor");

    const corpus = getLiturgicalDayForDate(new Date("2026-06-04T12:00:00.000Z"));
    assert.equal(corpus.kind, "liturgical_day_without_repertoire");
    assert.equal(corpus.title, "Corpus Christi");
  });

  it("keeps ordinary days without saints", () => {
    const result = getLiturgicalDayForDate(new Date("2026-02-14T12:00:00.000Z"));

    assert.equal(result.kind, "ordinary_day");
    assert.deepEqual(result.saints, []);
  });
});
