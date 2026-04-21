import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { fetchRemoteSongDetail } from "./remote-song-detail.ts";

describe("remote song detail", () => {
  it("maps remote song detail", async () => {
    const result = await fetchRemoteSongDetail(
      "fazei-em-nome-do-senhor",
      async () =>
        new Response(
          JSON.stringify([
            {
              id: "song-1",
              slug: "fazei-em-nome-do-senhor",
              song_assets: [
                {
                  asset_type: "score_pdf",
                  id: "asset-1",
                  premium: true,
                  storage_path: "fazei.pdf",
                  title: "Partitura",
                },
              ],
              title: "Fazei em nome do Senhor",
            },
          ]),
          { status: 200 },
        ),
      "https://project.supabase.co",
      "anon",
    );

    assert.deepEqual(result, {
      message: "Musica remota carregada.",
      song: {
        assets: [
          {
            id: "asset-1",
            path: "fazei.pdf",
            premium: true,
            title: "Partitura",
            type: "score_pdf",
          },
        ],
        id: "song-1",
        slug: "fazei-em-nome-do-senhor",
        title: "Fazei em nome do Senhor",
      },
      status: "ready",
    });
  });

  it("returns not found when remote detail is empty", async () => {
    const result = await fetchRemoteSongDetail(
      "fazei-em-nome-do-senhor",
      async () => new Response(JSON.stringify([]), { status: 200 }),
      "https://project.supabase.co",
      "anon",
    );

    assert.deepEqual(result, {
      message: "Musica remota ainda nao encontrada.",
      song: null,
      status: "not_found",
    });
  });

  it("returns config error when env is missing", async () => {
    const result = await fetchRemoteSongDetail(
      "fazei-em-nome-do-senhor",
      async () => new Response(JSON.stringify([]), { status: 200 }),
      null,
      null,
    );

    assert.deepEqual(result, {
      message: "Configurar Supabase antes da leitura remota da musica.",
      song: null,
      status: "not_configured",
    });
  });
});
