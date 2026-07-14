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
      message: "Sessão ou perfil ainda em leitura.",
      status: "loading",
      title: "Lendo autenticação",
    };
  }

  if (input.sessionStatus !== "authenticated") {
    return {
      message: "Usuário sem sessão real no Supabase.",
      status: "anonymous",
      title: "Sem autenticação",
    };
  }

  if (input.profileStatus !== "ready") {
    return {
      message: "Sessão ativa, mas perfil remoto precisa de revisão.",
      status: "partial",
      title: "Autenticação parcial",
    };
  }

  return {
    message: "Login, sessão e perfil remotos estão ativos.",
    status: "stable",
    title: "Autenticação estável",
  };
}
