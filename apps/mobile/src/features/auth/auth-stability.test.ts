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
      message: "Login, sessao e perfil remotos estao ativos.",
      status: "stable",
      title: "Autenticacao estavel",
    });
  });

  it("marks auth partial when session exists but profile is not ready", () => {
    const result = buildAuthStability({
      profileStatus: "error",
      sessionStatus: "authenticated",
    });

    assert.deepEqual(result, {
      message: "Sessao ativa, mas perfil remoto precisa de revisao.",
      status: "partial",
      title: "Autenticacao parcial",
    });
  });

  it("marks auth anonymous when no real session exists", () => {
    const result = buildAuthStability({
      profileStatus: "anonymous",
      sessionStatus: "anonymous",
    });

    assert.deepEqual(result, {
      message: "Usuario sem sessao real no Supabase.",
      status: "anonymous",
      title: "Sem autenticacao",
    });
  });

  it("keeps loading while session or profile is loading", () => {
    const result = buildAuthStability({
      profileStatus: "loading",
      sessionStatus: "authenticated",
    });

    assert.deepEqual(result, {
      message: "Sessao ou perfil ainda em leitura.",
      status: "loading",
      title: "Lendo autenticacao",
    });
  });
});
