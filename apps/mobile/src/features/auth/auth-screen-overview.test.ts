import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildAuthScreenOverview } from "./auth-screen-overview.ts";

describe("auth screen overview", () => {
  it("builds login overview", () => {
    assert.deepEqual(buildAuthScreenOverview({ mode: "login" }), {
      helperText: "Entre com email e senha para retomar seus favoritos, suas partilhas e os materiais liberados nesta conta.",
      title: "Retome sua conta",
    });
  });

  it("builds register overview", () => {
    assert.deepEqual(buildAuthScreenOverview({ mode: "register" }), {
      helperText: "Reuna seus dados principais para guardar favoritos, acompanhar partilhas e preparar sua assinatura com serenidade.",
      title: "Nova conta",
    });
  });
});
