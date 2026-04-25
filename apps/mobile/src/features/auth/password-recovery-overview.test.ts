import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildPasswordRecoveryOverview } from "./password-recovery-overview.ts";

describe("password recovery overview", () => {
  it("builds recovery summary", () => {
    assert.deepEqual(buildPasswordRecoveryOverview(), {
      helperText: "Abra link do email, defina nova senha e volte ao login com acesso normal da conta.",
      title: "Recuperacao em andamento",
    });
  });
});
