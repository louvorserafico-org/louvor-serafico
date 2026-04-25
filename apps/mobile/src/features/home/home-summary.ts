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
  premiumText: string;
  title: string;
};

export function buildHomeSummary(input: HomeSummaryInput): HomeSummary {
  if (input.day.kind !== "has_repertoire" || !input.celebration) {
    return {
      actionLabel: "Abrir calendario",
      helperText:
        "Nem todos os dias do ano recebem roteiro musical publicado. Consulte o calendario para encontrar os dias ja preparados.",
      premiumText: "Os dias marcados indicam celebracoes com repertorio disponivel.",
      title: "Hoje sem roteiro publicado",
    };
  }

  const premiumText =
    input.subscription.status === "active"
      ? "Materiais premium liberados."
      : "Materiais premium exigem assinatura ativa.";

  if (input.session.status === "authenticated") {
    return {
      actionLabel: "Abrir roteiro de hoje",
      helperText: `${input.celebration.recommendations.length} cantos organizados para a missa.`,
      premiumText,
      title: "Roteiro pronto para hoje",
    };
  }

  return {
    actionLabel: "Entrar para liberar materiais",
    helperText: `${input.celebration.recommendations.length} cantos sugeridos visiveis.`,
    premiumText,
    title: "Celebre com ordem e clareza",
  };
}
