import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getLiturgicalDayForDate } from "../../../../../packages/shared/src/liturgical-calendar.ts";

import { buildHomeSaint } from "./home-saint.ts";

describe("home saint of the day", () => {
  it("shows the franciscan saint of the day with a link", () => {
    const result = buildHomeSaint(getLiturgicalDayForDate(new Date("2026-07-10T12:00:00.000Z")));

    assert.equal(result.status, "saint");
    assert.ok(result.title.includes("Verônica"));
    assert.equal(result.href, "/santos/07-10");
    assert.ok(result.classification.length > 0);
  });

  it("falls back editorially when there is no franciscan saint", () => {
    const result = buildHomeSaint(getLiturgicalDayForDate(new Date("2026-02-14T12:00:00.000Z")));

    assert.equal(result.status, "none");
    assert.equal(result.href, null);
    assert.ok(result.title.length > 0);
    assert.ok(result.classification.length > 0);
  });
});
