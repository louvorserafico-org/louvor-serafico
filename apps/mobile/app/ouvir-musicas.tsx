import { getInitialSongCatalog } from "@louvor-serafico/shared";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { PageHeader } from "@/components/PageHeader";
import { useSessionPreview } from "@/features/auth/SessionProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildPlayableQueue } from "@/features/player/playback-queue";
import { usePlayer } from "@/features/player/PlayerProvider";
import { resolveAssetAccess } from "@/features/subscription/premium-access";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function ListenOnlyScreen() {
  const songs = useMemo(() => getInitialSongCatalog(), []);
  const queue = useMemo(() => buildPlayableQueue(songs), [songs]);
  const { playQueue, track } = usePlayer();
  const { session } = useSessionPreview();
  const { session: supabaseSession } = useSupabaseSession();
  const { hasActiveSubscription } = useSubscriptionPreview();
  const isAuthenticated = session.status === "signed_in" || supabaseSession.status === "authenticated";

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Apenas ouvir músicas" }} />
      <PageHeader
        eyebrow="Ouvir"
        title="Apenas ouvir músicas"
        subtitle="Toque em um canto para começar. Use o player fixo para pausar, repetir, voltar e avançar."
      />

      <View style={styles.list}>
        {queue.map((item, index) => {
          const access = resolveAssetAccess(
            { id: item.assetId, path: item.storagePath, premium: item.premium, title: item.title, type: "audio" },
            { hasActiveSubscription, isAuthenticated },
          );
          const isCurrent = track?.assetId === item.assetId;

          if (!access.canAccess) {
            return (
              <Link asChild href={isAuthenticated ? "/perfil" : "/entrar"} key={item.songId}>
                <AnimatedPressable style={styles.item}>
                  <View style={styles.itemCopy}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.meta}>{access.message}</Text>
                  </View>
                  <Ionicons color={colors.textMuted} name="lock-closed-outline" size={18} />
                </AnimatedPressable>
              </Link>
            );
          }

          return (
            <AnimatedPressable
              accessibilityRole="button"
              key={item.songId}
              onPress={() => playQueue(queue, index)}
              style={[styles.item, isCurrent ? styles.itemActive : undefined]}
            >
              <View style={styles.itemCopy}>
                <Text style={[styles.title, isCurrent ? styles.titleActive : undefined]}>{item.title}</Text>
                <Text style={styles.meta}>{isCurrent ? "Tocando agora" : "Toque para ouvir"}</Text>
              </View>
              <Ionicons
                color={isCurrent ? colors.accent : colors.textMuted}
                name={isCurrent ? "volume-high" : "play-circle-outline"}
                size={22}
              />
            </AnimatedPressable>
          );
        })}

        {queue.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhum áudio disponível ainda</Text>
            <Text style={styles.meta}>Os áudios dos cantos aparecerão aqui assim que forem publicados.</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
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
    paddingBottom: spacing.xxl * 2,
  },
  emptyState: {
    gap: spacing.xs,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
  },
  item: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  itemActive: {
    borderColor: colors.accent,
  },
  itemCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  list: {
    gap: spacing.md,
  },
  meta: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
  titleActive: {
    color: colors.accent,
  },
});
