import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildCommunityAccess } from "./community-access.ts";

describe("community access", () => {
  it("builds remote community state", () => {
    assert.deepEqual(
      buildCommunityAccess({
        canComment: true,
        hasRemoteSession: true,
      }),
      {
        helperText: "Partilhe um repertório celebrado ou deixe apenas uma palavra para o ministério.",
        inputPlaceholder: "Conte como este canto ajudou a assembleia, o coro ou o ensaio.",
        primaryLabel: "Publicar partilha",
        status: "remote",
        title: "Partilha entre ministérios",
      },
    );
  });

  it("builds local preview state", () => {
    assert.deepEqual(
      buildCommunityAccess({
        canComment: true,
        hasRemoteSession: false,
      }),
      {
        helperText: "Partilhe um repertório celebrado ou guarde uma memória simples neste aparelho.",
        inputPlaceholder: "Conte como foi o ensaio, a escolha dos cantos ou a celebração.",
        primaryLabel: "Guardar partilha",
        status: "local",
        title: "Partilha do ministério",
      },
    );
  });

  it("builds blocked state", () => {
    assert.deepEqual(
      buildCommunityAccess({
        canComment: false,
        hasRemoteSession: false,
      }),
      {
        helperText: "Entre na sua conta para relacionar o repertório celebrado e partilhar a experiência do ministério.",
        inputPlaceholder: "Entre para escrever sua partilha.",
        primaryLabel: "Entrar para participar",
        status: "blocked",
        title: "Partilha do ministério",
      },
    );
  });
});
