import { Pressable, StyleSheet, Text, View } from "react-native";

import { buildSessionGate } from "@/features/auth/session-gate";
import { useSessionPreview } from "@/features/auth/SessionProvider";
import { colors, spacing, typography } from "@/theme/tokens";

export function SessionPreviewCard() {
  const { session, signInForPreview, signOutPreview } = useSessionPreview();
  const gate = buildSessionGate(session);

  return (
    <View
      style={[
        styles.card,
        gate.status === "open" ? styles.open : gate.status === "loading" ? styles.loading : styles.closed,
      ]}
    >
      <Text style={styles.title}>{gate.title}</Text>
      <Text style={styles.text}>{gate.helperText}</Text>
      {session.status === "signed_in" ? <Text style={styles.text}>Usuário: {session.displayName}</Text> : null}
      <Pressable
        accessibilityRole="button"
        onPress={session.status === "signed_in" ? signOutPreview : signInForPreview}
        style={[styles.button, gate.status === "open" ? styles.buttonOpen : styles.buttonClosed]}
      >
        <Text style={[styles.buttonText, gate.status === "open" ? styles.buttonTextOpen : undefined]}>
          {gate.actionLabel}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonClosed: {
    borderColor: colors.olive,
  },
  buttonOpen: {
    backgroundColor: colors.olive,
    borderColor: colors.olive,
  },
  buttonText: {
    color: colors.olive,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  buttonTextOpen: {
    color: colors.background,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  closed: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  loading: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  open: {
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
