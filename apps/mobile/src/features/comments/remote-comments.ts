import type { LocalComment } from "./comment-store";

type FetchLike = typeof fetch;

type RemoteCommentRow = {
  body: string;
  celebrations?: {
    date_label?: string | null;
    title?: string | null;
  } | null;
  id: string;
  profiles?: {
    display_name?: string | null;
  } | null;
};

type RemoteCommentsResult = {
  comments: LocalComment[];
  detail?: string;
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
      message: "Configurar Supabase antes da leitura remota de comentários.",
      status: "not_configured",
    };
  }

  const response = await fetchImpl(
    `${url}/rest/v1/comments?select=id,body,profiles(display_name),celebrations(title,date_label)&limit=20`,
    {
    headers: {
      apikey: publicKey,
      Authorization: `Bearer ${publicKey}`,
    },
    },
  );

  if (!response.ok) {
    const errorBody = (await response.json()) as { message?: string };

    if (errorBody.message?.includes("public.comments")) {
      return {
        comments: [],
        message: "Tabela remota comments ainda não existe no projeto.",
        status: "error",
      };
    }

    return {
      comments: [],
      detail: errorBody.message,
      message: "Falha ao carregar comentários remotos.",
      status: "error",
    };
  }

  const rows = (await response.json()) as RemoteCommentRow[];

  return {
    comments: rows.map((row) => ({
      authorName: row.profiles?.display_name ?? "Usuário",
      body: row.body,
      celebrationDateLabel: row.celebrations?.date_label ?? undefined,
      celebrationTitle: row.celebrations?.title ?? undefined,
      id: row.id,
      scope: "community",
    })),
    message: "Comentários remotos carregados.",
    status: "ready",
  };
}
