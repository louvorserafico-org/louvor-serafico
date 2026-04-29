export type PostLoginDestination =
  | { kind: "back" }
  | { href: string; kind: "replace" };

export function resolvePostLoginDestination(canGoBack: boolean, fallbackHref = "/"): PostLoginDestination {
  if (canGoBack) {
    return { kind: "back" };
  }

  return {
    href: fallbackHref,
    kind: "replace",
  };
}

export function buildEmailConfirmationCopy(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  return {
    actionLabel: "Ir para entrar",
    message: normalizedEmail
      ? `Enviamos a confirmacao para ${normalizedEmail}. Abra sua caixa de entrada antes de voltar ao app.`
      : "Enviamos uma confirmacao para o seu email. Abra sua caixa de entrada antes de voltar ao app.",
    title: "Confirme seu email",
  };
}
