import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  BasílicaDeSãoFranciscoCelebration,
  buildCelebrationMomentRows,
  findCelebrationByDate,
  findCelebrationBySlug,
  findSongBySlug,
  getInitialSongCatalog,
  SantíssimoNomeDeJesusCelebration,
  validateCelebration,
} from "./celebration.ts";

describe("celebration domain", () => {
  it("builds celebration rows in standard mass order", () => {
    const rows = buildCelebrationMomentRows(SantíssimoNomeDeJesusCelebration);

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
      ...SantíssimoNomeDeJesusCelebration,
      recommendations: SantíssimoNomeDeJesusCelebration.recommendations.filter(
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
          ...SantíssimoNomeDeJesusCelebration,
          recommendations: [
            ...SantíssimoNomeDeJesusCelebration.recommendations,
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
        "Á nova Jerusalém",
        "Aleluia, bendizei o seu nome",
        "Aleluia, Santo Antônio Pregador",
        "Bendito seja o nome do Senhor",
        "És Francisco coluna da Igreja",
        "Fazei em nome do Senhor",
        "Invocando o nome do Senhor",
        "Por teu nome, o Senhor",
        "Qual andorinha",
        "Somos templos vivos",
        "Vamos em nome do Senhor",
      ],
    );
  });

  it("returns undefined when song slug does not exist", () => {
    assert.equal(findSongBySlug("canto-inexistente"), undefined);
  });

  it("finds the initial celebration by month-day", () => {
    assert.equal(findCelebrationByDate("01-03")?.slug, "Santíssimo-nome-de-jesus");
  });

  it("returns undefined when date has no celebration", () => {
    assert.equal(findCelebrationByDate("01-04"), undefined);
  });

  it("finds the initial celebration by slug", () => {
    assert.equal(findCelebrationBySlug("Santíssimo-nome-de-jesus")?.id, SantíssimoNomeDeJesusCelebration.id);
  });

  it("finds the Basílica de São Francisco celebration by month-day", () => {
    assert.equal(findCelebrationByDate("05-24")?.slug, "basilica-de-sao-francisco");
  });

  it("marks the Basílica de São Francisco celebration incomplete without a responsorial psalm", () => {
    assert.equal(validateCelebration(BasílicaDeSãoFranciscoCelebration).complete, false);
    assert.deepEqual(validateCelebration(BasílicaDeSãoFranciscoCelebration).missingMomentKeys, [
      "responsorial_psalm",
    ]);
  });
});
