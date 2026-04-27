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
        helperText: "Consulte as celebracoes ja publicadas e percorra o ano liturgico com mais clareza.",
        title: "Calendario de celebracoes",
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
        helperText: "O calendario inicial segue disponivel para consulta enquanto novos roteiros sao publicados.",
        title: "Calendario de celebracoes",
      },
    );
  });
});
