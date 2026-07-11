import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getSaintDayCatalog } from "./santoral.ts";
import {
  findCuratedShortHistory,
  getCuratedSaintContents,
  getDraftSaintContents,
  // @ts-ignore Node runs TypeScript sources directly in this dev setup.
} from "./santoral-content.ts";

describe("santoral curated content", () => {
  it("publishes the reviewed santoral content as curated", () => {
    const curated = getCuratedSaintContents();
    assert.equal(curated.length, 112);
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

  it("has unique saintIds", () => {
    const ids = getCuratedSaintContents().map((content) => content.saintId);
    assert.equal(ids.length, new Set(ids).size);
  });

  it("keeps an empty draft queue once everything is curated", () => {
    assert.deepEqual(getDraftSaintContents(), []);
  });
});
