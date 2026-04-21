import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

import { supabase } from "@/services/supabase/client";
import { buildSupabaseSessionState, type SupabaseSessionState } from "./supabase-session";

type SupabaseSessionContextValue = {
  session: SupabaseSessionState;
};

const initialState: SupabaseSessionState = {
  email: null,
  provider: null,
  status: "loading",
  userId: null,
};

const SupabaseSessionContext = createContext<SupabaseSessionContextValue | null>(null);

export function SupabaseSessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<SupabaseSessionState>(initialState);

  useEffect(() => {
    if (!supabase) {
      setSession({
        email: null,
        provider: null,
        status: "anonymous",
        userId: null,
      });
      return;
    }

    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setSession(
          buildSupabaseSessionState({
            session: data.session,
            status: data.session ? "authenticated" : "anonymous",
          }),
        );
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(
          buildSupabaseSessionState({
            session: nextSession,
            status: nextSession ? "authenticated" : "anonymous",
          }),
        );
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return <SupabaseSessionContext.Provider value={{ session }}>{children}</SupabaseSessionContext.Provider>;
}

export function useSupabaseSession() {
  const context = useContext(SupabaseSessionContext);

  if (!context) {
    throw new Error("useSupabaseSession must run inside SupabaseSessionProvider.");
  }

  return context;
}
