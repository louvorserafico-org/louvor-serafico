import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { fetchRemoteSongs } from "./remote-songs.ts";

describe("remote songs", () => {
  it("maps remote rows into song catalog", async () => {
    const result = await fetchRemoteSongs(
      async () =>
        new Response(
          JSON.stringify([
            {
              id: "song-1",
              slug: "fazei-em-nome-do-senhor",
              title: "Fazei em nome do Senhor",
            },
          ]),
          { status: 200 },
        ),
      "https://project.supabase.co",
      "anon",
    );

    assert.deepEqual(result, {
      message: "Catálogo remoto de músicas carregado.",
      songs: [
        {
          assets: [],
          id: "song-1",
          slug: "fazei-em-nome-do-senhor",
          title: "Fazei em nome do Senhor",
        },
      ],
      status: "ready",
    });
  });

  it("returns not configured when env is missing", async () => {
    const result = await fetchRemoteSongs(async () => new Response("[]"), null, null);

    assert.deepEqual(result, {
      message: "Configurar Supabase antes da leitura remota de músicas.",
      songs: [],
      status: "not_configured",
    });
  });

  it("returns error when table is missing", async () => {
    const result = await fetchRemoteSongs(
      async () =>
        new Response(
          JSON.stringify({
            message: "Could not find the table 'public.songs' in the schema cache",
          }),
          { status: 404 },
        ),
      "https://project.supabase.co",
      "anon",
    );

    assert.deepEqual(result, {
      message: "Tabela remota songs ainda não existe no projeto.",
      songs: [],
      status: "error",
    });
  });
});
