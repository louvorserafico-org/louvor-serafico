import { Ionicons } from "@expo/vector-icons";
import type { MassMoment } from "@louvor-serafico/shared";
import { StyleSheet, Text, View } from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type MomentCardProps = {
  assetCount: number;
  materialBadges?: string[];
  moment: MassMoment;
  onPress?: () => void;
  songTitle: string;
};

export function MomentCard({ assetCount, materialBadges = [], moment, onPress, songTitle }: MomentCardProps) {
  const Root = onPress ? AnimatedPressable : View;

  return (
    <Root style={styles.card} onPress={onPress}>
      <Text style={styles.order}>{moment.order}</Text>
      <View style={styles.content}>
        <Text style={styles.label}>{moment.label}</Text>
        <Text style={styles.song}>{songTitle}</Text>
        <Text style={styles.assets}>
          {assetCount > 0 ? `${assetCount} material${assetCount > 1 ? "s" : ""} disponível${assetCount > 1 ? "is" : ""}` : "Material em preparação"}
        </Text>
        {materialBadges.length > 0 ? (
          <View style={styles.badges}>
            {materialBadges.map((badge) => (
              <View key={badge} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
      {onPress ? <Ionicons color={colors.textMuted} name="chevron-forward" size={20} /> : null}
    </Root>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.ui,
    fontSize: 12,
    fontWeight: "700",
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  card: {
    alignItems: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  label: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  assets: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  order: {
    color: colors.gold,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
    minWidth: 28,
  },
  song: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
});
