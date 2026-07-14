type FetchLike = typeof fetch;

type RemoteFavoriteRow = {
  song_id: string;
};

type RemoteFavoritesResult = {
  detail?: string;
  message: string;
  songIds: string[];
  status: "error" | "not_authenticated" | "not_configured" | "ready";
};

export async function fetchRemoteFavorites(
  fetchImpl: FetchLike = fetch,
  url?: string | null,
  publicKey?: string | null,
  accessToken?: string | null,
): Promise<RemoteFavoritesResult> {
  if (!url || !publicKey) {
    return {
      message: "Configurar Supabase antes da leitura remota de favoritos.",
      songIds: [],
      status: "not_configured",
    };
  }

  if (!accessToken) {
    return {
      message: "Sessão Supabase necessária para ler favoritos remotos.",
      songIds: [],
      status: "not_authenticated",
    };
  }

  const response = await fetchImpl(`${url}/rest/v1/favorite_songs?select=song_id&limit=50`, {
    headers: {
      apikey: publicKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json()) as { message?: string };

    if (errorBody.message?.includes("public.favorite_songs")) {
      return {
        message: "Tabela remota favorite_songs ainda não existe no projeto.",
        songIds: [],
        status: "error",
      };
    }

    return {
      detail: errorBody.message,
      message: "Falha ao carregar favoritos remotos.",
      songIds: [],
      status: "error",
    };
  }

  const rows = (await response.json()) as RemoteFavoriteRow[];

  return {
    message: "Favoritos remotos carregados.",
    songIds: rows.map((row) => row.song_id),
    status: "ready",
  };
}
