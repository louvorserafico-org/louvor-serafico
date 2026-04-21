import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { buildProfileOverview } from "@/features/auth/profile-overview";
import { useSupabaseProfile } from "@/features/auth/SupabaseProfileProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, spacing, typography } from "@/theme/tokens";

export function ProfileOverviewCard() {
  const { profile } = useSupabaseProfile();
  const { session } = useSupabaseSession();
  const { hasActiveSubscription } = useSubscriptionPreview();
  const overview = buildProfileOverview({ hasActiveSubscription, profile, session });
  const showEntryAction = overview.status === "anonymous";

  return (
    <View
      style={[
        styles.card,
        overview.status === "ready"
          ? styles.ready
          : overview.status === "loading"
            ? styles.loading
            : overview.status === "partial"
              ? styles.partial
              : styles.anonymous,
      ]}
    >
      <Text style={styles.eyebrow}>Minha conta</Text>
      <Text style={styles.title}>{overview.title}</Text>
      <Text style={styles.text}>{overview.accountLine}</Text>
      <Text style={styles.text}>{overview.detailLine}</Text>
      <Text style={styles.badge}>{overview.premiumLine}</Text>
      {showEntryAction ? (
        <Link asChild href="/entrar">
          <Pressable accessibilityRole="button" style={styles.button}>
            <Text style={styles.buttonText}>Entrar ou criar conta</Text>
          </Pressable>
        </Link>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  anonymous: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  badge: {
    alignSelf: "flex-start",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "800",
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.caption,
    fontWeight: "800",
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
  loading: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  partial: {
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
    lineHeight: 19,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.heading,
    fontWeight: "900",
  },
});
