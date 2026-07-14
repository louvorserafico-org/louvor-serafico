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
    assert.equal(result.saints.length, 1);
    assert.ok(result.saints[0]?.classification.length > 0);
    assert.ok(result.saints[0]?.href.startsWith("/santos/07-10?saintId="));
  });

  it("lists every saint with its own link when the day has more than one", () => {
    const result = buildHomeSaint(getLiturgicalDayForDate(new Date("2026-07-13T12:00:00.000Z")));

    assert.equal(result.eyebrow, "Santos do dia");
    assert.equal(result.saints.length, 2);
    const angelina = result.saints.find((saint) => saint.name.includes("Angelina"));
    const emanuel = result.saints.find((saint) => saint.name.includes("Emanuel Ruíz"));
    assert.ok(angelina?.href.startsWith("/santos/07-13?saintId="));
    assert.ok(emanuel?.href.startsWith("/santos/07-13?saintId="));
    assert.notEqual(angelina?.href, emanuel?.href);
  });

  it("falls back editorially when there is no franciscan saint", () => {
    const result = buildHomeSaint(getLiturgicalDayForDate(new Date("2026-02-14T12:00:00.000Z")));

    assert.equal(result.status, "none");
    assert.equal(result.href, null);
    assert.ok(result.title.length > 0);
    assert.ok(result.description.length > 0);
    assert.equal(result.saints.length, 0);
  });
});
