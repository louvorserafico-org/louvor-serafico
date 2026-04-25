import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveSongAssetAction } from "./song-asset-action.ts";

describe("song asset action", () => {
  it("opens material when access is available", () => {
    assert.deepEqual(
      resolveSongAssetAction({
        canAccess: true,
        hasActiveSubscription: true,
        isAuthenticated: true,
      }),
      {
        href: null,
        kind: "open",
        label: "Abrir material",
      },
    );
  });

  it("routes anonymous user to sign in", () => {
    assert.deepEqual(
      resolveSongAssetAction({
        canAccess: false,
        hasActiveSubscription: false,
        isAuthenticated: false,
      }),
      {
        href: "/entrar",
        kind: "sign_in",
        label: "Entrar para acessar",
      },
    );
  });

  it("routes authenticated free user to premium area", () => {
    assert.deepEqual(
      resolveSongAssetAction({
        canAccess: false,
        hasActiveSubscription: false,
        isAuthenticated: true,
      }),
      {
        href: "/perfil",
        kind: "subscribe",
        label: "Ver premium",
      },
    );
  });
});
