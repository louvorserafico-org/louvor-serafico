import type { Song } from "@louvor-serafico/shared";

type FetchLike = typeof fetch;

type RemoteSongRow = {
  id: string;
  slug: string;
  title: string;
};

type RemoteSongsResult = {
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
      message: "Configurar Supabase antes da leitura remota de musicas.",
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
        message: "Tabela remota songs ainda nao existe no projeto.",
        songs: [],
        status: "error",
      };
    }

    return {
      message: errorBody.message ?? "Falha ao carregar musicas remotas.",
      songs: [],
      status: "error",
    };
  }

  const rows = (await response.json()) as RemoteSongRow[];

  return {
    message: "Catalogo remoto de musicas carregado.",
    songs: rows.map((row) => ({
      assets: [],
      id: row.id,
      slug: row.slug,
      title: row.title,
    })),
    status: "ready",
  };
}
