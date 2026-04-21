type SupabaseUserClient = {
  auth: {
    getUser: () => Promise<{
      data: {
        user: {
          app_metadata?: {
            provider?: string;
          };
          email?: string | null;
          id: string;
          user_metadata?: {
            full_name?: string;
          };
        } | null;
      };
      error: { message: string } | null;
    }>;
  };
};

export type SupabaseProfileState = {
  displayName: string | null;
  email: string | null;
  provider: string | null;
  status: "anonymous" | "error" | "loading" | "ready";
  userId: string | null;
};

export function buildSupabaseProfileState(
  status: SupabaseProfileState["status"],
): SupabaseProfileState {
  return {
    displayName: null,
    email: null,
    provider: null,
    status,
    userId: null,
  };
}

export async function fetchSupabaseProfile(
  client: SupabaseUserClient | null,
): Promise<SupabaseProfileState> {
  if (!client) {
    return buildSupabaseProfileState("anonymous");
  }

  const { data, error } = await client.auth.getUser();

  if (error) {
    return buildSupabaseProfileState("error");
  }

  if (!data.user) {
    return buildSupabaseProfileState("anonymous");
  }

  return {
    displayName: data.user.user_metadata?.full_name ?? data.user.email ?? null,
    email: data.user.email ?? null,
    provider: data.user.app_metadata?.provider ?? null,
    status: "ready",
    userId: data.user.id,
  };
}
