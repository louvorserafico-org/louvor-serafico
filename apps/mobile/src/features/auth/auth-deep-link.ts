const appScheme = "louvor-serafico";

export type AuthRedirectTarget = "callback" | "passwordRecovery";

export function getAuthRedirectUrl(target: AuthRedirectTarget): string {
  const pathByTarget: Record<AuthRedirectTarget, string> = {
    callback: "auth/callback",
    passwordRecovery: "recuperar-senha",
  };

  return `${appScheme}://${pathByTarget[target]}`;
}
