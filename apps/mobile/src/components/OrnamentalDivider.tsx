import { Asset } from "expo-asset";
import { Image, StyleSheet, View } from "react-native";

import { colors, spacing } from "@/theme/tokens";

const tauElement = require("../../assets/tau-element.png");
const tauAssetUri = Asset.fromModule(tauElement).uri;

export function OrnamentalDivider() {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <View style={styles.markFrame}>
        <Image defaultSource={tauElement} resizeMode="contain" source={{ uri: tauAssetUri }} style={styles.mark} />
      </View>
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
    height: 34,
    width: 32,
  },
  markFrame: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: spacing.md,
    minHeight: 36,
    minWidth: 32,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 36,
  },
});
