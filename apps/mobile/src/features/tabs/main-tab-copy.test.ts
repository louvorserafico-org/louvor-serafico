import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildCommunityTabSubtitle,
  buildProfileTabSubtitle,
  buildTodayTabSubtitle,
} from "./main-tab-copy.ts";

describe("main tab copy", () => {
  it("builds today subtitle", () => {
    assert.equal(
      buildTodayTabSubtitle(true),
      "Roteiro litúrgico-musical pronto para abrir, estudar e seguir na celebração de hoje.",
    );
    assert.equal(
      buildTodayTabSubtitle(false),
      "Roteiro litúrgico-musical de hoje, com entrada rapida para abrir conta e continuar.",
    );
  });

  it("builds community subtitle", () => {
    assert.equal(
      buildCommunityTabSubtitle(true),
      "Publique sua partilha com o ministério e leia as demais na lista de partilhas públicas.",
    );
    assert.equal(
      buildCommunityTabSubtitle(false),
      "Veja partilhas públicas do ministério e entre na conta para publicar a sua.",
    );
  });

  it("builds profile subtitle", () => {
    assert.equal(
      buildProfileTabSubtitle(true),
      "Resumo da conta, assinatura e acessos liberados neste momento.",
    );
    assert.equal(
      buildProfileTabSubtitle(false),
      "Entre na conta para reunir favoritos, partilhas e acesso premium no mesmo lugar.",
    );
  });
});
