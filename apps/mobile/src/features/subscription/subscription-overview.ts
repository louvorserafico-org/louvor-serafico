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
      helperText: "Materiais premium liberados. Partituras, cifras e arquivos completos seguem ativos nesta conta.",
      status: "active",
      title: "Premium ativo",
    };
  }

  if (input.isAuthenticated) {
    return {
      helperText: "Conta pronta para assinatura. Falta ativar premium para liberar materiais completos.",
      status: "ready",
      title: "Assinatura disponivel",
    };
  }

  return {
    helperText: "Entre na conta antes de assinar. Depois disso, o fluxo premium fica pronto para liberacao.",
    status: "locked",
    title: "Entrada necessaria",
  };
}
