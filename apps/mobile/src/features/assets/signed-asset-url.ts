import type { SongAsset } from "@louvor-serafico/shared";

import { resolveAssetAccess } from "../subscription/premium-access.ts";

type AssetAccessContext = {
  hasActiveSubscription: boolean;
  isAuthenticated: boolean;
};

type StorageClient = {
  storage: {
    from: (bucket: string) => {
      createSignedUrl: (
        path: string,
        expiresIn: number,
      ) => Promise<{
        data: { signedUrl?: string | null } | null;
        error: { message?: string } | null;
      }>;
    };
  };
};

type SignedAssetUrlOptions = {
  bucket: string | null;
  client: StorageClient | null;
  expiresIn?: number;
};

type SignedAssetUrlResult = {
  message: string;
  status: "blocked" | "error" | "not_configured" | "ready";
  url: string | null;
};

export async function resolveSignedAssetUrl(
  asset: SongAsset,
  context: AssetAccessContext,
  options: SignedAssetUrlOptions,
): Promise<SignedAssetUrlResult> {
  const access = resolveAssetAccess(asset, context);

  if (!access.canAccess) {
    return {
      message: access.message,
      status: "blocked",
      url: null,
    };
  }

  if (!options.client || !options.bucket) {
    return {
      message: "Configurar Supabase Storage antes de abrir materiais.",
      status: "not_configured",
      url: null,
    };
  }

  if (!asset.path) {
    return {
      message: "Material sem caminho de armazenamento.",
      status: "error",
      url: null,
    };
  }

  const result = await options.client.storage
    .from(options.bucket)
    .createSignedUrl(asset.path, options.expiresIn ?? 300);

  if (result.error || !result.data?.signedUrl) {
    return {
      message: result.error?.message ?? "Falha ao gerar link temporario.",
      status: "error",
      url: null,
    };
  }

  return {
    message: "Material liberado com link temporario.",
    status: "ready",
    url: result.data.signedUrl,
  };
}
