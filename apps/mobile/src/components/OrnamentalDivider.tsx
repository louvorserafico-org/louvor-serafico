import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamilies, spacing, typography } from "@/theme/tokens";

export function OrnamentalDivider() {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.mark}>IHS</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: colors.border,
    flex: 1,
    height: 1,
  },
  mark: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
    letterSpacing: 1,
    paddingHorizontal: spacing.md,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
});
