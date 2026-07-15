import type { Celebration } from "@louvor-serafico/shared";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type CelebrationCardProps = {
  celebration: Celebration;
};

export function CelebrationCard({ celebration }: CelebrationCardProps) {
  return (
    <Link asChild href={`/celebracoes/${celebration.slug}`}>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <View style={styles.content}>
          <Text style={styles.date}>{celebration.dateLabel}</Text>
          <Text style={styles.title}>{celebration.title}</Text>
          <Text style={styles.meta}>{celebration.recommendations.length} cantos sugeridos</Text>
        </View>
        <Text style={styles.action}>Ver repertório</Text>
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
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
  },
  content: {
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
  meta: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
  },
  pressed: {
    opacity: 0.82,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
