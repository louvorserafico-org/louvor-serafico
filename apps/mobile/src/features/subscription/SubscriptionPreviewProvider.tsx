import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";

import {
  buildSubscriptionPreviewState,
  hasActivePremiumSubscription,
  type SubscriptionPreviewState,
} from "./subscription-state";

type SubscriptionPreviewContextValue = {
  hasActiveSubscription: boolean;
  state: SubscriptionPreviewState;
  toggleSubscription: () => void;
};

const SubscriptionPreviewContext = createContext<SubscriptionPreviewContextValue | null>(null);

export function SubscriptionPreviewProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<SubscriptionPreviewState>(buildSubscriptionPreviewState(false));

  const value = useMemo<SubscriptionPreviewContextValue>(
    () => ({
      hasActiveSubscription: hasActivePremiumSubscription(state),
      state,
      toggleSubscription: () =>
        setState((currentState) => buildSubscriptionPreviewState(currentState.status !== "active")),
    }),
    [state],
  );

  return <SubscriptionPreviewContext.Provider value={value}>{children}</SubscriptionPreviewContext.Provider>;
}

export function useSubscriptionPreview() {
  const context = useContext(SubscriptionPreviewContext);

  if (!context) {
    throw new Error("useSubscriptionPreview must run inside SubscriptionPreviewProvider.");
  }

  return context;
}
