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
              user_metadata: {
                city: "Petropolis",
                full_name: "Frei Luis",
                ministry: "Banda Sao Francisco",
                parish: "Paroquia Sao Pedro",
                phone: "24999990000",
                state: "RJ",
              },
            },
          },
          error: null,
        }),
      },
    });

    assert.deepEqual(profile, {
      city: "Petropolis",
      displayName: "Frei Luis",
      email: "frei@example.com",
      ministry: "Banda Sao Francisco",
      parish: "Paroquia Sao Pedro",
      phone: "24999990000",
      provider: "email",
      status: "ready",
      state: "RJ",
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
      city: null,
      displayName: null,
      email: null,
      ministry: null,
      parish: null,
      phone: null,
      provider: null,
      status: "anonymous",
      state: null,
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
      city: null,
      displayName: null,
      email: null,
      ministry: null,
      parish: null,
      phone: null,
      provider: null,
      status: "error",
      state: null,
      userId: null,
    });
  });

  it("builds loading profile state", () => {
    assert.deepEqual(buildSupabaseProfileState("loading"), {
      city: null,
      displayName: null,
      email: null,
      ministry: null,
      parish: null,
      phone: null,
      provider: null,
      status: "loading",
      state: null,
      userId: null,
    });
  });
});
