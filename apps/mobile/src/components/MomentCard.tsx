import type { MassMoment } from "@louvor-serafico/shared";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme/tokens";

type MomentCardProps = {
  assetCount: number;
  moment: MassMoment;
  onPress?: () => void;
  songTitle: string;
};

export function MomentCard({ assetCount, moment, onPress, songTitle }: MomentCardProps) {
  const Root = onPress ? Pressable : View;

  return (
    <Root style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.order}>{moment.order}</Text>
      <View style={styles.content}>
        <Text style={styles.label}>{moment.label}</Text>
        <Text style={styles.song}>{songTitle}</Text>
        <Text style={styles.assets}>
          {assetCount > 0 ? `${assetCount} material premium` : "Material pendente"}
        </Text>
      </View>
    </Root>
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
  assets: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  order: {
    color: colors.gold,
    fontSize: typography.body,
    fontWeight: "800",
    minWidth: 20,
  },
  pressed: {
    opacity: 0.82,
  },
  song: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
});
