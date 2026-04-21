type RevenueCatEnvironment = {
  EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY?: string;
  EXPO_PUBLIC_REVENUECAT_GOOGLE_API_KEY?: string;
};

export type RevenueCatPlatform = "android" | "ios" | "web";

export type RevenueCatConfig = {
  apiKey: string | null;
  platform: RevenueCatPlatform;
  ready: boolean;
};

export function buildRevenueCatConfig(
  env: RevenueCatEnvironment,
  platform: RevenueCatPlatform,
): RevenueCatConfig {
  const apiKey = platform === "ios"
    ? normalize(env.EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY)
    : platform === "android"
      ? normalize(env.EXPO_PUBLIC_REVENUECAT_GOOGLE_API_KEY)
      : null;

  return {
    apiKey,
    platform,
    ready: Boolean(apiKey),
  };
}

function normalize(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
