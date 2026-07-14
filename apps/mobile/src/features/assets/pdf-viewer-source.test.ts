import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildPdfCacheFileName, buildPublicStorageAssetUrl, resolvePdfViewerSource } from "./pdf-viewer-source.ts";

describe("pdf viewer source", () => {
  it("builds a public storage url encoding path segments", () => {
    assert.equal(
      buildPublicStorageAssetUrl(
        "https://project.supabase.co",
        "song-assets",
        "Partituras/Fazei em nome do Senhor.pdf",
      ),
      "https://project.supabase.co/storage/v1/object/public/song-assets/Partituras/Fazei%20em%20nome%20do%20Senhor.pdf",
    );
  });

  it("returns a direct file url when already provided", async () => {
    const result = await resolvePdfViewerSource({
      accessToken: null,
      assetId: "asset-1",
      bucket: "song-assets",
      fileUrl: "https://cdn.example/document.pdf",
      functionsUrl: null,
      premium: false,
      storagePath: "ignored.pdf",
      supabaseUrl: "https://project.supabase.co",
    });

    assert.deepEqual(result, {
      message: "Documento pronto para leitura.",
      status: "ready",
      url: "https://cdn.example/document.pdf",
    });
  });

  it("builds a public url for non premium storage assets", async () => {
    const result = await resolvePdfViewerSource({
      accessToken: null,
      assetId: "asset-1",
      bucket: "song-assets",
      functionsUrl: null,
      premium: false,
      storagePath: "Partituras/fazei.pdf",
      supabaseUrl: "https://project.supabase.co",
    });

    assert.deepEqual(result, {
      message: "Documento público pronto para leitura.",
      status: "ready",
      url: "https://project.supabase.co/storage/v1/object/public/song-assets/Partituras/fazei.pdf",
    });
  });

  it("delegates premium assets to the signed url flow", async () => {
    const result = await resolvePdfViewerSource(
      {
        accessToken: "token",
        assetId: "asset-1",
        bucket: "song-assets",
        functionsUrl: "https://project.functions.supabase.co",
        premium: true,
        storagePath: "Partituras/fazei.pdf",
        supabaseUrl: "https://project.supabase.co",
      },
      async (url, init) => {
        assert.equal(url, "https://project.functions.supabase.co/create-asset-signed-url");
        assert.equal(init?.method, "POST");

        return new Response(JSON.stringify({ signedUrl: "https://signed.example/document.pdf" }), { status: 200 });
      },
    );

    assert.deepEqual(result, {
      message: "Material liberado com link temporario.",
      status: "ready",
      url: "https://signed.example/document.pdf",
    });
  });

  it("builds a stable local cache file name", () => {
    assert.equal(
      buildPdfCacheFileName("asset-fazei-score", "Partituras/Fazei em nome do Senhor.pdf", "Partitura"),
      "asset-fazei-score.pdf",
    );
  });
});
