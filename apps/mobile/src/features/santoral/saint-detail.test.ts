import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { SaintDay } from "../../../../../packages/shared/src/santoral.ts";

import {
  buildSaintClassification,
  buildSaintHistoryState,
  buildSaintObservancesLabel,
} from "./saint-detail.ts";

function fixture(overrides: Partial<SaintDay>): SaintDay {
  return {
    id: "saint-fixture",
    monthDay: "01-16",
    name: "Fixture",
    qualifiers: [],
    order: null,
    observances: [],
    shortHistory: null,
    premium: true,
    celebrationSlug: null,
    ...overrides,
  };
}

describe("saint detail formatting", () => {
  it("builds classification from qualifiers and order", () => {
    const label = buildSaintClassification(fixture({ qualifiers: ["martir"], order: "first" }));
    assert.equal(label, "Mártir · Ordem I");
  });

  it("falls back when there is no qualifier or order", () => {
    assert.equal(buildSaintClassification(fixture({})), "Dia Franciscano");
  });

  it("builds observances label with portuguese ranks", () => {
    const label = buildSaintObservancesLabel(
      fixture({
        observances: [
          { jurisdiction: "OFM", rank: "festa" },
          { jurisdiction: "FF", rank: "memória" },
        ],
      }),
    );
    assert.equal(label, "OFM: Festa · FF: Memória");
  });

  describe("history state", () => {
    it("reports preparing when there is no history", () => {
      const state = buildSaintHistoryState(fixture({ shortHistory: null }), true);
      assert.equal(state.status, "preparing");
    });

    it("locks premium history without subscription", () => {
      const state = buildSaintHistoryState(fixture({ shortHistory: "Bloco.", premium: true }), false);
      assert.equal(state.status, "locked");
    });

    it("unlocks premium history with subscription", () => {
      const state = buildSaintHistoryState(fixture({ shortHistory: "Bloco.", premium: true }), true);
      assert.equal(state.status, "available");
      assert.equal(state.text, "Bloco.");
    });

    it("keeps free history open", () => {
      const state = buildSaintHistoryState(fixture({ shortHistory: "Livre.", premium: false }), false);
      assert.equal(state.status, "available");
      assert.equal(state.text, "Livre.");
    });
  });
});
