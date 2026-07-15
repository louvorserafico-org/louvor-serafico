import {
  findCelebrationBySlug,
  getInitialCelebrationCatalog,
  getLiturgicalDayForDate,
} from "@louvor-serafico/shared";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { Link, router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedPressable } from "@/components/AnimatedPressable";
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

const freiLuisLogo = require("../../assets/frei-luis-logo.png");
const freiLuisLogoUri = Asset.fromModule(freiLuisLogo).uri;

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

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerSection}>Início</Text>
          <Pressable
            accessibilityLabel={welcome.isAuthenticated ? "Abrir perfil" : "Entrar na conta"}
            accessibilityRole="button"
            onPress={() => router.push("/perfil")}
            style={({ pressed }) => [styles.avatarCircle, pressed ? styles.avatarPressed : undefined]}
          >
            {welcome.isAuthenticated ? (
              <Text style={styles.avatarText}>{welcome.initials}</Text>
            ) : (
              <Ionicons color={colors.textMuted} name="person-outline" size={18} />
            )}
          </Pressable>
        </View>
        <Text style={styles.headerTitle}>Louvor Seráfico</Text>
        <View style={styles.headerDateBadge}>
          <Text style={styles.headerDateText}>{today.dateLabel}</Text>
        </View>
      </View>

      <OrnamentalDivider />

      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Hoje</Text>
        <Text style={styles.heroTitle}>{summary.title}</Text>
        <Text style={styles.heroText}>{summary.helperText}</Text>
        {summary.premiumText ? <Text style={styles.heroNote}>{summary.premiumText}</Text> : null}
        <Link asChild href={summary.href}>
          <AnimatedPressable style={styles.heroButton}>
            <Text style={styles.heroButtonText}>{summary.actionLabel}</Text>
          </AnimatedPressable>
        </Link>
      </View>

      <EditorialSectionHeader eyebrow="Para hoje" title="Memória e oração" />

      <View style={styles.exploreList}>
        {homeSaint.status === "saint" ? (
          <View style={styles.exploreBlock}>
            <Text style={styles.exploreEyebrow}>{homeSaint.eyebrow}</Text>
            <View style={styles.exploreNameList}>
              {homeSaint.saints.map((saint, index) => (
                <Link asChild href={saint.href} key={saint.name}>
                  <AnimatedPressable
                    style={
                      index !== homeSaint.saints.length - 1
                        ? styles.exploreSaintRowWithBorder
                        : styles.exploreSaintRow
                    }
                  >
                    <View style={styles.exploreCopy}>
                      <Text style={styles.exploreTitle}>{saint.name}</Text>
                      <Text style={styles.exploreMeta}>{saint.classification}</Text>
                    </View>
                    <Ionicons color={colors.textMuted} name="chevron-forward" size={18} />
                  </AnimatedPressable>
                </Link>
              ))}
            </View>
          </View>
        ) : (
          <Link asChild href="/santos">
            <AnimatedPressable style={styles.exploreBlockRow}>
              <View style={styles.exploreCopy}>
                <Text style={styles.exploreEyebrow}>{homeSaint.eyebrow}</Text>
                <Text style={styles.exploreTitle}>{homeSaint.title}</Text>
                <Text style={styles.exploreMeta}>{homeSaint.description}</Text>
              </View>
              <Ionicons color={colors.textMuted} name="chevron-forward" size={20} />
            </AnimatedPressable>
          </Link>
        )}

        <Link asChild href="/devocoes">
          <AnimatedPressable style={styles.exploreBlockRow}>
            <View style={styles.exploreCopy}>
              <Text style={styles.exploreEyebrow}>Oração</Text>
              <Text style={styles.exploreTitle}>Devoções Franciscanas</Text>
              <Text style={styles.exploreMeta}>Devocional, novena e trânsito de São Francisco.</Text>
            </View>
            <Ionicons color={colors.textMuted} name="chevron-forward" size={20} />
          </AnimatedPressable>
        </Link>
      </View>

      <EditorialSectionHeader eyebrow="Navegar" title="Explorar o app" />
      <View style={styles.quickActions}>
        <HomeQuickActionCard href="/calendario" icon="calendar-outline" subtitle="Celebrações" title="Calendário" />
        <HomeQuickActionCard href="/repertorio" icon="musical-notes-outline" subtitle="Cantos" title="Repertório" />
        <HomeQuickActionCard href="/comunidade" icon="people-outline" subtitle="Comunidade" title="Partilha" />
      </View>

      <EditorialSectionHeader
        eyebrow="Consulta"
        subtitle={preparedDays.helperText}
        title={preparedDays.title}
      />

      <View style={styles.preparedList}>
        {preparedDays.items.map((celebration) => (
          <HomePreparedDayItem celebration={celebration} key={celebration.id} />
        ))}
      </View>
      {preparedDays.hasMore ? (
        <Link asChild href="/celebracoes">
          <Pressable accessibilityRole="button" style={styles.moreButton}>
            <Text style={styles.moreButtonText}>Ver mais roteiros</Text>
          </Pressable>
        </Link>
      ) : null}

      <Text style={styles.footerNote}>Para cada tempo da Igreja, um repertório a serviço da oração.</Text>

      <Link asChild href="/sobre">
        <Pressable accessibilityRole="button" style={styles.creditFooter}>
          <Text style={styles.creditLabel}>Feito por</Text>
          <Image resizeMode="contain" source={{ uri: freiLuisLogoUri }} style={styles.creditLogo} />
        </Pressable>
      </Link>
      </ScrollView>
    </SafeAreaView>
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
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  creditFooter: {
    alignItems: "center",
    gap: spacing.xs,
    paddingTop: spacing.xs,
  },
  creditLabel: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.tab,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  creditLogo: {
    height: 28,
    width: 28,
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
  headerTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: 46,
    fontWeight: "700",
    lineHeight: 52,
  },
  headerTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerDateBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.goldSoft,
    borderColor: colors.accentStrong,
    borderRadius: radii.pill,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  headerDateText: {
    color: colors.accentStrong,
    fontFamily: fontFamilies.ui,
    fontSize: typography.body,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  exploreBlock: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  exploreBlockRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  exploreCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  exploreEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.tab,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  exploreList: {
    gap: spacing.md,
  },
  exploreMeta: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  exploreNameList: {
    gap: spacing.xs,
    paddingTop: spacing.xs,
  },
  exploreSaintRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  exploreSaintRowWithBorder: {
    alignItems: "center",
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  exploreTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
  heroButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  heroButtonText: {
    color: colors.background,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderTopColor: colors.accent,
    borderTopWidth: 3,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
  },
  heroEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  heroNote: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  heroText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 22,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 36,
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
    gap: spacing.md,
  },
  quickActions: {
    columnGap: spacing.xs,
    flexDirection: "row",
  },
});
