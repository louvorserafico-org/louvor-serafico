import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { requestAssetSignedUrl } from "./edge-asset-url.ts";

describe("edge asset url", () => {
  it("requests signed url from edge function", async () => {
    const result = await requestAssetSignedUrl(
      "asset-1",
      {
        accessToken: "token",
        functionsUrl: "https://project.functions.supabase.co",
      },
      async (url, init) => {
        assert.equal(url, "https://project.functions.supabase.co/create-asset-signed-url");
        assert.equal(init?.method, "POST");
        assert.equal((init?.headers as Record<string, string>).Authorization, "Bearer token");
        assert.equal(init?.body, JSON.stringify({ assetId: "asset-1" }));

        return new Response(JSON.stringify({ signedUrl: "https://signed.example/file.pdf" }), { status: 200 });
      },
    );

    assert.deepEqual(result, {
      message: "Material liberado com link temporario.",
      status: "ready",
      url: "https://signed.example/file.pdf",
    });
  });

  it("blocks without authenticated session", async () => {
    const result = await requestAssetSignedUrl(
      "asset-1",
      {
        accessToken: null,
        functionsUrl: "https://project.functions.supabase.co",
      },
      async () => new Response(null, { status: 500 }),
    );

    assert.deepEqual(result, {
      message: "Sessão real necessária para abrir material premium.",
      status: "blocked",
      url: null,
    });
  });

  it("maps edge function errors", async () => {
    const result = await requestAssetSignedUrl(
      "asset-1",
      {
        accessToken: "token",
        functionsUrl: "https://project.functions.supabase.co",
      },
      async () => new Response(JSON.stringify({ message: "Assinatura ativa necessária." }), { status: 403 }),
    );

    assert.deepEqual(result, {
      message: "Assinatura ativa necessária.",
      status: "error",
      url: null,
    });
  });
});
