import type { fetchRemoteFavorites } from "./remote-favorites";

type RemoteFavoritesResult = Awaited<ReturnType<typeof fetchRemoteFavorites>>;

export function resolveFavoriteSource(remote: RemoteFavoritesResult, localSongIds: string[]) {
  if (remote.status === "ready" && remote.songIds.length > 0) {
    return {
      message: "Favoritos remotos ativos. Preview local segue visivel neste aparelho.",
      mode: "mixed" as const,
      songIds: Array.from(new Set([...remote.songIds, ...localSongIds])),
    };
  }

  if (remote.status === "ready") {
    return {
      message: "Favoritos remotos vazios. Mantendo preview local.",
      mode: "local" as const,
      songIds: localSongIds,
    };
  }

  return {
    message: remote.message,
    mode: "local" as const,
    songIds: localSongIds,
  };
}
