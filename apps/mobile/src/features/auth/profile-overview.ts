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
      accountLine: "Lendo sua conta.",
      detailLine: "Organizando seus dados para esta tela.",
      premiumLine,
      status: "loading",
      title: "Preparando sua conta",
    };
  }

  if (input.session.status !== "authenticated") {
    return {
      accountLine: "Entre para guardar favoritos, acompanhar partilhas e reunir seus materiais em um so lugar.",
      detailLine: "Use seu email e sua senha para manter seu ministerio em ordem e seguir de perto o acervo.",
      premiumLine,
      status: "anonymous",
      title: "Sua conta ainda nao entrou",
    };
  }

  if (input.profile.status !== "ready") {
    return {
      accountLine: input.session.email ?? "Sessao ativa.",
      detailLine: "Seu perfil ainda esta sendo organizado.",
      premiumLine,
      status: "partial",
      title: "Conta conectada",
    };
  }

  const displayName = input.profile.displayName ?? input.profile.email ?? "Musico";
  const cityState = [input.profile.city, input.profile.state].filter(Boolean).join(" - ");
  const ministry = input.profile.ministry ?? input.profile.jurisdiction ?? cityState;

  return {
    accountLine: input.profile.email ?? "Email nao informado.",
    detailLine: ministry || "Dados pastorais nao informados.",
    premiumLine,
    status: "ready",
    title: displayName,
  };
}
