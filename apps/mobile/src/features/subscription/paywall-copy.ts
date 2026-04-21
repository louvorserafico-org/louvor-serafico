type PaywallContext = {
  hasActiveSubscription: boolean;
  isAuthenticated: boolean;
};

type PaywallCopy = {
  actionLabel: string;
  body: string;
  eyebrow: string;
  title: string;
};

export function buildPaywallCopy(context: PaywallContext): PaywallCopy {
  if (context.hasActiveSubscription) {
    return {
      actionLabel: "Gerenciar premium",
      body: "Materiais completos liberados para sua preparacao liturgica.",
      eyebrow: "Assinatura",
      title: "Premium ativo",
    };
  }

  return {
    actionLabel: context.isAuthenticated ? "Assinar premium" : "Entrar para assinar",
    body: "Acesse partituras, cifras e materiais completos para preparar a missa com serenidade.",
    eyebrow: "Premium",
    title: "Liberar repertorio completo",
  };
}
