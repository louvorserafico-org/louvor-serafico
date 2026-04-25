import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildCalendarOverview } from "./calendar-overview.ts";

describe("calendar overview", () => {
  it("builds remote overview", () => {
    assert.deepEqual(
      buildCalendarOverview({
        localCount: 1,
        remoteCount: 4,
        sourceMode: "remote",
      }),
      {
        eyebrow: "4 celebracoes",
        helperText: "Calendario remoto ativo para consulta liturgica.",
        title: "Celebracoes publicadas",
      },
    );
  });

  it("builds local overview", () => {
    assert.deepEqual(
      buildCalendarOverview({
        localCount: 1,
        remoteCount: 0,
        sourceMode: "local",
      }),
      {
        eyebrow: "1 celebracoes",
        helperText: "Catalogo local ativo enquanto calendario remoto evolui.",
        title: "Calendario inicial",
      },
    );
  });
});
