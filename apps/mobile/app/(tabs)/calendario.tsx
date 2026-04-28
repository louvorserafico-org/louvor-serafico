import { getInitialCelebrationCatalog, getLiturgicalDayForDate } from "@louvor-serafico/shared";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { CelebrationCard } from "@/components/CelebrationCard";
import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { buildCalendarDayRoute } from "@/features/celebrations/calendar-day-route";
import { buildCalendarMonthView } from "@/features/celebrations/calendar-month-view";
import { buildCalendarOverview } from "@/features/celebrations/calendar-overview";
import { resolveCelebrationCatalogSource } from "@/features/celebrations/celebration-catalog-source";
import { fetchRemoteCelebrations } from "@/features/celebrations/remote-celebrations";
import { buildRemoteFeedback } from "@/features/remote/remote-feedback";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

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
  const remoteFeedback = buildRemoteFeedback({
    emptyLabel: "Nenhuma celebracao remota encontrada.",
    itemCount: remoteCount,
    readyLabel: "celebracoes remotas prontas",
    status: remoteStatus,
    statusMessage: remoteMessage,
  });
  const monthView = useMemo(
    () => buildCalendarMonthView(selectedMonth, celebrations),
    [celebrations, selectedMonth],
  );
  const leadingEmptyCells = Array.from(
    { length: monthView.leadingEmptyCellCount },
    (_, index) => `empty-${monthView.monthNumber}-${index}`,
  );
  const canGoPrev = selectedMonth > 1;
  const canGoNext = selectedMonth < 12;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader eyebrow={overview.eyebrow} title={overview.title} subtitle={subtitle} />

      <View style={[styles.summary, sourceMode === "remote" ? styles.summaryRemote : styles.summaryLocal]}>
        <Text style={styles.summaryEyebrow}>Calendario liturgico</Text>
        <Text style={styles.summaryTitle}>{overview.title}</Text>
        <Text style={styles.summaryText}>
          {sourceMode === "remote" ? remoteFeedback.detail : overview.helperText}
        </Text>
      </View>

      <EditorialSectionHeader
        eyebrow="Navegacao"
        subtitle="Percorra o ano de 2026 e toque em cada data para abrir o detalhe correspondente."
        title={`Calendario de ${monthView.monthLabel}`}
      />

      <View style={styles.monthCard}>
        <View style={styles.monthHeader}>
          <Pressable
            accessibilityRole="button"
            disabled={!canGoPrev}
            onPress={() => setSelectedMonth((current) => Math.max(1, current - 1))}
            style={[styles.monthNavButton, !canGoPrev ? styles.monthNavButtonDisabled : undefined]}
          >
            <Text style={[styles.monthNavText, !canGoPrev ? styles.monthNavTextDisabled : undefined]}>
              Anterior
            </Text>
          </Pressable>
          <Text style={styles.monthTitle}>{monthView.monthLabel}</Text>
          <Pressable
            accessibilityRole="button"
            disabled={!canGoNext}
            onPress={() => setSelectedMonth((current) => Math.min(12, current + 1))}
            style={[styles.monthNavButton, !canGoNext ? styles.monthNavButtonDisabled : undefined]}
          >
            <Text style={[styles.monthNavText, !canGoNext ? styles.monthNavTextDisabled : undefined]}>
              Proximo
            </Text>
          </Pressable>
        </View>

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
                day.kind === "has_repertoire" ? styles.dayCellRepertoire : undefined,
                day.kind === "liturgical_day_without_repertoire" ? styles.dayCellLiturgical : undefined,
                day.monthDay === today.monthDay ? styles.dayCellToday : undefined,
              ]}
            >
              <Text
                style={[
                  styles.dayNumber,
                  day.kind === "has_repertoire" ? styles.dayNumberRepertoire : undefined,
                  day.kind === "liturgical_day_without_repertoire" ? styles.dayNumberLiturgical : undefined,
                  day.monthDay === today.monthDay ? styles.dayNumberToday : undefined,
                ]}
              >
                {day.dayNumber}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.dayCellRepertoire]} />
            <Text style={styles.legendText}>Com repertorio</Text>
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
          monthView.celebrations.map((celebration) => (
            <CelebrationCard celebration={celebration} key={celebration.id} />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.summaryTitle}>Ainda sem roteiros neste mes</Text>
            <Text style={styles.summaryText}>
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
    width: "13.2%",
  },
  dayCellEmpty: {
    borderColor: "transparent",
    opacity: 0,
  },
  dayCellLiturgical: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.gold,
  },
  dayCellPressable: {
    overflow: "hidden",
  },
  dayCellRepertoire: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  dayCellToday: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  dayNumber: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  dayNumberLiturgical: {
    color: colors.gold,
  },
  dayNumberRepertoire: {
    color: colors.accent,
  },
  dayNumberToday: {
    color: colors.background,
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
  grid: {
    columnGap: spacing.xs,
    flexDirection: "row",
    flexWrap: "wrap",
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
  monthHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthNavButton: {
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  monthNavButtonDisabled: {
    borderColor: colors.surfaceMuted,
  },
  monthNavText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  monthNavTextDisabled: {
    color: colors.textMuted,
  },
  monthTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontStyle: "italic",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  summary: {
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  summaryEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  summaryLocal: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderStrong,
  },
  summaryRemote: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
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
    width: "13.2%",
  },
  weekRow: {
    columnGap: spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
