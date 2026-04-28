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
      helperText: "Reuna seus dados principais para guardar favoritos, acompanhar partilhas e manter seu ministerio em ordem.",
      title: "Criar conta",
    };
  }

  return {
    helperText: "Entre com email e senha para retomar favoritos, partilhas e materiais desta conta.",
    title: "Entrar na conta",
  };
}
