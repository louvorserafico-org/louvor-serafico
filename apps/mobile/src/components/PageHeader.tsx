import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamilies, spacing, typography } from "@/theme/tokens";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
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
    fontSize: typography.lead,
    lineHeight: 28,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.title,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 48,
  },
});
