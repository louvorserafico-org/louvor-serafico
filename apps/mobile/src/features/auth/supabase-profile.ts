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
            city?: string;
            family?: string;
            full_name?: string;
            jurisdiction?: string;
            ministry?: string;
            parish?: string;
            phone?: string;
            state?: string;
          };
        } | null;
      };
      error: { message: string } | null;
    }>;
  };
};

export type SupabaseProfileState = {
  city: string | null;
  displayName: string | null;
  email: string | null;
  family: string | null;
  jurisdiction: string | null;
  ministry: string | null;
  parish: string | null;
  phone: string | null;
  provider: string | null;
  status: "anonymous" | "error" | "loading" | "ready";
  state: string | null;
  userId: string | null;
};

export function buildSupabaseProfileState(
  status: SupabaseProfileState["status"],
): SupabaseProfileState {
  return {
    city: null,
    displayName: null,
    email: null,
    family: null,
    jurisdiction: null,
    ministry: null,
    parish: null,
    phone: null,
    provider: null,
    status,
    state: null,
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
    city: data.user.user_metadata?.city ?? null,
    displayName: data.user.user_metadata?.full_name ?? data.user.email ?? null,
    email: data.user.email ?? null,
    family: data.user.user_metadata?.family ?? null,
    jurisdiction: data.user.user_metadata?.jurisdiction ?? null,
    ministry: data.user.user_metadata?.ministry ?? null,
    parish: data.user.user_metadata?.parish ?? null,
    phone: data.user.user_metadata?.phone ?? null,
    provider: data.user.app_metadata?.provider ?? null,
    status: "ready",
    state: data.user.user_metadata?.state ?? null,
    userId: data.user.id,
  };
}
