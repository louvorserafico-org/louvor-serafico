import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildEmailConfirmationCopy, resolvePostLoginDestination } from "./auth-navigation.ts";

describe("auth navigation", () => {
  it("returns back destination when navigation history exists", () => {
    assert.deepEqual(resolvePostLoginDestination(true), {
      kind: "back",
    });
  });

  it("falls back to home when there is no prior route", () => {
    assert.deepEqual(resolvePostLoginDestination(false), {
      href: "/",
      kind: "replace",
    });
  });

  it("builds email confirmation copy with normalized email", () => {
    assert.deepEqual(buildEmailConfirmationCopy("  Frei@Example.com "), {
      actionLabel: "Ir para entrar",
      message: "Enviamos a confirmacao para frei@example.com. Abra sua caixa de entrada antes de voltar ao app.",
      title: "Confirme seu email",
    });
  });
});
