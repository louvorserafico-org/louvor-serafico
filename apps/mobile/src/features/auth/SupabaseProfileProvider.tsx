import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

import { supabase } from "@/services/supabase/client";
import { buildSupabaseProfileState, fetchSupabaseProfile, type SupabaseProfileState } from "./supabase-profile";
import { useSupabaseSession } from "./SupabaseSessionProvider";

type SupabaseProfileContextValue = {
  profile: SupabaseProfileState;
};

const SupabaseProfileContext = createContext<SupabaseProfileContextValue | null>(null);

export function SupabaseProfileProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState<SupabaseProfileState>(buildSupabaseProfileState("loading"));
  const { session } = useSupabaseSession();

  useEffect(() => {
    let active = true;

    if (session.status !== "authenticated") {
      setProfile(buildSupabaseProfileState(session.status === "loading" ? "loading" : "anonymous"));
      return () => {
        active = false;
      };
    }

    void fetchSupabaseProfile(supabase).then((nextProfile) => {
      if (active) {
        setProfile(nextProfile);
      }
    });

    return () => {
      active = false;
    };
  }, [session.status, session.userId]);

  return <SupabaseProfileContext.Provider value={{ profile }}>{children}</SupabaseProfileContext.Provider>;
}

export function useSupabaseProfile() {
  const context = useContext(SupabaseProfileContext);

  if (!context) {
    throw new Error("useSupabaseProfile must run inside SupabaseProfileProvider.");
  }

  return context;
}
