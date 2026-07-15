import { Ionicons } from "@expo/vector-icons";
import type { Celebration } from "@louvor-serafico/shared";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type HomePreparedDayItemProps = {
  celebration: Celebration;
};

export function HomePreparedDayItem({ celebration }: HomePreparedDayItemProps) {
  return (
    <Link asChild href={`/celebracoes/${celebration.slug}`}>
      <AnimatedPressable style={styles.item}>
        <View style={styles.copy}>
          <Text style={styles.date}>{celebration.dateLabel}</Text>
          <Text style={styles.title}>{celebration.title}</Text>
          <Text style={styles.meta}>{celebration.recommendations.length} cantos sugeridos</Text>
        </View>
        <Ionicons color={colors.textMuted} name="chevron-forward" size={20} />
      </AnimatedPressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  date: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  item: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  meta: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    fontWeight: "700",
  },
});
