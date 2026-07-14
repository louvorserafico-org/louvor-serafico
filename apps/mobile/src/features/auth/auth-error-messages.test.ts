import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { describeAuthError, translateAuthErrorMessage } from "./auth-error-messages.ts";

describe("auth error messages", () => {
  it("translates known Supabase auth errors to pt-BR", () => {
    assert.equal(translateAuthErrorMessage("Invalid login credentials"), "E-mail ou senha incorretos.");
    assert.equal(
      translateAuthErrorMessage("Email not confirmed"),
      "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.",
    );
    assert.equal(
      translateAuthErrorMessage("User already registered"),
      "Este e-mail já possui cadastro. Tente entrar ou recuperar a senha.",
    );
    assert.equal(
      translateAuthErrorMessage("Password should be at least 6 characters"),
      "A senha é muito curta. Use pelo menos 8 caracteres.",
    );
    assert.equal(
      translateAuthErrorMessage("Email rate limit exceeded"),
      "Muitas tentativas seguidas. Aguarde alguns minutos e tente novamente.",
    );
    assert.equal(
      translateAuthErrorMessage("User not found"),
      "Não encontramos uma conta com este e-mail.",
    );
    assert.equal(
      translateAuthErrorMessage("For security purposes, you can only request this after 34 seconds."),
      "Por segurança, aguarde um instante antes de tentar novamente.",
    );
    assert.equal(
      translateAuthErrorMessage("Token has expired or is invalid"),
      "O link expirou. Solicite um novo.",
    );
    assert.equal(
      translateAuthErrorMessage("New password should be different from the old password"),
      "A nova senha deve ser diferente da atual.",
    );
    assert.equal(
      translateAuthErrorMessage("Auth session missing"),
      "Sua sessão expirou. Entre novamente.",
    );
    assert.equal(
      translateAuthErrorMessage("Network request failed"),
      "Falha de conexão. Verifique a internet e tente novamente.",
    );
  });

  it("is case-insensitive", () => {
    assert.equal(translateAuthErrorMessage("INVALID LOGIN CREDENTIALS"), "E-mail ou senha incorretos.");
  });

  it("falls back to a generic pt-BR message for unknown errors", () => {
    assert.equal(translateAuthErrorMessage("Something exploded upstream"), "Não foi possível concluir a operação.");
    assert.equal(translateAuthErrorMessage(""), "Não foi possível concluir a operação.");
  });

  it("describeAuthError returns a pt-BR summary and the original backend detail", () => {
    const result = describeAuthError("Invalid login credentials");
    assert.equal(result.summary, "E-mail ou senha incorretos.");
    assert.equal(result.detail, "Invalid login credentials");
  });

  it("describeAuthError omits detail when the backend message is empty", () => {
    const result = describeAuthError("");
    assert.equal(result.summary, "Não foi possível concluir a operação.");
    assert.equal(result.detail, null);
  });
});
