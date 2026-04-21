import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getAuthRedirectUrl } from "./auth-deep-link.ts";

describe("auth deep link", () => {
  it("builds password recovery redirect with app scheme", () => {
    assert.equal(getAuthRedirectUrl("passwordRecovery"), "louvor-serafico://recuperar-senha");
  });

  it("builds auth callback redirect with app scheme", () => {
    assert.equal(getAuthRedirectUrl("callback"), "louvor-serafico://auth/callback");
  });
});
