import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme/tokens";

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
  },
  eyebrow: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: "800",
    lineHeight: 38,
  },
});
