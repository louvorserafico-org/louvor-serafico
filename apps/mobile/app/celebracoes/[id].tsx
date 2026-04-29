import {
  buildCelebrationMomentRows,
  findCelebrationBySlug,
  getLiturgicalMonthDays2026,
} from "@louvor-serafico/shared";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { MomentCard } from "@/components/MomentCard";
import { PageHeader } from "@/components/PageHeader";
import { buildLiturgicalDayDetail } from "@/features/celebrations/liturgical-day-detail";
import { fetchRemoteCelebrationDetail } from "@/features/celebrations/remote-celebration-detail";
import { buildSongMaterialBadges } from "@/features/songs/song-materials";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function CelebrationDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const localCelebration = useMemo(
    () => findCelebrationBySlug(params.id ?? "") ?? findCelebrationBySlug("santissimo-nome-de-jesus"),
    [params.id],
  );
  const fallbackDay = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => getLiturgicalMonthDays2026(index + 1))
        .flat()
        .find((item) => item.monthDay === params.id),
    [params.id],
  );
  const [remoteCelebration, setRemoteCelebration] = useState<typeof localCelebration | null>(null);
  const [sourceMode, setSourceMode] = useState<"local" | "remote">("local");
  const [subtitle, setSubtitle] = useState("Roteiro organizado para acompanhar cada momento da celebracao.");
  const celebration = remoteCelebration ?? localCelebration;
  const detailDay = fallbackDay;
  const momentRows = useMemo(
    () => (celebration ? buildCelebrationMomentRows(celebration) : []),
    [celebration],
  );

  useEffect(() => {
    let active = true;

    void fetchRemoteCelebrationDetail(
      params.id ?? "",
      fetch,
      supabaseConfig.url,
      supabaseConfig.publishableKey ?? supabaseConfig.anonKey,
    ).then((result) => {
      if (!active) {
        return;
      }

      setRemoteCelebration(result.celebration);
      setSourceMode(result.celebration ? "remote" : "local");
      setSubtitle(
        result.celebration
          ? "Roteiro preparado para conduzir a musica da celebracao."
          : "Roteiro inicial disponivel para consulta e preparacao.",
      );
    });

    return () => {
      active = false;
    };
  }, [params.id]);

  if (!celebration && detailDay) {
    const dayDetail = buildLiturgicalDayDetail(detailDay);

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ headerShown: true, title: "Celebracao" }} />
        <PageHeader eyebrow={dayDetail.eyebrow} subtitle={dayDetail.helperText} title={dayDetail.title} />

        <View style={styles.summary}>
          <Text style={styles.summaryEyebrow}>Calendario 2026</Text>
          <Text style={styles.summaryTitle}>{dayDetail.cardTitle}</Text>
          <Text style={styles.summaryText}>{dayDetail.helperText}</Text>
          <Text style={styles.summaryNote}>{dayDetail.note}</Text>
          <Link asChild href="/calendario">
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>{dayDetail.ctaLabel}</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    );
  }

  if (!celebration) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ headerShown: true, title: "Celebracao" }} />
        <PageHeader eyebrow="Nao encontrada" subtitle="Celebracao indisponivel." title="Detalhe ausente" />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Celebracao" }} />
      <PageHeader eyebrow={celebration.dateLabel} subtitle={subtitle} title={celebration.title} />

      <EditorialSectionHeader
        eyebrow="Ordem da missa"
        subtitle="Toque em um canto para abrir seus materiais e seguir o preparo de cada momento."
        title="Momentos da missa"
      />

      <View style={styles.list}>
        {momentRows.map((item) => (
          <MomentCard
            assetCount={item.song.assets.length}
            key={item.recommendation.id}
            materialBadges={buildSongMaterialBadges(item.song.assets)}
            moment={item.moment}
            onPress={() => {
              router.push(`/musicas/${item.song.slug}`);
            }}
            songTitle={item.song.title}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    borderRadius: radii.pill,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    color: colors.background,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
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
  summary: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  summaryEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  summaryNote: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
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
    fontWeight: "700",
  },
});
