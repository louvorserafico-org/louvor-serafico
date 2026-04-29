import { getInitialSongCatalog } from "@louvor-serafico/shared";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { buildRemoteFeedback } from "@/features/remote/remote-feedback";
import { buildRepertoireOverview } from "@/features/songs/repertoire-overview";
import { resolveSongCatalogSource } from "@/features/songs/song-catalog-source";
import { filterSongsBySearch, normalizeSongSearchTerm } from "@/features/songs/song-search";
import { fetchRemoteSongs } from "@/features/songs/remote-songs";
import { supabaseConfig } from "@/services/supabase/client";
import { SongCard } from "@/components/SongCard";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function RepertoireScreen() {
  const localSongs = useMemo(() => getInitialSongCatalog(), []);
  const { favoriteSongIds } = useFavorites();
  const [songs, setSongs] = useState(localSongs);
  const [query, setQuery] = useState("");
  const [sourceMode, setSourceMode] = useState<"local" | "remote">("local");
  const [remoteCount, setRemoteCount] = useState(localSongs.length);
  const [remoteStatus, setRemoteStatus] = useState<"error" | "not_configured" | "ready">("not_configured");
  const [remoteMessage, setRemoteMessage] = useState("Leitura do acervo em preparacao.");
  const [subtitle, setSubtitle] = useState("Um acervo liturgico para estudar, organizar e escolher com mais paz.");

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
              : "Navegue pelo repertorio e encontre o canto certo para cada momento.",
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
  const remoteFeedback = buildRemoteFeedback({
    emptyLabel: "Nenhuma musica remota encontrada.",
    itemCount: remoteCount,
    readyLabel: "musicas remotas consultadas",
    status: remoteStatus,
    statusMessage: remoteMessage,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader eyebrow={overview.eyebrow} title={overview.title} subtitle={subtitle} />

      <View style={[styles.summary, sourceMode === "remote" ? styles.summaryRemote : styles.summaryLocal]}>
        <Text style={styles.summaryEyebrow}>Acervo musical</Text>
        <Text style={styles.summaryTitle}>{overview.title}</Text>
        <Text style={styles.summaryText}>
          {sourceMode === "remote"
            ? remoteFeedback.detail
            : `${localSongs.length} cantos reunidos para estudo, escolha e preparacao.`}
        </Text>
        <Text style={styles.summaryMeta}>
          {songs.length} cantos disponiveis. {favoriteSongIds.length} guardados para consulta.
        </Text>
        <OrnamentalDivider />
        <View style={styles.searchBlock}>
          <Text style={styles.searchLabel}>Pesquisar musica</Text>
          <TextInput
            onChangeText={setQuery}
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
      </View>

      <EditorialSectionHeader
        eyebrow="Consulta"
        subtitle="Abra cada canto para consultar materiais, guardar favoritos e preparar melhor cada celebracao."
        title="Cantos disponiveis"
      />

      <View style={styles.list}>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => <SongCard key={song.id} song={song} />)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.summaryTitle}>Acervo em crescimento</Text>
            <Text style={styles.summaryText}>
              {normalizedQuery.length >= 3
                ? "Nenhum canto corresponde a esta busca."
                : "Os proximos cantos publicados aparecerao aqui para estudo, escolha e preparacao."}
            </Text>
          </View>
        )}
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
  emptyState: {
    gap: spacing.xs,
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
  summary: {
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  summaryEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  summaryLocal: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderStrong,
  },
  summaryRemote: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
  },
  summaryText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  summaryMeta: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
  },
});
