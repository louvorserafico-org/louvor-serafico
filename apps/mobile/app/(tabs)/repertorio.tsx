import { getInitialSongCatalog } from "@louvor-serafico/shared";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { buildRemoteFeedback } from "@/features/remote/remote-feedback";
import { buildRepertoireOverview } from "@/features/songs/repertoire-overview";
import { resolveSongCatalogSource } from "@/features/songs/song-catalog-source";
import { fetchRemoteSongs } from "@/features/songs/remote-songs";
import { supabaseConfig } from "@/services/supabase/client";
import { SongCard } from "@/components/SongCard";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";
import { Text } from "react-native";

export default function RepertoireScreen() {
  const localSongs = useMemo(() => getInitialSongCatalog(), []);
  const { favoriteSongIds } = useFavorites();
  const [songs, setSongs] = useState(localSongs);
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
  const remoteFeedback = buildRemoteFeedback({
    emptyLabel: "Nenhuma musica remota encontrada.",
    itemCount: remoteCount,
    readyLabel: "musicas remotas consultadas",
    status: remoteStatus,
    statusMessage: remoteMessage,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow={overview.eyebrow}
        title={overview.title}
        subtitle={subtitle}
      />

      <View style={[styles.summary, sourceMode === "remote" ? styles.summaryRemote : styles.summaryLocal]}>
        <Text style={styles.summaryTitle}>{overview.title}</Text>
        <Text style={styles.summaryText}>
          {sourceMode === "remote" ? remoteFeedback.detail : `${localSongs.length} cantos reunidos para estudo e preparacao.`}
        </Text>
      </View>

      <SectionTitle title="Catalogo inicial" />

      <View style={styles.list}>
        {songs.length > 0 ? (
          songs.map((song) => <SongCard key={song.id} song={song} />)
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.summaryTitle}>Acervo ainda em formacao</Text>
            <Text style={styles.summaryText}>Novos cantos aparecerao aqui conforme o repertorio crescer.</Text>
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
  emptyCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  list: {
    gap: spacing.md,
  },
  summary: {
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
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
  summaryTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontStyle: "italic",
    fontWeight: "700",
  },
});
