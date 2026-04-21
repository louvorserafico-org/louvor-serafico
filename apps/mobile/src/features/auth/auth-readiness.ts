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
      ctaLabel: "Revisar integracao",
      helperText: remoteStatus.message,
      status: "blocked",
      title: "Autenticacao ainda nao pronta",
    };
  }

  if (remoteStatus.disableSignup || !remoteStatus.externalEmailEnabled) {
    return {
      ctaLabel: "Fluxo aguardando ajuste",
      helperText: "Supabase responde, mas cadastro esta bloqueado no projeto.",
      status: "limited",
      title: "Autenticacao parcialmente pronta",
    };
  }

  return {
    ctaLabel: "Abrir fluxo de entrada",
    helperText: "Cadastro por email liberado para primeira iteracao.",
    status: "ready",
    title: "Autenticacao pronta para UX inicial",
  };
}
