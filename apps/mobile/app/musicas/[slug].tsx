import { findSongBySlug } from "@louvor-serafico/shared";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { requestAssetSignedUrl } from "@/features/assets/edge-asset-url";
import { useSessionPreview } from "@/features/auth/SessionProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { fetchRemoteSongDetail } from "@/features/songs/remote-song-detail";
import { buildSongDetailOverview } from "@/features/songs/song-detail-overview";
import { resolveSongAssetAction } from "@/features/songs/song-asset-action";
import { resolveAssetAccess } from "@/features/subscription/premium-access";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function SongDetailScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const localSong = findSongBySlug(params.slug ?? "");
  const [remoteSong, setRemoteSong] = useState<typeof localSong | null>(null);
  const [assetMessages, setAssetMessages] = useState<Record<string, string>>({});
  const [sourceMode, setSourceMode] = useState<"local" | "remote">("local");
  const [subtitle, setSubtitle] = useState("Um canto preparado para servir a celebracao com beleza e ordem.");
  const song = remoteSong ?? localSong;
  const { session } = useSessionPreview();
  const { session: supabaseSession } = useSupabaseSession();
  const { isFavoriteSong, toggleSongFavorite } = useFavorites();
  const { hasActiveSubscription } = useSubscriptionPreview();
  const canFavorite = session.status === "signed_in" || supabaseSession.status === "authenticated";
  const isAuthenticated = canFavorite;

  useEffect(() => {
    let active = true;

    void fetchRemoteSongDetail(
      params.slug ?? "",
      fetch,
      supabaseConfig.url,
      supabaseConfig.publishableKey ?? supabaseConfig.anonKey,
    ).then((result) => {
      if (!active) {
        return;
      }

      setRemoteSong(result.song ?? null);
      setSourceMode(result.song ? "remote" : "local");
      setSubtitle(result.song ? "Materiais prontos para acompanhar seu estudo e preparo." : "Detalhe inicial disponivel para consulta e estudo.");
    });

    return () => {
      active = false;
    };
  }, [params.slug]);

  if (!song) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ headerShown: true, title: "Musica" }} />
        <PageHeader
          eyebrow="Nao encontrada"
          title="Canto indisponivel"
          subtitle="Este canto ainda nao esta disponivel no acervo."
        />
      </ScrollView>
    );
  }

  const isFavorite = isFavoriteSong(song.id);
  const overview = buildSongDetailOverview({
    assetCount: song.assets.length,
    favoriteEnabled: canFavorite,
    sourceMode,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Musica" }} />
      <PageHeader eyebrow="Canto sacro" title={song.title} subtitle={subtitle} />

      <View style={[styles.summary, sourceMode === "remote" ? styles.summaryRemote : styles.summaryLocal]}>
        <Text style={styles.summaryEyebrow}>Detalhe do canto</Text>
        <Text style={styles.summaryTitle}>Materiais do canto</Text>
        <Text style={styles.summaryText}>{overview.helperText}</Text>
      </View>

      <SectionTitle title="Materiais" />

      <View style={[styles.favoriteCard, canFavorite ? styles.favoriteReady : styles.favoriteBlocked]}>
        <Text style={styles.favoriteEyebrow}>{canFavorite ? "Favoritos" : "Conta"}</Text>
        <Text style={styles.assetTitle}>{canFavorite ? "Guardar entre favoritos" : "Entre para guardar este canto"}</Text>
        <Text style={styles.assetMeta}>
          {canFavorite
            ? "Mantenha este canto por perto para voltar a ele sempre que precisar."
            : "Com sua conta ativa, seus cantos preferidos ficam sempre mais proximos."}
        </Text>
        <Link asChild href={canFavorite ? `/musicas/${song.slug}` : "/entrar"}>
          <Pressable
            disabled={!canFavorite}
            onPress={() => {
              if (canFavorite) {
                void toggleSongFavorite(song.id);
              }
            }}
            style={[styles.favoriteButton, !canFavorite ? styles.favoriteButtonSecondary : undefined]}
          >
            <Text style={[styles.favoriteButtonText, !canFavorite ? styles.favoriteButtonTextSecondary : undefined]}>
              {canFavorite ? (isFavorite ? "Remover dos favoritos" : "Guardar favorito") : "Entrar na conta"}
            </Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.list}>
        {song.assets.length > 0 ? (
          song.assets.map((asset) => {
            const access = resolveAssetAccess(asset, { hasActiveSubscription, isAuthenticated });
            const action = resolveSongAssetAction({
              canAccess: access.canAccess,
              hasActiveSubscription,
              isAuthenticated,
            });

            return (
              <View key={asset.id} style={styles.asset}>
                <Text style={styles.assetEyebrow}>Material</Text>
                <Text style={styles.assetTitle}>{asset.title}</Text>
                <Text style={styles.assetMeta}>{access.label}</Text>
                <Text style={styles.assetPath}>
                  {access.canAccess ? "Disponivel para abrir agora." : access.message}
                </Text>
                {assetMessages[asset.id] ? <Text style={styles.assetPath}>{assetMessages[asset.id]}</Text> : null}
                {action.kind === "open" ? (
                  <Pressable
                    onPress={() => {
                      void requestAssetSignedUrl(
                        asset.id,
                        {
                          accessToken: supabaseSession.accessToken,
                          functionsUrl: supabaseConfig.functionsUrl,
                        },
                      ).then((result) => {
                        setAssetMessages((current) => ({
                          ...current,
                          [asset.id]: result.message,
                        }));

                        if (result.url) {
                          void Linking.openURL(result.url);
                        }
                      });
                    }}
                    style={styles.assetButton}
                  >
                    <Text style={styles.assetButtonText}>{action.label}</Text>
                  </Pressable>
                ) : (
                  <Link asChild href={action.href}>
                    <Pressable style={[styles.assetButton, styles.assetButtonSecondary]}>
                      <Text style={[styles.assetButtonText, styles.assetButtonTextSecondary]}>{action.label}</Text>
                    </Pressable>
                  </Link>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.asset}>
            <Text style={styles.assetEyebrow}>Material</Text>
            <Text style={styles.assetTitle}>Material pendente</Text>
            <Text style={styles.assetMeta}>Em preparacao para este canto.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  asset: {
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
  assetButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    borderRadius: radii.pill,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  assetButtonSecondary: {
    backgroundColor: colors.surface,
    borderColor: colors.accent,
  },
  assetButtonText: {
    color: colors.background,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  assetButtonTextSecondary: {
    color: colors.accent,
  },
  assetEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  assetMeta: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  assetPath: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  assetTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontStyle: "italic",
    fontWeight: "700",
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  favoriteBlocked: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  favoriteButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.olive,
    borderColor: colors.olive,
    borderRadius: radii.pill,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  favoriteButtonSecondary: {
    backgroundColor: colors.surface,
    borderColor: colors.accent,
  },
  favoriteButtonText: {
    color: colors.background,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  favoriteButtonTextSecondary: {
    color: colors.accent,
  },
  favoriteCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  favoriteEyebrow: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  favoriteReady: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
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
  summaryEyebrow: {
    color: colors.accent,
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
  summaryTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontStyle: "italic",
    fontWeight: "700",
  },
});
