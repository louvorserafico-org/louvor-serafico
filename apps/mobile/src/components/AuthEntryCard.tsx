import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { buildAuthReadiness } from "@/features/auth/auth-readiness";
import { fetchSupabaseRemoteStatus, type SupabaseRemoteStatus } from "@/services/supabase/remote-status";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

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
        <Text style={styles.eyebrow}>Conta</Text>
        <Text style={styles.title}>Preparando sua entrada</Text>
        <Text style={styles.text}>Separando o caminho para entrar ou criar seu perfil.</Text>
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
      <Text style={styles.eyebrow}>Conta</Text>
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
    borderRadius: radii.pill,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonDisabled: {
    borderColor: colors.border,
  },
  buttonReady: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  buttonText: {
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  buttonTextMuted: {
    color: colors.textMuted,
  },
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  limited: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  loading: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  eyebrow: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
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
