import type { MassMoment } from "@louvor-serafico/shared";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type MomentCardProps = {
  assetCount: number;
  materialBadges?: string[];
  moment: MassMoment;
  onPress?: () => void;
  songTitle: string;
};

export function MomentCard({ assetCount, materialBadges = [], moment, onPress, songTitle }: MomentCardProps) {
  const Root = onPress ? Pressable : View;

  return (
    <Root style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.order}>{moment.order}</Text>
      <View style={styles.content}>
        <Text style={styles.label}>{moment.label}</Text>
        <Text style={styles.song}>{songTitle}</Text>
        <Text style={styles.assets}>
          {assetCount > 0 ? `${assetCount} material${assetCount > 1 ? "s" : ""} disponivel${assetCount > 1 ? "is" : ""}` : "Material em preparacao"}
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
        {onPress ? <Text style={styles.link}>Abrir canto completo</Text> : null}
      </View>
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
    borderRadius: radii.lg,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
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
  link: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
    marginTop: spacing.xs,
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
  pressed: {
    opacity: 0.82,
  },
  song: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
});
