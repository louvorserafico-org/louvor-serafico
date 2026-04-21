import type { Song } from "@louvor-serafico/shared";

import type { fetchRemoteSongs } from "./remote-songs";

type RemoteSongsResult = Awaited<ReturnType<typeof fetchRemoteSongs>>;

export function resolveSongCatalogSource(remote: RemoteSongsResult, localSongs: Song[]) {
  if (remote.status === "ready" && remote.songs.length > 0) {
    return {
      message: "Fonte remota ativa.",
      mode: "remote" as const,
      songs: remote.songs,
    };
  }

  if (remote.status === "ready") {
    return {
      message: "Catalogo remoto vazio. Mantendo fonte local.",
      mode: "local" as const,
      songs: localSongs,
    };
  }

  return {
    message: remote.message,
    mode: "local" as const,
    songs: localSongs,
  };
}
