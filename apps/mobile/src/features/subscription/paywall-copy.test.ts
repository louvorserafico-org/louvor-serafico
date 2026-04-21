import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildPaywallCopy } from "./paywall-copy.ts";

describe("paywall copy", () => {
  it("shows subscribe copy for authenticated free users", () => {
    assert.deepEqual(
      buildPaywallCopy({
        hasActiveSubscription: false,
        isAuthenticated: true,
      }),
      {
        actionLabel: "Assinar premium",
        body: "Acesse partituras, cifras e materiais completos para preparar a missa com serenidade.",
        eyebrow: "Premium",
        title: "Liberar repertorio completo",
      },
    );
  });

  it("shows sign in copy for anonymous users", () => {
    assert.deepEqual(
      buildPaywallCopy({
        hasActiveSubscription: false,
        isAuthenticated: false,
      }).actionLabel,
      "Entrar para assinar",
    );
  });

  it("shows active copy for premium users", () => {
    assert.deepEqual(
      buildPaywallCopy({
        hasActiveSubscription: true,
        isAuthenticated: true,
      }).title,
      "Premium ativo",
    );
  });
});
