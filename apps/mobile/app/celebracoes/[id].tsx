import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { MomentCard } from "@/components/MomentCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { initialCelebration } from "@/data/initialCelebration";
import { colors, spacing, typography } from "@/theme/tokens";

export default function CelebrationDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Celebracao" }} />
      <PageHeader
        eyebrow={initialCelebration.dateLabel}
        subtitle={`Identificador: ${params.id ?? initialCelebration.slug}`}
        title={initialCelebration.title}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Status editorial</Text>
        <Text style={styles.summaryText}>
          Um canto esta com material pendente: Invocando o nome do Senhor.
        </Text>
      </View>

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
  summary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  summaryText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 23,
  },
  summaryTitle: {
    color: colors.accent,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
