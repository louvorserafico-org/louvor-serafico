import type { Celebration } from "@louvor-serafico/shared";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme/tokens";

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
        <Text style={styles.action}>Abrir</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  action: {
    color: colors.accent,
    fontSize: typography.body,
    fontWeight: "800",
  },
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  date: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  meta: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  pressed: {
    opacity: 0.82,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
