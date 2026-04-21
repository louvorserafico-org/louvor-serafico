import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildSubscriptionPreviewState, hasActivePremiumSubscription } from "./subscription-state.ts";

describe("subscription state", () => {
  it("builds active premium preview", () => {
    assert.deepEqual(buildSubscriptionPreviewState(true), {
      entitlement: "premium_content",
      status: "active",
    });
  });

  it("builds inactive premium preview", () => {
    assert.deepEqual(buildSubscriptionPreviewState(false), {
      entitlement: "premium_content",
      status: "inactive",
    });
  });

  it("detects active premium subscription", () => {
    assert.equal(hasActivePremiumSubscription(buildSubscriptionPreviewState(true)), true);
    assert.equal(hasActivePremiumSubscription(buildSubscriptionPreviewState(false)), false);
  });
});
