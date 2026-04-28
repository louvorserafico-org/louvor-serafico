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
        helperText: "Compartilhe o que ajudou o canto, a assembleia e o servico do ministerio.",
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
        helperText: "Sua partilha pode ser guardada neste aparelho para consulta e memoria do ministerio.",
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
        helperText: "Entre na sua conta para acompanhar partilhas e guardar experiencias do ministerio.",
        inputPlaceholder: "Entre para escrever sua partilha.",
        primaryLabel: "Entrar para participar",
        status: "blocked",
        title: "Partilha e escuta",
      },
    );
  });
});
