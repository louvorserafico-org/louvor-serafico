import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildRevenueCatConfig } from "./revenuecat-config.ts";

describe("revenuecat config", () => {
  it("uses Apple key on iOS", () => {
    assert.deepEqual(
      buildRevenueCatConfig(
        {
          EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY: " apple-key ",
          EXPO_PUBLIC_REVENUECAT_GOOGLE_API_KEY: "google-key",
        },
        "ios",
      ),
      {
        apiKey: "apple-key",
        platform: "ios",
        ready: true,
      },
    );
  });

  it("uses Google key on Android", () => {
    assert.deepEqual(
      buildRevenueCatConfig(
        {
          EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY: "apple-key",
          EXPO_PUBLIC_REVENUECAT_GOOGLE_API_KEY: "google-key",
        },
        "android",
      ),
      {
        apiKey: "google-key",
        platform: "android",
        ready: true,
      },
    );
  });

  it("blocks Expo Go web-style runtime without native platform key", () => {
    assert.deepEqual(buildRevenueCatConfig({}, "web"), {
      apiKey: null,
      platform: "web",
      ready: false,
    });
  });
});
