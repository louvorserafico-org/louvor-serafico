import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isDebugModeEnabled } from "./debug-mode.ts";

describe("debug mode", () => {
  it("enables debug mode with true", () => {
    assert.equal(isDebugModeEnabled({ envValue: "true" }), true);
  });

  it("enables debug mode with 1", () => {
    assert.equal(isDebugModeEnabled({ envValue: "1" }), true);
  });

  it("keeps debug mode disabled by default", () => {
    assert.equal(isDebugModeEnabled({ envValue: undefined }), false);
  });

  it("keeps debug mode disabled for false", () => {
    assert.equal(isDebugModeEnabled({ envValue: "false" }), false);
  });
});
