import { StyleSheet, Text } from "react-native";

import { colors, fontFamilies, typography } from "@/theme/tokens";

type SectionTitleProps = {
  title: string;
};

export function SectionTitle({ title }: SectionTitleProps) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontStyle: "italic",
    fontWeight: "700",
  },
});
