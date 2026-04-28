import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontFamilies, spacing, typography } from "@/theme/tokens";

type EditorialSectionHeaderProps = {
  actionHref?: "/calendario" | "/comunidade" | "/entrar" | "/perfil" | "/repertorio";
  actionLabel?: string;
  eyebrow?: string;
  subtitle?: string;
  title: string;
};

export function EditorialSectionHeader({
  actionHref,
  actionLabel,
  eyebrow,
  subtitle,
  title,
}: EditorialSectionHeaderProps) {
  const action = actionHref && actionLabel
    ? (
      <Link asChild href={actionHref}>
        <Pressable accessibilityRole="button" style={styles.action}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      </Link>
    )
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.copy}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
        {action}
      </View>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    paddingLeft: spacing.md,
    paddingVertical: spacing.xs,
  },
  actionText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  container: {
    gap: spacing.xs,
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  eyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  subtitle: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
    lineHeight: 30,
  },
  topRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
});
