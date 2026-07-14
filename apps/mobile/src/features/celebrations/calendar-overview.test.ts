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
        eyebrow: "4 celebrações",
        helperText: "Consulte as celebrações já publicadas e percorra o ano litúrgico com mais clareza.",
        title: "Calendário de celebrações",
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
        eyebrow: "1 celebrações",
        helperText: "O calendário inicial segue disponível para consulta enquanto novos roteiros são publicados.",
        title: "Calendário de celebrações",
      },
    );
  });
});
