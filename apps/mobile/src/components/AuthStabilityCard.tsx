import { StyleSheet, Text, View } from "react-native";

import { buildAuthStability } from "@/features/auth/auth-stability";
import { useSupabaseProfile } from "@/features/auth/SupabaseProfileProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { colors, spacing, typography } from "@/theme/tokens";

export function AuthStabilityCard() {
  const { profile } = useSupabaseProfile();
  const { session } = useSupabaseSession();
  const stability = buildAuthStability({
    profileStatus: profile.status,
    sessionStatus: session.status,
  });

  return (
    <View
      style={[
        styles.card,
        stability.status === "stable"
          ? styles.ready
          : stability.status === "loading"
            ? styles.loading
            : styles.pending,
      ]}
    >
      <Text style={styles.title}>{stability.title}</Text>
      <Text style={styles.text}>{stability.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  loading: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  pending: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  ready: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  text: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
