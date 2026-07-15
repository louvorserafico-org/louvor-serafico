import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getLiturgicalDayForDate } from "../../../../../packages/shared/src/liturgical-calendar.ts";

import { buildCalendarDayRoute } from "./calendar-day-route.ts";

describe("calendar day route", () => {
  it("routes repertoire day to celebration slug", () => {
    const result = buildCalendarDayRoute(
      getLiturgicalDayForDate(new Date("2026-01-03T12:00:00.000Z")),
    );

    assert.equal(result, "/celebracoes/Santíssimo-nome-de-jesus");
  });

  it("routes liturgical day without repertoire to month-day detail", () => {
    const result = buildCalendarDayRoute(
      getLiturgicalDayForDate(new Date("2026-12-25T12:00:00.000Z")),
    );

    assert.equal(result, "/celebracoes/12-25");
  });

  it("routes ordinary day to month-day detail", () => {
    const result = buildCalendarDayRoute(
      getLiturgicalDayForDate(new Date("2026-04-25T12:00:00.000Z")),
    );

    assert.equal(result, "/celebracoes/04-25");
  });

  it("routes franciscan saint day to the saint page", () => {
    const result = buildCalendarDayRoute(
      getLiturgicalDayForDate(new Date("2026-01-04T12:00:00.000Z")),
    );

    assert.equal(result, "/santos/01-04");
  });
});
