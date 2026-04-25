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
      "Roteiro liturgico-musical pronto para abrir, estudar e seguir na celebracao de hoje.",
    );
    assert.equal(
      buildTodayTabSubtitle(false),
      "Roteiro liturgico-musical de hoje, com entrada rapida para abrir conta e continuar.",
    );
  });

  it("builds community subtitle", () => {
    assert.equal(
      buildCommunityTabSubtitle(true),
      "Espaco para partilhas, comentarios e experiencias musicais da comunidade.",
    );
    assert.equal(
      buildCommunityTabSubtitle(false),
      "Leia partilhas da comunidade e entre na conta para comentar depois.",
    );
  });

  it("builds profile subtitle", () => {
    assert.equal(
      buildProfileTabSubtitle(true),
      "Resumo da conta, assinatura e acessos liberados neste momento.",
    );
    assert.equal(
      buildProfileTabSubtitle(false),
      "Entre na conta para liberar favoritos, comentarios e assinatura premium.",
    );
  });
});
