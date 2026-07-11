import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  filterSaintDaysByQualifier,
  findSaintDaysByMonthDay,
  getSaintDayCatalog,
  resolveSaintHistoryAccess,
  type SaintDay,
  // @ts-ignore Node runs TypeScript sources directly in this dev setup.
} from "./santoral.ts";

describe("santoral franciscano domain", () => {
  it("returns saints for a date with qualifiers, order and observances", () => {
    const days = findSaintDaysByMonthDay("01-16");
    const berardo = days.find((day) => day.name.includes("Berardo"));

    assert.ok(berardo, "expected Sao Berardo on 01-16");
    assert.deepEqual(berardo?.qualifiers, ["martir"]);
    assert.equal(berardo?.order, "first");
    assert.equal(berardo?.observances.length, 2);
    assert.ok(berardo?.observances.some((o) => o.jurisdiction === "OFM" && o.rank === "festa"));
    assert.ok(berardo?.observances.some((o) => o.jurisdiction === "FF" && o.rank === "memoria"));
  });

  it("returns empty for a date without franciscan saint", () => {
    assert.deepEqual(findSaintDaysByMonthDay("02-14"), []);
  });

  it("links a saint day to a repertoire celebration when it exists", () => {
    const days = findSaintDaysByMonthDay("01-03");
    const day = days[0];

    assert.equal(day?.name, "Santíssimo Nome de Jesus");
    assert.equal(day?.celebrationSlug, "santissimo-nome-de-jesus");
  });

  it("filters catalog by liturgical qualifier", () => {
    const catalog = getSaintDayCatalog();
    const virgins = filterSaintDaysByQualifier(catalog, "virgem");

    assert.ok(virgins.some((day) => day.name.includes("Eustóquia")));
    assert.ok(!virgins.some((day) => day.name.includes("Berardo")));
  });

  it("returns catalog ordered by month-day", () => {
    const catalog = getSaintDayCatalog();
    const monthDays = catalog.map((day) => day.monthDay);
    const sorted = [...monthDays].sort((a, b) => a.localeCompare(b));

    assert.deepEqual(monthDays, sorted);
  });

  describe("annual index 2026", () => {
    const catalog = getSaintDayCatalog();

    it("covers the full extracted index", () => {
      assert.equal(catalog.length, 126);
    });

    it("has valid month-day for every entry", () => {
      for (const day of catalog) {
        assert.match(day.monthDay, /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);
      }
    });

    it("keeps Santa Clara de Assis with OSC solemnity", () => {
      const clara = findSaintDaysByMonthDay("08-11").find((day) => day.name.includes("CLARA DE ASSIS"));
      assert.ok(clara);
      assert.equal(clara?.qualifiers.includes("virgem"), true);
      assert.ok(clara?.observances.some((o) => o.jurisdiction === "OSC" && o.rank === "solenidade"));
    });

    it("merges curated shortHistory into the catalog", () => {
      const catalog = getSaintDayCatalog();
      assert.equal(catalog.filter((saint) => saint.shortHistory).length, 112);

      const berardo = catalog.find(
        (saint) => saint.id === "saint-01-16-sao-berardo-e-seus-companheiros-protomartires",
      );
      assert.ok(berardo?.shortHistory?.includes("cinco irmãos"));
    });

    it("keeps Sao Francisco as deacon and founder", () => {
      const francisco = findSaintDaysByMonthDay("10-04")[0];
      assert.ok(francisco?.name.includes("FRANCISCO DE ASSIS"));
      assert.equal(francisco?.qualifiers.includes("diacono"), true);
      assert.equal(francisco?.qualifiers.includes("fundador"), true);
      assert.ok(francisco?.observances.some((o) => o.jurisdiction === "FF" && o.rank === "solenidade"));
    });
  });

  describe("premium history access", () => {
    const premiumWithHistory: SaintDay = buildFixture({ premium: true, shortHistory: "Primeiro bloco historico." });
    const freeWithHistory: SaintDay = buildFixture({ premium: false, shortHistory: "Texto livre." });
    const premiumWithoutHistory: SaintDay = buildFixture({ premium: true, shortHistory: null });

    it("blocks premium history without active subscription", () => {
      const result = resolveSaintHistoryAccess(premiumWithHistory, false);
      assert.equal(result.canRead, false);
      assert.equal(result.reason, "subscription_required");
    });

    it("allows premium history with active subscription", () => {
      const result = resolveSaintHistoryAccess(premiumWithHistory, true);
      assert.equal(result.canRead, true);
      assert.equal(result.reason, "available");
    });

    it("allows free history without subscription", () => {
      const result = resolveSaintHistoryAccess(freeWithHistory, false);
      assert.equal(result.canRead, true);
      assert.equal(result.reason, "available");
    });

    it("reports missing history regardless of subscription", () => {
      const result = resolveSaintHistoryAccess(premiumWithoutHistory, true);
      assert.equal(result.canRead, false);
      assert.equal(result.reason, "no_history");
    });
  });
});

function buildFixture(overrides: Partial<SaintDay>): SaintDay {
  return {
    id: "saint-fixture",
    monthDay: "01-01",
    name: "Fixture",
    qualifiers: [],
    order: null,
    observances: [],
    shortHistory: null,
    premium: true,
    celebrationSlug: null,
    ...overrides,
  };
}
