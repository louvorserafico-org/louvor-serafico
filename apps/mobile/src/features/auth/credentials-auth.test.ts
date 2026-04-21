import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildRegistrationMetadata,
  normalizeAuthEmail,
  normalizePhone,
  registerWithPassword,
  requestPasswordReset,
  signInWithPassword,
  type RegistrationForm,
} from "./credentials-auth.ts";

const validForm: RegistrationForm = {
  city: "Petropolis",
  email: "  Frei@Example.com  ",
  fullName: "Frei Luis",
  ministry: "Banda Sao Francisco",
  parish: "Paroquia Sao Pedro",
  password: "senha1234",
  phone: "(24) 99999-0000",
  state: "rj",
};

describe("credentials auth", () => {
  it("registers with password and profile metadata", async () => {
    let payload: unknown = null;

    const result = await registerWithPassword(
      {
        auth: {
          resetPasswordForEmail: async () => ({ data: {}, error: null }),
          signInWithPassword: async () => ({ data: {}, error: null }),
          signUp: async (nextPayload) => {
            payload = nextPayload;
            return { data: {}, error: null };
          },
        },
      },
      validForm,
    );

    assert.deepEqual(payload, {
      email: "frei@example.com",
      password: "senha1234",
      options: {
        data: {
          city: "Petropolis",
          full_name: "Frei Luis",
          ministry: "Banda Sao Francisco",
          parish: "Paroquia Sao Pedro",
          phone: "24999990000",
          state: "RJ",
        },
      },
    });
    assert.deepEqual(result, {
      message: "Cadastro criado. Se necessario, confirme o email antes de entrar.",
      status: "success",
    });
  });

  it("blocks weak registration before calling Supabase", async () => {
    const result = await registerWithPassword(
      {
        auth: {
          resetPasswordForEmail: async () => ({ data: {}, error: null }),
          signInWithPassword: async () => ({ data: {}, error: null }),
          signUp: async () => {
            throw new Error("should not run");
          },
        },
      },
      { ...validForm, password: "123" },
    );

    assert.deepEqual(result, {
      message: "A senha deve ter pelo menos 8 caracteres.",
      status: "error",
    });
  });

  it("signs in with password", async () => {
    let payload: unknown = null;

    const result = await signInWithPassword(
      {
        auth: {
          resetPasswordForEmail: async () => ({ data: {}, error: null }),
          signInWithPassword: async (nextPayload) => {
            payload = nextPayload;
            return { data: {}, error: null };
          },
          signUp: async () => ({ data: {}, error: null }),
        },
      },
      "  Frei@Example.com  ",
      "senha1234",
    );

    assert.deepEqual(payload, {
      email: "frei@example.com",
      password: "senha1234",
    });
    assert.deepEqual(result, {
      message: "Login realizado.",
      status: "success",
    });
  });

  it("maps Supabase login error", async () => {
    const result = await signInWithPassword(
      {
        auth: {
          resetPasswordForEmail: async () => ({ data: {}, error: null }),
          signInWithPassword: async () => ({
            data: {},
            error: { message: "Invalid login credentials" },
          }),
          signUp: async () => ({ data: {}, error: null }),
        },
      },
      "frei@example.com",
      "senha1234",
    );

    assert.deepEqual(result, {
      message: "Invalid login credentials",
      status: "error",
    });
  });

  it("normalizes helpers", () => {
    assert.equal(normalizeAuthEmail("  Frei@Example.com "), "frei@example.com");
    assert.equal(normalizePhone("(24) 99999-0000"), "24999990000");
    assert.deepEqual(buildRegistrationMetadata({ ...validForm, ministry: "", parish: "" }), {
      city: "Petropolis",
      full_name: "Frei Luis",
      ministry: null,
      parish: null,
      phone: "24999990000",
      state: "RJ",
    });
  });

  it("requests password reset with normalized email", async () => {
    let email = "";

    const result = await requestPasswordReset(
      {
        auth: {
          resetPasswordForEmail: async (nextEmail) => {
            email = nextEmail;
            return { data: {}, error: null };
          },
          signInWithPassword: async () => ({ data: {}, error: null }),
          signUp: async () => ({ data: {}, error: null }),
        },
      },
      "  Frei@Example.com ",
    );

    assert.equal(email, "frei@example.com");
    assert.deepEqual(result, {
      message: "Email de recuperacao enviado.",
      status: "success",
    });
  });

  it("blocks invalid reset email before calling Supabase", async () => {
    const result = await requestPasswordReset(
      {
        auth: {
          resetPasswordForEmail: async () => {
            throw new Error("should not run");
          },
          signInWithPassword: async () => ({ data: {}, error: null }),
          signUp: async () => ({ data: {}, error: null }),
        },
      },
      "frei",
    );

    assert.deepEqual(result, {
      message: "Digite um email valido para recuperar a senha.",
      status: "error",
    });
  });
});
