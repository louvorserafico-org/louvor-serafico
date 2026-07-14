import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { SupabaseConfig } from "./config.ts";
import { fetchSupabaseRemoteStatus } from "./remote-status.ts";

describe("supabase remote status", () => {
  const configured: SupabaseConfig = {
    anonKey: "anon_test",
    projectHost: "engvbvdtdcveoebgrexl.supabase.co",
    projectRef: "engvbvdtdcveoebgrexl",
    publishableKey: null,
    url: "https://engvbvdtdcveoebgrexl.supabase.co",
  };

  it("returns ready when auth settings endpoint responds", async () => {
    const status = await fetchSupabaseRemoteStatus(
      async () =>
        new Response(
          JSON.stringify({
            disable_signup: false,
            external: { email: true },
          }),
          { status: 200 },
        ),
      configured,
    );

    assert.deepEqual(status, {
      disableSignup: false,
      externalEmailEnabled: true,
      message: "Configuração remota lida com sucesso.",
      projectRef: "engvbvdtdcveoebgrexl",
      status: "ready",
    });
  });

  it("returns not configured when public env is incomplete", async () => {
    const status = await fetchSupabaseRemoteStatus(async () => new Response(null, { status: 200 }), {
      ...configured,
      url: null,
    });

    assert.deepEqual(status, {
      message: "Configurar URL e chave pública antes da leitura remota.",
      status: "not_configured",
    });
  });

  it("returns error when endpoint rejects request", async () => {
    const status = await fetchSupabaseRemoteStatus(
      async () =>
        new Response(
          JSON.stringify({
            message: "Bad gateway",
          }),
          { status: 502, statusText: "Bad Gateway" },
        ),
      configured,
    );

    assert.deepEqual(status, {
      message: "Falha remota Supabase: Bad gateway",
      status: "error",
    });
  });
});
