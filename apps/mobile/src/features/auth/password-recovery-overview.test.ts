import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildPasswordRecoveryOverview } from "./password-recovery-overview.ts";

describe("password recovery overview", () => {
  it("builds recovery summary", () => {
    assert.deepEqual(buildPasswordRecoveryOverview(), {
      helperText: "Abra o link enviado ao seu email, defina uma nova senha e retome sua conta com tranquilidade.",
      title: "Renove seu acesso",
    });
  });
});
