import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildSupabaseProfileState, fetchSupabaseProfile } from "./supabase-profile.ts";

describe("supabase profile", () => {
  it("maps remote user into ready profile", async () => {
    const profile = await fetchSupabaseProfile({
      auth: {
        getUser: async () => ({
          data: {
            user: {
              app_metadata: { provider: "email" },
              email: "frei@example.com",
              id: "user-1",
              user_metadata: { full_name: "Frei Luis" },
            },
          },
          error: null,
        }),
      },
    });

    assert.deepEqual(profile, {
      displayName: "Frei Luis",
      email: "frei@example.com",
      provider: "email",
      status: "ready",
      userId: "user-1",
    });
  });

  it("returns anonymous profile when user is missing", async () => {
    const profile = await fetchSupabaseProfile({
      auth: {
        getUser: async () => ({
          data: { user: null },
          error: null,
        }),
      },
    });

    assert.deepEqual(profile, {
      displayName: null,
      email: null,
      provider: null,
      status: "anonymous",
      userId: null,
    });
  });

  it("returns error profile when Supabase fails", async () => {
    const profile = await fetchSupabaseProfile({
      auth: {
        getUser: async () => ({
          data: { user: null },
          error: { message: "Token expired" },
        }),
      },
    });

    assert.deepEqual(profile, {
      displayName: null,
      email: null,
      provider: null,
      status: "error",
      userId: null,
    });
  });

  it("builds loading profile state", () => {
    assert.deepEqual(buildSupabaseProfileState("loading"), {
      displayName: null,
      email: null,
      provider: null,
      status: "loading",
      userId: null,
    });
  });
});
