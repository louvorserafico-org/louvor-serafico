import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { santissimoNomeDeJesusCelebration } from "../../../../../packages/shared/src/celebration.ts";

import type { SupabaseSessionState } from "@/features/auth/supabase-session";
import type { SubscriptionPreviewState } from "@/features/subscription/subscription-state";
import { buildHomeSummary } from "./home-summary.ts";

const anonymousSession: SupabaseSessionState = {
  accessToken: null,
  email: null,
  provider: null,
  status: "anonymous",
  userId: null,
};

const authenticatedSession: SupabaseSessionState = {
  accessToken: "token",
  email: "louvor@example.com",
  provider: "email",
  status: "authenticated",
  userId: "user-id",
};

const inactiveSubscription: SubscriptionPreviewState = {
  entitlement: "premium_content",
  status: "inactive",
};

const activeSubscription: SubscriptionPreviewState = {
  entitlement: "premium_content",
  status: "active",
};

describe("home summary", () => {
  it("builds authenticated home copy", () => {
    const result = buildHomeSummary({
      celebration: santissimoNomeDeJesusCelebration,
      session: authenticatedSession,
      subscription: activeSubscription,
    });

    assert.deepEqual(result, {
      actionLabel: "Abrir roteiro de hoje",
      helperText: "6 cantos organizados para a missa.",
      premiumText: "Materiais premium liberados.",
      title: "Roteiro pronto para hoje",
    });
  });

  it("builds anonymous home copy", () => {
    const result = buildHomeSummary({
      celebration: santissimoNomeDeJesusCelebration,
      session: anonymousSession,
      subscription: inactiveSubscription,
    });

    assert.deepEqual(result, {
      actionLabel: "Entrar para liberar materiais",
      helperText: "6 cantos sugeridos visiveis.",
      premiumText: "Materiais premium exigem assinatura ativa.",
      title: "Celebre com ordem e clareza",
    });
  });
});
