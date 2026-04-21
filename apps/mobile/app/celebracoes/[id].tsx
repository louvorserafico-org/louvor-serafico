import { buildCelebrationMomentRows, findCelebrationBySlug } from "@louvor-serafico/shared";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { EditorialStatus } from "@/components/EditorialStatus";
import { MomentCard } from "@/components/MomentCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { fetchRemoteCelebrationDetail } from "@/features/celebrations/remote-celebration-detail";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, spacing } from "@/theme/tokens";

export default function CelebrationDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const localCelebration = useMemo(
    () => findCelebrationBySlug(params.id ?? "") ?? findCelebrationBySlug("santissimo-nome-de-jesus"),
    [params.id],
  );
  const [remoteCelebration, setRemoteCelebration] = useState<typeof localCelebration | null>(null);
  const [subtitle, setSubtitle] = useState(`Identificador: ${params.id ?? localCelebration?.slug ?? "celebracao"}`);
  const celebration = remoteCelebration ?? localCelebration;
  const momentRows = useMemo(
    () => (celebration ? buildCelebrationMomentRows(celebration) : []),
    [celebration],
  );
  const missingMaterials = momentRows.filter((item) => item.song.assets.length === 0).length;

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
      setSubtitle(result.message);
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
});
