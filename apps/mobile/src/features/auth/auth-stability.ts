import type { SupabaseProfileState } from "./supabase-profile";
import type { SupabaseSessionState } from "./supabase-session";

export type AuthStabilityStatus = "anonymous" | "loading" | "partial" | "stable";

export type AuthStabilityInput = {
  profileStatus: SupabaseProfileState["status"];
  sessionStatus: SupabaseSessionState["status"];
};

export type AuthStability = {
  message: string;
  status: AuthStabilityStatus;
  title: string;
};

export function buildAuthStability(input: AuthStabilityInput): AuthStability {
  if (input.sessionStatus === "loading" || input.profileStatus === "loading") {
    return {
      message: "Sessao ou perfil ainda em leitura.",
      status: "loading",
      title: "Lendo autenticacao",
    };
  }

  if (input.sessionStatus !== "authenticated") {
    return {
      message: "Usuario sem sessao real no Supabase.",
      status: "anonymous",
      title: "Sem autenticacao",
    };
  }

  if (input.profileStatus !== "ready") {
    return {
      message: "Sessao ativa, mas perfil remoto precisa de revisao.",
      status: "partial",
      title: "Autenticacao parcial",
    };
  }

  return {
    message: "Login, sessao e perfil remotos estao ativos.",
    status: "stable",
    title: "Autenticacao estavel",
  };
}
