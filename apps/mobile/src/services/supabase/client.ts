import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";

import { getSupabaseConfig, isSupabaseConfigured } from "@/services/supabase/config";

const config = getSupabaseConfig();

export const supabase = isSupabaseConfigured(config)
    ? createClient(config.url!, config.publishableKey ?? config.anonKey!, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: false,
        persistSession: true,
        storage: createMemoryStorage(),
      },
    })
  : null;

export { config as supabaseConfig };

type SupabaseStorageAdapter = {
  getItem: (key: string) => Promise<string | null> | string | null;
  removeItem: (key: string) => Promise<void> | void;
  setItem: (key: string, value: string) => Promise<void> | void;
};

function createMemoryStorage(): SupabaseStorageAdapter {
  const values = new Map<string, string>();

  return {
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => {
      values.delete(key);
    },
    setItem: (key, value) => {
      values.set(key, value);
    },
  };
}
