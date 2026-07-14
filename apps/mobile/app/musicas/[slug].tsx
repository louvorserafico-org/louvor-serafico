import { findSongBySlug } from "@louvor-serafico/shared";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { requestAssetSignedUrl } from "@/features/assets/edge-asset-url";
import { useSessionPreview } from "@/features/auth/SessionProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { fetchRemoteSongDetail } from "@/features/songs/remote-song-detail";
import { buildSongMaterialSections } from "@/features/songs/song-materials";
import { resolveSongAssetAction } from "@/features/songs/song-asset-action";
import { resolveAssetAccess } from "@/features/subscription/premium-access";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function SongDetailScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const localSong = findSongBySlug(params.slug ?? "");
  const [remoteSong, setRemoteSong] = useState<typeof localSong | null>(null);
  const [assetMessages, setAssetMessages] = useState<Record<string, string>>({});
  const [sourceMode, setSourceMode] = useState<"local" | "remote">("local");
  const [subtitle, setSubtitle] = useState("Um canto preparado para servir a celebracao com beleza e ordem.");
  const song = remoteSong ?? localSong;
  const { session } = useSessionPreview();
  const { session: supabaseSession } = useSupabaseSession();
  const { hasActiveSubscription } = useSubscriptionPreview();
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
      setSubtitle(result.song ? "Materiais prontos para acompanhar seu estudo e preparo." : "Detalhe inicial disponivel para consulta e estudo.");
    });

    return () => {
      active = false;
    };
  }, [params.slug]);

  if (!song) {
    return (
      <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
        <Stack.Screen options={{ headerShown: true, title: "Musica" }} />
        <PageHeader
          eyebrow="Nao encontrada"
          title="Canto indisponivel"
          subtitle="Este canto ainda nao esta disponivel no acervo."
        />
      </ScrollView>
    );
  }

  const materialSections = buildSongMaterialSections(song.assets);

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Musica" }} />
      <PageHeader eyebrow="Canto sacro" title={song.title} subtitle={subtitle} />

      <EditorialSectionHeader
        eyebrow="Consulta"
        subtitle="Cada frente de estudo fica reunida em seu proprio espaco para leitura, cifra, audio e video."
        title="Materiais"
      />

      <View style={styles.list}>
        {materialSections.map((section) => (
          <View key={section.key} style={styles.asset}>
            <Text style={styles.assetTitle}>{section.title}</Text>
            <Text style={styles.assetPath}>{section.helperText}</Text>
            {section.assets.length > 0 ? (
              <View style={styles.sectionList}>
                {section.assets.map((asset) => {
                  const access = resolveAssetAccess(asset, { hasActiveSubscription, isAuthenticated });
                  const action = resolveSongAssetAction({
                    canAccess: access.canAccess,
                    hasActiveSubscription,
                    isAuthenticated,
                  });

                  return (
                    <View key={asset.id} style={styles.sectionItem}>
                      <Text style={styles.assetMeta}>{asset.title}</Text>
                      <Text style={styles.assetPath}>
                        {access.canAccess ? "Disponivel para abrir agora." : access.message}
                      </Text>
                      {assetMessages[asset.id] ? <Text style={styles.assetPath}>{assetMessages[asset.id]}</Text> : null}
                      {action.kind === "open" ? (
                        <Pressable
                          onPress={() => {
                            if (asset.type === "score_pdf" || asset.type === "lyrics" || asset.type === "chord_sheet") {
                              router.push({
                                pathname: "/visualizador-pdf",
                                params: {
                                  assetId: asset.id,
                                  premium: asset.premium ? "1" : "0",
                                  storagePath: asset.path,
                                  title: song.title,
                                  type: section.title,
                                },
                              });
                              return;
                            }

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
                          <Text style={styles.assetButtonText}>{section.ctaLabel}</Text>
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
                })}
              </View>
            ) : (
              <View style={styles.sectionEmpty}>
                <Text style={styles.sectionEmptyText}>{section.emptyText}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  asset: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
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
    fontWeight: "700",
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  list: {
    gap: spacing.md,
  },
  sectionEmpty: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  sectionEmptyText: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  sectionItem: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    gap: spacing.xs,
    paddingTop: spacing.md,
  },
  sectionList: {
    gap: spacing.md,
    marginTop: spacing.sm,
  },
});
