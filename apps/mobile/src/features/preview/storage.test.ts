import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createPreviewStorage } from "./storage.ts";

describe("preview storage", () => {
  it("loads persisted values from native storage", async () => {
    const storage = createPreviewStorage({
      async getItem(key) {
        assert.equal(key, "louvor-serafico.preview.favorite-song-ids");
        return JSON.stringify(["song-1"]);
      },
      async setItem() {},
    });

    assert.deepEqual(await storage.loadFavoriteSongIds(), ["song-1"]);
  });

  it("falls back to memory when native storage is unavailable", async () => {
    const storage = createPreviewStorage({
      async getItem() {
        throw new Error("Native module is null");
      },
      async setItem() {
        throw new Error("Native module is null");
      },
    });

    await storage.saveFavoriteSongIds(["song-1"]);

    assert.deepEqual(await storage.loadFavoriteSongIds(), ["song-1"]);
  });

  it("returns safe defaults when stored payload is invalid", async () => {
    const storage = createPreviewStorage({
      async getItem() {
        return "{";
      },
      async setItem() {},
    });

    assert.deepEqual(await storage.loadSession(), { status: "guest" });
  });
});
