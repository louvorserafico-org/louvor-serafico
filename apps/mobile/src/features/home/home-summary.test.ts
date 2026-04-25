import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { santissimoNomeDeJesusCelebration } from "../../../../../packages/shared/src/celebration.ts";
import { getLiturgicalDayForDate } from "../../../../../packages/shared/src/liturgical-calendar.ts";

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
      day: getLiturgicalDayForDate(new Date("2026-01-03T12:00:00.000Z")),
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
      day: getLiturgicalDayForDate(new Date("2026-01-03T12:00:00.000Z")),
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

  it("builds ordinary day copy when today has no repertoire", () => {
    const result = buildHomeSummary({
      celebration: undefined,
      day: getLiturgicalDayForDate(new Date("2026-04-25T12:00:00.000Z")),
      session: anonymousSession,
      subscription: inactiveSubscription,
    });

    assert.deepEqual(result, {
      actionLabel: "Abrir calendario",
      helperText: "Nem todos os dias do ano recebem roteiro musical publicado. Consulte o calendario para encontrar os dias ja preparados.",
      premiumText: "Os dias marcados indicam celebracoes com repertorio disponivel.",
      title: "Hoje sem roteiro publicado",
    });
  });
});
