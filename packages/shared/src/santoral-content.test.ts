import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getSaintDayCatalog } from "./santoral.ts";
import {
  findCuratedShortHistory,
  getCuratedSaintContents,
  // @ts-ignore Node runs TypeScript sources directly in this dev setup.
} from "./santoral-content.ts";

describe("santoral curated content", () => {
  it("publishes the january pilot as curated", () => {
    const curated = getCuratedSaintContents();
    assert.equal(curated.length, 6);
    assert.ok(curated.every((content) => content.status === "curated"));
    assert.ok(curated.every((content) => content.shortHistory.trim().length > 0));
  });

  it("finds curated history by saint id", () => {
    const history = findCuratedShortHistory("saint-01-16-sao-berardo-e-seus-companheiros-protomartires");
    assert.ok(history?.includes("cinco irmãos"));
  });

  it("returns null for a saint without curated content", () => {
    assert.equal(findCuratedShortHistory("saint-99-99-inexistente"), null);
  });

  it("has no orphan content: every curated saintId exists in the index", () => {
    const catalogIds = new Set(getSaintDayCatalog().map((saint) => saint.id));

    for (const content of getCuratedSaintContents()) {
      assert.ok(catalogIds.has(content.saintId), `orphan content: ${content.saintId}`);
    }
  });
});
