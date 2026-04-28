import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type HomeQuickActionCardProps = {
  href: "/calendario" | "/comunidade" | "/repertorio";
  subtitle: string;
  title: string;
};

export function HomeQuickActionCard({ href, subtitle, title }: HomeQuickActionCardProps) {
  return (
    <Link asChild href={href}>
      <Pressable style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    flex: 1,
    gap: spacing.xs,
    minHeight: 88,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
  },
  subtitle: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 18,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
