import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildSupabaseConfig, isSupabaseConfigured } from "./config.ts";

describe("supabase config", () => {
  it("extracts project host and ref from public url", () => {
    const config = buildSupabaseConfig({
      EXPO_PUBLIC_SUPABASE_URL: "https://engvbvdtdcveoebgrexl.supabase.co",
      EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "pk_test",
    });

    assert.equal(config.projectHost, "engvbvdtdcveoebgrexl.supabase.co");
    assert.equal(config.projectRef, "engvbvdtdcveoebgrexl");
    assert.equal(config.assetBucket, "song-assets");
    assert.equal(isSupabaseConfigured(config), true);
  });

  it("supports anon key when publishable key is absent", () => {
    const config = buildSupabaseConfig({
      EXPO_PUBLIC_SUPABASE_ANON_KEY: "anon_test",
      EXPO_PUBLIC_SUPABASE_URL: "https://engvbvdtdcveoebgrexl.supabase.co",
    });

    assert.equal(config.anonKey, "anon_test");
    assert.equal(isSupabaseConfigured(config), true);
  });

  it("allows custom public asset bucket", () => {
    const config = buildSupabaseConfig({
      EXPO_PUBLIC_SUPABASE_ASSET_BUCKET: "premium-assets",
    });

    assert.equal(config.assetBucket, "premium-assets");
  });

  it("returns not configured when url is missing", () => {
    const config = buildSupabaseConfig({
      EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "pk_test",
    });

    assert.equal(config.url, null);
    assert.equal(isSupabaseConfigured(config), false);
  });
});
