import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { fetchRemoteCelebrations } from "./remote-celebrations.ts";

describe("remote celebrations", () => {
  it("maps remote rows into celebration catalog", async () => {
    const result = await fetchRemoteCelebrations(
      async () =>
        new Response(
          JSON.stringify([
            {
              date_month_day: "01-03",
              date_label: "03 de janeiro",
              id: "celebration-1",
              slug: "Santíssimo-nome-de-jesus",
              title: "Missa do Santíssimo Nome de Jesus",
            },
          ]),
          { status: 200 },
        ),
      "https://project.supabase.co",
      "anon",
    );

    assert.deepEqual(result, {
      celebrations: [
        {
          dateLabel: "03 de janeiro",
          dateMonthDay: "01-03",
          id: "celebration-1",
          recommendations: [],
          slug: "Santíssimo-nome-de-jesus",
          songs: [],
          title: "Missa do Santíssimo Nome de Jesus",
        },
      ],
      message: "Calendário remoto carregado.",
      status: "ready",
    });
  });

  it("returns not configured when env is missing", async () => {
    const result = await fetchRemoteCelebrations(async () => new Response("[]"), null, null);

    assert.deepEqual(result, {
      celebrations: [],
      message: "Configurar Supabase antes da leitura remota de celebrações.",
      status: "not_configured",
    });
  });

  it("returns error when table is missing", async () => {
    const result = await fetchRemoteCelebrations(
      async () =>
        new Response(
          JSON.stringify({
            message: "Could not find the table 'public.celebrations' in the schema cache",
          }),
          { status: 404 },
        ),
      "https://project.supabase.co",
      "anon",
    );

    assert.deepEqual(result, {
      celebrations: [],
      message: "Tabela remota celebrations ainda não existe no projeto.",
      status: "error",
    });
  });
});
