import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { toggleFavoriteSong } from "./favorite-store";
import { resolveFavoriteSource } from "./favorite-source";
import { fetchRemoteFavorites } from "./remote-favorites";
import { loadPreviewFavoriteSongIds, savePreviewFavoriteSongIds } from "@/features/preview/storage";
import { supabaseConfig } from "@/services/supabase/client";

type FavoritesContextValue = {
  favoriteSongIds: string[];
  isFavoriteSong: (songId: string) => boolean;
  sourceMessage: string;
  toggleSongFavorite: (songId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const { session } = useSupabaseSession();
  const [localFavoriteSongIds, setLocalFavoriteSongIds] = useState<string[]>([]);
  const [remoteState, setRemoteState] = useState<Awaited<ReturnType<typeof fetchRemoteFavorites>>>({
    message: "Carregando favoritos remotos.",
    songIds: [],
    status: "not_authenticated",
  });

  useEffect(() => {
    void loadPreviewFavoriteSongIds().then(setLocalFavoriteSongIds);
  }, []);

  useEffect(() => {
    void savePreviewFavoriteSongIds(localFavoriteSongIds);
  }, [localFavoriteSongIds]);

  useEffect(() => {
    let active = true;

    void fetchRemoteFavorites(
      fetch,
      supabaseConfig.url,
      supabaseConfig.publishableKey ?? supabaseConfig.anonKey,
      session.accessToken,
    ).then((result) => {
      if (active) {
        setRemoteState(result);
      }
    });

    return () => {
      active = false;
    };
  }, [session.accessToken]);

  const source = useMemo(
    () => resolveFavoriteSource(remoteState, localFavoriteSongIds),
    [localFavoriteSongIds, remoteState],
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteSongIds: source.songIds,
      isFavoriteSong: (songId: string) => source.songIds.includes(songId),
      sourceMessage: source.message,
      toggleSongFavorite: (songId: string) =>
        setLocalFavoriteSongIds((currentFavoriteSongIds) =>
          toggleFavoriteSong(currentFavoriteSongIds, songId),
        ),
    }),
    [source],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must run inside FavoritesProvider.");
  }

  return context;
}
