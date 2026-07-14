import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { createLocalComment, type LocalComment } from "./comment-store";
import { loadPreviewComments, savePreviewComments } from "@/features/preview/storage";

type CommentsContextValue = {
  comments: LocalComment[];
  addCommunityComment: (input: {
    authorName: string;
    body: string;
    celebrationDateLabel?: string;
    celebrationTitle?: string;
  }) => void;
};

const initialComments: LocalComment[] = [
  {
    authorName: "Coral São Miguel",
    body: "Usamos este salmo no ensaio de quarta e funcionou muito bem com assembleia.",
    id: "comment-initial-1",
    scope: "community",
  },
  {
    authorName: "Equipe de canto",
    body: "Comunhao ficou melhor um tom abaixo para comunidade acompanhar.",
    id: "comment-initial-2",
    scope: "community",
  },
];

const CommentsContext = createContext<CommentsContextValue | null>(null);

export function CommentsProvider({ children }: PropsWithChildren) {
  const [comments, setComments] = useState<LocalComment[]>(initialComments);

  useEffect(() => {
    void loadPreviewComments().then((storedComments) => {
      if (storedComments.length > 0) {
        setComments(storedComments);
      }
    });
  }, []);

  useEffect(() => {
    void savePreviewComments(comments);
  }, [comments]);

  const value = useMemo<CommentsContextValue>(
    () => ({
      comments,
      addCommunityComment: (input) =>
        setComments((currentComments) => [createLocalComment(input), ...currentComments]),
    }),
    [comments],
  );

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
}

export function useCommentsPreview() {
  const context = useContext(CommentsContext);

  if (!context) {
    throw new Error("useCommentsPreview must run inside CommentsProvider.");
  }

  return context;
}
