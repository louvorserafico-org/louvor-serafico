import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { signOutFromSupabase } from "./sign-out.ts";

describe("sign out", () => {
  it("ends Supabase session", async () => {
    let called = false;

    const result = await signOutFromSupabase({
      auth: {
        signOut: async () => {
          called = true;
          return { error: null };
        },
      },
    });

    assert.equal(called, true);
    assert.deepEqual(result, {
      message: "Sessao encerrada.",
      status: "success",
    });
  });

  it("returns config error without client", async () => {
    const result = await signOutFromSupabase(null);

    assert.deepEqual(result, {
      message: "Cliente Supabase indisponivel para sair.",
      status: "error",
    });
  });

  it("maps Supabase sign out error", async () => {
    const result = await signOutFromSupabase({
      auth: {
        signOut: async () => ({
          error: { message: "Network error" },
        }),
      },
    });

    assert.deepEqual(result, {
      detail: "Network error",
      message: "Não foi possível concluir a operação.",
      status: "error",
    });
  });
});
