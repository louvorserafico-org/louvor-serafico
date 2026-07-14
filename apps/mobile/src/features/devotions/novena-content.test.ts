import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  findNovenaDay,
  novenaClosingVersicle,
  novenaCollectPrayer,
  novenaDays,
  novenaFinalPrayer,
  novenaLadainhaClosing,
  novenaLadainhaInvocations,
  novenaReconciliationText,
  novenaSongs,
} from "./novena-content.ts";

describe("novena content", () => {
  it("has the 9 official days, in order, each reconciled with a distinct theme", () => {
    assert.deepEqual(
      novenaDays.map((d) => d.day),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    );
    assert.deepEqual(
      novenaDays.map((d) => d.theme),
      [
        "São Francisco reconciliado com Deus",
        "São Francisco reconciliado consigo mesmo",
        "São Francisco reconciliado com o leproso",
        "São Francisco reconciliado com a cruz",
        "São Francisco reconciliado com a pobreza",
        "São Francisco reconciliado com a obediência",
        "São Francisco reconciliado com a castidade",
        "São Francisco reconciliado com as criaturas",
        "São Francisco reconciliado com a morte",
      ],
    );
  });

  it("keeps the source reference and non-empty verbatim reading for every day", () => {
    for (const day of novenaDays) {
      assert.ok(day.reference.trim().length > 0);
      assert.ok(day.reading.trim().length > 0);
    }
    assert.equal(findNovenaDay(1)?.reference, "2Cel 2,6");
    assert.equal(findNovenaDay(5)?.reference, "CAs 51,5-11");
    assert.equal(findNovenaDay(9)?.reference, "1Cel 29");
  });

  it("finds a day by number and returns undefined outside 1-9", () => {
    assert.equal(findNovenaDay(3)?.theme, "São Francisco reconciliado com o leproso");
    assert.equal(findNovenaDay(0), undefined);
    assert.equal(findNovenaDay(10), undefined);
  });

  it("keeps the shared rite texts verbatim", () => {
    assert.ok(novenaReconciliationText.includes("Foi um homem perfeitamente reconciliado"));
    assert.ok(novenaCollectPrayer.includes("assemelhar-se ao Cristo por uma vida de"));
    assert.ok(novenaFinalPrayer.includes("Eterno Deus Onipotente"));
    assert.equal(novenaClosingVersicle.celebrant, "Rogai por nós, Seráfico Pai São Francisco de Assis");
    assert.equal(novenaClosingVersicle.people, "Para que sejamos dignos das promessas de Cristo");
  });

  it("has the full Ladainha de São Francisco, in order, ending in the Cordeiro de Deus", () => {
    assert.equal(novenaLadainhaInvocations[0], "Senhor, tende piedade de nós.");
    assert.equal(novenaLadainhaInvocations.at(-1), "São Francisco, serafim do mais ardente amor,");
    assert.ok(novenaLadainhaInvocations.includes("São Francisco, patrono da ecologia,"));
    assert.ok(novenaLadainhaInvocations.includes("São Francisco, saúde dos leprosos,"));

    assert.equal(novenaLadainhaClosing.lambOfGod.length, 3);
    assert.ok(novenaLadainhaClosing.prayer.includes("perfeita alegria"));
  });

  it("has the 3 official hymns by Frei Luís Ventura, OFM Conv.", () => {
    assert.deepEqual(
      novenaSongs.map((s) => s.title),
      ["Francisco de Assis", "Altíssimo, glorioso Deus", "Francisco Serafim do amor"],
    );
    for (const song of novenaSongs) {
      assert.ok(song.lyrics.length > 0);
      for (const line of song.lyrics) {
        assert.ok(line.trim().length > 0);
      }
    }
  });
});
