import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { fetchRemoteCelebrationDetail } from "./remote-celebration-detail.ts";

describe("remote celebration detail", () => {
  it("maps remote celebration detail", async () => {
    const result = await fetchRemoteCelebrationDetail(
      "santissimo-nome-de-jesus",
      async () =>
        new Response(
          JSON.stringify([
            {
              celebration_recommendations: [
                {
                  id: "rec-1",
                  mass_moments: {
                    key: "entrance_chant",
                  },
                  priority: "required",
                  songs: {
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
                },
              ],
              date_label: "03 de janeiro",
              date_month_day: "01-03",
              id: "celebration-1",
              slug: "santissimo-nome-de-jesus",
              title: "Missa do Santíssimo Nome de Jesus",
            },
          ]),
          { status: 200 },
        ),
      "https://project.supabase.co",
      "anon",
    );

    assert.deepEqual(result, {
      celebration: {
        dateLabel: "03 de janeiro",
        dateMonthDay: "01-03",
        id: "celebration-1",
        recommendations: [
          {
            id: "rec-1",
            momentKey: "entrance_chant",
            priority: "required",
            songId: "song-1",
          },
        ],
        slug: "santissimo-nome-de-jesus",
        songs: [
          {
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
        ],
        title: "Missa do Santíssimo Nome de Jesus",
      },
      message: "Celebração remota carregada.",
      status: "ready",
    });
  });

  it("returns not found when remote detail is empty", async () => {
    const result = await fetchRemoteCelebrationDetail(
      "santissimo-nome-de-jesus",
      async () => new Response(JSON.stringify([]), { status: 200 }),
      "https://project.supabase.co",
      "anon",
    );

    assert.deepEqual(result, {
      celebration: null,
      message: "Celebração remota ainda não encontrada.",
      status: "not_found",
    });
  });

  it("returns config error when env is missing", async () => {
    const result = await fetchRemoteCelebrationDetail(
      "santissimo-nome-de-jesus",
      async () => new Response(JSON.stringify([]), { status: 200 }),
      null,
      null,
    );

    assert.deepEqual(result, {
      celebration: null,
      message: "Configurar Supabase antes da leitura remota da celebração.",
      status: "not_configured",
    });
  });
});
