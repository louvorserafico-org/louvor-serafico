import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildRepertoireOverview } from "./repertoire-overview.ts";

describe("repertoire overview", () => {
  it("builds remote overview", () => {
    assert.deepEqual(
      buildRepertoireOverview({
        favoriteCount: 2,
        remoteCount: 8,
        sourceMode: "remote",
      }),
      {
        eyebrow: "8 cantos",
        helperText: "2 guardado(s). Acervo publicado pronto para estudo, escolha e preparacao.",
        title: "Catalogo de cantos",
      },
    );
  });

  it("builds local overview", () => {
    assert.deepEqual(
      buildRepertoireOverview({
        favoriteCount: 1,
        remoteCount: 6,
        sourceMode: "local",
      }),
      {
        eyebrow: "6 cantos",
        helperText: "1 guardado(s). Acervo inicial disponivel neste aparelho para consulta serena.",
        title: "Catalogo de cantos",
      },
    );
  });
});
