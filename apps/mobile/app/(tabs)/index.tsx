import {
  findCelebrationBySlug,
  getInitialCelebrationCatalog,
  getLiturgicalDayForDate,
} from "@louvor-serafico/shared";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { HomePreparedDayItem } from "@/components/HomePreparedDayItem";
import { HomeQuickActionCard } from "@/components/HomeQuickActionCard";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildHomePreparedDays } from "@/features/home/home-prepared-days";
import { buildHomeSummary } from "@/features/home/home-summary";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function TodayScreen() {
  const { session } = useSupabaseSession();
  const { state } = useSubscriptionPreview();
  const celebrations = getInitialCelebrationCatalog();
  const today = getLiturgicalDayForDate(new Date());
  const todayCelebration = today.celebrationSlug ? findCelebrationBySlug(today.celebrationSlug) : undefined;
  const preparedDays = buildHomePreparedDays(celebrations, today);
  const summary = buildHomeSummary({
    celebration: todayCelebration,
    day: today,
    session,
    subscription: state,
  });
  const primaryHref =
    todayCelebration && session.status === "authenticated"
      ? `/celebracoes/${todayCelebration.slug}`
      : todayCelebration
        ? "/entrar"
        : "/calendario";
  const secondaryHref = todayCelebration ? "/repertorio" : "/repertorio";
  const supportLabel =
    today.kind === "ordinary_day" ? "Dia comum" : todayCelebration ? "Celebracao do dia" : "Memoria liturgica";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDate}>{today.dateLabel}</Text>
        <Text style={styles.headerTitle}>Louvor Serafico</Text>
        <Text style={styles.headerSubtitle}>Que o canto conduza a oracao.</Text>
      </View>

      <OrnamentalDivider />

      <View style={styles.todayCard}>
        <View style={styles.todayTopRow}>
          <Text style={styles.todayEyebrow}>Hoje</Text>
          <Text style={styles.todayDate}>{today.dateLabel}</Text>
        </View>

        <Text style={styles.todaySupportLabel}>{supportLabel}</Text>
        <Text style={styles.todayTitle}>{summary.title}</Text>
        <Text style={styles.todayText}>{summary.helperText}</Text>
        <Text style={styles.todayNote}>{summary.premiumText}</Text>

        <View style={styles.actionRow}>
          <Link asChild href={primaryHref}>
            <Pressable accessibilityRole="button" style={[styles.actionButton, styles.primaryButton]}>
              <Text style={styles.primaryButtonText}>{summary.actionLabel}</Text>
            </Pressable>
          </Link>
          <Link asChild href={secondaryHref}>
            <Pressable accessibilityRole="button" style={[styles.actionButton, styles.secondaryButton]}>
              <Text style={styles.secondaryButtonText}>Explorar repertorio</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.quickActions}>
        <HomeQuickActionCard href="/calendario" subtitle="Celebracoes e memorias" title="Calendario" />
        <HomeQuickActionCard href="/repertorio" subtitle="Cantos da missa" title="Repertorio" />
        <HomeQuickActionCard href="/comunidade" subtitle="Comunidade" title="Partilha" />
      </View>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionCopy}>
          <Text style={styles.sectionEyebrow}>Consulta</Text>
          <Text style={styles.sectionTitle}>{preparedDays.title}</Text>
          <Text style={styles.sectionText}>{preparedDays.helperText}</Text>
        </View>
        <Link asChild href="/calendario">
          <Pressable accessibilityRole="button" style={styles.sectionLink}>
            <Text style={styles.sectionLinkText}>Calendario completo</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.preparedList}>
        {preparedDays.items.map((celebration, index) => (
          <HomePreparedDayItem
            celebration={celebration}
            isLast={index === preparedDays.items.length - 1}
            key={celebration.id}
          />
        ))}
      </View>

      <Text style={styles.footerNote}>Para cada tempo da Igreja, um repertorio a servico da oracao.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    borderRadius: radii.pill,
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  actionRow: {
    columnGap: spacing.sm,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: spacing.sm,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  footerNote: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    fontStyle: "italic",
    lineHeight: 20,
    paddingTop: spacing.xs,
    textAlign: "center",
  },
  header: {
    gap: spacing.xs,
  },
  headerDate: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  headerSubtitle: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 48,
  },
  preparedList: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.accent,
  },
  primaryButtonText: {
    color: colors.background,
    fontFamily: fontFamilies.ui,
    fontSize: typography.body,
    fontWeight: "800",
  },
  quickActions: {
    columnGap: spacing.sm,
    flexDirection: "row",
    rowGap: spacing.sm,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
  },
  secondaryButtonText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.body,
    fontWeight: "700",
  },
  sectionCopy: {
    flex: 1,
    gap: spacing.xs,
    paddingRight: spacing.md,
  },
  sectionEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  sectionHeader: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: spacing.md,
  },
  sectionLink: {
    paddingVertical: spacing.xs,
  },
  sectionLinkText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  sectionText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
    lineHeight: 30,
  },
  todayCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    gap: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
  },
  todayDate: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  todayEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  todayNote: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  todaySupportLabel: {
    color: colors.accentStrong,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  todayText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.lead,
    lineHeight: 28,
  },
  todayTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 40,
  },
  todayTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
