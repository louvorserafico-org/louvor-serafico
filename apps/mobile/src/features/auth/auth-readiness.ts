import type { SupabaseRemoteStatus } from "@/services/supabase/remote-status";

export type AuthReadiness = {
  ctaLabel: string;
  helperText: string;
  status: "blocked" | "limited" | "ready";
  title: string;
};

export function buildAuthReadiness(remoteStatus: SupabaseRemoteStatus): AuthReadiness {
  if (remoteStatus.status !== "ready") {
    return {
      ctaLabel: "Entrada indisponivel",
      helperText: "O caminho de entrada desta conta volta a aparecer assim que a conexao for retomada.",
      status: "blocked",
      title: "Entrada temporariamente indisponivel",
    };
  }

  if (remoteStatus.disableSignup || !remoteStatus.externalEmailEnabled) {
    return {
      ctaLabel: "Voltar mais tarde",
      helperText: "O acesso por email ja esta em preparacao e sera liberado assim que esta etapa terminar.",
      status: "limited",
      title: "Entrada em ajuste",
    };
  }

  return {
    ctaLabel: "Entrar ou criar conta",
    helperText: "Abra sua conta para guardar favoritos, acompanhar partilhas e reunir seus materiais.",
    status: "ready",
    title: "Sua entrada esta pronta",
  };
}
