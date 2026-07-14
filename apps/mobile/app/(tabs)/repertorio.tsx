import { getInitialSongCatalog } from "@louvor-serafico/shared";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SongCard } from "@/components/SongCard";
import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { buildRemoteFeedback } from "@/features/remote/remote-feedback";
import { buildRepertoireOverview } from "@/features/songs/repertoire-overview";
import { fetchRemoteSongs } from "@/features/songs/remote-songs";
import { filterSongsBySearch, normalizeSongSearchTerm } from "@/features/songs/song-search";
import { resolveSongCatalogSource } from "@/features/songs/song-catalog-source";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, radii, spacing, typography, fontFamilies } from "@/theme/tokens";

export default function RepertoireScreen() {
  const localSongs = useMemo(() => getInitialSongCatalog(), []);
  const { favoriteSongIds } = useFavorites();
  const [songs, setSongs] = useState(localSongs);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [sourceMode, setSourceMode] = useState<"local" | "remote">("local");
  const [remoteCount, setRemoteCount] = useState(localSongs.length);
  const [remoteStatus, setRemoteStatus] = useState<"error" | "not_configured" | "ready">("not_configured");
  const [remoteMessage, setRemoteMessage] = useState("Leitura do acervo em preparação.");
  const [subtitle, setSubtitle] = useState("Um acervo litúrgico para estudar, organizar e escolher com mais paz.");

  useEffect(() => {
    let active = true;

    void fetchRemoteSongs(fetch, supabaseConfig.url, supabaseConfig.publishableKey ?? supabaseConfig.anonKey).then(
      (remote) => {
        if (active) {
          const source = resolveSongCatalogSource(remote, localSongs);
          setSongs(source.songs);
          setSourceMode(source.mode);
          setRemoteCount(remote.songs.length);
          setRemoteStatus(remote.status);
          setRemoteMessage(remote.message);
          setSubtitle(
            favoriteSongIds.length > 0
              ? `${favoriteSongIds.length} canto${favoriteSongIds.length > 1 ? "s" : ""} guardado${favoriteSongIds.length > 1 ? "s" : ""} para consulta rapida.`
              : "Navegue pelo repertório e encontre o canto certo para cada momento.",
          );
        }
      },
    );

    return () => {
      active = false;
    };
  }, [favoriteSongIds.length, localSongs]);

  const overview = buildRepertoireOverview({
    favoriteCount: favoriteSongIds.length,
    remoteCount: songs.length,
    sourceMode,
  });
  const filteredSongs = useMemo(() => filterSongsBySearch(songs, query), [query, songs]);
  const normalizedQuery = normalizeSongSearchTerm(query);
  const visibleSongs = useMemo(() => filteredSongs.slice(0, visibleCount), [filteredSongs, visibleCount]);
  const remoteFeedback = buildRemoteFeedback({
    emptyLabel: "Nenhuma música remota encontrada.",
    itemCount: remoteCount,
    readyLabel: "músicas remotas consultadas",
    status: remoteStatus,
    statusMessage: remoteMessage,
  });

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
      <PageHeader eyebrow={overview.eyebrow} title="Repertorio" subtitle={subtitle} />

      <View style={styles.searchBlock}>
        <Text style={styles.searchLabel}>Pesquisar música</Text>
        <TextInput
          onChangeText={(value) => {
            setQuery(value);
            setVisibleCount(10);
          }}
          placeholder="Digite o nome do canto"
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
          value={query}
        />
        <Text style={styles.searchHint}>
          {normalizedQuery.length >= 3
            ? `${filteredSongs.length} resultado${filteredSongs.length === 1 ? "" : "s"} encontrado${filteredSongs.length === 1 ? "" : "s"}.`
            : "A busca comeca a partir de 3 caracteres."}
        </Text>
      </View>

      <EditorialSectionHeader
        eyebrow="Lista"
        subtitle={`${songs.length} música${songs.length === 1 ? "" : "s"} disponive${songs.length === 1 ? "l" : "is"}.`}
        title="Músicas"
      />

      <View style={styles.list}>
        {visibleSongs.length > 0 ? (
          visibleSongs.map((song) => <SongCard key={song.id} song={song} />)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Acervo em crescimento</Text>
            <Text style={styles.emptyText}>
              {normalizedQuery.length >= 3
                ? "Nenhum canto corresponde a esta busca."
                : "Os próximos cantos publicados aparecerao aqui para estudo, escolha e preparação."}
            </Text>
          </View>
        )}
        {filteredSongs.length > visibleCount ? (
          <Pressable accessibilityRole="button" onPress={() => setVisibleCount((current) => current + 10)} style={styles.showMoreButton}>
            <Text style={styles.showMoreText}>Mostrar mais</Text>
          </Pressable>
        ) : null}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  emptyState: {
    gap: spacing.xs,
  },
  emptyText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
  },
  list: {
    gap: spacing.md,
  },
  searchBlock: {
    gap: spacing.xs,
  },
  searchHint: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  searchInput: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    padding: spacing.md,
  },
  searchLabel: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  showMoreButton: {
    alignSelf: "flex-start",
    paddingTop: spacing.sm,
  },
  showMoreText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
});
