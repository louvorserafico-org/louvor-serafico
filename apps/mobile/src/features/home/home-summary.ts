import type { Celebration, LiturgicalDay } from "@louvor-serafico/shared";

import type { SupabaseSessionState } from "@/features/auth/supabase-session";
import type { SubscriptionPreviewState } from "@/features/subscription/subscription-state";

export type HomeSummaryInput = {
  celebration?: Celebration;
  day: LiturgicalDay;
  session: SupabaseSessionState;
  subscription: SubscriptionPreviewState;
};

export type HomeSummary = {
  actionLabel: string;
  helperText: string;
  href: string;
  premiumText: string;
  title: string;
};

export function buildHomeSummary(input: HomeSummaryInput): HomeSummary {
  if (input.day.kind === "liturgical_day_without_repertoire") {
    return {
      actionLabel: "Ver dias preparados",
      helperText: "Ainda nao ha sugestoes musicais para este dia.",
      href: "/calendario",
      premiumText: "",
      title: "Sem roteiro preparado",
    };
  }

  if (input.day.kind !== "has_repertoire" || !input.celebration) {
    return {
      actionLabel: "Ver dias preparados",
      helperText: "Ainda nao ha sugestoes musicais para este dia.",
      href: "/calendario",
      premiumText: "",
      title: "Sem roteiro preparado",
    };
  }

  const premiumText =
    input.subscription.status === "active"
      ? "Materiais completos disponiveis."
      : "Materiais completos com assinatura ativa.";

  if (input.session.status === "authenticated") {
    return {
      actionLabel: "Ver roteiro",
      helperText: `${input.celebration.recommendations.length} cantos sugeridos para a celebracao de hoje.`,
      href: `/celebracoes/${input.celebration.slug}`,
      premiumText,
      title: input.celebration.title,
    };
  }

  return {
    actionLabel: "Entrar para ver materiais",
    helperText: `${input.celebration.recommendations.length} cantos sugeridos ja podem ser consultados hoje.`,
    href: "/entrar",
    premiumText,
    title: input.celebration.title,
  };
}
