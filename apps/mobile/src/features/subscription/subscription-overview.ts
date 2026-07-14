type SubscriptionOverviewInput = {
  hasActiveSubscription: boolean;
  isAuthenticated: boolean;
};

export type SubscriptionOverview = {
  helperText: string;
  status: "active" | "locked" | "ready";
  title: string;
};

export function buildSubscriptionOverview(input: SubscriptionOverviewInput): SubscriptionOverview {
  if (input.hasActiveSubscription) {
    return {
      helperText: "Partituras, cifras e materiais completos seguem liberados nesta conta.",
      status: "active",
      title: "Assinatura ativa",
    };
  }

  if (input.isAuthenticated) {
    return {
      helperText: "Sua conta já está pronta. Falta apenas ativar o premium para liberar o acervo completo.",
      status: "ready",
      title: "Premium disponível",
    };
  }

  return {
    helperText: "Entre na sua conta antes de assinar e manter o acesso premium vinculado ao seu perfil.",
    status: "locked",
    title: "Entrada necessária",
  };
}
