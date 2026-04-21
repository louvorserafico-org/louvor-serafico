import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildSessionGate } from "./session-gate.ts";

describe("session gate", () => {
  it("allows premium ux when fake session is active", () => {
    const gate = buildSessionGate({
      displayName: "Frei Luis",
      email: "frei@example.com",
      status: "signed_in",
    });

    assert.deepEqual(gate, {
      actionLabel: "Sair sessao teste",
      helperText: "Sessao local ativa para favoritos, comentarios e fluxos protegidos.",
      status: "open",
      title: "Sessao teste ativa",
    });
  });

  it("keeps gate closed when session is guest", () => {
    const gate = buildSessionGate({
      status: "guest",
    });

    assert.deepEqual(gate, {
      actionLabel: "Entrar modo teste",
      helperText: "Ative sessao local para liberar UX de favoritos e comentarios.",
      status: "closed",
      title: "Sessao teste inativa",
    });
  });

  it("keeps gate closed when session is booting", () => {
    const gate = buildSessionGate({
      status: "booting",
    });

    assert.deepEqual(gate, {
      actionLabel: "Aguardando sessao",
      helperText: "Estado local ainda inicializando.",
      status: "loading",
      title: "Preparando sessao teste",
    });
  });
});
