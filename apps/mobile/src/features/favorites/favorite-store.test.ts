import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { toggleFavoriteSong } from "./favorite-store.ts";

describe("favorite store", () => {
  it("adds song when favorite list is empty", () => {
    const result = toggleFavoriteSong([], "song-fazei-em-nome-do-senhor");

    assert.deepEqual(result, ["song-fazei-em-nome-do-senhor"]);
  });

  it("removes song when already favorited", () => {
    const result = toggleFavoriteSong(
      ["song-fazei-em-nome-do-senhor", "song-vamos-em-nome-do-senhor"],
      "song-fazei-em-nome-do-senhor",
    );

    assert.deepEqual(result, ["song-vamos-em-nome-do-senhor"]);
  });

  it("keeps unique ids when toggling another song", () => {
    const result = toggleFavoriteSong(["song-vamos-em-nome-do-senhor"], "song-fazei-em-nome-do-senhor");

    assert.deepEqual(result, ["song-vamos-em-nome-do-senhor", "song-fazei-em-nome-do-senhor"]);
  });
});
