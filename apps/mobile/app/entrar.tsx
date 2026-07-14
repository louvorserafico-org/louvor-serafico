import { Link, router } from "expo-router";
import { useState, type ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";
import { resolvePostLoginDestination } from "@/features/auth/auth-navigation";
import { buildAuthScreenOverview } from "@/features/auth/auth-screen-overview";
import { getAuthRedirectUrl } from "@/features/auth/auth-deep-link";
import { requestPasswordReset, signInWithPassword } from "@/features/auth/credentials-auth";
import { supabase } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<{ message: string; status: "error" | "success" } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const overview = buildAuthScreenOverview({ mode: "login" });

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.heroSection}>
        <EditorialSectionHeader eyebrow="Seja bem-vindo" title="Entrar" />
        <Text style={styles.helperText}>{overview.helperText}</Text>
        <OrnamentalDivider />
      </View>

      <View style={styles.formPanel}>
        <AuthInput
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Seu email"
          value={email}
        />
        <AuthInput
          autoComplete="password"
          onChangeText={setPassword}
          placeholder="Sua senha"
          secureTextEntry
          value={password}
        />
        <SubmitButton
          disabled={submitting}
          label={submitting ? "Entrando..." : "Entrar"}
          onPress={async () => {
            setSubmitting(true);
            const nextResult = await signInWithPassword(supabase, email, password);
            if (nextResult.status === "success") {
              const destination = resolvePostLoginDestination(router.canGoBack());
              setResult(null);
              setSubmitting(false);

              if (destination.kind === "back") {
                router.back();
                return;
              }

              router.replace(destination.href);
              return;
            }

            setResult(nextResult);
            setSubmitting(false);
          }}
        />
        <Link asChild href="/recuperar-senha">
          <Pressable accessibilityRole="button" style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>Esqueci minha senha</Text>
          </Pressable>
        </Link>
        <View style={styles.inlineLinks}>
          <Text style={styles.inlineText}>Ainda nao possui conta?</Text>
          <Link asChild href="/criar-conta">
            <Pressable accessibilityRole="button" style={styles.inlineButton}>
              <Text style={styles.inlineButtonText}>Criar conta</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {result ? (
        <View style={[styles.resultCard, result.status === "success" ? styles.success : styles.error]}>
          <Text style={styles.resultText}>{result.message}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

function SubmitButton({ disabled, label, onPress }: { disabled: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled ? styles.buttonDisabled : undefined]}
    >
      <Text style={[styles.buttonText, disabled ? styles.buttonTextDisabled : undefined]}>{label}</Text>
    </Pressable>
  );
}

function AuthInput(props: ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      autoCapitalize="none"
      placeholderTextColor={colors.textMuted}
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
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
  buttonDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  buttonText: {
    color: colors.background,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  buttonTextDisabled: {
    color: colors.textMuted,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  error: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  formPanel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
  },
  helperText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
    marginTop: spacing.xs,
  },
  heroSection: {
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
  inlineButton: {
    paddingVertical: spacing.xs,
  },
  inlineButtonText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  inlineLinks: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  inlineText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    padding: spacing.md,
  },
  resultCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing.lg,
  },
  resultText: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 22,
  },
  secondaryAction: {
    alignSelf: "flex-start",
    paddingVertical: spacing.xs,
  },
  secondaryActionText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  success: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
});
