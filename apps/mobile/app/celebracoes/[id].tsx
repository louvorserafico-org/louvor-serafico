import { buildCelebrationMomentRows, findCelebrationBySlug } from "@louvor-serafico/shared";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialStatus } from "@/components/EditorialStatus";
import { MomentCard } from "@/components/MomentCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { buildCelebrationDetailOverview } from "@/features/celebrations/celebration-detail-overview";
import { fetchRemoteCelebrationDetail } from "@/features/celebrations/remote-celebration-detail";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function CelebrationDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const localCelebration = useMemo(
    () => findCelebrationBySlug(params.id ?? "") ?? findCelebrationBySlug("santissimo-nome-de-jesus"),
    [params.id],
  );
  const [remoteCelebration, setRemoteCelebration] = useState<typeof localCelebration | null>(null);
  const [sourceMode, setSourceMode] = useState<"local" | "remote">("local");
  const [subtitle, setSubtitle] = useState("Roteiro organizado para acompanhar cada momento da celebracao.");
  const celebration = remoteCelebration ?? localCelebration;
  const momentRows = useMemo(
    () => (celebration ? buildCelebrationMomentRows(celebration) : []),
    [celebration],
  );
  const missingMaterials = momentRows.filter((item) => item.song.assets.length === 0).length;
  const overview = buildCelebrationDetailOverview({
    missingMaterials,
    momentCount: momentRows.length,
    sourceMode,
  });

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
      setSubtitle(result.celebration ? "Roteiro preparado para conduzir a musica da celebracao." : "Roteiro inicial disponivel para consulta e preparacao.");
    });

    return () => {
      active = false;
    };
  }, [params.id]);

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

      <View style={[styles.summary, sourceMode === "remote" ? styles.summaryRemote : styles.summaryLocal]}>
        <Text style={styles.summaryTitle}>Roteiro da celebracao</Text>
        <Text style={styles.summaryText}>{overview.helperText}</Text>
      </View>

      <EditorialStatus missingCount={missingMaterials} />

      <SectionTitle title="Momentos da missa" />

      <View style={styles.list}>
        {momentRows.map((item) => (
          <MomentCard
            assetCount={item.song.assets.length}
            key={item.recommendation.id}
            moment={item.moment}
            songTitle={item.song.title}
          />
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
  summary: {
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
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
