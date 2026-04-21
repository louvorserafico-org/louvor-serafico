type SupabaseEnvironment = {
  EXPO_PUBLIC_SUPABASE_ANON_KEY?: string;
  EXPO_PUBLIC_SUPABASE_ASSET_BUCKET?: string;
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  EXPO_PUBLIC_SUPABASE_URL?: string;
};

export type SupabaseConfig = {
  anonKey: string | null;
  assetBucket: string;
  projectHost: string | null;
  projectRef: string | null;
  publishableKey: string | null;
  url: string | null;
};

export function buildSupabaseConfig(env: SupabaseEnvironment): SupabaseConfig {
  const url = normalize(env.EXPO_PUBLIC_SUPABASE_URL);
  const publishableKey = normalize(env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const anonKey = normalize(env.EXPO_PUBLIC_SUPABASE_ANON_KEY);
  const assetBucket = normalize(env.EXPO_PUBLIC_SUPABASE_ASSET_BUCKET) ?? "song-assets";
  const projectHost = parseProjectHost(url);

  return {
    anonKey,
    assetBucket,
    projectHost,
    projectRef: parseProjectRef(projectHost),
    publishableKey,
    url,
  };
}

export function isSupabaseConfigured(config: SupabaseConfig): boolean {
  return Boolean(config.url && (config.publishableKey || config.anonKey));
}

export function getSupabaseConfig(): SupabaseConfig {
  return buildSupabaseConfig(process.env);
}

function normalize(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function parseProjectHost(url: string | null): string | null {
  if (!url) {
    return null;
  }

  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

function parseProjectRef(projectHost: string | null): string | null {
  if (!projectHost) {
    return null;
  }

  return projectHost.split(".")[0] ?? null;
}
