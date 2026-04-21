import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { type LocalSession } from "./session-gate";
import { loadPreviewSession, savePreviewSession } from "@/features/preview/storage";

type SessionContextValue = {
  session: LocalSession;
  signInForPreview: () => void;
  signOutPreview: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<LocalSession>({ status: "booting" });

  useEffect(() => {
    void loadPreviewSession().then(setSession);
  }, []);

  useEffect(() => {
    if (session.status === "booting") {
      return;
    }

    void savePreviewSession(session);
  }, [session]);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      signInForPreview: () =>
        setSession({
          displayName: "Frei Luis",
          email: "frei@example.com",
          status: "signed_in",
        }),
      signOutPreview: () => setSession({ status: "guest" }),
    }),
    [session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSessionPreview() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSessionPreview must run inside SessionProvider.");
  }

  return context;
}
