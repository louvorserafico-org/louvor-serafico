import { getInitialCelebrationCatalog } from "@louvor-serafico/shared";
import { ScrollView, StyleSheet, View } from "react-native";

import { CelebrationCard } from "@/components/CelebrationCard";
import { PageHeader } from "@/components/PageHeader";
import { RemoteCelebrationsCard } from "@/components/RemoteCelebrationsCard";
import { SectionTitle } from "@/components/SectionTitle";
import { colors, spacing } from "@/theme/tokens";

export default function CalendarScreen() {
  const celebrations = getInitialCelebrationCatalog();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow={`${celebrations.length} celebracao`}
        title="Calendario"
        subtitle="Datas liturgicas iniciais disponiveis para consulta."
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
