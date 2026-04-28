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
      actionLabel: "Ver roteiro",
      helperText: "6 cantos sugeridos para a celebracao de hoje.",
      premiumText: "Materiais completos disponiveis.",
      title: "Missa do Santissimo Nome de Jesus",
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
      actionLabel: "Entrar para ver materiais",
      helperText: "6 cantos sugeridos ja podem ser consultados hoje.",
      premiumText: "Materiais completos com assinatura ativa.",
      title: "Missa do Santissimo Nome de Jesus",
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
      actionLabel: "Ver dias preparados",
      helperText: "Ainda nao ha sugestoes musicais para este dia.",
      premiumText: "Veja no calendario os dias ja preparados.",
      title: "Sem roteiro preparado",
    });
  });

  it("builds liturgical day copy when the day exists without repertoire", () => {
    const result = buildHomeSummary({
      celebration: undefined,
      day: getLiturgicalDayForDate(new Date("2026-12-25T12:00:00.000Z")),
      session: anonymousSession,
      subscription: inactiveSubscription,
    });

    assert.deepEqual(result, {
      actionLabel: "Ver dias preparados",
      helperText: "Ainda nao ha sugestoes musicais para este dia.",
      premiumText: "Natal do Senhor",
      title: "Sem roteiro preparado",
    });
  });
});
