import { Link, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { MomentCard } from "@/components/MomentCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { initialCelebration } from "@/data/initialCelebration";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildHomeSummary } from "@/features/home/home-summary";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, spacing, typography } from "@/theme/tokens";

export default function TodayScreen() {
  const { session } = useSupabaseSession();
  const { state } = useSubscriptionPreview();
  const summary = buildHomeSummary({
    celebration: initialCelebration,
    session,
    subscription: state,
  });
  const actionHref =
    session.status === "authenticated" ? `/celebracoes/${initialCelebration.slug}` : "/entrar";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow={initialCelebration.dateLabel}
        title={initialCelebration.title}
        subtitle="Roteiro liturgico-musical para a celebracao de hoje."
      />

      <View style={styles.summary}>
        <Text style={styles.summaryEyebrow}>Hoje</Text>
        <Text style={styles.summaryTitle}>{summary.title}</Text>
        <Text style={styles.summaryText}>{summary.helperText}</Text>
        <Text style={styles.summaryMeta}>{summary.premiumText}</Text>
        <Link asChild href={actionHref}>
          <Pressable accessibilityRole="button" style={styles.button}>
            <Text style={styles.buttonText}>{summary.actionLabel}</Text>
          </Pressable>
        </Link>
      </View>

      <SectionTitle title="Roteiro sugerido" />

      <View style={styles.list}>
        {initialCelebration.moments.map((item) => (
          <MomentCard
            assetCount={item.song.assets.length}
            key={item.recommendation.id}
            moment={item.moment}
            onPress={() => router.push(`/celebracoes/${initialCelebration.slug}`)}
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
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    color: colors.background,
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
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  summaryEyebrow: {
    color: colors.olive,
    fontSize: typography.caption,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  summaryMeta: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  summaryText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 23,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontSize: typography.heading,
    fontWeight: "900",
  },
});
