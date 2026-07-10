import { getInitialCelebrationCatalog, getLiturgicalDayForDate } from "@louvor-serafico/shared";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { buildCalendarDayRoute } from "@/features/celebrations/calendar-day-route";
import { buildCalendarMonthView } from "@/features/celebrations/calendar-month-view";
import { buildCalendarOverview } from "@/features/celebrations/calendar-overview";
import { resolveCelebrationCatalogSource } from "@/features/celebrations/celebration-catalog-source";
import { fetchRemoteCelebrations } from "@/features/celebrations/remote-celebrations";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

const DAY_CELL_WIDTH = "13.4%";

export default function CalendarScreen() {
  const localCelebrations = useMemo(() => getInitialCelebrationCatalog(), []);
  const today = getLiturgicalDayForDate(new Date());
  const [celebrations, setCelebrations] = useState(localCelebrations);
  const [selectedMonth, setSelectedMonth] = useState(today.monthNumber);
  const [sourceMode, setSourceMode] = useState<"local" | "remote">("local");
  const [remoteCount, setRemoteCount] = useState(0);
  const [remoteStatus, setRemoteStatus] = useState<"error" | "not_configured" | "ready">("not_configured");
  const [subtitle, setSubtitle] = useState(
    "Percorra o ano liturgico e encontre cada celebracao com serenidade e clareza.",
  );
  const [remoteMessage, setRemoteMessage] = useState(
    "Configurar Supabase antes da leitura remota de celebracoes.",
  );

  useEffect(() => {
    let active = true;

    void fetchRemoteCelebrations(
      fetch,
      supabaseConfig.url,
      supabaseConfig.publishableKey ?? supabaseConfig.anonKey,
    ).then((remote) => {
      if (!active) {
        return;
      }

      const source = resolveCelebrationCatalogSource(remote, localCelebrations);
      setCelebrations(source.celebrations);
      setSourceMode(source.mode);
      setRemoteCount(remote.celebrations.length);
      setRemoteStatus(remote.status);
      setRemoteMessage(remote.message);
      setSubtitle(
        source.mode === "remote"
          ? "Calendario liturgico atualizado para sua consulta."
          : "Calendario inicial disponivel mesmo sem conexao.",
      );
    });

    return () => {
      active = false;
    };
  }, [localCelebrations]);

  const overview = buildCalendarOverview({
    localCount: localCelebrations.length,
    remoteCount,
    sourceMode,
  });
  const monthView = useMemo(
    () => buildCalendarMonthView(selectedMonth, celebrations),
    [celebrations, selectedMonth],
  );
  const leadingEmptyCells = Array.from(
    { length: monthView.leadingEmptyCellCount },
    (_, index) => `empty-${monthView.monthNumber}-${index}`,
  );
  const trailingEmptyCells = Array.from(
    { length: Math.max(0, 42 - leadingEmptyCells.length - monthView.monthDays.length) },
    (_, index) => `tail-${monthView.monthNumber}-${index}`,
  );
  const canGoPrev = selectedMonth > 1;
  const canGoNext = selectedMonth < 12;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader eyebrow={overview.eyebrow} title={overview.title} subtitle={subtitle} />

      <EditorialSectionHeader
        eyebrow="Navegacao"
        title={`Calendario de ${capitalizeLabel(monthView.monthLabel)}`}
      />

      <View style={styles.monthCard}>
        <View style={styles.monthHeader}>
          <Pressable
            accessibilityLabel="Mes anterior"
            accessibilityRole="button"
            disabled={!canGoPrev}
            onPress={() => setSelectedMonth((current) => Math.max(1, current - 1))}
            style={[styles.monthNavButton, !canGoPrev ? styles.monthNavButtonDisabled : undefined]}
          >
            <Text style={[styles.monthNavText, !canGoPrev ? styles.monthNavTextDisabled : undefined]}>
              ‹
            </Text>
          </Pressable>
          <Text style={styles.monthTitle}>{capitalizeLabel(monthView.monthLabel)}</Text>
          <Pressable
            accessibilityLabel="Proximo mes"
            accessibilityRole="button"
            disabled={!canGoNext}
            onPress={() => setSelectedMonth((current) => Math.min(12, current + 1))}
            style={[styles.monthNavButton, !canGoNext ? styles.monthNavButtonDisabled : undefined]}
          >
            <Text style={[styles.monthNavText, !canGoNext ? styles.monthNavTextDisabled : undefined]}>
              ›
            </Text>
          </Pressable>
        </View>
        <Text style={styles.monthEyebrow}>Ano liturgico 2026</Text>

        <View style={styles.weekRow}>
          {["D", "S", "T", "Q", "Q", "S", "S"].map((item, index) => (
            <Text key={`${item}-${index}`} style={styles.weekLabel}>
              {item}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {leadingEmptyCells.map((item) => (
            <View key={item} style={[styles.dayCell, styles.dayCellEmpty]} />
          ))}

          {monthView.monthDays.map((day) => (
            <Pressable
              accessibilityLabel={`${day.title} em ${day.dateLabel}`}
              accessibilityRole="button"
              key={day.monthDay}
              onPress={() => router.push(buildCalendarDayRoute(day))}
              style={[
                styles.dayCell,
                styles.dayCellPressable,
                isSunday(day.isoDate) ? styles.dayCellSunday : undefined,
                day.kind === "franciscan_saint" ? styles.dayCellFranciscan : undefined,
                day.kind === "has_repertoire" ? styles.dayCellRepertoire : undefined,
                day.kind === "liturgical_day_without_repertoire" ? styles.dayCellLiturgical : undefined,
                day.monthDay === today.monthDay ? styles.dayCellToday : undefined,
              ]}
            >
              <Text
                style={[
                  styles.dayNumber,
                  isSunday(day.isoDate) ? styles.dayNumberSunday : undefined,
                  day.kind === "franciscan_saint" ? styles.dayNumberFranciscan : undefined,
                  day.kind === "has_repertoire" ? styles.dayNumberRepertoire : undefined,
                  day.kind === "liturgical_day_without_repertoire" ? styles.dayNumberLiturgical : undefined,
                  day.monthDay === today.monthDay ? styles.dayNumberToday : undefined,
                ]}
              >
                {day.dayNumber}
              </Text>
            </Pressable>
          ))}

          {trailingEmptyCells.map((item) => (
            <View key={item} style={[styles.dayCell, styles.dayCellEmpty]} />
          ))}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.dayCellRepertoire]} />
            <Text style={styles.legendText}>Com repertorio</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.dayCellFranciscan]} />
            <Text style={styles.legendText}>Santo franciscano</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.dayCellLiturgical]} />
            <Text style={styles.legendText}>Data liturgica</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.dayCellToday]} />
            <Text style={styles.legendText}>Hoje</Text>
          </View>
        </View>
      </View>

      <EditorialSectionHeader
        eyebrow="Datas"
        subtitle="Dias liturgicos e roteiros ja sinalizados neste mes."
        title={`Datas marcadas em ${monthView.monthLabel}`}
      />

      <View style={styles.markedList}>
        {monthView.markedDays.length > 0 ? (
          monthView.markedDays.map((day) => (
            <Pressable
              accessibilityLabel={`${day.title} em ${day.dateLabel}`}
              accessibilityRole="button"
              key={day.monthDay}
              onPress={() => router.push(buildCalendarDayRoute(day))}
              style={({ pressed }) => [
                styles.markedItem,
                pressed ? styles.cardPressed : undefined,
                day.monthDay !== monthView.markedDays[monthView.markedDays.length - 1]?.monthDay
                  ? styles.markedItemBorder
                  : undefined,
              ]}
            >
              <Text style={styles.markedEyebrow}>{day.dateLabel}</Text>
              <Text style={styles.markedTitle}>{day.title}</Text>
              <Text style={styles.markedText}>
                {day.kind === "has_repertoire"
                  ? "Roteiro musical disponivel para consulta."
                  : day.kind === "franciscan_saint"
                    ? "Santo franciscano do dia."
                    : "Data liturgica registrada. Repertorio ainda nao publicado."}
              </Text>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.summaryTitle}>Sem marcacoes neste mes</Text>
            <Text style={styles.summaryText}>
              Siga pelos meses do calendario de 2026 para localizar as proximas datas preparadas.
            </Text>
          </View>
        )}
      </View>

      <EditorialSectionHeader
        eyebrow="Consulta"
        subtitle="Os roteiros publicados seguem disponiveis para abrir, revisar e preparar."
        title={`Roteiros de ${monthView.monthLabel}`}
      />

      <View style={styles.list}>
        {monthView.celebrations.length > 0 ? (
          <View style={styles.markedList}>
            {monthView.celebrations.map((celebration) => (
              <Pressable
                accessibilityLabel={`${celebration.title} em ${celebration.dateLabel}`}
                accessibilityRole="button"
                key={celebration.id}
                onPress={() => router.push(`/celebracoes/${celebration.slug}`)}
                style={({ pressed }) => [
                  styles.markedItem,
                  pressed ? styles.cardPressed : undefined,
                  celebration.id !== monthView.celebrations[monthView.celebrations.length - 1]?.id
                    ? styles.markedItemBorder
                    : undefined,
                ]}
              >
                <Text style={styles.markedEyebrow}>{celebration.dateLabel}</Text>
                <Text style={styles.markedTitle}>{celebration.title}</Text>
                <Text style={styles.markedText}>
                  {celebration.recommendations.length} canto
                  {celebration.recommendations.length === 1 ? "" : "s"} sugerido
                  {celebration.recommendations.length === 1 ? "" : "s"}.
                </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Ainda sem roteiros neste mes</Text>
            <Text style={styles.emptyText}>
              Acompanhe as datas marcadas acima ou avance pelos proximos meses de 2026.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardPressed: {
    opacity: 0.82,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  dayCell: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: DAY_CELL_WIDTH,
  },
  dayCellEmpty: {
    borderColor: "transparent",
    opacity: 0,
  },
  dayCellFranciscan: {
    backgroundColor: colors.surface,
    borderColor: colors.accent,
  },
  dayCellLiturgical: {
    backgroundColor: colors.surface,
    borderColor: colors.gold,
  },
  dayCellPressable: {
    overflow: "hidden",
  },
  dayCellRepertoire: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  dayCellSunday: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderStrong,
  },
  dayCellToday: {
    borderColor: colors.textPrimary,
    borderWidth: 2,
  },
  dayNumber: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  dayNumberFranciscan: {
    color: colors.accentStrong,
    fontWeight: "800",
  },
  dayNumberLiturgical: {
    color: colors.gold,
  },
  dayNumberRepertoire: {
    color: colors.accent,
  },
  dayNumberSunday: {
    color: colors.textPrimary,
    fontWeight: "800",
  },
  dayNumberToday: {
    color: colors.textPrimary,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  emptyText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.xs,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  legendDot: {
    borderRadius: radii.pill,
    height: 12,
    width: 12,
  },
  legendItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  legendText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
  },
  list: {
    gap: spacing.md,
  },
  markedItem: {
    gap: spacing.xs,
    paddingBottom: spacing.md,
    paddingTop: spacing.xs,
  },
  markedItemBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: spacing.sm,
  },
  markedEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  markedList: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  markedText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  markedTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.body,
    fontWeight: "700",
  },
  monthCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  monthEyebrow: {
    alignSelf: "center",
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  monthHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthNavButton: {
    alignItems: "center",
    flexBasis: 36,
    justifyContent: "center",
    minHeight: 36,
    minWidth: 36,
  },
  monthNavButtonDisabled: {
    opacity: 0.35,
  },
  monthNavText: {
    color: colors.accent,
    fontFamily: fontFamilies.display,
    fontSize: 28,
    lineHeight: 28,
  },
  monthNavTextDisabled: {
    color: colors.textMuted,
  },
  monthTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.title,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "capitalize",
  },
  summaryText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
  },
  weekLabel: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
    textAlign: "center",
    width: DAY_CELL_WIDTH,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function isSunday(isoDate: string): boolean {
  return new Date(`${isoDate}T00:00:00.000Z`).getUTCDay() === 0;
}

function capitalizeLabel(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
