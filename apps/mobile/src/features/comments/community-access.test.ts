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
        helperText: "Partilhe um repertorio celebrado ou deixe apenas uma palavra para o ministerio.",
        inputPlaceholder: "Conte como este canto ajudou a assembleia, o coro ou o ensaio.",
        primaryLabel: "Publicar partilha",
        status: "remote",
        title: "Partilha entre ministerios",
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
        helperText: "Partilhe um repertorio celebrado ou guarde uma memoria simples neste aparelho.",
        inputPlaceholder: "Conte como foi o ensaio, a escolha dos cantos ou a celebracao.",
        primaryLabel: "Guardar partilha",
        status: "local",
        title: "Partilha do ministerio",
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
        helperText: "Entre na sua conta para relacionar o repertorio celebrado e partilhar a experiencia do ministerio.",
        inputPlaceholder: "Entre para escrever sua partilha.",
        primaryLabel: "Entrar para participar",
        status: "blocked",
        title: "Partilha do ministerio",
      },
    );
  });
});
