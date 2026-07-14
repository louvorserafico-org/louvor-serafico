import { getSaintDayCatalog, type SaintDay } from "@louvor-serafico/shared";
import { Link, Stack } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { qualifierLabels } from "@/features/santoral/saint-detail";
import {
  applySaintFilter,
  buildAvailableQualifiers,
  type SaintFilterOption,
} from "@/features/santoral/santoral-filter";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function SaintsListScreen() {
  const catalog = useMemo(() => getSaintDayCatalog(), []);
  const [filter, setFilter] = useState<SaintFilterOption>("all");
  const availableQualifiers = useMemo(() => buildAvailableQualifiers(catalog), [catalog]);
  const filtered = useMemo(() => applySaintFilter(catalog, filter), [catalog, filter]);

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Santos franciscanos" }} />
      <PageHeader
        eyebrow="Santoral"
        title="Santos franciscanos"
        subtitle="Percorra o calendário seráfico por categoria."
      />

      <View style={styles.chips}>
        <FilterChip active={filter === "all"} label="Todos" onPress={() => setFilter("all")} />
        {availableQualifiers.map((qualifier) => (
          <FilterChip
            active={filter === qualifier}
            key={qualifier}
            label={qualifierLabels[qualifier]}
            onPress={() => setFilter(qualifier)}
          />
        ))}
      </View>

      <View style={styles.list}>
        {filtered.map((saint, index) => (
          <SaintRow isLast={index === filtered.length - 1} key={saint.id} saint={saint} />
        ))}
        {filtered.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum santo nesta categoria.</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

function FilterChip({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : undefined]}
    >
      <Text style={[styles.chipText, active ? styles.chipTextActive : undefined]}>{label}</Text>
    </Pressable>
  );
}

function SaintRow({ isLast, saint }: { isLast: boolean; saint: SaintDay }) {
  return (
    <Link asChild href={`/santos/${saint.monthDay}`}>
      <Pressable style={[styles.row, !isLast ? styles.rowBorder : undefined]}>
        <Text style={styles.rowDate}>{saint.monthDay}</Text>
        <Text style={styles.rowName}>{saint.name}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  chip: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chipActive: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.accentStrong,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chipText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  chipTextActive: {
    color: colors.accentStrong,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  emptyText: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    padding: spacing.lg,
  },
  list: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  rowDate: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    width: 44,
  },
  rowName: {
    color: colors.textPrimary,
    flex: 1,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
  },
});
