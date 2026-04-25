import { Link, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { MomentCard } from "@/components/MomentCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { initialCelebration } from "@/data/initialCelebration";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildHomeSummary } from "@/features/home/home-summary";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { buildTodayTabSubtitle } from "@/features/tabs/main-tab-copy";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

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
        subtitle={buildTodayTabSubtitle(session.status === "authenticated")}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryEyebrow}>Celebracao do dia</Text>
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
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
  },
  summaryEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  summaryMeta: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  summaryText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.lead,
    lineHeight: 28,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontStyle: "italic",
    fontWeight: "700",
  },
});
