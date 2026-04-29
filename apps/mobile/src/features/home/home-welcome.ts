import type { SupabaseProfileState } from "@/features/auth/supabase-profile";
import type { SupabaseSessionState } from "@/features/auth/supabase-session";

type HomeWelcomeInput = {
  profile: SupabaseProfileState;
  session: SupabaseSessionState;
};

export type HomeWelcome = {
  initials: string;
};

function normalizeName(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function resolveDisplayName(profile: SupabaseProfileState, session: SupabaseSessionState) {
  if (session.status !== "authenticated") {
    return "Visitante";
  }

  if (profile.status === "ready" && profile.displayName) {
    return profile.displayName;
  }

  if (session.email) {
    return session.email.split("@")[0] ?? "musico";
  }

  return "musico";
}

function buildInitials(name: string) {
  const parts = normalizeName(name);

  if (parts.length === 0) {
    return "M";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }

  return `${parts[0].slice(0, 1)}${parts[parts.length - 1].slice(0, 1)}`.toUpperCase();
}

export function buildHomeWelcome(input: HomeWelcomeInput): HomeWelcome {
  const displayName = resolveDisplayName(input.profile, input.session);

  return {
    initials: buildInitials(displayName),
  };
}
