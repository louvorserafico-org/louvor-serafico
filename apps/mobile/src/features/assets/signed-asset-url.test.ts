import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveSignedAssetUrl } from "./signed-asset-url.ts";

const premiumAsset = {
  id: "asset-1",
  path: "scores/fazei.pdf",
  premium: true,
  title: "Partitura",
  type: "score_pdf" as const,
};

describe("signed asset url", () => {
  it("creates signed url when premium access is granted", async () => {
    const result = await resolveSignedAssetUrl(
      premiumAsset,
      {
        hasActiveSubscription: true,
        isAuthenticated: true,
      },
      {
        bucket: "song-assets",
        client: {
          storage: {
            from(bucket) {
              assert.equal(bucket, "song-assets");

              return {
                async createSignedUrl(path, expiresIn) {
                  assert.equal(path, "scores/fazei.pdf");
                  assert.equal(expiresIn, 300);

                  return {
                    data: { signedUrl: "https://signed.example/fazei.pdf" },
                    error: null,
                  };
                },
              };
            },
          },
        },
      },
    );

    assert.deepEqual(result, {
      message: "Material liberado com link temporario.",
      status: "ready",
      url: "https://signed.example/fazei.pdf",
    });
  });

  it("blocks signed url when premium access is denied", async () => {
    const result = await resolveSignedAssetUrl(
      premiumAsset,
      {
        hasActiveSubscription: false,
        isAuthenticated: true,
      },
      {
        bucket: "song-assets",
        client: null,
      },
    );

    assert.deepEqual(result, {
      message: "Assinatura necessaria para acessar este material.",
      status: "blocked",
      url: null,
    });
  });

  it("returns config error when storage client is missing", async () => {
    const result = await resolveSignedAssetUrl(
      { ...premiumAsset, premium: false },
      {
        hasActiveSubscription: false,
        isAuthenticated: false,
      },
      {
        bucket: "song-assets",
        client: null,
      },
    );

    assert.deepEqual(result, {
      message: "Configurar Supabase Storage antes de abrir materiais.",
      status: "not_configured",
      url: null,
    });
  });
});
