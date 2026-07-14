type FetchLike = typeof fetch;

type RequestAssetSignedUrlConfig = {
  accessToken: string | null;
  functionsUrl: string | null;
};

type RequestAssetSignedUrlResult = {
  message: string;
  status: "blocked" | "error" | "not_configured" | "ready";
  url: string | null;
};

export async function requestAssetSignedUrl(
  assetId: string,
  config: RequestAssetSignedUrlConfig,
  fetchImpl: FetchLike = fetch,
): Promise<RequestAssetSignedUrlResult> {
  if (!config.functionsUrl) {
    return {
      message: "Configurar Supabase Functions antes de abrir materiais.",
      status: "not_configured",
      url: null,
    };
  }

  if (!config.accessToken) {
    return {
      message: "Sessão real necessária para abrir material premium.",
      status: "blocked",
      url: null,
    };
  }

  const response = await fetchImpl(`${config.functionsUrl}/create-asset-signed-url`, {
    body: JSON.stringify({ assetId }),
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const body = await readJson(response);

  if (!response.ok) {
    return {
      message: body.message ?? "Falha ao gerar link temporario.",
      status: "error",
      url: null,
    };
  }

  if (!body.signedUrl) {
    return {
      message: "Link temporario indisponível.",
      status: "error",
      url: null,
    };
  }

  return {
    message: "Material liberado com link temporario.",
    status: "ready",
    url: body.signedUrl,
  };
}

async function readJson(response: Response): Promise<{ message?: string; signedUrl?: string }> {
  try {
    return await response.json();
  } catch {
    return {};
  }
}
