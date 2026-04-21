import type { LocalComment } from "./comment-store";

type FetchLike = typeof fetch;

type RemoteCommentRow = {
  body: string;
  id: string;
  profiles?: {
    display_name?: string | null;
  } | null;
};

type RemoteCommentsResult = {
  comments: LocalComment[];
  message: string;
  status: "error" | "not_configured" | "ready";
};

export async function fetchRemoteComments(
  fetchImpl: FetchLike = fetch,
  url?: string | null,
  publicKey?: string | null,
): Promise<RemoteCommentsResult> {
  if (!url || !publicKey) {
    return {
      comments: [],
      message: "Configurar Supabase antes da leitura remota de comentarios.",
      status: "not_configured",
    };
  }

  const response = await fetchImpl(`${url}/rest/v1/comments?select=id,body,profiles(display_name)&limit=20`, {
    headers: {
      apikey: publicKey,
      Authorization: `Bearer ${publicKey}`,
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json()) as { message?: string };

    if (errorBody.message?.includes("public.comments")) {
      return {
        comments: [],
        message: "Tabela remota comments ainda nao existe no projeto.",
        status: "error",
      };
    }

    return {
      comments: [],
      message: errorBody.message ?? "Falha ao carregar comentarios remotos.",
      status: "error",
    };
  }

  const rows = (await response.json()) as RemoteCommentRow[];

  return {
    comments: rows.map((row) => ({
      authorName: row.profiles?.display_name ?? "Usuario",
      body: row.body,
      id: row.id,
      scope: "community",
    })),
    message: "Comentarios remotos carregados.",
    status: "ready",
  };
}
