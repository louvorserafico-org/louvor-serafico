import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { findNovenaDay, novenaDays, novenaSteps } from "./novena-content.ts";

describe("novena content", () => {
  it("has 9 days numbered 1 to 9", () => {
    assert.equal(novenaDays.length, 9);
    assert.deepEqual(
      novenaDays.map((d) => d.day),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    );
  });

  it("has non-empty meditation and suggestion for every day", () => {
    for (const day of novenaDays) {
      assert.ok(day.meditation.trim().length > 0);
      assert.ok(day.suggestion.trim().length > 0);
    }
  });

  it("finds a day by number", () => {
    assert.ok(findNovenaDay(9)?.suggestion.includes("Mt 15"));
    assert.equal(findNovenaDay(10), undefined);
  });

  it("has 6 instruction steps", () => {
    assert.equal(novenaSteps.length, 6);
  });
});
