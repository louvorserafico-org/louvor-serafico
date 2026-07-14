import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatCommentDate } from "./comment-date.ts";

describe("comment date", () => {
  it("formats an ISO timestamp as a pt-BR date", () => {
    assert.equal(formatCommentDate("2026-01-03T12:00:00.000Z"), "03 de janeiro de 2026");
  });

  it("returns null for a missing or invalid value", () => {
    assert.equal(formatCommentDate(undefined), null);
    assert.equal(formatCommentDate(""), null);
    assert.equal(formatCommentDate("not-a-date"), null);
  });
});
