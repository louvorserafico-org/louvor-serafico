import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { postRemoteComment } from "./remote-comment-submit.ts";

describe("remote comment submit", () => {
  it("posts remote comment", async () => {
    let capturedBody = "";

    const result = await postRemoteComment(
      {
        body: " Comentario remoto ",
        profileId: "profile-1",
      },
      async (_input, init) => {
        capturedBody = String(init?.body);
        return new Response(null, { status: 201 });
      },
      "https://project.supabase.co",
      "anon",
      "token-1",
    );

    assert.equal(capturedBody.includes('"body":"Comentario remoto"'), true);
    assert.deepEqual(result, {
      message: "Comentario remoto publicado.",
      ok: true,
    });
  });

  it("blocks submit without session", async () => {
    const result = await postRemoteComment(
      {
        body: "Comentario remoto",
        profileId: "profile-1",
      },
      async () => new Response(null, { status: 201 }),
      "https://project.supabase.co",
      "anon",
      null,
    );

    assert.deepEqual(result, {
      message: "Sessao Supabase necessaria para publicar comentario remoto.",
      ok: false,
    });
  });

  it("returns remote error message", async () => {
    const result = await postRemoteComment(
      {
        body: "Comentario remoto",
        profileId: "profile-1",
      },
      async () =>
        new Response(
          JSON.stringify({
            message: "new row violates row-level security policy",
          }),
          { status: 401 },
        ),
      "https://project.supabase.co",
      "anon",
      "token-1",
    );

    assert.deepEqual(result, {
      message: "new row violates row-level security policy",
      ok: false,
    });
  });
});
