import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  validateEmailField,
  validateFullNameField,
  validatePasswordConfirmationField,
  validatePasswordField,
  validatePhoneField,
} from "./registration-field-validation.ts";

describe("registration field validation", () => {
  it("validates full name", () => {
    assert.equal(validateFullNameField(""), "Informe seu nome.");
    assert.equal(validateFullNameField("  "), "Informe seu nome.");
    assert.equal(validateFullNameField("Frei Luis"), null);
  });

  it("validates email format", () => {
    assert.equal(validateEmailField(""), "Informe seu e-mail.");
    assert.equal(validateEmailField("frei@example"), "Digite um e-mail válido, ex.: nome@email.com.");
    assert.equal(validateEmailField("frei example.com"), "Digite um e-mail válido, ex.: nome@email.com.");
    assert.equal(validateEmailField("frei@example.com"), null);
  });

  it("validates password length", () => {
    assert.equal(validatePasswordField(""), "Crie uma senha.");
    assert.equal(validatePasswordField("1234567"), "A senha deve ter pelo menos 8 caracteres.");
    assert.equal(validatePasswordField("12345678"), null);
  });

  it("validates password confirmation matches", () => {
    assert.equal(validatePasswordConfirmationField("12345678", ""), "Repita a senha.");
    assert.equal(validatePasswordConfirmationField("12345678", "12345679"), "As senhas não conferem.");
    assert.equal(validatePasswordConfirmationField("12345678", "12345678"), null);
  });

  it("validates Brazilian phone number", () => {
    assert.equal(validatePhoneField(""), "Informe seu telefone.");
    assert.equal(
      validatePhoneField("(24) 9-999"),
      "Digite um telefone válido, ex.: (24) 9-9999-9999.",
    );
    assert.equal(validatePhoneField("(24) 9-9999-0000"), null);
  });
});
