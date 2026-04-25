import {
  buildCelebrationMomentRows,
  findCelebrationBySlug,
  getInitialCelebrationCatalog,
  getLiturgicalDayForDate,
} from "@louvor-serafico/shared";
import { Link, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { CelebrationCard } from "@/components/CelebrationCard";
import { MomentCard } from "@/components/MomentCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildHomeCalendar } from "@/features/home/home-calendar";
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
  const todayMoments = todayCelebration ? buildCelebrationMomentRows(todayCelebration) : [];
  const calendar = buildHomeCalendar(today);
  const preparedDays = buildHomePreparedDays(celebrations, today);
  const summary = buildHomeSummary({
    celebration: todayCelebration,
    day: today,
    session,
    subscription: state,
  });
  const actionHref =
    todayCelebration && session.status === "authenticated"
      ? `/celebracoes/${todayCelebration.slug}`
      : todayCelebration
        ? "/entrar"
        : "/calendario";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow={today.dateLabel}
        title={todayCelebration ? todayCelebration.title : "Louvor Seráfico"}
        subtitle={
          todayCelebration
            ? "Roteiro do dia pronto para acompanhar a celebracao com beleza e ordem."
            : "Guia liturgico-musical para encontrar dias preparados e acompanhar o calendario ao longo do ano."
        }
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

      <View style={styles.aboutCard}>
        <Text style={styles.aboutTitle}>Para cada tempo liturgico</Text>
        <Text style={styles.aboutText}>
          O Louvor Seráfico reune repertorios, momentos da missa e materiais de estudo para ajudar musicos a servir com mais clareza.
        </Text>
      </View>

      <SectionTitle title={`Calendario de ${calendar.monthLabel}`} />

      <View style={styles.calendarCard}>
        <View style={styles.weekRow}>
          {["D", "S", "T", "Q", "Q", "S", "S"].map((item, index) => (
            <Text key={`${item}-${index}`} style={styles.weekLabel}>{item}</Text>
          ))}
        </View>
        <View style={styles.calendarGrid}>
          {calendar.cells.map((cell) => (
            <View
              key={cell.key}
              style={[
                styles.dayCell,
                cell.hasRepertoire ? styles.dayCellMarked : undefined,
                cell.isToday ? styles.dayCellToday : undefined,
              ]}
            >
              <Text
                style={[
                  styles.dayCellText,
                  cell.hasRepertoire ? styles.dayCellTextMarked : undefined,
                  cell.isToday ? styles.dayCellTextToday : undefined,
                ]}
              >
                {cell.dayNumber ?? ""}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.calendarHint}>
          {calendar.markedCount > 0
            ? `${calendar.markedCount} dia${calendar.markedCount > 1 ? "s" : ""} deste mes ja possui${calendar.markedCount > 1 ? "m" : ""} repertorio.`
            : "Neste mes ainda nao ha dias com repertorio publicado."}
        </Text>
      </View>

      {todayCelebration ? (
        <>
          <SectionTitle title="Roteiro sugerido" />

          <View style={styles.list}>
            {todayMoments.map((item) => (
              <MomentCard
                assetCount={item.song.assets.length}
                key={item.recommendation.id}
                moment={item.moment}
                onPress={() => router.push(`/celebracoes/${todayCelebration.slug}`)}
                songTitle={item.song.title}
              />
            ))}
          </View>
        </>
      ) : (
        <>
          <SectionTitle title={preparedDays.title} />

          <Text style={styles.sectionText}>{preparedDays.helperText}</Text>

          <View style={styles.list}>
            {preparedDays.items.map((celebration) => (
              <CelebrationCard celebration={celebration} key={celebration.id} />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  aboutCard: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  aboutText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  aboutTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontStyle: "italic",
    fontWeight: "700",
  },
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
  calendarCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  calendarGrid: {
    columnGap: spacing.xs,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: spacing.xs,
  },
  calendarHint: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  dayCell: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    height: 36,
    justifyContent: "center",
    width: "13.2%",
  },
  dayCellMarked: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  dayCellText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  dayCellTextMarked: {
    color: colors.accent,
  },
  dayCellTextToday: {
    color: colors.background,
  },
  dayCellToday: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  list: {
    gap: spacing.md,
  },
  sectionText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
    marginTop: -spacing.sm,
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
  weekLabel: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
    textAlign: "center",
    width: "13.2%",
  },
  weekRow: {
    columnGap: spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
