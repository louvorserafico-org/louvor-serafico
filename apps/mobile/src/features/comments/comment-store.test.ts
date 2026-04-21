import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createLocalComment } from "./comment-store.ts";

describe("comment store", () => {
  it("creates comment with trimmed body", () => {
    const comment = createLocalComment({
      authorName: "Frei Luis",
      body: "  Cantamos com violao e assembleia respondeu muito bem.  ",
    });

    assert.equal(comment.authorName, "Frei Luis");
    assert.equal(comment.body, "Cantamos com violao e assembleia respondeu muito bem.");
    assert.equal(comment.scope, "community");
    assert.ok(comment.id.startsWith("comment-"));
  });

  it("throws when comment body is empty", () => {
    assert.throws(
      () =>
        createLocalComment({
          authorName: "Frei Luis",
          body: "   ",
        }),
      /Comment body is required/,
    );
  });

  it("throws when author name is empty", () => {
    assert.throws(
      () =>
        createLocalComment({
          authorName: "   ",
          body: "Texto valido",
        }),
      /Author name is required/,
    );
  });
});
