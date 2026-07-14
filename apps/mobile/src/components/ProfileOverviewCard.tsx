import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { buildProfileOverview } from "@/features/auth/profile-overview";
import { useSupabaseProfile } from "@/features/auth/SupabaseProfileProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

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
      <View style={styles.copyBlock}>
        <Text style={styles.lead}>{overview.accountLine}</Text>
        <Text style={styles.text}>{overview.detailLine}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.badge}>{overview.premiumLine}</Text>
      </View>
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
    borderRadius: radii.pill,
    borderWidth: 1,
    color: colors.accentStrong,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    borderRadius: radii.pill,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    color: colors.background,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  copyBlock: {
    gap: spacing.xs,
  },
  eyebrow: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  lead: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: "row",
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
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
  },
});
