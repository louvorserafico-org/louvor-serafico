import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { LocalComment } from "./comment-store";

import { resolveCommentFeedSource } from "./comment-feed-source.ts";

const localComments: LocalComment[] = [
  {
    authorName: "Local User",
    body: "Comentário local",
    id: "comment-local",
    scope: "community",
  },
];

describe("comment feed source", () => {
  it("merges remote and local comments when remote has data", () => {
    const source = resolveCommentFeedSource(
      {
        comments: [
          {
            authorName: "Remote User",
            body: "Comentário remoto",
            celebrationTitle: "Missa do Santíssimo Nome de Jesus",
            id: "comment-remote",
            scope: "community",
          },
        ],
        message: "Comentários remotos carregados.",
        status: "ready",
      },
      localComments,
    );

    assert.deepEqual(source, {
      comments: [
        {
          authorName: "Remote User",
          body: "Comentário remoto",
          celebrationTitle: "Missa do Santíssimo Nome de Jesus",
          id: "comment-remote",
          scope: "community",
        },
        {
          authorName: "Local User",
          body: "Comentário local",
          id: "comment-local",
          scope: "community",
        },
      ],
      message: "Comentários remotos ativos. Preview local segue visivel neste aparelho.",
      mode: "mixed",
    });
  });

  it("falls back to local when remote is empty", () => {
    const source = resolveCommentFeedSource(
      {
        comments: [],
        message: "Comentários remotos carregados.",
        status: "ready",
      },
      localComments,
    );

    assert.deepEqual(source, {
      comments: localComments,
      message: "Comentários remotos vazios. Mantendo preview local.",
      mode: "local",
    });
  });

  it("falls back to local when remote fails", () => {
    const source = resolveCommentFeedSource(
      {
        comments: [],
        message: "Tabela remota comments ainda não existe no projeto.",
        status: "error",
      },
      localComments,
    );

    assert.deepEqual(source, {
      comments: localComments,
      message: "Tabela remota comments ainda não existe no projeto.",
      mode: "local",
    });
  });
});
