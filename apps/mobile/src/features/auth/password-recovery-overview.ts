export type PasswordRecoveryOverview = {
  helperText: string;
  title: string;
};

export function buildPasswordRecoveryOverview(): PasswordRecoveryOverview {
  return {
    helperText: "Abra o link enviado ao seu email, defina uma nova senha e retome sua conta com serenidade.",
    title: "Redefinir acesso",
  };
}
