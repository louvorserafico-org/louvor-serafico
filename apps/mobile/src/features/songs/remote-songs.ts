import type { Song } from "@louvor-serafico/shared";

type FetchLike = typeof fetch;

type RemoteSongRow = {
  id: string;
  slug: string;
  title: string;
};

type RemoteSongsResult = {
  detail?: string;
  message: string;
  songs: Song[];
  status: "error" | "not_configured" | "ready";
};

export async function fetchRemoteSongs(
  fetchImpl: FetchLike = fetch,
  url?: string | null,
  publicKey?: string | null,
): Promise<RemoteSongsResult> {
  if (!url || !publicKey) {
    return {
      message: "Configurar Supabase antes da leitura remota de músicas.",
      songs: [],
      status: "not_configured",
    };
  }

  const response = await fetchImpl(`${url}/rest/v1/songs?select=id,title,slug&limit=20`, {
    headers: {
      apikey: publicKey,
      Authorization: `Bearer ${publicKey}`,
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json()) as { message?: string };

    if (errorBody.message?.includes("public.songs")) {
      return {
        message: "Tabela remota songs ainda não existe no projeto.",
        songs: [],
        status: "error",
      };
    }

    return {
      detail: errorBody.message,
      message: "Falha ao carregar músicas remotas.",
      songs: [],
      status: "error",
    };
  }

  const rows = (await response.json()) as RemoteSongRow[];

  return {
    message: "Catálogo remoto de músicas carregado.",
    songs: rows.map((row) => ({
      assets: [],
      id: row.id,
      slug: row.slug,
      title: row.title,
    })),
    status: "ready",
  };
}
