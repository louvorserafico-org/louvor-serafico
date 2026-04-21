export type SubscriptionPreviewState = {
  entitlement: "premium_content";
  status: "active" | "inactive";
};

export function buildSubscriptionPreviewState(active: boolean): SubscriptionPreviewState {
  return {
    entitlement: "premium_content",
    status: active ? "active" : "inactive",
  };
}

export function hasActivePremiumSubscription(state: SubscriptionPreviewState): boolean {
  return state.status === "active";
}
