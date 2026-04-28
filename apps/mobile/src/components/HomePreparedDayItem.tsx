import type { Celebration } from "@louvor-serafico/shared";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontFamilies, spacing, typography } from "@/theme/tokens";

type HomePreparedDayItemProps = {
  celebration: Celebration;
  isLast?: boolean;
};

export function HomePreparedDayItem({ celebration, isLast = false }: HomePreparedDayItemProps) {
  return (
    <Link asChild href={`/celebracoes/${celebration.slug}`}>
      <Pressable style={[styles.item, !isLast ? styles.itemBorder : undefined]}>
        <View style={styles.copy}>
          <Text style={styles.date}>{celebration.dateLabel}</Text>
          <Text style={styles.title}>{celebration.title}</Text>
          <Text style={styles.meta}>{celebration.recommendations.length} cantos sugeridos</Text>
        </View>
        <Text style={styles.action}>Ver roteiro</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  action: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
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
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  itemBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
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
