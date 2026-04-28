import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildAuthScreenOverview } from "./auth-screen-overview.ts";

describe("auth screen overview", () => {
  it("builds login overview", () => {
    assert.deepEqual(buildAuthScreenOverview({ mode: "login" }), {
      helperText: "Entre com email e senha para retomar favoritos, partilhas e materiais desta conta.",
      title: "Entrar na conta",
    });
  });

  it("builds register overview", () => {
    assert.deepEqual(buildAuthScreenOverview({ mode: "register" }), {
      helperText: "Reuna seus dados principais para guardar favoritos, acompanhar partilhas e manter seu ministerio em ordem.",
      title: "Criar conta",
    });
  });
});
