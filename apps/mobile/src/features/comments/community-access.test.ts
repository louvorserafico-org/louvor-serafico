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
        helperText: "Compartilhe como o repertorio serviu a celebracao e ajude outros ministerios.",
        inputPlaceholder: "Conte como este canto ajudou a assembleia, o coro ou o ensaio.",
        primaryLabel: "Publicar partilha",
        status: "remote",
        title: "Partilhe com a comunidade",
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
        helperText: "Sua partilha fica guardada neste aparelho ate que a comunidade completa esteja disponivel.",
        inputPlaceholder: "Conte como foi o ensaio, a escolha dos cantos ou a celebracao.",
        primaryLabel: "Guardar partilha",
        status: "local",
        title: "Espaco de partilha",
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
        helperText: "Entre na sua conta para acompanhar partilhas, guardar experiencias e contribuir com outros musicos.",
        inputPlaceholder: "Entre para escrever sua partilha.",
        primaryLabel: "Entrar para participar",
        status: "blocked",
        title: "Partilhe sua experiencia",
      },
    );
  });
});
