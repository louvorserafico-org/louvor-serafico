import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme/tokens";

type CelebrationCtaProps = {
  href: string;
  title: string;
  description: string;
};

export function CelebrationCta({ description, href, title }: CelebrationCtaProps) {
  return (
    <Link asChild href={href}>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
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
    borderColor: colors.gold,
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
  description: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    lineHeight: 18,
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
