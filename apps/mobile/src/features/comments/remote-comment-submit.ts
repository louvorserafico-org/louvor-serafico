type FetchLike = typeof fetch;

type CreateRemoteCommentInput = {
  body: string;
  celebrationId?: string | null;
  profileId: string;
  songId?: string | null;
};

type RemoteCommentSubmitResult = {
  detail?: string;
  message: string;
  ok: boolean;
};

export async function postRemoteComment(
  input: CreateRemoteCommentInput,
  fetchImpl: FetchLike = fetch,
  url?: string | null,
  publicKey?: string | null,
  accessToken?: string | null,
): Promise<RemoteCommentSubmitResult> {
  if (!url || !publicKey) {
    return {
      message: "Configurar Supabase antes de publicar comentario remoto.",
      ok: false,
    };
  }

  if (!accessToken) {
    return {
      message: "Sessao Supabase necessaria para publicar comentario remoto.",
      ok: false,
    };
  }

  const response = await fetchImpl(`${url}/rest/v1/comments`, {
    body: JSON.stringify({
      body: input.body.trim(),
      celebration_id: input.celebrationId ?? null,
      profile_id: input.profileId,
      song_id: input.songId ?? null,
    }),
    headers: {
      apikey: publicKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    method: "POST",
  });

  if (!response.ok) {
    const errorBody = (await response.json()) as { message?: string };

    return {
      detail: errorBody.message,
      message: "Falha ao publicar comentario remoto.",
      ok: false,
    };
  }

  return {
    message: "Comentario remoto publicado.",
    ok: true,
  };
}
