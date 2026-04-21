import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { fetchRemoteComments } from "./remote-comments.ts";

describe("remote comments", () => {
  it("maps remote rows into comment catalog", async () => {
    const result = await fetchRemoteComments(
      async () =>
        new Response(
          JSON.stringify([
            {
              body: "Texto remoto",
              id: "comment-1",
              profiles: {
                display_name: "Coral",
              },
            },
          ]),
          { status: 200 },
        ),
      "https://project.supabase.co",
      "anon",
    );

    assert.deepEqual(result, {
      comments: [
        {
          authorName: "Coral",
          body: "Texto remoto",
          id: "comment-1",
          scope: "community",
        },
      ],
      message: "Comentarios remotos carregados.",
      status: "ready",
    });
  });

  it("returns not configured when env is missing", async () => {
    const result = await fetchRemoteComments(async () => new Response("[]"), null, null);

    assert.deepEqual(result, {
      comments: [],
      message: "Configurar Supabase antes da leitura remota de comentarios.",
      status: "not_configured",
    });
  });

  it("returns error when table is missing", async () => {
    const result = await fetchRemoteComments(
      async () =>
        new Response(
          JSON.stringify({
            message: "Could not find the table 'public.comments' in the schema cache",
          }),
          { status: 404 },
        ),
      "https://project.supabase.co",
      "anon",
    );

    assert.deepEqual(result, {
      comments: [],
      message: "Tabela remota comments ainda nao existe no projeto.",
      status: "error",
    });
  });
});
