import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildSongDetailOverview } from "./song-detail-overview.ts";

describe("song detail overview", () => {
  it("builds remote overview", () => {
    assert.deepEqual(
      buildSongDetailOverview({
        assetCount: 3,
        favoriteEnabled: true,
        sourceMode: "remote",
      }),
      {
        helperText: "3 materiais lidos do catalogo remoto. Favoritos ativos.",
        title: "Musica remota ativa",
      },
    );
  });

  it("builds local overview", () => {
    assert.deepEqual(
      buildSongDetailOverview({
        assetCount: 1,
        favoriteEnabled: false,
        sourceMode: "local",
      }),
      {
        helperText: "1 materiais disponiveis no catalogo local. Favoritos bloqueados.",
        title: "Catalogo local ativo",
      },
    );
  });
});
