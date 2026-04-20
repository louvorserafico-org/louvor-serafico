import type { MassMoment } from "@louvor-serafico/shared";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme/tokens";

type MomentCardProps = {
  moment: MassMoment;
  songTitle: string;
};

export function MomentCard({ moment, songTitle }: MomentCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.order}>{moment.order}</Text>
      <View style={styles.content}>
        <Text style={styles.label}>{moment.label}</Text>
        <Text style={styles.song}>{songTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "flex-start",
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
  label: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  order: {
    color: colors.gold,
    fontSize: typography.body,
    fontWeight: "800",
    minWidth: 20,
  },
  song: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
});
