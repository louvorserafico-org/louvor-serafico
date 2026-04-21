import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useSessionPreview } from "@/features/auth/SessionProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildPaywallCopy } from "@/features/subscription/paywall-copy";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, spacing, typography } from "@/theme/tokens";

export function PaywallPreviewCard() {
  const { session } = useSessionPreview();
  const { session: supabaseSession } = useSupabaseSession();
  const { hasActiveSubscription, toggleSubscription } = useSubscriptionPreview();
  const isAuthenticated = session.status === "signed_in" || supabaseSession.status === "authenticated";
  const copy = buildPaywallCopy({ hasActiveSubscription, isAuthenticated });

  return (
    <View style={[styles.card, hasActiveSubscription ? styles.active : styles.inactive]}>
      <Text style={styles.eyebrow}>{copy.eyebrow}</Text>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={styles.body}>{copy.body}</Text>
      {isAuthenticated ? (
        <Pressable onPress={toggleSubscription} style={styles.button}>
          <Text style={styles.buttonText}>{copy.actionLabel}</Text>
        </Pressable>
      ) : (
        <Link asChild href="/entrar">
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{copy.actionLabel}</Text>
          </Pressable>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  body: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    lineHeight: 19,
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
    fontWeight: "700",
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
  inactive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.heading,
    fontWeight: "900",
  },
});
