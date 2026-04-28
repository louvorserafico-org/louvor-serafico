import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildCelebrationDetailOverview } from "./celebration-detail-overview.ts";

describe("celebration detail overview", () => {
  it("builds remote detail overview", () => {
    assert.deepEqual(
      buildCelebrationDetailOverview({
        missingMaterials: 1,
        momentCount: 6,
        sourceMode: "remote",
      }),
      {
        helperText: "6 momentos reunidos neste roteiro. 1 ainda sem material.",
        title: "Roteiro da celebracao",
      },
    );
  });

  it("builds local detail overview", () => {
    assert.deepEqual(
      buildCelebrationDetailOverview({
        missingMaterials: 2,
        momentCount: 6,
        sourceMode: "local",
      }),
      {
        helperText: "6 momentos reunidos neste roteiro. 2 ainda sem material.",
        title: "Roteiro da celebracao",
      },
    );
  });
});
