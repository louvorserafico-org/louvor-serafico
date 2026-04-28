import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { SongAsset } from "@louvor-serafico/shared";

import { buildSongMaterialBadges, buildSongMaterialSections } from "./song-materials.ts";

const scoreAsset: SongAsset = {
  id: "score-1",
  path: "song.pdf",
  premium: true,
  title: "Partitura principal",
  type: "score_pdf",
};

describe("song materials", () => {
  it("builds compact badges for available material groups", () => {
    const badges = buildSongMaterialBadges([
      scoreAsset,
      {
        id: "audio-1",
        path: "song.mp3",
        premium: true,
        title: "Guia em audio",
        type: "audio",
      },
    ]);

    assert.deepEqual(badges, ["Partitura", "Audio"]);
  });

  it("returns preparation badge when no assets exist", () => {
    assert.deepEqual(buildSongMaterialBadges([]), ["Em preparacao"]);
  });

  it("builds four sections and groups lyrics with chord sheets", () => {
    const sections = buildSongMaterialSections([
      scoreAsset,
      {
        id: "lyrics-1",
        path: "song-lyrics.txt",
        premium: false,
        title: "Letra",
        type: "lyrics",
      },
      {
        id: "chord-1",
        path: "song-cifra.pdf",
        premium: true,
        title: "Cifra",
        type: "chord_sheet",
      },
    ]);

    assert.equal(sections.length, 4);
    assert.equal(sections[0].title, "Partitura");
    assert.equal(sections[0].assets.length, 1);
    assert.equal(sections[1].title, "Letra e cifra");
    assert.equal(sections[1].assets.length, 2);
    assert.equal(sections[2].title, "Audio");
    assert.equal(sections[2].assets.length, 0);
    assert.equal(sections[3].title, "Video");
    assert.equal(sections[3].assets.length, 0);
  });
});
