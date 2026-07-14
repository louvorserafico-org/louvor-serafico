import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { FadeInView } from "@/components/FadeInView";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type ResultBannerProps = {
  detail?: string;
  message: string;
  status: "error" | "success";
};

export function ResultBanner({ detail, message, status }: ResultBannerProps) {
  const isError = status === "error";

  return (
    <FadeInView style={[styles.container, isError ? styles.error : styles.success]}>
      <View style={styles.row}>
        <Ionicons
          color={isError ? colors.gold : colors.olive}
          name={isError ? "alert-circle" : "checkmark-circle"}
          size={22}
        />
        <Text style={styles.message}>{message}</Text>
      </View>
      {detail ? <Text style={styles.detail}>Motivo técnico: {detail}</Text> : null}
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  detail: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    lineHeight: 18,
  },
  error: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  message: {
    color: colors.textPrimary,
    flexShrink: 1,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 22,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  success: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
});
