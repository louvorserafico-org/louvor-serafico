import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getInitialSongCatalog } from "@louvor-serafico/shared";

import { filterSongsBySearch, normalizeSongSearchTerm } from "./song-search.ts";

describe("song search", () => {
  it("normalizes case and accents", () => {
    assert.equal(normalizeSongSearchTerm("  Santíssimo  "), "Santíssimo");
  });

  it("keeps full catalog when query has fewer than 3 characters", () => {
    const songs = getInitialSongCatalog();
    assert.equal(filterSongsBySearch(songs, "sa").length, songs.length);
  });

  it("filters titles ignoring case and accents", () => {
    const songs = getInitialSongCatalog();
    const results = filterSongsBySearch(songs, "nome");

    assert.ok(results.length >= 1);
    assert.ok(results.some((song) => song.slug === "fazei-em-nome-do-senhor"));
    assert.ok(results.every((song) => normalizeSongSearchTerm(song.title).includes("nome")));
  });
});
