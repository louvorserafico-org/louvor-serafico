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
        helperText: "Materiais premium liberados. Partituras, cifras e arquivos completos seguem ativos nesta conta.",
        status: "active",
        title: "Premium ativo",
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
        helperText: "Conta pronta para assinatura. Falta ativar premium para liberar materiais completos.",
        status: "ready",
        title: "Assinatura disponivel",
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
        helperText: "Entre na conta antes de assinar. Depois disso, o fluxo premium fica pronto para liberacao.",
        status: "locked",
        title: "Entrada necessaria",
      },
    );
  });
});
