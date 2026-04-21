import { Pressable, StyleSheet, Text, View } from "react-native";

import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, spacing, typography } from "@/theme/tokens";

export function SubscriptionPreviewCard() {
  const { hasActiveSubscription, state, toggleSubscription } = useSubscriptionPreview();

  return (
    <View style={[styles.card, hasActiveSubscription ? styles.active : styles.inactive]}>
      <Text style={styles.title}>{hasActiveSubscription ? "Premium ativo" : "Premium inativo"}</Text>
      <Text style={styles.text}>Entitlement: {state.entitlement}</Text>
      <Text style={styles.text}>Status local: {state.status}</Text>
      <Pressable onPress={toggleSubscription} style={styles.button}>
        <Text style={styles.buttonText}>
          {hasActiveSubscription ? "Desativar preview premium" : "Ativar preview premium"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.olive,
    borderColor: colors.olive,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.xs,
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
  inactive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
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
