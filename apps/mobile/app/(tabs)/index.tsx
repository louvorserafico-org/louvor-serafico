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
        title={todayCelebration ? todayCelebration.title : "Louvor Serafico"}
        subtitle={
          todayCelebration
            ? "Roteiro do dia pronto para acompanhar a celebracao com beleza e ordem."
            : "Guia liturgico-musical para encontrar dias preparados e acompanhar o calendario ao longo do ano."
        }
      />

      <View style={styles.summary}>
        <View style={styles.summaryTopRow}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeText}>{today.dateLabel}</Text>
          </View>
          <Text style={styles.summaryEyebrow}>Hoje</Text>
        </View>
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
        <Text style={styles.aboutEyebrow}>Vida do ministerio</Text>
        <Text style={styles.aboutTitle}>Para cada tempo liturgico</Text>
        <Text style={styles.aboutText}>
          O Louvor Serafico reune repertorios, momentos da missa e materiais de estudo para ajudar musicos a servir com mais clareza.
        </Text>
      </View>

      <View style={styles.quickGrid}>
        <Link asChild href="/calendario">
          <Pressable style={styles.quickCard}>
            <Text style={styles.quickEyebrow}>Calendario</Text>
            <Text style={styles.quickTitle}>Dias preparados</Text>
            <Text style={styles.quickText}>Consulte as proximas celebracoes e memorias marcadas em 2026.</Text>
          </Pressable>
        </Link>
        <Link asChild href="/repertorio">
          <Pressable style={styles.quickCard}>
            <Text style={styles.quickEyebrow}>Repertorio</Text>
            <Text style={styles.quickTitle}>Catalogo musical</Text>
            <Text style={styles.quickText}>Encontre cantos, materiais e acessos essenciais do ministerio.</Text>
          </Pressable>
        </Link>
      </View>

      <SectionTitle title={`Calendario de ${calendar.monthLabel}`} />

      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <View style={styles.calendarHeaderCopy}>
            <Text style={styles.calendarTitle}>Mes liturgico</Text>
            <Text style={styles.calendarText}>Os dias marcados conduzem para celebracoes ja preparadas.</Text>
          </View>
          <Link asChild href="/calendario">
            <Pressable style={styles.calendarButton}>
              <Text style={styles.calendarButtonText}>Abrir</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.weekRow}>
          {["D", "S", "T", "Q", "Q", "S", "S"].map((item, index) => (
            <Text key={`${item}-${index}`} style={styles.weekLabel}>
              {item}
            </Text>
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
          <Text style={styles.sectionText}>
            Os momentos abaixo ajudam a organizar a celebracao de hoje com unidade e previsao.
          </Text>

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
  aboutEyebrow: {
    color: colors.olive,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
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
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  buttonText: {
    color: colors.background,
    fontFamily: fontFamilies.ui,
    fontSize: typography.body,
    fontWeight: "800",
  },
  calendarButton: {
    borderColor: colors.borderStrong,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  calendarButtonText: {
    color: colors.accent,
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
  calendarHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendarHeaderCopy: {
    flex: 1,
    paddingRight: spacing.md,
  },
  calendarHint: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  calendarText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  calendarTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  dateBadge: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  dateBadgeText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
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
  quickCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flex: 1,
    gap: spacing.xs,
    minHeight: 128,
    padding: spacing.md,
  },
  quickEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  quickGrid: {
    flexDirection: "row",
    gap: spacing.md,
  },
  quickText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  quickTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    fontWeight: "800",
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
    gap: spacing.sm,
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
    fontSize: typography.title,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 46,
  },
  summaryTopRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
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
