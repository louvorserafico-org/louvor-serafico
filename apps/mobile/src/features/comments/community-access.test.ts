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
        helperText: "Sessao Supabase ativa. Sua partilha pode ser publicada para toda comunidade.",
        inputPlaceholder: "Compartilhe como este repertorio funcionou na missa.",
        primaryLabel: "Publicar comentario remoto",
        status: "remote",
        title: "Comunidade ativa",
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
        helperText: "Sessao local ativa. A partilha fica salva apenas neste aparelho para validar UX.",
        inputPlaceholder: "Compartilhe experiencia local de ensaio ou celebracao.",
        primaryLabel: "Publicar comentario",
        status: "local",
        title: "Preview local ativo",
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
        helperText: "Entre para comentar, responder e acompanhar partilhas da comunidade.",
        inputPlaceholder: "Entre para liberar comentarios.",
        primaryLabel: "Entrar para comentar",
        status: "blocked",
        title: "Comunidade bloqueada",
      },
    );
  });
});
