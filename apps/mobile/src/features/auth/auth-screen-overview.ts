type AuthScreenOverviewInput = {
  mode: "login" | "register";
};

export type AuthScreenOverview = {
  helperText: string;
  title: string;
};

export function buildAuthScreenOverview(input: AuthScreenOverviewInput): AuthScreenOverview {
  if (input.mode === "register") {
    return {
      helperText: "Crie conta com dados basicos para liberar favoritos, comentarios e assinatura depois.",
      title: "Cadastro inicial",
    };
  }

  return {
    helperText: "Entre com email e senha para recuperar favoritos, comentarios e acesso premium desta conta.",
    title: "Acesso da conta",
  };
}
