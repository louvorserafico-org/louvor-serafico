type SessionSnapshot = {
  session: {
    user: {
      app_metadata?: {
        provider?: string;
      };
      email?: string | null;
      id: string;
    };
  } | null;
  status: "anonymous" | "authenticated" | "loading";
};

export type SupabaseSessionState = {
  email: string | null;
  provider: string | null;
  status: "anonymous" | "authenticated" | "loading";
  userId: string | null;
};

export function buildSupabaseSessionState(snapshot: SessionSnapshot): SupabaseSessionState {
  return {
    email: snapshot.session?.user.email ?? null,
    provider: snapshot.session?.user.app_metadata?.provider ?? null,
    status: snapshot.status,
    userId: snapshot.session?.user.id ?? null,
  };
}
