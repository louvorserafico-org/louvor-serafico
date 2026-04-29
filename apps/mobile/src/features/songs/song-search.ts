import type { Song } from "@louvor-serafico/shared";

export function normalizeSongSearchTerm(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function filterSongsBySearch(songs: Song[], rawQuery: string) {
  const query = normalizeSongSearchTerm(rawQuery);

  if (query.length < 3) {
    return songs;
  }

  return songs.filter((song) => normalizeSongSearchTerm(song.title).includes(query));
}
