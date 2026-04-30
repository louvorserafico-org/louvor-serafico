import { Image, StyleSheet, View } from "react-native";

import { colors, spacing } from "@/theme/tokens";

const tauElement = require("../../assets/tau-element.png");

export function OrnamentalDivider() {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Image resizeMode="contain" source={tauElement} style={styles.mark} />
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
    height: 28,
    paddingHorizontal: spacing.md,
    width: 26,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 28,
  },
});
