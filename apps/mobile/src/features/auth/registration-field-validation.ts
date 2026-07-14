const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFullNameField(value: string): string | null {
  return value.trim() ? null : "Informe seu nome.";
}

export function validateEmailField(value: string): string | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Informe seu e-mail.";
  }

  return EMAIL_PATTERN.test(trimmed) ? null : "Digite um e-mail válido, ex.: nome@email.com.";
}

export function validatePasswordField(value: string): string | null {
  if (!value) {
    return "Crie uma senha.";
  }

  return value.length >= 8 ? null : "A senha deve ter pelo menos 8 caracteres.";
}

export function validatePasswordConfirmationField(password: string, confirmation: string): string | null {
  if (!confirmation) {
    return "Repita a senha.";
  }

  return password === confirmation ? null : "As senhas não conferem.";
}

export function validatePhoneField(value: string): string | null {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "Informe seu telefone.";
  }

  return digits.length === 10 || digits.length === 11
    ? null
    : "Digite um telefone válido, ex.: (24) 9-9999-9999.";
}
