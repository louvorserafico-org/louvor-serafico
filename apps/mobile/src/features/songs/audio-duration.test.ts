import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatAudioDuration } from "./audio-duration.ts";

describe("audio duration", () => {
  it("formats seconds as mm:ss", () => {
    assert.equal(formatAudioDuration(0), "0:00");
    assert.equal(formatAudioDuration(5), "0:05");
    assert.equal(formatAudioDuration(65), "1:05");
    assert.equal(formatAudioDuration(600), "10:00");
  });

  it("returns 0:00 for invalid values", () => {
    assert.equal(formatAudioDuration(Number.NaN), "0:00");
    assert.equal(formatAudioDuration(-5), "0:00");
    assert.equal(formatAudioDuration(undefined), "0:00");
  });
});
