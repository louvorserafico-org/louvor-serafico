import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildSubscriptionOverview } from "./subscription-overview.ts";

describe("subscription overview", () => {
  it("builds active overview", () => {
    assert.deepEqual(
      buildSubscriptionOverview({
        hasActiveSubscription: true,
        isAuthenticated: true,
      }),
      {
        helperText: "Partituras, cifras e materiais completos seguem liberados nesta conta.",
        status: "active",
        title: "Assinatura ativa",
      },
    );
  });

  it("builds ready overview", () => {
    assert.deepEqual(
      buildSubscriptionOverview({
        hasActiveSubscription: false,
        isAuthenticated: true,
      }),
      {
        helperText: "Sua conta ja esta pronta. Falta apenas ativar o premium para liberar o acervo completo.",
        status: "ready",
        title: "Premium disponivel",
      },
    );
  });

  it("builds locked overview", () => {
    assert.deepEqual(
      buildSubscriptionOverview({
        hasActiveSubscription: false,
        isAuthenticated: false,
      }),
      {
        helperText: "Entre na sua conta antes de assinar e manter o acesso premium vinculado ao seu perfil.",
        status: "locked",
        title: "Entrada necessaria",
      },
    );
  });
});
