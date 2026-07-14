import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { SongAsset } from "@louvor-serafico/shared";

import { resolveAssetAccess } from "./premium-access.ts";

const premiumAsset: SongAsset = {
  id: "asset-1",
  path: "partitura.pdf",
  premium: true,
  title: "Partitura",
  type: "score_pdf",
};

const freeAsset: SongAsset = {
  ...premiumAsset,
  id: "asset-free",
  premium: false,
};

describe("premium access", () => {
  it("allows free assets without authentication", () => {
    assert.deepEqual(resolveAssetAccess(freeAsset, { hasActiveSubscription: false, isAuthenticated: false }), {
      canAccess: true,
      label: "Livre",
      message: "Material livre para consulta.",
    });
  });

  it("allows premium assets with active subscription", () => {
    assert.deepEqual(resolveAssetAccess(premiumAsset, { hasActiveSubscription: true, isAuthenticated: true }), {
      canAccess: true,
      label: "Premium liberado",
      message: "Assinatura ativa. Material premium liberado.",
    });
  });

  it("blocks premium assets without active subscription", () => {
    assert.deepEqual(resolveAssetAccess(premiumAsset, { hasActiveSubscription: false, isAuthenticated: true }), {
      canAccess: false,
      label: "Premium",
      message: "Assinatura necessária para acessar este material.",
    });
  });
});
