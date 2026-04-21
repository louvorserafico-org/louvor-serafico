import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildCelebrationMomentRows,
  findCelebrationByDate,
  findCelebrationBySlug,
  findSongBySlug,
  getInitialSongCatalog,
  santissimoNomeDeJesusCelebration,
  validateCelebration,
} from "./celebration.ts";

describe("celebration domain", () => {
  it("builds celebration rows in standard mass order", () => {
    const rows = buildCelebrationMomentRows(santissimoNomeDeJesusCelebration);

    assert.deepEqual(
      rows.map((row) => row.song.title),
      [
        "Fazei em nome do Senhor",
        "Bendito seja o nome do Senhor",
        "Aleluia, bendizei o seu nome",
        "Invocando o nome do Senhor",
        "Por teu nome, o Senhor",
        "Vamos em nome do Senhor",
      ],
    );
  });

  it("marks celebration incomplete when required moment has no recommendation", () => {
    const validation = validateCelebration({
      ...santissimoNomeDeJesusCelebration,
      recommendations: santissimoNomeDeJesusCelebration.recommendations.filter(
        (recommendation) => recommendation.momentKey !== "offertory",
      ),
    });

    assert.equal(validation.complete, false);
    assert.deepEqual(validation.missingMomentKeys, ["offertory"]);
  });

  it("throws when recommendation references unknown song", () => {
    assert.throws(
      () =>
        buildCelebrationMomentRows({
          ...santissimoNomeDeJesusCelebration,
          recommendations: [
            ...santissimoNomeDeJesusCelebration.recommendations,
            {
              id: "broken",
              momentKey: "final_chant",
              priority: "optional",
              songId: "missing-song",
            },
          ],
        }),
      /Unknown song/,
    );
  });

  it("returns the initial song catalog sorted by title", () => {
    const catalog = getInitialSongCatalog();

    assert.deepEqual(
      catalog.map((song) => song.title),
      [
        "Aleluia, bendizei o seu nome",
        "Bendito seja o nome do Senhor",
        "Fazei em nome do Senhor",
        "Invocando o nome do Senhor",
        "Por teu nome, o Senhor",
        "Vamos em nome do Senhor",
      ],
    );
  });

  it("returns undefined when song slug does not exist", () => {
    assert.equal(findSongBySlug("canto-inexistente"), undefined);
  });

  it("finds the initial celebration by month-day", () => {
    assert.equal(findCelebrationByDate("01-03")?.slug, "santissimo-nome-de-jesus");
  });

  it("returns undefined when date has no celebration", () => {
    assert.equal(findCelebrationByDate("01-04"), undefined);
  });

  it("finds the initial celebration by slug", () => {
    assert.equal(findCelebrationBySlug("santissimo-nome-de-jesus")?.id, santissimoNomeDeJesusCelebration.id);
  });
});
