import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { buildAuthReadiness } from "@/features/auth/auth-readiness";
import { fetchSupabaseRemoteStatus, type SupabaseRemoteStatus } from "@/services/supabase/remote-status";
import { colors, spacing, typography } from "@/theme/tokens";

type CardState =
  | {
      status: "loading";
    }
  | SupabaseRemoteStatus;

export function AuthEntryCard() {
  const [state, setState] = useState<CardState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    void fetchSupabaseRemoteStatus().then((result) => {
      if (active) {
        setState(result);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <View style={[styles.card, styles.loading]}>
        <Text style={styles.title}>Preparando fluxo de entrada</Text>
        <Text style={styles.text}>Lendo disponibilidade de autenticacao.</Text>
      </View>
    );
  }

  const readiness = buildAuthReadiness(state);
  const disabled = readiness.status !== "ready";

  return (
    <View
      style={[
        styles.card,
        readiness.status === "ready" ? styles.ready : readiness.status === "limited" ? styles.limited : styles.blocked,
      ]}
    >
      <Text style={styles.title}>{readiness.title}</Text>
      <Text style={styles.text}>{readiness.helperText}</Text>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={() => router.push("/entrar")}
        style={[styles.button, disabled ? styles.buttonDisabled : styles.buttonReady]}
      >
        <Text style={[styles.buttonText, disabled ? styles.buttonTextMuted : undefined]}>{readiness.ctaLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  blocked: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  button: {
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonDisabled: {
    borderColor: colors.border,
  },
  buttonReady: {
    backgroundColor: colors.olive,
    borderColor: colors.olive,
  },
  buttonText: {
    fontSize: typography.caption,
    fontWeight: "700",
  },
  buttonTextMuted: {
    color: colors.textMuted,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  limited: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  loading: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
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
