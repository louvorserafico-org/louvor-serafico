import { router } from "expo-router";
import { useState, type ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { buildPasswordRecoveryOverview } from "@/features/auth/password-recovery-overview";
import { updatePasswordFromRecovery } from "@/features/auth/password-reset";
import { supabase } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function PasswordRecoveryScreen() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ message: string; status: "error" | "success" } | null>(null);
  const overview = buildPasswordRecoveryOverview();

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <PageHeader
        eyebrow="Conta"
        title="Redefinir senha"
        subtitle="Renove seu acesso com serenidade e volte ao app com tudo em ordem."
      />

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{overview.title}</Text>
        <Text style={styles.summaryText}>{overview.helperText}</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.cardTitle}>Nova senha</Text>
        <PasswordInput
          autoComplete="password-new"
          onChangeText={setPassword}
          placeholder="Nova senha"
          secureTextEntry
          value={password}
        />
        <PasswordInput
          autoComplete="password-new"
          onChangeText={setPasswordConfirmation}
          placeholder="Confirme a nova senha"
          secureTextEntry
          value={passwordConfirmation}
        />
        <Pressable
          accessibilityRole="button"
          disabled={submitting}
          onPress={async () => {
            setSubmitting(true);
            const nextResult = await updatePasswordFromRecovery(supabase, password, passwordConfirmation);
            setResult(nextResult);
            setSubmitting(false);
          }}
          style={[styles.button, submitting ? styles.buttonDisabled : undefined]}
        >
          <Text style={[styles.buttonText, submitting ? styles.buttonTextDisabled : undefined]}>
            {submitting ? "Atualizando..." : "Atualizar senha"}
          </Text>
        </Pressable>
      </View>

      {result ? (
        <View style={[styles.resultCard, result.status === "success" ? styles.success : styles.error]}>
          <Text style={styles.resultText}>{result.message}</Text>
          {result.status === "success" ? (
            <Pressable accessibilityRole="button" onPress={() => router.replace("/entrar")} style={styles.secondaryAction}>
              <Text style={styles.secondaryActionText}>Voltar para login</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Link necessario</Text>
        <Text style={styles.cardText}>
          Abra esta tela a partir do email de recuperacao para concluir a troca da senha sem interrupcoes.
        </Text>
      </View>
    </ScrollView>
  );
}

function PasswordInput(props: ComponentProps<typeof TextInput>) {
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
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  cardText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 18,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.body,
    fontStyle: "italic",
    fontWeight: "700",
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
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    padding: spacing.md,
  },
  resultCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  resultText: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
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
  summaryCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  summaryText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontStyle: "italic",
    fontWeight: "700",
  },
});
