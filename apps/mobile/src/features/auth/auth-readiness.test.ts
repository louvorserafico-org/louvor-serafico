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
      ctaLabel: "Entrar ou criar conta",
      helperText: "Abra sua conta para guardar favoritos, acompanhar partilhas e reunir seus materiais.",
      status: "ready",
      title: "Sua entrada esta pronta",
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
      ctaLabel: "Voltar mais tarde",
      helperText: "O acesso por email ja esta em preparacao e sera liberado assim que esta etapa terminar.",
      status: "limited",
      title: "Entrada em ajuste",
    });
  });

  it("marks auth blocked when remote status fails", () => {
    const readiness = buildAuthReadiness({
      message: "Falha remota Supabase: erro desconhecido",
      status: "error",
    });

    assert.deepEqual(readiness, {
      ctaLabel: "Entrada indisponivel",
      helperText: "O caminho de entrada desta conta volta a aparecer assim que a conexao for retomada.",
      status: "blocked",
      title: "Entrada temporariamente indisponivel",
    });
  });
});
