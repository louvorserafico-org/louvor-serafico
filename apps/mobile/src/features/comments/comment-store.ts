export type LocalComment = {
  authorName: string;
  body: string;
  id: string;
  scope: "community";
};

type CreateLocalCommentInput = {
  authorName: string;
  body: string;
};

export function createLocalComment(input: CreateLocalCommentInput): LocalComment {
  const authorName = input.authorName.trim();
  const body = input.body.trim();

  if (!authorName) {
    throw new Error("Author name is required.");
  }

  if (!body) {
    throw new Error("Comment body is required.");
  }

  return {
    authorName,
    body,
    id: `comment-${Date.now()}`,
    scope: "community",
  };
}
