import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildDevotionRoute, findDevotionBySlug, getDevotionItems } from "./devotions.ts";

describe("devotions hub", () => {
  it("lists the three franciscan devotions", () => {
    const items = getDevotionItems();
    assert.equal(items.length, 3);
    assert.deepEqual(
      items.map((item) => item.slug),
      ["devocional", "novena-sao-francisco", "transito-sao-francisco"],
    );
  });

  it("keeps devotions as preparing until curated", () => {
    assert.ok(getDevotionItems().every((item) => item.status === "preparing"));
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
