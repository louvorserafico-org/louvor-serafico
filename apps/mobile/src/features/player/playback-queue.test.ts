import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Song } from "@louvor-serafico/shared";

import {
  buildPlayableQueue,
  getNextTrackIndex,
  getPreviousTrackIndex,
  toggleRepeatMode,
} from "./playback-queue.ts";

function buildSong(id: string, withAudio = true): Song {
  return {
    assets: withAudio
      ? [
          {
            id: `asset-${id}-audio`,
            path: `${id}.mp3`,
            premium: true,
            title: "Áudio",
            type: "audio",
          },
        ]
      : [],
    id: `song-${id}`,
    slug: id,
    title: `Canto ${id}`,
  };
}

describe("playback queue", () => {
  it("builds a playable queue only with songs that have an audio asset", () => {
    const songs = [buildSong("a"), buildSong("b", false), buildSong("c")];
    const queue = buildPlayableQueue(songs);

    assert.equal(queue.length, 2);
    assert.deepEqual(
      queue.map((track) => track.slug),
      ["a", "c"],
    );
    assert.equal(queue[0]?.assetId, "asset-a-audio");
    assert.equal(queue[0]?.storagePath, "a.mp3");
  });

  it("advances to the next track when repeat is off", () => {
    assert.equal(getNextTrackIndex(3, 0, "off"), 1);
    assert.equal(getNextTrackIndex(3, 1, "off"), 2);
  });

  it("stops at the end of the queue when repeat is off", () => {
    assert.equal(getNextTrackIndex(3, 2, "off"), null);
  });

  it("wraps to the first track when repeat is all", () => {
    assert.equal(getNextTrackIndex(3, 2, "all"), 0);
  });

  it("repeats the same track when repeat is one", () => {
    assert.equal(getNextTrackIndex(3, 1, "one"), 1);
  });

  it("goes to the previous track, clamping at the start when repeat is off", () => {
    assert.equal(getPreviousTrackIndex(3, 2, "off"), 1);
    assert.equal(getPreviousTrackIndex(3, 0, "off"), 0);
  });

  it("wraps to the last track when repeat is all and at the start", () => {
    assert.equal(getPreviousTrackIndex(3, 0, "all"), 2);
  });

  it("stays on the same track for previous when repeat is one", () => {
    assert.equal(getPreviousTrackIndex(3, 1, "one"), 1);
  });

  it("cycles the repeat mode off -> all -> one -> off", () => {
    assert.equal(toggleRepeatMode("off"), "all");
    assert.equal(toggleRepeatMode("all"), "one");
    assert.equal(toggleRepeatMode("one"), "off");
  });
});
