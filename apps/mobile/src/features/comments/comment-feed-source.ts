import type { LocalComment } from "./comment-store";
import type { fetchRemoteComments } from "./remote-comments";

type RemoteCommentsResult = Awaited<ReturnType<typeof fetchRemoteComments>>;

export function resolveCommentFeedSource(remote: RemoteCommentsResult, localComments: LocalComment[]) {
  if (remote.status === "ready" && remote.comments.length > 0) {
    return {
      comments: [...remote.comments, ...localComments],
      message: "Comentarios remotos ativos. Preview local segue visivel neste aparelho.",
      mode: "mixed" as const,
    };
  }

  if (remote.status === "ready") {
    return {
      comments: localComments,
      message: "Comentarios remotos vazios. Mantendo preview local.",
      mode: "local" as const,
    };
  }

  return {
    comments: localComments,
    message: remote.message,
    mode: "local" as const,
  };
}
