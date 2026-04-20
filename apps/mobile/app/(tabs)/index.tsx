import { ScrollView, StyleSheet, Text, View } from "react-native";

import { MomentCard } from "@/components/MomentCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { initialCelebration } from "@/data/initialCelebration";
import { colors, spacing, typography } from "@/theme/tokens";

export default function TodayScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow={initialCelebration.dateLabel}
        title={initialCelebration.title}
        subtitle="Roteiro inicial para validar ordem liturgico-musical."
      />

      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>Hoje</Text>
        <Text style={styles.noticeText}>
          Celebre com cantos organizados por momento da missa.
        </Text>
      </View>

      <SectionTitle title="Roteiro sugerido" />

      <View style={styles.list}>
        {initialCelebration.moments.map((item) => (
          <MomentCard key={item.moment.key} moment={item.moment} songTitle={item.songTitle} />
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
  notice: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  noticeText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 23,
  },
  noticeTitle: {
    color: colors.olive,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
