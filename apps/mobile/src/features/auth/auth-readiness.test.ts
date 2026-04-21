import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildAuthReadiness } from "./auth-readiness.ts";

describe("auth readiness", () => {
  it("marks email auth ready when remote settings allow signup", () => {
    const readiness = buildAuthReadiness({
      disableSignup: false,
      externalEmailEnabled: true,
      message: "Configuracao remota lida com sucesso.",
      projectRef: "engvbvdtdcveoebgrexl",
      status: "ready",
    });

    assert.deepEqual(readiness, {
      ctaLabel: "Abrir fluxo de entrada",
      helperText: "Cadastro por email liberado para primeira iteracao.",
      status: "ready",
      title: "Autenticacao pronta para UX inicial",
    });
  });

  it("marks auth limited when project is reachable but signup is blocked", () => {
    const readiness = buildAuthReadiness({
      disableSignup: true,
      externalEmailEnabled: true,
      message: "Configuracao remota lida com sucesso.",
      projectRef: "engvbvdtdcveoebgrexl",
      status: "ready",
    });

    assert.deepEqual(readiness, {
      ctaLabel: "Fluxo aguardando ajuste",
      helperText: "Supabase responde, mas cadastro esta bloqueado no projeto.",
      status: "limited",
      title: "Autenticacao parcialmente pronta",
    });
  });

  it("marks auth blocked when remote status fails", () => {
    const readiness = buildAuthReadiness({
      message: "Falha remota Supabase: erro desconhecido",
      status: "error",
    });

    assert.deepEqual(readiness, {
      ctaLabel: "Revisar integracao",
      helperText: "Falha remota Supabase: erro desconhecido",
      status: "blocked",
      title: "Autenticacao ainda nao pronta",
    });
  });
});
