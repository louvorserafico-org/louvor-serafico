import type { Celebration } from "@louvor-serafico/shared";

type FetchLike = typeof fetch;

type RemoteCelebrationRow = {
  date_label: string;
  date_month_day: string;
  id: string;
  slug: string;
  title: string;
};

type RemoteCelebrationsResult = {
  celebrations: Celebration[];
  detail?: string;
  message: string;
  status: "error" | "not_configured" | "ready";
};

export async function fetchRemoteCelebrations(
  fetchImpl: FetchLike = fetch,
  url?: string | null,
  publicKey?: string | null,
): Promise<RemoteCelebrationsResult> {
  if (!url || !publicKey) {
    return {
      celebrations: [],
      message: "Configurar Supabase antes da leitura remota de celebrações.",
      status: "not_configured",
    };
  }

  const response = await fetchImpl(
    `${url}/rest/v1/celebrations?select=id,title,slug,date_label,date_month_day&limit=20`,
    {
      headers: {
        apikey: publicKey,
        Authorization: `Bearer ${publicKey}`,
      },
    },
  );

  if (!response.ok) {
    const errorBody = (await response.json()) as { message?: string };

    if (errorBody.message?.includes("public.celebrations")) {
      return {
        celebrations: [],
        message: "Tabela remota celebrations ainda não existe no projeto.",
        status: "error",
      };
    }

    return {
      celebrations: [],
      detail: errorBody.message,
      message: "Falha ao carregar celebrações remotas.",
      status: "error",
    };
  }

  const rows = (await response.json()) as RemoteCelebrationRow[];

  return {
    celebrations: rows.map((row) => ({
      dateLabel: row.date_label,
      dateMonthDay: row.date_month_day,
      id: row.id,
      recommendations: [],
      slug: row.slug,
      songs: [],
      title: row.title,
    })),
    message: "Calendário remoto carregado.",
    status: "ready",
  };
}
