import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { MomentCard } from "@/components/MomentCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { EditorialStatus } from "@/components/EditorialStatus";
import { initialCelebration } from "@/data/initialCelebration";
import { colors, spacing } from "@/theme/tokens";

export default function CelebrationDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const missingMaterials = initialCelebration.moments.filter(
    (item) => item.song.assets.length === 0,
  ).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Celebracao" }} />
      <PageHeader
        eyebrow={initialCelebration.dateLabel}
        subtitle={`Identificador: ${params.id ?? initialCelebration.slug}`}
        title={initialCelebration.title}
      />

      <EditorialStatus missingCount={missingMaterials} />

      <SectionTitle title="Momentos da missa" />

      <View style={styles.list}>
        {initialCelebration.moments.map((item) => (
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
