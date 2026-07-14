import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { updatePasswordFromRecovery } from "./password-reset.ts";

describe("password reset", () => {
  it("updates password when confirmation matches", async () => {
    let password = "";

    const result = await updatePasswordFromRecovery(
      {
        auth: {
          updateUser: async (payload) => {
            password = payload.password;
            return { data: {}, error: null };
          },
        },
      },
      "novaSenha123",
      "novaSenha123",
    );

    assert.equal(password, "novaSenha123");
    assert.deepEqual(result, {
      message: "Senha atualizada.",
      status: "success",
    });
  });

  it("blocks short password before calling Supabase", async () => {
    const result = await updatePasswordFromRecovery(
      {
        auth: {
          updateUser: async () => {
            throw new Error("should not run");
          },
        },
      },
      "123",
      "123",
    );

    assert.deepEqual(result, {
      message: "A senha deve ter pelo menos 8 caracteres.",
      status: "error",
    });
  });

  it("blocks password mismatch before calling Supabase", async () => {
    const result = await updatePasswordFromRecovery(
      {
        auth: {
          updateUser: async () => {
            throw new Error("should not run");
          },
        },
      },
      "novaSenha123",
      "outraSenha123",
    );

    assert.deepEqual(result, {
      message: "As senhas nao conferem.",
      status: "error",
    });
  });

  it("maps Supabase recovery session error", async () => {
    const result = await updatePasswordFromRecovery(
      {
        auth: {
          updateUser: async () => ({
            data: {},
            error: { message: "Auth session missing" },
          }),
        },
      },
      "novaSenha123",
      "novaSenha123",
    );

    assert.deepEqual(result, {
      detail: "Auth session missing",
      message: "Sua sessão expirou. Entre novamente.",
      status: "error",
    });
  });
});
