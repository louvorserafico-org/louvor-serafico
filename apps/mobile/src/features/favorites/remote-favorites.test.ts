import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { fetchRemoteFavorites } from "./remote-favorites.ts";

describe("remote favorites", () => {
  it("maps remote rows into favorite ids", async () => {
    const result = await fetchRemoteFavorites(
      async () =>
        new Response(
          JSON.stringify([
            { song_id: "song-1" },
            { song_id: "song-2" },
          ]),
          { status: 200 },
        ),
      "https://project.supabase.co",
      "anon",
      "token-1",
    );

    assert.deepEqual(result, {
      message: "Favoritos remotos carregados.",
      songIds: ["song-1", "song-2"],
      status: "ready",
    });
  });

  it("returns not authenticated without access token", async () => {
    const result = await fetchRemoteFavorites(
      async () => new Response("[]"),
      "https://project.supabase.co",
      "anon",
      null,
    );

    assert.deepEqual(result, {
      message: "Sessão Supabase necessária para ler favoritos remotos.",
      songIds: [],
      status: "not_authenticated",
    });
  });

  it("returns error when table is missing", async () => {
    const result = await fetchRemoteFavorites(
      async () =>
        new Response(
          JSON.stringify({
            message: "Could not find the table 'public.favorite_songs' in the schema cache",
          }),
          { status: 404 },
        ),
      "https://project.supabase.co",
      "anon",
      "token-1",
    );

    assert.deepEqual(result, {
      message: "Tabela remota favorite_songs ainda não existe no projeto.",
      songIds: [],
      status: "error",
    });
  });
});
