import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type HomeQuickActionCardProps = {
  href: "/calendario" | "/comunidade" | "/repertorio";
  subtitle?: string;
  title: string;
};

export function HomeQuickActionCard({ href, subtitle, title }: HomeQuickActionCardProps) {
  return (
    <Link asChild href={href}>
      <Pressable style={styles.card}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        {subtitle ? (
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
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
    minHeight: 68,
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 12,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.ui,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 16,
  },
});
