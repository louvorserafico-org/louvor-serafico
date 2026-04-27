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
      helperText: "Reuna seus dados principais para guardar favoritos, acompanhar partilhas e preparar sua assinatura com serenidade.",
      title: "Nova conta",
    };
  }

  return {
    helperText: "Entre com email e senha para retomar seus favoritos, suas partilhas e os materiais liberados nesta conta.",
    title: "Retome sua conta",
  };
}
