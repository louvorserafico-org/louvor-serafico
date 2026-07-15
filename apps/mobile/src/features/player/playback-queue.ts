import type { Song } from "@louvor-serafico/shared";

export type RepeatMode = "off" | "all" | "one";

export type PlayableTrack = {
  assetId: string;
  premium: boolean;
  slug: string;
  songId: string;
  storagePath: string;
  title: string;
};

export function buildPlayableQueue(songs: Song[]): PlayableTrack[] {
  const tracks: PlayableTrack[] = [];

  for (const song of songs) {
    const audioAsset = song.assets.find((asset) => asset.type === "audio");

    if (!audioAsset) {
      continue;
    }

    tracks.push({
      assetId: audioAsset.id,
      premium: audioAsset.premium,
      slug: song.slug,
      songId: song.id,
      storagePath: audioAsset.path,
      title: song.title,
    });
  }

  return tracks;
}

export function getNextTrackIndex(queueLength: number, currentIndex: number, repeatMode: RepeatMode): number | null {
  if (queueLength === 0) {
    return null;
  }

  if (repeatMode === "one") {
    return currentIndex;
  }

  const nextIndex = currentIndex + 1;

  if (nextIndex < queueLength) {
    return nextIndex;
  }

  return repeatMode === "all" ? 0 : null;
}

export function getPreviousTrackIndex(
  queueLength: number,
  currentIndex: number,
  repeatMode: RepeatMode,
): number | null {
  if (queueLength === 0) {
    return null;
  }

  if (repeatMode === "one") {
    return currentIndex;
  }

  const previousIndex = currentIndex - 1;

  if (previousIndex >= 0) {
    return previousIndex;
  }

  return repeatMode === "all" ? queueLength - 1 : 0;
}

export function toggleRepeatMode(current: RepeatMode): RepeatMode {
  if (current === "off") {
    return "all";
  }

  if (current === "all") {
    return "one";
  }

  return "off";
}
