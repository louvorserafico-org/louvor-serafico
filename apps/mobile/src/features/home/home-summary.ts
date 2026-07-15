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
      helperText: "Ainda não há sugestões musicais para este dia.",
      href: "/calendario",
      premiumText: "",
      title: "Sem repertório preparado",
    };
  }

  if (input.day.kind !== "has_repertoire" || !input.celebration) {
    return {
      actionLabel: "Ver dias preparados",
      helperText: "Ainda não há sugestões musicais para este dia.",
      href: "/calendario",
      premiumText: "",
      title: "Sem repertório preparado",
    };
  }

  const premiumText =
    input.subscription.status === "active"
      ? "Materiais completos disponiveis."
      : "Materiais completos com assinatura ativa.";

  if (input.session.status === "authenticated") {
    return {
      actionLabel: "Ver repertório",
      helperText: `${input.celebration.recommendations.length} cantos sugeridos para a celebração de hoje.`,
      href: `/celebracoes/${input.celebration.slug}`,
      premiumText,
      title: input.celebration.title,
    };
  }

  return {
    actionLabel: "Entrar para ver materiais",
    helperText: `${input.celebration.recommendations.length} cantos sugeridos já podem ser consultados hoje.`,
    href: "/entrar",
    premiumText,
    title: input.celebration.title,
  };
}
