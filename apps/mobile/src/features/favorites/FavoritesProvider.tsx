import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";

import { toggleFavoriteSong } from "./favorite-store";

type FavoritesContextValue = {
  favoriteSongIds: string[];
  isFavoriteSong: (songId: string) => boolean;
  toggleSongFavorite: (songId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoriteSongIds, setFavoriteSongIds] = useState<string[]>([]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteSongIds,
      isFavoriteSong: (songId: string) => favoriteSongIds.includes(songId),
      toggleSongFavorite: (songId: string) =>
        setFavoriteSongIds((currentFavoriteSongIds) =>
          toggleFavoriteSong(currentFavoriteSongIds, songId),
        ),
    }),
    [favoriteSongIds],
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
