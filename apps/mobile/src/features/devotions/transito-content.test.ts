import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { transitoSections } from "./transito-content.ts";

describe("transito content", () => {
  it("has I Vesperas before the dramatized Transitus, in order", () => {
    const ids = transitoSections.map((s) => s.id);
    assert.deepEqual(ids, [
      "vesperas-abertura",
      "vesperas-hino",
      "vesperas-salmodia",
      "vesperas-leitura",
      "vesperas-magnificat",
      "vesperas-preces",
      "vesperas-oracao-final",
      "transitus-apresentacao",
      "transitus-hino",
      "transitus-saudacao",
      "transitus-salmo-111",
      "transitus-primeira-leitura",
      "transitus-salmo-147",
      "transitus-ultimos-momentos",
      "transitus-testamento",
      "transitus-jacoba",
      "transitus-salmo-141",
      "transitus-morte-carta",
      "transitus-preces",
      "transitus-oracao-final",
    ]);
  });

  it("groups every section into vesperas or transitus, vesperas first", () => {
    const parts = transitoSections.map((s) => s.part);
    const firstTransitusIndex = parts.indexOf("transitus");

    assert.ok(parts.every((part) => part === "vesperas" || part === "transitus"));
    assert.ok(parts.slice(0, firstTransitusIndex).every((part) => part === "vesperas"));
    assert.ok(parts.slice(firstTransitusIndex).every((part) => part === "transitus"));
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

  it("keeps key dramatized dialogue verbatim", () => {
    const jacoba = transitoSections.find((s) => s.id === "transitus-jacoba");
    assert.ok(jacoba?.lines.some((l) => l.speaker === "Jacoba" && l.text.includes("doces")));

    const testamento = transitoSections.find((s) => s.id === "transitus-testamento");
    assert.ok(testamento?.lines.some((l) => l.text.includes("dona Pobreza")));
  });
});
