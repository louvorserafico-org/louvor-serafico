import type { LocalSession } from "@/features/auth/session-gate";
import type { LocalComment } from "@/features/comments/comment-store";
import { parseStoredComments, parseStoredFavoriteSongIds, parseStoredSession } from "./storage-parsers.ts";

export const previewStorageKeys = {
  comments: "louvor-serafico.preview.comments",
  favoriteSongIds: "louvor-serafico.preview.favorite-song-ids",
  session: "louvor-serafico.preview.session",
} as const;

type StorageAdapter = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
};

type PreviewStorage = {
  loadComments: () => Promise<LocalComment[]>;
  loadFavoriteSongIds: () => Promise<string[]>;
  loadSession: () => Promise<LocalSession>;
  saveComments: (comments: LocalComment[]) => Promise<void>;
  saveFavoriteSongIds: (songIds: string[]) => Promise<void>;
  saveSession: (session: LocalSession) => Promise<void>;
};

const memoryStorage = new Map<string, string>();

export function createPreviewStorage(nativeStorage: StorageAdapter | null): PreviewStorage {
  async function getItem(key: string): Promise<string | null> {
    try {
      return await nativeStorage?.getItem(key) ?? memoryStorage.get(key) ?? null;
    } catch {
      return memoryStorage.get(key) ?? null;
    }
  }

  async function setItem(key: string, value: string): Promise<void> {
    memoryStorage.set(key, value);

    try {
      await nativeStorage?.setItem(key, value);
    } catch {
      // Expo Go may not include AsyncStorage native module. Memory keeps preview UX usable.
    }
  }

  return {
    loadComments: async () => parseStoredComments(await getItem(previewStorageKeys.comments)),
    loadFavoriteSongIds: async () => parseStoredFavoriteSongIds(await getItem(previewStorageKeys.favoriteSongIds)),
    loadSession: async () => parseStoredSession(await getItem(previewStorageKeys.session)),
    saveComments: async (comments) => setItem(previewStorageKeys.comments, JSON.stringify(comments)),
    saveFavoriteSongIds: async (songIds) => setItem(previewStorageKeys.favoriteSongIds, JSON.stringify(songIds)),
    saveSession: async (session) => setItem(previewStorageKeys.session, JSON.stringify(session)),
  };
}

const previewStorage = createPreviewStorage(null);

export async function loadPreviewSession(): Promise<LocalSession> {
  return previewStorage.loadSession();
}

export async function savePreviewSession(session: LocalSession): Promise<void> {
  await previewStorage.saveSession(session);
}

export async function loadPreviewFavoriteSongIds(): Promise<string[]> {
  return previewStorage.loadFavoriteSongIds();
}

export async function savePreviewFavoriteSongIds(songIds: string[]): Promise<void> {
  await previewStorage.saveFavoriteSongIds(songIds);
}

export async function loadPreviewComments(): Promise<LocalComment[]> {
  return previewStorage.loadComments();
}

export async function savePreviewComments(comments: LocalComment[]): Promise<void> {
  await previewStorage.saveComments(comments);
}
