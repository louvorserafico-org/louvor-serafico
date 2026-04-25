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
        helperText: "6 momentos lidos do calendario remoto. 1 sem material.",
        title: "Celebracao remota ativa",
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
        helperText: "6 momentos disponiveis no roteiro local. 2 sem material.",
        title: "Roteiro local ativo",
      },
    );
  });
});
