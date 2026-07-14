// Tradução pt-BR das mensagens de erro do Supabase Auth (GoTrue). Mapeamento por
// substring (case-insensitive) das mensagens conhecidas em ingles; fallback generico
// para mensagens não mapeadas, sem nunca expor o texto técnico como resumo principal.

const GENERIC_MESSAGE = "Não foi possível concluir a operação.";

const KNOWN_ERRORS: Array<{ match: RegExp; message: string }> = [
  { match: /invalid login credentials/i, message: "E-mail ou senha incorretos." },
  {
    match: /email not confirmed/i,
    message: "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.",
  },
  {
    match: /user already registered/i,
    message: "Este e-mail já possui cadastro. Tente entrar ou recuperar a senha.",
  },
  { match: /password should be at least/i, message: "A senha é muito curta. Use pelo menos 8 caracteres." },
  {
    match: /(email )?rate limit exceeded/i,
    message: "Muitas tentativas seguidas. Aguarde alguns minutos e tente novamente.",
  },
  { match: /user not found/i, message: "Não encontramos uma conta com este e-mail." },
  {
    match: /for security purposes/i,
    message: "Por segurança, aguarde um instante antes de tentar novamente.",
  },
  {
    match: /(token has expired|invalid token|otp expired|expired or is invalid)/i,
    message: "O link expirou. Solicite um novo.",
  },
  {
    match: /new password should be different/i,
    message: "A nova senha deve ser diferente da atual.",
  },
  { match: /auth session missing/i, message: "Sua sessão expirou. Entre novamente." },
  {
    match: /(network request failed|failed to fetch)/i,
    message: "Falha de conexão. Verifique a internet e tente novamente.",
  },
];

export function translateAuthErrorMessage(rawMessage: string): string {
  const message = rawMessage.trim();

  if (!message) {
    return GENERIC_MESSAGE;
  }

  const known = KNOWN_ERRORS.find((entry) => entry.match.test(message));
  return known ? known.message : GENERIC_MESSAGE;
}

export type AuthErrorDescription = {
  detail: string | null;
  summary: string;
};

export function describeAuthError(rawMessage: string): AuthErrorDescription {
  const message = rawMessage.trim();
  const summary = translateAuthErrorMessage(message);

  return {
    detail: message ? message : null,
    summary,
  };
}
