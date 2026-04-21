type FetchLike = typeof fetch;

type ToggleRemoteFavoriteInput = {
  accessToken: string | null;
  isFavorite: boolean;
  profileId: string;
  publicKey?: string | null;
  songId: string;
  url?: string | null;
};

type ToggleRemoteFavoriteResult = {
  message: string;
  ok: boolean;
};

export async function toggleRemoteFavorite(
  input: ToggleRemoteFavoriteInput,
  fetchImpl: FetchLike = fetch,
): Promise<ToggleRemoteFavoriteResult> {
  if (!input.url || !input.publicKey) {
    return {
      message: "Configurar Supabase antes de sincronizar favoritos remotos.",
      ok: false,
    };
  }

  if (!input.accessToken) {
    return {
      message: "Sessao Supabase necessaria para sincronizar favoritos remotos.",
      ok: false,
    };
  }

  const request =
    input.isFavorite
      ? {
          method: "DELETE",
          url: `${input.url}/rest/v1/favorite_songs?profile_id=eq.${input.profileId}&song_id=eq.${input.songId}`,
        }
      : {
          body: JSON.stringify({
            profile_id: input.profileId,
            song_id: input.songId,
          }),
          method: "POST",
          url: `${input.url}/rest/v1/favorite_songs`,
        };

  const response = await fetchImpl(request.url, {
    body: request.body,
    headers: {
      apikey: input.publicKey,
      Authorization: `Bearer ${input.accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    method: request.method,
  });

  if (!response.ok) {
    const errorBody = (await response.json()) as { message?: string };

    return {
      message: errorBody.message ?? "Falha ao sincronizar favorito remoto.",
      ok: false,
    };
  }

  return {
    message: input.isFavorite ? "Favorito remoto removido." : "Favorito remoto salvo.",
    ok: true,
  };
}
