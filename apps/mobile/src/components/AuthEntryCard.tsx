import { Link, router } from "expo-router";
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
      <View style={styles.buttonRow}>
        <Pressable
          accessibilityRole="button"
          disabled={disabled}
          onPress={() => router.push("/entrar")}
          style={[styles.button, disabled ? styles.buttonDisabled : styles.buttonReady]}
        >
          <Text style={[styles.buttonText, disabled ? styles.buttonTextMuted : undefined]}>Entrar</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          disabled={disabled}
          onPress={() => router.push("/criar-conta")}
          style={[styles.button, styles.secondaryButton, disabled ? styles.buttonDisabled : undefined]}
        >
          <Text style={[styles.secondaryButtonText, disabled ? styles.buttonTextMuted : undefined]}>Criar conta</Text>
        </Pressable>
      </View>
      <View style={styles.linksRow}>
        <Link asChild href="/politica-privacidade">
          <Pressable accessibilityRole="button" style={styles.linkButton}>
            <Text style={styles.linkText}>Politica de privacidade</Text>
          </Pressable>
        </Link>
        <Link asChild href="/termos-de-uso">
          <Pressable accessibilityRole="button" style={styles.linkButton}>
            <Text style={styles.linkText}>Termos de uso</Text>
          </Pressable>
        </Link>
        <Link asChild href="/seus-dados">
          <Pressable accessibilityRole="button" style={styles.linkButton}>
            <Text style={styles.linkText}>Seus dados</Text>
          </Pressable>
        </Link>
      </View>
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
    color: colors.surface,
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
    gap: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  limited: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  linkButton: {
    paddingVertical: spacing.xs,
  },
  linkText: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  linksRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
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
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
  },
  secondaryButtonText: {
    color: colors.accentStrong,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
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
