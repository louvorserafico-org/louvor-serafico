import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildAuthStability } from "./auth-stability.ts";

describe("auth stability", () => {
  it("marks auth stable when session and profile are ready", () => {
    const result = buildAuthStability({
      profileStatus: "ready",
      sessionStatus: "authenticated",
    });

    assert.deepEqual(result, {
      message: "Login, sessão e perfil remotos estão ativos.",
      status: "stable",
      title: "Autenticação estável",
    });
  });

  it("marks auth partial when session exists but profile is not ready", () => {
    const result = buildAuthStability({
      profileStatus: "error",
      sessionStatus: "authenticated",
    });

    assert.deepEqual(result, {
      message: "Sessão ativa, mas perfil remoto precisa de revisão.",
      status: "partial",
      title: "Autenticação parcial",
    });
  });

  it("marks auth anonymous when no real session exists", () => {
    const result = buildAuthStability({
      profileStatus: "anonymous",
      sessionStatus: "anonymous",
    });

    assert.deepEqual(result, {
      message: "Usuário sem sessão real no Supabase.",
      status: "anonymous",
      title: "Sem autenticação",
    });
  });

  it("keeps loading while session or profile is loading", () => {
    const result = buildAuthStability({
      profileStatus: "loading",
      sessionStatus: "authenticated",
    });

    assert.deepEqual(result, {
      message: "Sessão ou perfil ainda em leitura.",
      status: "loading",
      title: "Lendo autenticação",
    });
  });
});
