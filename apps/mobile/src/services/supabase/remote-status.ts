import { getSupabaseConfig, isSupabaseConfigured, type SupabaseConfig } from "./config.ts";

type FetchLike = typeof fetch;

type SupabaseAuthSettings = {
  disable_signup?: boolean;
  external?: {
    email?: boolean;
  };
  message?: string;
};

export type SupabaseRemoteStatus =
  | {
      message: string;
      status: "error";
    }
  | {
      message: string;
      status: "not_configured";
    }
  | {
      disableSignup: boolean;
      externalEmailEnabled: boolean;
      message: string;
      projectRef: string | null;
      status: "ready";
    };

export async function fetchSupabaseRemoteStatus(
  fetchImpl: FetchLike = fetch,
  config: SupabaseConfig = getSupabaseConfig(),
): Promise<SupabaseRemoteStatus> {
  if (!isSupabaseConfigured(config)) {
    return {
      message: "Configurar URL e chave pública antes da leitura remota.",
      status: "not_configured",
    };
  }

  const key = config.publishableKey ?? config.anonKey;

  if (!key) {
    return {
      message: "Configurar URL e chave pública antes da leitura remota.",
      status: "not_configured",
    };
  }

  try {
    const response = await fetchImpl(`${config.url}/auth/v1/settings`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });
    const data = (await response.json()) as SupabaseAuthSettings;

    if (!response.ok) {
      return {
        message: `Falha remota Supabase: ${normalizeErrorMessage(data.message, response.statusText)}`,
        status: "error",
      };
    }

    return {
      disableSignup: Boolean(data.disable_signup),
      externalEmailEnabled: Boolean(data.external?.email),
      message: "Configuração remota lida com sucesso.",
      projectRef: config.projectRef,
      status: "ready",
    };
  } catch (error) {
    return {
      message: `Falha remota Supabase: ${normalizeThrownError(error)}`,
      status: "error",
    };
  }
}

function normalizeErrorMessage(message?: string, fallback?: string): string {
  const preferred = message?.trim();

  if (preferred) {
    return preferred.charAt(0).toUpperCase() + preferred.slice(1);
  }

  const backup = fallback?.trim();
  return backup ? backup : "erro desconhecido";
}

function normalizeThrownError(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  return "erro desconhecido";
}
