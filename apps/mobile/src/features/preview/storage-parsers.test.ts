import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseStoredComments, parseStoredFavoriteSongIds, parseStoredSession } from "./storage-parsers.ts";

describe("preview storage parsers", () => {
  it("restores signed in session from json", () => {
    const session = parseStoredSession(
      JSON.stringify({
        displayName: "Frei Luis",
        email: "frei@example.com",
        status: "signed_in",
      }),
    );

    assert.deepEqual(session, {
      displayName: "Frei Luis",
      email: "frei@example.com",
      status: "signed_in",
    });
  });

  it("falls back to guest when session payload is invalid", () => {
    const session = parseStoredSession("{");

    assert.deepEqual(session, { status: "guest" });
  });

  it("restores favorite ids array", () => {
    const favoriteSongIds = parseStoredFavoriteSongIds(JSON.stringify(["song-1", "song-2"]));

    assert.deepEqual(favoriteSongIds, ["song-1", "song-2"]);
  });

  it("filters invalid favorite payload", () => {
    const favoriteSongIds = parseStoredFavoriteSongIds(JSON.stringify(["song-1", 2, null]));

    assert.deepEqual(favoriteSongIds, ["song-1"]);
  });

  it("restores local comments array", () => {
    const comments = parseStoredComments(
      JSON.stringify([
        {
          authorName: "Coral",
          body: "Texto",
          id: "comment-1",
          scope: "community",
        },
      ]),
    );

    assert.deepEqual(comments, [
      {
        authorName: "Coral",
        body: "Texto",
        id: "comment-1",
        scope: "community",
      },
    ]);
  });

  it("drops invalid comments payload", () => {
    const comments = parseStoredComments(JSON.stringify([{ body: "Texto" }]));

    assert.deepEqual(comments, []);
  });
});
