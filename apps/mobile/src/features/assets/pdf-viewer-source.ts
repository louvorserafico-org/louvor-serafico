import { requestAssetSignedUrl } from "./edge-asset-url.ts";

type FetchLike = typeof fetch;

type ResolvePdfViewerSourceInput = {
  accessToken: string | null;
  assetId: string;
  bucket: string | null;
  fileUrl?: string | null;
  functionsUrl: string | null;
  allowPublicFallback?: boolean;
  premium: boolean;
  storagePath: string;
  supabaseUrl: string | null;
};

export type PdfViewerSourceResult =
  | {
      message: string;
      status: "blocked" | "error" | "not_configured";
      url: null;
    }
  | {
      message: string;
      status: "ready";
      url: string;
    };

export function buildPublicStorageAssetUrl(
  supabaseUrl: string | null | undefined,
  bucket: string | null | undefined,
  storagePath: string,
): string | null {
  const trimmedUrl = supabaseUrl?.trim();
  const trimmedBucket = bucket?.trim();
  const trimmedPath = storagePath.trim().replace(/^\/+/, "");

  if (!trimmedUrl || !trimmedBucket || !trimmedPath) {
    return null;
  }

  const encodedPath = trimmedPath
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${trimmedUrl}/storage/v1/object/public/${encodeURIComponent(trimmedBucket)}/${encodedPath}`;
}

export async function resolvePdfViewerSource(
  input: ResolvePdfViewerSourceInput,
  fetchImpl: FetchLike = fetch,
): Promise<PdfViewerSourceResult> {
  if (input.fileUrl?.trim()) {
    return {
      message: "Documento pronto para leitura.",
      status: "ready",
      url: input.fileUrl.trim(),
    };
  }

  if (input.premium) {
    const result = await requestAssetSignedUrl(
      input.assetId,
      {
        accessToken: input.accessToken,
        functionsUrl: input.functionsUrl,
      },
      fetchImpl,
    );

    if (result.status === "ready" && result.url) {
      return {
        message: result.message,
        status: "ready",
        url: result.url,
      };
    }

    if (input.allowPublicFallback) {
      const publicUrl = buildPublicStorageAssetUrl(input.supabaseUrl, input.bucket, input.storagePath);

      if (publicUrl) {
        return {
          message: "Material pÃºblico pronto para leitura.",
          status: "ready",
          url: publicUrl,
        };
      }
    }

    return {
      message: result.message,
      status: result.status === "ready" ? "error" : result.status,
      url: null,
    };
  }

  const publicUrl = buildPublicStorageAssetUrl(input.supabaseUrl, input.bucket, input.storagePath);

  if (!publicUrl) {
    return {
      message: "Documento pÃºblico ainda nÃ£o foi configurado corretamente.",
      status: "not_configured",
      url: null,
    };
  }

  return {
    message: "Documento pÃºblico pronto para leitura.",
    status: "ready",
    url: publicUrl,
  };
}

export function buildPdfCacheFileName(assetId: string, storagePath: string, documentLabel: string) {
  const base = assetId.trim() || storagePath.trim() || documentLabel.trim() || "documento";

  return `${base}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .concat(".pdf");
}

