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
      },
    })
  : null;

export { config as supabaseConfig };
