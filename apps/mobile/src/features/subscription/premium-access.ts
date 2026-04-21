import type { SongAsset } from "@louvor-serafico/shared";

type PremiumAccessContext = {
  hasActiveSubscription: boolean;
  isAuthenticated: boolean;
};

type PremiumAccessResult = {
  canAccess: boolean;
  label: string;
  message: string;
};

export function resolveAssetAccess(asset: SongAsset, context: PremiumAccessContext): PremiumAccessResult {
  if (!asset.premium) {
    return {
      canAccess: true,
      label: "Livre",
      message: "Material livre para consulta.",
    };
  }

  if (context.hasActiveSubscription) {
    return {
      canAccess: true,
      label: "Premium liberado",
      message: "Assinatura ativa. Material premium liberado.",
    };
  }

  if (context.isAuthenticated) {
    return {
      canAccess: false,
      label: "Premium",
      message: "Assinatura necessaria para acessar este material.",
    };
  }

  return {
    canAccess: false,
    label: "Premium",
    message: "Entre no app para assinar e acessar este material.",
  };
}
