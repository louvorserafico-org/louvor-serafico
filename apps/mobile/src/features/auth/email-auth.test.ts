import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { normalizeSignInEmail, requestEmailSignIn } from "./email-auth.ts";

describe("email auth", () => {
  it("normalizes email before request", async () => {
    let requestedEmail = "";

    const result = await requestEmailSignIn(
      {
        auth: {
          signInWithOtp: async ({ email }) => {
            requestedEmail = email;
            return { data: {}, error: null };
          },
        },
      },
      "  Frei@Example.com  ",
    );

    assert.equal(requestedEmail, "frei@example.com");
    assert.deepEqual(result, {
      message: "Email enviado. Verifique caixa de entrada para continuar.",
      status: "success",
    });
  });

  it("blocks invalid email before calling Supabase", async () => {
    const result = await requestEmailSignIn(
      {
        auth: {
          signInWithOtp: async () => {
            throw new Error("should not run");
          },
        },
      },
      "frei",
    );

    assert.deepEqual(result, {
      message: "Digite um email valido para continuar.",
      status: "error",
    });
  });

  it("returns config error when client is missing", async () => {
    const result = await requestEmailSignIn(null, "frei@example.com");

    assert.deepEqual(result, {
      message: "Cliente Supabase indisponivel para autenticacao.",
      status: "error",
    });
  });

  it("maps Supabase error into user message", async () => {
    const result = await requestEmailSignIn(
      {
        auth: {
          signInWithOtp: async () => ({
            data: {},
            error: { message: "Email rate limit exceeded" },
          }),
        },
      },
      "frei@example.com",
    );

    assert.deepEqual(result, {
      detail: "Email rate limit exceeded",
      message: "Muitas tentativas seguidas. Aguarde alguns minutos e tente novamente.",
      status: "error",
    });
  });

  it("normalizes raw email helper", () => {
    assert.equal(normalizeSignInEmail("  Frei@Example.com "), "frei@example.com");
  });
});
