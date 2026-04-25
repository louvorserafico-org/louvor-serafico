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
import { colors, spacing, typography } from "@/theme/tokens";

export default function SongDetailScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const localSong = findSongBySlug(params.slug ?? "");
  const [remoteSong, setRemoteSong] = useState<typeof localSong | null>(null);
  const [assetMessages, setAssetMessages] = useState<Record<string, string>>({});
  const [sourceMode, setSourceMode] = useState<"local" | "remote">("local");
  const [subtitle, setSubtitle] = useState("Detalhe inicial com materiais cadastrados no mock local.");
  const song = remoteSong ?? localSong;
  const { session } = useSessionPreview();
  const { session: supabaseSession } = useSupabaseSession();
  const { isFavoriteSong, sourceMessage, toggleSongFavorite } = useFavorites();
  const { hasActiveSubscription } = useSubscriptionPreview();
  const canFavorite = session.status === "signed_in" || supabaseSession.status === "authenticated";
  const isAuthenticated = session.status === "signed_in" || supabaseSession.status === "authenticated";

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
      setSubtitle(result.message);
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
          subtitle="Este canto ainda nao existe no catalogo local."
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
      <PageHeader
        eyebrow="Canto sacro"
        title={song.title}
        subtitle={subtitle}
      />

      <View style={[styles.summary, sourceMode === "remote" ? styles.summaryRemote : styles.summaryLocal]}>
        <Text style={styles.summaryTitle}>{overview.title}</Text>
        <Text style={styles.summaryText}>{overview.helperText}</Text>
      </View>

      <SectionTitle title="Materiais" />

      <View style={[styles.favoriteCard, canFavorite ? styles.favoriteReady : styles.favoriteBlocked]}>
        <Text style={styles.assetTitle}>{canFavorite ? "Favoritos liberados" : "Favoritos bloqueados"}</Text>
        <Text style={styles.assetMeta}>
          {supabaseSession.status === "authenticated"
            ? "Sessao Supabase ativa. Favorito remoto liberado."
            : canFavorite
            ? "Sessao teste ativa. Favorito local liberado."
            : "Ative sessao teste em Perfil para liberar fluxo protegido."}
        </Text>
        <Text style={styles.assetPath}>{sourceMessage}</Text>
        <Pressable
          disabled={!canFavorite}
          onPress={() => {
            void toggleSongFavorite(song.id);
          }}
          style={[styles.favoriteButton, !canFavorite ? styles.favoriteButtonDisabled : undefined]}
        >
          <Text style={[styles.favoriteButtonText, !canFavorite ? styles.favoriteButtonTextDisabled : undefined]}>
            {canFavorite ? (isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos") : "Sessao necessaria"}
          </Text>
        </Pressable>
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
                <Text style={styles.assetTitle}>{asset.title}</Text>
                <Text style={styles.assetMeta}>{access.label}</Text>
                <Text style={styles.assetPath}>{access.canAccess ? asset.path : access.message}</Text>
                <Text style={styles.assetPath}>{assetMessages[asset.id]}</Text>
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
            <Text style={styles.assetTitle}>Material pendente</Text>
            <Text style={styles.assetMeta}>Aguardando curadoria editorial.</Text>
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
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  assetButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  assetButtonDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  assetButtonSecondary: {
    backgroundColor: colors.surface,
    borderColor: colors.accent,
  },
  assetButtonText: {
    color: colors.background,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  assetButtonTextDisabled: {
    color: colors.textMuted,
  },
  assetButtonTextSecondary: {
    color: colors.accent,
  },
  assetMeta: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  assetPath: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  assetTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
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
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  favoriteButtonDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  favoriteButtonText: {
    color: colors.background,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  favoriteButtonTextDisabled: {
    color: colors.textMuted,
  },
  favoriteCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  favoriteReady: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  list: {
    gap: spacing.md,
  },
  summary: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  summaryLocal: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  summaryRemote: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.accent,
  },
  summaryText: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
