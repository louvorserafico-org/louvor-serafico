import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { transitoSections } from "./transito-content.ts";

describe("transito content", () => {
  it("has all liturgical sections in order", () => {
    assert.deepEqual(
      transitoSections.map((s) => s.id),
      [
        "abertura",
        "procissao",
        "dentro-da-igreja",
        "ritos-iniciais",
        "liturgia-da-palavra",
        "oracao-dos-fieis",
        "liturgia-eucaristica",
        "ritos-finais",
      ],
    );
  });

  it("has unique section ids and non-empty lines", () => {
    const ids = transitoSections.map((s) => s.id);
    assert.equal(ids.length, new Set(ids).size);

    for (const section of transitoSections) {
      assert.ok(section.lines.length > 0);
      for (const line of section.lines) {
        assert.ok(line.text.trim().length > 0);
      }
    }
  });
});
