import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildAuthScreenOverview } from "./auth-screen-overview.ts";

describe("auth screen overview", () => {
  it("builds login overview", () => {
    assert.deepEqual(buildAuthScreenOverview({ mode: "login" }), {
      helperText: "Entre com email e senha para recuperar favoritos, comentarios e acesso premium desta conta.",
      title: "Acesso da conta",
    });
  });

  it("builds register overview", () => {
    assert.deepEqual(buildAuthScreenOverview({ mode: "register" }), {
      helperText: "Crie conta com dados basicos para liberar favoritos, comentarios e assinatura depois.",
      title: "Cadastro inicial",
    });
  });
});
