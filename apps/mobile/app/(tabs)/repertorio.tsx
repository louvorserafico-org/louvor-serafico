import { getInitialSongCatalog } from "@louvor-serafico/shared";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { RemoteFavoritesCard } from "@/components/RemoteFavoritesCard";
import { RemoteSongsCard } from "@/components/RemoteSongsCard";
import { SectionTitle } from "@/components/SectionTitle";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { resolveSongCatalogSource } from "@/features/songs/song-catalog-source";
import { fetchRemoteSongs } from "@/features/songs/remote-songs";
import { supabaseConfig } from "@/services/supabase/client";
import { SongCard } from "@/components/SongCard";
import { colors, spacing } from "@/theme/tokens";

export default function RepertoireScreen() {
  const localSongs = useMemo(() => getInitialSongCatalog(), []);
  const { favoriteSongIds, sourceMessage } = useFavorites();
  const [songs, setSongs] = useState(localSongs);
  const [subtitle, setSubtitle] = useState(`${favoriteSongIds.length} favorito(s) local(is) no catalogo inicial.`);

  useEffect(() => {
    let active = true;

    void fetchRemoteSongs(fetch, supabaseConfig.url, supabaseConfig.publishableKey ?? supabaseConfig.anonKey).then(
      (remote) => {
        if (active) {
          const source = resolveSongCatalogSource(remote, localSongs);
          setSongs(source.songs);
          setSubtitle(`${favoriteSongIds.length} favorito(s). ${source.message} ${sourceMessage}`);
        }
      },
    );

    return () => {
      active = false;
    };
  }, [favoriteSongIds.length, localSongs, sourceMessage]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow={`${songs.length} cantos`}
        title="Repertorio"
        subtitle={subtitle}
      />

      <SectionTitle title="Catalogo inicial" />

      <RemoteSongsCard />
      <RemoteFavoritesCard />

      <View style={styles.list}>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  list: {
    gap: spacing.md,
  },
});
