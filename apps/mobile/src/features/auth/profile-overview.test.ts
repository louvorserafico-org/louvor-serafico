import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildSupabaseProfileState, type SupabaseProfileState } from "./supabase-profile.ts";
import type { SupabaseSessionState } from "./supabase-session.ts";
import { buildProfileOverview } from "./profile-overview.ts";

const anonymousSession: SupabaseSessionState = {
  accessToken: null,
  email: null,
  provider: null,
  status: "anonymous",
  userId: null,
};

const authenticatedSession: SupabaseSessionState = {
  accessToken: "token",
  email: "louvor@example.com",
  provider: "email",
  status: "authenticated",
  userId: "user-id",
};

const readyProfile: SupabaseProfileState = {
  city: "Sao Paulo",
  displayName: "Frei Luis",
  email: "louvor@example.com",
  ministry: "Coral paroquial",
  parish: "Sao Francisco",
  phone: "11999999999",
  provider: "email",
  status: "ready",
  state: "SP",
  userId: "user-id",
};

describe("profile overview", () => {
  it("builds a user-facing ready summary", () => {
    const result = buildProfileOverview({
      hasActiveSubscription: true,
      profile: readyProfile,
      session: authenticatedSession,
    });

    assert.deepEqual(result, {
      accountLine: "louvor@example.com",
      detailLine: "Coral paroquial",
      premiumLine: "Premium ativo",
      status: "ready",
      title: "Paz e bem, Frei Luis",
    });
  });

  it("builds an anonymous invitation", () => {
    const result = buildProfileOverview({
      hasActiveSubscription: false,
      profile: buildSupabaseProfileState("anonymous"),
      session: anonymousSession,
    });

    assert.deepEqual(result, {
      accountLine: "Entre para liberar favoritos, comentarios e materiais premium.",
      detailLine: "Cadastro por email e senha.",
      premiumLine: "Premium inativo",
      status: "anonymous",
      title: "Conta nao conectada",
    });
  });

  it("builds a partial authenticated state", () => {
    const result = buildProfileOverview({
      hasActiveSubscription: true,
      profile: buildSupabaseProfileState("error"),
      session: authenticatedSession,
    });

    assert.deepEqual(result, {
      accountLine: "louvor@example.com",
      detailLine: "Perfil remoto ainda nao carregado.",
      premiumLine: "Premium ativo",
      status: "partial",
      title: "Conta conectada",
    });
  });
});
