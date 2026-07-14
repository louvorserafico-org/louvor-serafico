import {
  findCelebrationBySlug,
  getInitialCelebrationCatalog,
  getLiturgicalDayForDate,
} from "@louvor-serafico/shared";
import { Link, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { HomePreparedDayItem } from "@/components/HomePreparedDayItem";
import { HomeQuickActionCard } from "@/components/HomeQuickActionCard";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";
import { useSupabaseProfile } from "@/features/auth/SupabaseProfileProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildHomePreparedDays } from "@/features/home/home-prepared-days";
import { buildHomeSaint } from "@/features/home/home-saint";
import { buildHomeSummary } from "@/features/home/home-summary";
import { buildHomeWelcome } from "@/features/home/home-welcome";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function TodayScreen() {
  const { session } = useSupabaseSession();
  const { profile } = useSupabaseProfile();
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
  const welcome = buildHomeWelcome({
    profile,
    session,
  });
  const homeSaint = buildHomeSaint(today);
  const supportLabel =
    today.kind === "ordinary_day" ? "Dia comum" : todayCelebration ? "Celebracao do dia" : "Memoria liturgica";

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerSection}>Inicio</Text>
          <Pressable
            accessibilityLabel="Abrir perfil"
            accessibilityRole="button"
            onPress={() => router.push("/perfil")}
            style={({ pressed }) => [styles.avatarCircle, pressed ? styles.avatarPressed : undefined]}
          >
            <Text style={styles.avatarText}>{welcome.initials}</Text>
          </Pressable>
        </View>
        <Text style={styles.headerTitle}>Louvor Serafico</Text>
        <Text style={styles.headerSubtitle}>Que o canto conduza a oracao.</Text>
        <View style={styles.headerDateBadge}>
          <Text style={styles.headerDateText}>{today.dateLabel}</Text>
        </View>
      </View>

      <OrnamentalDivider />

      <View style={styles.todayCard}>
        <Text style={styles.todayEyebrow}>Hoje</Text>
        <Text style={styles.todaySupportLabel}>{supportLabel}</Text>
        <Text style={styles.todayTitle}>{summary.title}</Text>
        <Text style={styles.todayText}>{summary.helperText}</Text>
        {summary.premiumText ? <Text style={styles.todayNote}>{summary.premiumText}</Text> : null}
      </View>

      {homeSaint.href ? (
        <Link asChild href={homeSaint.href}>
          <Pressable style={styles.saintCard}>
            <Text style={styles.saintEyebrow}>{homeSaint.eyebrow}</Text>
            {homeSaint.saints.length > 1 ? (
              homeSaint.saints.map((saint, index) => (
                <View
                  key={saint.name}
                  style={index > 0 ? styles.saintListItem : undefined}
                >
                  <Text style={styles.saintTitle}>{saint.name}</Text>
                  <Text style={styles.saintMeta}>{saint.classification}</Text>
                </View>
              ))
            ) : (
              <>
                <Text style={styles.saintTitle}>{homeSaint.title}</Text>
                <Text style={styles.saintMeta}>{homeSaint.description}</Text>
              </>
            )}
            <Text style={styles.saintAction}>Ver santo</Text>
          </Pressable>
        </Link>
      ) : (
        <Link asChild href="/santos">
          <Pressable style={styles.saintCard}>
            <Text style={styles.saintEyebrow}>{homeSaint.eyebrow}</Text>
            <Text style={styles.saintTitle}>{homeSaint.title}</Text>
            <Text style={styles.saintMeta}>{homeSaint.description}</Text>
            <Text style={styles.saintAction}>Ver santoral</Text>
          </Pressable>
        </Link>
      )}

      <Link asChild href="/devocoes">
        <Pressable style={styles.saintCard}>
          <Text style={styles.saintEyebrow}>Oração</Text>
          <Text style={styles.saintTitle}>Devoções franciscanas</Text>
          <Text style={styles.saintMeta}>Devocional, novena e trânsito de São Francisco.</Text>
          <Text style={styles.saintAction}>Abrir devoções</Text>
        </Pressable>
      </Link>

      <View style={styles.quickActionsSection}>
        <Text style={styles.quickActionsTitle}>Acessos rapidos</Text>
        <View style={styles.quickActions}>
          <HomeQuickActionCard href="/calendario" subtitle="Celebracoes" title="Calendario" />
          <HomeQuickActionCard href="/repertorio" subtitle="Cantos" title="Repertorio" />
          <HomeQuickActionCard href="/comunidade" subtitle="Comunidade" title="Partilha" />
        </View>
      </View>

      <EditorialSectionHeader
        eyebrow="Consulta"
        subtitle={preparedDays.helperText}
        title={preparedDays.title}
      />

      <View style={styles.preparedList}>
        {preparedDays.items.map((celebration, index) => (
          <HomePreparedDayItem
            celebration={celebration}
            isLast={index === preparedDays.items.length - 1}
            key={celebration.id}
          />
        ))}
      </View>
      {preparedDays.hasMore ? (
        <Link asChild href="/celebracoes">
          <Pressable accessibilityRole="button" style={styles.moreButton}>
            <Text style={styles.moreButtonText}>Ver mais roteiros</Text>
          </Pressable>
        </Link>
      ) : null}

      <Text style={styles.footerNote}>Para cada tempo da Igreja, um repertorio a servico da oracao.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  avatarCircle: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  avatarText: {
    color: colors.accentStrong,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  avatarPressed: {
    opacity: 0.82,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
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
  headerSection: {
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
  headerTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerDateBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.pill,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerDateText: {
    color: colors.accentStrong,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  moreButton: {
    alignSelf: "flex-start",
    paddingTop: spacing.xs,
  },
  moreButtonText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  preparedList: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.md,
  },
  quickActions: {
    columnGap: spacing.xs,
    flexDirection: "row",
  },
  quickActionsSection: {
    gap: spacing.sm,
  },
  quickActionsTitle: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  saintAction: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    paddingTop: spacing.xs,
  },
  saintCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  saintListItem: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    gap: spacing.xs,
    paddingTop: spacing.xs,
  },
  saintEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  saintMeta: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  saintTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
  todayCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    gap: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
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
});
