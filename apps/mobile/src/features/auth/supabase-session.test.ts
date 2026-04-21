import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildSupabaseSessionState } from "./supabase-session.ts";

describe("supabase session", () => {
  it("maps authenticated session into ready state", () => {
    const state = buildSupabaseSessionState({
      session: {
        access_token: "token-1",
        user: {
          app_metadata: {
            provider: "email",
          },
          email: "frei@example.com",
          id: "user-1",
        },
      },
      status: "authenticated",
    });

    assert.deepEqual(state, {
      accessToken: "token-1",
      email: "frei@example.com",
      provider: "email",
      status: "authenticated",
      userId: "user-1",
    });
  });

  it("returns anonymous state without session", () => {
    const state = buildSupabaseSessionState({
      session: null,
      status: "anonymous",
    });

    assert.deepEqual(state, {
      accessToken: null,
      email: null,
      provider: null,
      status: "anonymous",
      userId: null,
    });
  });

  it("keeps loading state without session details", () => {
    const state = buildSupabaseSessionState({
      session: null,
      status: "loading",
    });

    assert.deepEqual(state, {
      accessToken: null,
      email: null,
      provider: null,
      status: "loading",
      userId: null,
    });
  });
});
