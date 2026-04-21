import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";

import { type LocalSession } from "./session-gate";

type SessionContextValue = {
  session: LocalSession;
  signInForPreview: () => void;
  signOutPreview: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<LocalSession>({ status: "guest" });

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
