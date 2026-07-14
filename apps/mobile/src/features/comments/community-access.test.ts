import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildCommunityAccess } from "./community-access.ts";

describe("community access", () => {
  it("builds authenticated state", () => {
    assert.deepEqual(buildCommunityAccess({ isAuthenticated: true }), {
      helperText: "Partilhe um repertório celebrado ou deixe apenas uma palavra para o ministério.",
      inputPlaceholder: "Conte como este canto ajudou a assembleia, o coro ou o ensaio.",
      primaryLabel: "Publicar partilha",
      status: "authenticated",
      title: "Partilha entre ministérios",
    });
  });

  it("builds guest state", () => {
    assert.deepEqual(buildCommunityAccess({ isAuthenticated: false }), {
      helperText: "Entre na sua conta para relacionar o repertório celebrado e partilhar a experiência do ministério.",
      inputPlaceholder: "Entre para escrever sua partilha.",
      primaryLabel: "Entrar para participar",
      status: "guest",
      title: "Partilha do ministério",
    });
  });
});
