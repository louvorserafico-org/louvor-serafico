import AsyncStorage from "@react-native-async-storage/async-storage";

import type { LocalSession } from "@/features/auth/session-gate";
import type { LocalComment } from "@/features/comments/comment-store";
import { parseStoredComments, parseStoredFavoriteSongIds, parseStoredSession } from "./storage-parsers";

export const previewStorageKeys = {
  comments: "louvor-serafico.preview.comments",
  favoriteSongIds: "louvor-serafico.preview.favorite-song-ids",
  session: "louvor-serafico.preview.session",
} as const;

export async function loadPreviewSession(): Promise<LocalSession> {
  return parseStoredSession(await AsyncStorage.getItem(previewStorageKeys.session));
}

export async function savePreviewSession(session: LocalSession): Promise<void> {
  await AsyncStorage.setItem(previewStorageKeys.session, JSON.stringify(session));
}

export async function loadPreviewFavoriteSongIds(): Promise<string[]> {
  return parseStoredFavoriteSongIds(await AsyncStorage.getItem(previewStorageKeys.favoriteSongIds));
}

export async function savePreviewFavoriteSongIds(songIds: string[]): Promise<void> {
  await AsyncStorage.setItem(previewStorageKeys.favoriteSongIds, JSON.stringify(songIds));
}

export async function loadPreviewComments(): Promise<LocalComment[]> {
  return parseStoredComments(await AsyncStorage.getItem(previewStorageKeys.comments));
}

export async function savePreviewComments(comments: LocalComment[]): Promise<void> {
  await AsyncStorage.setItem(previewStorageKeys.comments, JSON.stringify(comments));
}
