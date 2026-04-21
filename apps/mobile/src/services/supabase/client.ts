import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import { getSupabaseConfig, isSupabaseConfigured } from "@/services/supabase/config";

const config = getSupabaseConfig();

export const supabase = isSupabaseConfigured(config)
    ? createClient(config.url!, config.publishableKey ?? config.anonKey!, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: false,
        persistSession: true,
        storage: AsyncStorage,
      },
    })
  : null;

export { config as supabaseConfig };
