import {
  buildCelebrationMomentRows,
  findCelebrationBySlug,
  getInitialCelebrationCatalog,
  getLiturgicalDayForDate,
} from "@louvor-serafico/shared";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { CelebrationCard } from "@/components/CelebrationCard";
import { MomentCard } from "@/components/MomentCard";
import { SectionTitle } from "@/components/SectionTitle";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildHomeCalendar } from "@/features/home/home-calendar";
import { buildHomeSummary } from "@/features/home/home-summary";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

const homeHeroImage = require("../../assets/home-hero-sacred.png");

export default function TodayScreen() {
  const { session } = useSupabaseSession();
  const { state } = useSubscriptionPreview();
  const celebrations = getInitialCelebrationCatalog();
  const today = getLiturgicalDayForDate(new Date());
  const todayCelebration = today.celebrationSlug ? findCelebrationBySlug(today.celebrationSlug) : undefined;
  const todayMoments = todayCelebration ? buildCelebrationMomentRows(todayCelebration) : [];
  const calendar = buildHomeCalendar(today);
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
  const visibleMoments = todayMoments.slice(0, 4);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground imageStyle={styles.heroImage} source={homeHeroImage} style={styles.hero}>
        <View style={styles.heroTopRow}>
          <View>
            <Text style={styles.brandSmall}>Louvor</Text>
            <Text style={styles.brandLarge}>Seráfico</Text>
          </View>
          <View style={styles.bellButton}>
            <Ionicons color={colors.gold} name="notifications-outline" size={20} />
          </View>
        </View>

        <View style={styles.heroDivider}>
          <View style={styles.heroDividerLine} />
          <Ionicons color={colors.gold} name="sparkles-outline" size={16} />
          <View style={styles.heroDividerLine} />
        </View>

        <View style={styles.dateBadge}>
          <Ionicons color={colors.accent} name="calendar-outline" size={18} />
          <Text style={styles.dateBadgeText}>{today.dateLabel}</Text>
        </View>

        <View style={styles.heroCopy}>
          <Text style={styles.heroTitleLead}>
            {todayCelebration ? "Missa do" : "Hoje"}
          </Text>
          <Text style={styles.heroTitleMain}>
            {todayCelebration ? "Santíssimo Nome" : "Sem roteiro publicado"}
          </Text>
          <Text style={styles.heroTitleAccent}>
            {todayCelebration ? "de Jesus" : "neste momento"}
          </Text>
          <Text style={styles.heroText}>
            {todayCelebration
              ? "Roteiro litúrgico-musical para a celebração de hoje."
              : "Consulte o calendário e acompanhe os próximos dias preparados ao longo de 2026."}
          </Text>
        </View>

        <Link asChild href={actionHref}>
          <Pressable accessibilityRole="button" style={styles.heroButton}>
            <Ionicons color={colors.goldSoft} name="book-outline" size={20} />
            <Text style={styles.heroButtonText}>{summary.actionLabel}</Text>
            <Ionicons color={colors.background} name="chevron-forward" size={20} />
          </Pressable>
        </Link>
      </ImageBackground>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push(todayCelebration ? `/celebracoes/${todayCelebration.slug}` : "/calendario")}
        style={styles.highlightCard}
      >
        <View style={styles.highlightSeal}>
          <Ionicons color={colors.gold} name="musical-notes-outline" size={28} />
        </View>
        <View style={styles.highlightContent}>
          <Text style={styles.highlightTitle}>{summary.title}</Text>
          <Text style={styles.highlightText}>
            {todayCelebration
              ? `${todayCelebration.recommendations.length} cantos sugeridos e materiais para uma celebração com unidade e profundidade.`
              : "O calendário marca os dias que já possuem repertório para consulta e preparação."}
          </Text>
        </View>
        <Ionicons color={colors.olive} name="chevron-forward" size={24} />
      </Pressable>

      <SectionTitle title="Roteiro sugerido" />

      {todayCelebration ? (
        <View style={styles.list}>
          {visibleMoments.map((item) => (
            <MomentCard
              assetCount={item.song.assets.length}
              key={item.recommendation.id}
              moment={item.moment}
              onPress={() => router.push(`/celebracoes/${todayCelebration.slug}`)}
              songTitle={item.song.title}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyGuideCard}>
          <Text style={styles.emptyGuideTitle}>Hoje sem repertório disponível</Text>
          <Text style={styles.emptyGuideText}>
            Nem todos os dias do ano litúrgico recebem roteiro musical publicado. Os próximos dias preparados aparecem logo abaixo.
          </Text>
        </View>
      )}

      <View style={styles.sectionHeaderRow}>
        <SectionTitle title="Sugestões para o ministério" />
        <Link href="/calendario" style={styles.sectionLink}>
          Ver tudo
        </Link>
      </View>

      <View style={styles.shortcutGrid}>
        <Pressable accessibilityRole="button" onPress={() => router.push("/calendario")} style={styles.shortcutCard}>
          <View style={styles.shortcutIcon}>
            <Ionicons color={colors.gold} name="calendar-outline" size={22} />
          </View>
          <View style={styles.shortcutContent}>
            <Text style={styles.shortcutTitle}>Calendário litúrgico</Text>
            <Text style={styles.shortcutText}>Consulte as próximas celebrações e memórias já preparadas.</Text>
          </View>
          <Ionicons color={colors.gold} name="chevron-forward" size={20} />
        </Pressable>

        <Pressable accessibilityRole="button" onPress={() => router.push("/repertorio")} style={styles.shortcutCard}>
          <View style={styles.shortcutIcon}>
            <Ionicons color={colors.gold} name="heart-outline" size={22} />
          </View>
          <View style={styles.shortcutContent}>
            <Text style={styles.shortcutTitle}>Repertório e favoritos</Text>
            <Text style={styles.shortcutText}>Acesse seus cantos e acompanhe o acervo disponível no app.</Text>
          </View>
          <Ionicons color={colors.gold} name="chevron-forward" size={20} />
        </Pressable>
      </View>

      <SectionTitle title={`Calendário de ${calendar.monthLabel}`} />

      <View style={styles.calendarCard}>
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
            ? `${calendar.markedCount} dia${calendar.markedCount > 1 ? "s" : ""} deste mês já possui${calendar.markedCount > 1 ? "m" : ""} repertório.`
            : "Neste mês ainda não há dias com repertório publicado."}
        </Text>
      </View>

      {!todayCelebration ? (
        <View style={styles.list}>
          {celebrations.map((celebration) => (
            <CelebrationCard celebration={celebration} key={celebration.id} />
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bellButton: {
    alignItems: "center",
    borderColor: colors.gold,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  brandLarge: {
    color: colors.accent,
    fontFamily: fontFamilies.display,
    fontSize: 42,
    fontStyle: "italic",
    lineHeight: 44,
  },
  brandSmall: {
    color: colors.gold,
    fontFamily: fontFamilies.display,
    fontSize: 24,
    lineHeight: 26,
    textTransform: "uppercase",
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
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  dateBadge: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,250,242,0.92)",
    borderColor: colors.borderStrong,
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  dateBadgeText: {
    color: colors.accent,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
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
  emptyGuideCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  emptyGuideText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  emptyGuideTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontStyle: "italic",
  },
  hero: {
    borderColor: colors.borderStrong,
    borderRadius: 28,
    borderWidth: 1,
    gap: spacing.md,
    minHeight: 560,
    overflow: "hidden",
    padding: spacing.lg,
  },
  heroButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  heroButtonText: {
    color: colors.background,
    fontFamily: fontFamilies.body,
    fontSize: 18,
    fontWeight: "700",
  },
  heroCopy: {
    gap: spacing.xs,
    marginTop: spacing.lg,
    maxWidth: "60%",
  },
  heroDivider: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  heroDividerLine: {
    backgroundColor: colors.gold,
    flex: 1,
    height: 1,
    opacity: 0.6,
  },
  heroImage: {
    borderRadius: 28,
    opacity: 0.96,
    resizeMode: "cover",
  },
  heroText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: 20,
    lineHeight: 30,
    marginTop: spacing.sm,
  },
  heroTitleAccent: {
    color: colors.gold,
    fontFamily: fontFamilies.display,
    fontSize: 46,
    fontStyle: "italic",
    lineHeight: 52,
  },
  heroTitleLead: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: 28,
    lineHeight: 32,
  },
  heroTitleMain: {
    color: colors.accent,
    fontFamily: fontFamilies.display,
    fontSize: 58,
    lineHeight: 64,
  },
  heroTopRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  highlightCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.olive,
    borderRadius: radii.xl,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  highlightContent: {
    flex: 1,
    gap: spacing.xs,
  },
  highlightSeal: {
    alignItems: "center",
    borderColor: colors.gold,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 72,
    justifyContent: "center",
    width: 72,
  },
  highlightText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: 17,
    lineHeight: 24,
  },
  highlightTitle: {
    color: colors.olive,
    fontFamily: fontFamilies.display,
    fontSize: 28,
    lineHeight: 32,
  },
  list: {
    gap: spacing.md,
  },
  sectionHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionLink: {
    color: colors.gold,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
  },
  shortcutCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  shortcutContent: {
    flex: 1,
    gap: 2,
  },
  shortcutGrid: {
    gap: spacing.md,
  },
  shortcutIcon: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  shortcutText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 18,
  },
  shortcutTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    fontWeight: "700",
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
