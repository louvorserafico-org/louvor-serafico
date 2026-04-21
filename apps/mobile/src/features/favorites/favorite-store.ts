export function toggleFavoriteSong(songIds: string[], songId: string): string[] {
  if (songIds.includes(songId)) {
    return songIds.filter((currentSongId) => currentSongId !== songId);
  }

  return [...songIds, songId];
}
