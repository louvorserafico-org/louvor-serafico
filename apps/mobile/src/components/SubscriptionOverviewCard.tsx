import { StyleSheet, Text, View } from "react-native";

import { useSessionPreview } from "@/features/auth/SessionProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildSubscriptionOverview } from "@/features/subscription/subscription-overview";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

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
      <View style={styles.copyBlock}>
        <Text style={styles.text}>{overview.helperText}</Text>
        <Text style={styles.note}>
          {overview.status === "active"
            ? "Seu acesso segue vinculado a esta conta."
            : overview.status === "ready"
              ? "Assim que ativada, a assinatura libera o acervo completo deste perfil."
              : "Entre para manter seu acesso e seus materiais no mesmo lugar."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
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
  locked: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  ready: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  note: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
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
