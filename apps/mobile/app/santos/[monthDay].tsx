import { findSaintDaysByMonthDay, getLiturgicalDayForDate } from "@louvor-serafico/shared";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import {
  buildSaintClassification,
  buildSaintHistoryState,
  buildSaintObservancesLabel,
} from "@/features/santoral/saint-detail";
import { resolveSaintsForDay } from "@/features/santoral/saint-day-filter";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

function resolveDateLabel(monthDay: string): string {
  const parsed = new Date(`2026-${monthDay}T12:00:00.000Z`);

  if (Number.isNaN(parsed.getTime())) {
    return monthDay;
  }

  return getLiturgicalDayForDate(parsed).dateLabel;
}

export default function SaintDayScreen() {
  const params = useLocalSearchParams<{ monthDay: string; saintId?: string }>();
  const monthDay = params.monthDay ?? "";
  const allSaints = findSaintDaysByMonthDay(monthDay);
  const saints = resolveSaintsForDay(allSaints, params.saintId);
  const { hasActiveSubscription } = useSubscriptionPreview();

  if (saints.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
        <Stack.Screen options={{ headerShown: true, title: "Santo do dia" }} />
        <PageHeader
          eyebrow="Santoral"
          title="Dia sem santo franciscano"
          subtitle="Esta data ainda não possui um santo franciscano no calendário seráfico."
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Santo do dia" }} />
      <PageHeader
        eyebrow={resolveDateLabel(monthDay)}
        title={saints.length === 1 ? "Santo do dia" : "Santos do dia"}
        subtitle="Memória do calendário seráfico franciscano."
      />

      <View style={styles.list}>
        {saints.map((saint) => {
          const classification = buildSaintClassification(saint);
          const observances = buildSaintObservancesLabel(saint);
          const history = buildSaintHistoryState(saint, hasActiveSubscription);

          return (
            <View key={saint.id} style={styles.card}>
              <Text style={styles.eyebrow}>{classification}</Text>
              <Text style={styles.name}>{saint.name}</Text>
              {observances ? <Text style={styles.observances}>{observances}</Text> : null}

              <EditorialSectionHeader eyebrow="História" title="Vida e memória" />
              <Text style={history.status === "available" ? styles.historyText : styles.historyMuted}>
                {history.text}
              </Text>

              {history.status === "locked" ? (
                <Link asChild href="/perfil">
                  <Text style={styles.premiumLink}>Ver premium</Text>
                </Link>
              ) : null}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  eyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  historyMuted: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  historyText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  list: {
    gap: spacing.md,
  },
  name: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
  },
  observances: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  premiumLink: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
});
