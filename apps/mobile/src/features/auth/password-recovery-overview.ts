export type PasswordRecoveryOverview = {
  helperText: string;
  title: string;
};

export function buildPasswordRecoveryOverview(): PasswordRecoveryOverview {
  return {
    helperText: "Abra link do email, defina nova senha e volte ao login com acesso normal da conta.",
    title: "Recuperacao em andamento",
  };
}
