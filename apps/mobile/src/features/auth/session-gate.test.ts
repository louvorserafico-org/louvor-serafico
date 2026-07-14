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
      actionLabel: "Sair sessão teste",
      helperText: "Sessão local ativa para favoritos, comentários e fluxos protegidos.",
      status: "open",
      title: "Sessão teste ativa",
    });
  });

  it("keeps gate closed when session is guest", () => {
    const gate = buildSessionGate({
      status: "guest",
    });

    assert.deepEqual(gate, {
      actionLabel: "Entrar modo teste",
      helperText: "Ative sessão local para liberar UX de favoritos e comentários.",
      status: "closed",
      title: "Sessão teste inativa",
    });
  });

  it("keeps gate closed when session is booting", () => {
    const gate = buildSessionGate({
      status: "booting",
    });

    assert.deepEqual(gate, {
      actionLabel: "Aguardando sessão",
      helperText: "Estado local ainda inicializando.",
      status: "loading",
      title: "Preparando sessão teste",
    });
  });
});
