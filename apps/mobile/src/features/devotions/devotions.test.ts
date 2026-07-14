import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildDevotionRoute, findDevotionBySlug, getDevotionItems } from "./devotions.ts";

describe("devotions hub", () => {
  it("lists the two franciscan devotions", () => {
    const items = getDevotionItems();
    assert.equal(items.length, 2);
    assert.deepEqual(
      items.map((item) => item.slug),
      ["novena-sao-francisco", "transito-sao-francisco"],
    );
  });

  it("has novena and transito available", () => {
    const items = getDevotionItems();
    assert.equal(items.find((i) => i.slug === "novena-sao-francisco")?.status, "available");
    assert.equal(items.find((i) => i.slug === "transito-sao-francisco")?.status, "available");
  });

  it("finds a devotion by slug", () => {
    assert.equal(findDevotionBySlug("novena-sao-francisco")?.title, "Novena de São Francisco");
  });

  it("returns undefined for an unknown slug", () => {
    assert.equal(findDevotionBySlug("inexistente"), undefined);
  });

  it("builds the devotion route", () => {
    assert.equal(buildDevotionRoute("transito-sao-francisco"), "/devocoes/transito-sao-francisco");
  });
});
