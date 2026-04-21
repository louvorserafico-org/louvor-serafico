import type { LocalSession } from "@/features/auth/session-gate";
import type { LocalComment } from "@/features/comments/comment-store";

export function parseStoredSession(raw: string | null): LocalSession {
  try {
    const parsed = raw ? (JSON.parse(raw) as Partial<LocalSession>) : null;

    if (parsed?.status === "signed_in" && typeof parsed.displayName === "string" && typeof parsed.email === "string") {
      return {
        displayName: parsed.displayName,
        email: parsed.email,
        status: "signed_in",
      };
    }

    return { status: "guest" };
  } catch {
    return { status: "guest" };
  }
}

export function parseStoredFavoriteSongIds(raw: string | null): string[] {
  try {
    const parsed = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function parseStoredComments(raw: string | null): LocalComment[] {
  try {
    const parsed = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isLocalComment);
  } catch {
    return [];
  }
}

function isLocalComment(value: unknown): value is LocalComment {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.authorName === "string" &&
    typeof candidate.body === "string" &&
    typeof candidate.id === "string" &&
    candidate.scope === "community"
  );
}
