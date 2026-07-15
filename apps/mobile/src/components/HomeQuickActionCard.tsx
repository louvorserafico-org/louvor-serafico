import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type HomeQuickActionCardProps = {
  href: "/calendario" | "/comunidade" | "/repertorio";
  icon: keyof typeof Ionicons.glyphMap;
  subtitle?: string;
  title: string;
};

export function HomeQuickActionCard({ href, icon, subtitle, title }: HomeQuickActionCardProps) {
  return (
    <Link asChild href={href}>
      <AnimatedPressable style={styles.card}>
        <View style={styles.iconBadge}>
          <Ionicons color={colors.accentStrong} name={icon} size={22} />
        </View>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        {subtitle ? (
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </AnimatedPressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderTopColor: colors.accent,
    borderTopWidth: 3,
    borderWidth: 1,
    flex: 1,
    gap: spacing.sm,
    minHeight: 108,
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  iconBadge: {
    alignItems: "center",
    backgroundColor: colors.goldSoft,
    borderColor: colors.accentStrong,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.tab,
    fontWeight: "600",
    lineHeight: 14,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    lineHeight: 18,
  },
});
