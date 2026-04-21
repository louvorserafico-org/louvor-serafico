import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Song } from "@louvor-serafico/shared";

import { resolveSongCatalogSource } from "./song-catalog-source.ts";

const localSongs: Song[] = [
  {
    assets: [],
    id: "local-song",
    slug: "local-song",
    title: "Local Song",
  },
];

describe("song catalog source", () => {
  it("prefers remote songs when available", () => {
    const source = resolveSongCatalogSource(
      {
        message: "Catalogo remoto de musicas carregado.",
        songs: [
          {
            assets: [],
            id: "remote-song",
            slug: "remote-song",
            title: "Remote Song",
          },
        ],
        status: "ready",
      },
      localSongs,
    );

    assert.deepEqual(source, {
      message: "Fonte remota ativa.",
      mode: "remote",
      songs: [
        {
          assets: [],
          id: "remote-song",
          slug: "remote-song",
          title: "Remote Song",
        },
      ],
    });
  });

  it("falls back to local when remote is empty", () => {
    const source = resolveSongCatalogSource(
      {
        message: "Catalogo remoto de musicas carregado.",
        songs: [],
        status: "ready",
      },
      localSongs,
    );

    assert.deepEqual(source, {
      message: "Catalogo remoto vazio. Mantendo fonte local.",
      mode: "local",
      songs: localSongs,
    });
  });

  it("falls back to local when remote fails", () => {
    const source = resolveSongCatalogSource(
      {
        message: "Tabela remota songs ainda nao existe no projeto.",
        songs: [],
        status: "error",
      },
      localSongs,
    );

    assert.deepEqual(source, {
      message: "Tabela remota songs ainda nao existe no projeto.",
      mode: "local",
      songs: localSongs,
    });
  });
});
