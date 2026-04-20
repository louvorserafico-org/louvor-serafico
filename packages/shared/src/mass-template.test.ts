import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getMassMomentByKey,
  standardMassMomentKeys,
  validateCelebrationRepertoire,
} from "./mass-template.ts";

describe("standard mass template", () => {
  it("keeps the required mass moments in liturgical order", () => {
    assert.deepEqual(standardMassMomentKeys, [
      "entrance_chant",
      "responsorial_psalm",
      "gospel_acclamation",
      "offertory",
      "communion_chant",
      "final_chant",
    ]);
  });

  it("marks a celebration as incomplete when a required moment has no song", () => {
    const validation = validateCelebrationRepertoire({
      entrance_chant: ["Fazei em nome do Senhor"],
      responsorial_psalm: ["Bendito seja o nome do Senhor"],
      gospel_acclamation: ["Aleluia, bendizei o seu nome"],
      communion_chant: ["Por teu nome, o Senhor"],
      final_chant: ["Vamos em nome do Senhor"],
    });

    assert.equal(validation.complete, false);
    assert.deepEqual(validation.missingMomentKeys, ["offertory"]);
  });

  it("returns undefined when a mass moment key is not part of the template", () => {
    assert.equal(getMassMomentByKey("opening_prayer"), undefined);
  });
});
