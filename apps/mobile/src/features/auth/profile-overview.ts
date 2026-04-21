import type { SupabaseProfileState } from "./supabase-profile";
import type { SupabaseSessionState } from "./supabase-session";

export type ProfileOverviewInput = {
  hasActiveSubscription: boolean;
  profile: SupabaseProfileState;
  session: SupabaseSessionState;
};

export type ProfileOverview = {
  accountLine: string;
  detailLine: string;
  premiumLine: string;
  status: "anonymous" | "loading" | "partial" | "ready";
  title: string;
};

export function buildProfileOverview(input: ProfileOverviewInput): ProfileOverview {
  const premiumLine = input.hasActiveSubscription ? "Premium ativo" : "Premium inativo";

  if (input.session.status === "loading" || input.profile.status === "loading") {
    return {
      accountLine: "Lendo sessao e perfil.",
      detailLine: "Aguarde a leitura remota.",
      premiumLine,
      status: "loading",
      title: "Carregando conta",
    };
  }

  if (input.session.status !== "authenticated") {
    return {
      accountLine: "Entre para liberar favoritos, comentarios e materiais premium.",
      detailLine: "Cadastro por email e senha.",
      premiumLine,
      status: "anonymous",
      title: "Conta nao conectada",
    };
  }

  if (input.profile.status !== "ready") {
    return {
      accountLine: input.session.email ?? "Sessao ativa.",
      detailLine: "Perfil remoto ainda nao carregado.",
      premiumLine,
      status: "partial",
      title: "Conta conectada",
    };
  }

  const displayName = input.profile.displayName ?? input.profile.email ?? "Musico";
  const cityState = [input.profile.city, input.profile.state].filter(Boolean).join(" - ");
  const ministry = input.profile.ministry ?? input.profile.parish ?? cityState;

  return {
    accountLine: input.profile.email ?? "Email nao informado.",
    detailLine: ministry || "Dados pastorais nao informados.",
    premiumLine,
    status: "ready",
    title: `Paz e bem, ${displayName}`,
  };
}
