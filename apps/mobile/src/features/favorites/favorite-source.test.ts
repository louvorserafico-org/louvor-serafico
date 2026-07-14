import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveFavoriteSource } from "./favorite-source.ts";

describe("favorite source", () => {
  it("merges remote and local favorites", () => {
    const source = resolveFavoriteSource(
      {
        message: "Favoritos remotos carregados.",
        songIds: ["song-1", "song-2"],
        status: "ready",
      },
      ["song-2", "song-3"],
    );

    assert.deepEqual(source, {
      message: "Favoritos remotos ativos. Preview local segue visivel neste aparelho.",
      mode: "mixed",
      songIds: ["song-1", "song-2", "song-3"],
    });
  });

  it("falls back to local when remote is empty", () => {
    const source = resolveFavoriteSource(
      {
        message: "Favoritos remotos carregados.",
        songIds: [],
        status: "ready",
      },
      ["song-3"],
    );

    assert.deepEqual(source, {
      message: "Favoritos remotos vazios. Mantendo preview local.",
      mode: "local",
      songIds: ["song-3"],
    });
  });

  it("falls back to local when remote is blocked", () => {
    const source = resolveFavoriteSource(
      {
        message: "Tabela remota favorite_songs ainda não existe no projeto.",
        songIds: [],
        status: "error",
      },
      ["song-3"],
    );

    assert.deepEqual(source, {
      message: "Tabela remota favorite_songs ainda não existe no projeto.",
      mode: "local",
      songIds: ["song-3"],
    });
  });
});
