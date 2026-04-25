import { StyleSheet, Text, View } from "react-native";

import { useSessionPreview } from "@/features/auth/SessionProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildSubscriptionOverview } from "@/features/subscription/subscription-overview";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, spacing, typography } from "@/theme/tokens";

export function SubscriptionOverviewCard() {
  const { session } = useSessionPreview();
  const { session: supabaseSession } = useSupabaseSession();
  const { hasActiveSubscription } = useSubscriptionPreview();
  const isAuthenticated = session.status === "signed_in" || supabaseSession.status === "authenticated";
  const overview = buildSubscriptionOverview({
    hasActiveSubscription,
    isAuthenticated,
  });

  return (
    <View
      style={[
        styles.card,
        overview.status === "active" ? styles.active : overview.status === "ready" ? styles.ready : styles.locked,
      ]}
    >
      <Text style={styles.eyebrow}>Assinatura</Text>
      <Text style={styles.title}>{overview.title}</Text>
      <Text style={styles.text}>{overview.helperText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  locked: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  ready: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  text: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    lineHeight: 19,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.heading,
    fontWeight: "900",
  },
});
