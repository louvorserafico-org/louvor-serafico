import { requestAssetSignedUrl } from "./edge-asset-url.ts";

type FetchLike = typeof fetch;

type ResolvePdfViewerSourceInput = {
  accessToken: string | null;
  assetId: string;
  bucket: string | null;
  fileUrl?: string | null;
  functionsUrl: string | null;
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

    return {
      message: result.message,
      status: result.status === "ready" ? "error" : result.status,
      url: null,
    };
  }

  const publicUrl = buildPublicStorageAssetUrl(input.supabaseUrl, input.bucket, input.storagePath);

  if (!publicUrl) {
    return {
      message: "Documento publico ainda nao foi configurado corretamente.",
      status: "not_configured",
      url: null,
    };
  }

  return {
    message: "Documento publico pronto para leitura.",
    status: "ready",
    url: publicUrl,
  };
}
