import { getInitialCelebrationCatalog } from "@louvor-serafico/shared";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { CelebrationCard } from "@/components/CelebrationCard";
import { PageHeader } from "@/components/PageHeader";
import { RemoteCelebrationsCard } from "@/components/RemoteCelebrationsCard";
import { SectionTitle } from "@/components/SectionTitle";
import { resolveCelebrationCatalogSource } from "@/features/celebrations/celebration-catalog-source";
import { fetchRemoteCelebrations } from "@/features/celebrations/remote-celebrations";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, spacing } from "@/theme/tokens";

export default function CalendarScreen() {
  const localCelebrations = useMemo(() => getInitialCelebrationCatalog(), []);
  const [celebrations, setCelebrations] = useState(localCelebrations);
  const [subtitle, setSubtitle] = useState("Datas liturgicas iniciais disponiveis para consulta.");

  useEffect(() => {
    let active = true;

    void fetchRemoteCelebrations(
      fetch,
      supabaseConfig.url,
      supabaseConfig.publishableKey ?? supabaseConfig.anonKey,
    ).then((remote) => {
      if (active) {
        const source = resolveCelebrationCatalogSource(remote, localCelebrations);
        setCelebrations(source.celebrations);
        setSubtitle(source.message);
      }
    });

    return () => {
      active = false;
    };
  }, [localCelebrations]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow={`${celebrations.length} celebracao`}
        title="Calendario"
        subtitle={subtitle}
      />

      <SectionTitle title="Janeiro" />

      <RemoteCelebrationsCard />

      <View style={styles.list}>
        {celebrations.map((celebration) => (
          <CelebrationCard celebration={celebration} key={celebration.id} />
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
