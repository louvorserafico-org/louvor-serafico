import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { signOutFromSupabase } from "@/features/auth/sign-out";
import { supabase } from "@/services/supabase/client";
import { colors, spacing, typography } from "@/theme/tokens";

export function SupabaseSessionCard() {
  const { session } = useSupabaseSession();
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <View
      style={[
        styles.card,
        session.status === "authenticated"
          ? styles.ready
          : session.status === "loading"
            ? styles.loading
            : styles.pending,
      ]}
    >
      <Text style={styles.title}>
        {session.status === "authenticated"
          ? "Sessão real detectada"
          : session.status === "loading"
            ? "Lendo sessão real"
            : "Sem sessão real"}
      </Text>
      <Text style={styles.text}>Email: {session.email ?? "não autenticado"}</Text>
      <Text style={styles.text}>Provider: {session.provider ?? "não definido"}</Text>
      <Text style={styles.text}>User ID: {session.userId ?? "não autenticado"}</Text>
      {session.status === "authenticated" ? (
        <Pressable
          accessibilityRole="button"
          disabled={submitting}
          onPress={async () => {
            setSubmitting(true);
            const result = await signOutFromSupabase(supabase);
            setMessage(result.message);
            setSubmitting(false);
          }}
          style={[styles.button, submitting ? styles.buttonDisabled : undefined]}
        >
          <Text style={[styles.buttonText, submitting ? styles.buttonTextDisabled : undefined]}>
            {submitting ? "Saindo..." : "Sair"}
          </Text>
        </Pressable>
      ) : null}
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.olive,
    borderColor: colors.olive,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  buttonTextDisabled: {
    color: colors.textMuted,
  },
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
