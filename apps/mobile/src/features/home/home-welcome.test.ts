import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { SupabaseProfileState } from "@/features/auth/supabase-profile";
import type { SupabaseSessionState } from "@/features/auth/supabase-session";

import { buildHomeWelcome } from "./home-welcome.ts";

const anonymousProfile: SupabaseProfileState = {
  city: null,
  displayName: null,
  email: null,
  ministry: null,
  parish: null,
  phone: null,
  provider: null,
  state: null,
  status: "anonymous",
  userId: null,
};

const readyProfile: SupabaseProfileState = {
  city: null,
  displayName: "Frei Luis",
  email: "frei@example.com",
  ministry: null,
  parish: null,
  phone: null,
  provider: "email",
  state: null,
  status: "ready",
  userId: "user-1",
};

const authenticatedSession: SupabaseSessionState = {
  accessToken: "token",
  email: "louvorserafico@gmail.com",
  provider: "email",
  status: "authenticated",
  userId: "user-1",
};

const anonymousSession: SupabaseSessionState = {
  accessToken: null,
  email: null,
  provider: null,
  status: "anonymous",
  userId: null,
};

describe("home welcome", () => {
  it("builds greeting from ready profile", () => {
    assert.deepEqual(
      buildHomeWelcome({
        profile: readyProfile,
        session: authenticatedSession,
      }),
      {
        initials: "FL",
      },
    );
  });

  it("falls back to email when profile is not ready", () => {
    assert.deepEqual(
      buildHomeWelcome({
        profile: anonymousProfile,
        session: authenticatedSession,
      }),
      {
        initials: "L",
      },
    );
  });

  it("uses visitor initial when session is anonymous", () => {
    assert.deepEqual(
      buildHomeWelcome({
        profile: anonymousProfile,
        session: anonymousSession,
      }),
      {
        initials: "V",
      },
    );
  });
});
