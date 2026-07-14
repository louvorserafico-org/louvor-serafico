import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { toggleRemoteFavorite } from "./remote-favorite-toggle.ts";

describe("remote favorite toggle", () => {
  it("posts favorite when song is not favorited", async () => {
    let method = "";
    let body = "";

    const result = await toggleRemoteFavorite(
      {
        accessToken: "token-1",
        isFavorite: false,
        profileId: "profile-1",
        publicKey: "anon",
        songId: "song-1",
        url: "https://project.supabase.co",
      },
      async (_input, init) => {
        method = String(init?.method);
        body = String(init?.body);
        return new Response(null, { status: 201 });
      },
    );

    assert.equal(method, "POST");
    assert.equal(body.includes('"song_id":"song-1"'), true);
    assert.deepEqual(result, {
      message: "Favorito remoto salvo.",
      ok: true,
    });
  });

  it("deletes favorite when song is already favorited", async () => {
    let method = "";
    let url = "";

    const result = await toggleRemoteFavorite(
      {
        accessToken: "token-1",
        isFavorite: true,
        profileId: "profile-1",
        publicKey: "anon",
        songId: "song-1",
        url: "https://project.supabase.co",
      },
      async (input, init) => {
        url = String(input);
        method = String(init?.method);
        return new Response(null, { status: 204 });
      },
    );

    assert.equal(method, "DELETE");
    assert.equal(url.includes("song_id=eq.song-1"), true);
    assert.deepEqual(result, {
      message: "Favorito remoto removido.",
      ok: true,
    });
  });

  it("blocks toggle without session", async () => {
    const result = await toggleRemoteFavorite(
      {
        accessToken: null,
        isFavorite: false,
        profileId: "profile-1",
        publicKey: "anon",
        songId: "song-1",
        url: "https://project.supabase.co",
      },
      async () => new Response(null, { status: 201 }),
    );

    assert.deepEqual(result, {
      message: "Sessão Supabase necessária para sincronizar favoritos remotos.",
      ok: false,
    });
  });
});
