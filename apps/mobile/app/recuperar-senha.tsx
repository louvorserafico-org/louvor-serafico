import { router } from "expo-router";
import { useState, type ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { updatePasswordFromRecovery } from "@/features/auth/password-reset";
import { supabase } from "@/services/supabase/client";
import { colors, spacing, typography } from "@/theme/tokens";

export default function PasswordRecoveryScreen() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ message: string; status: "error" | "success" } | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <PageHeader
        eyebrow="Conta"
        title="Redefinir senha"
        subtitle="Digite uma nova senha depois de abrir o link enviado por email."
      />

      <View style={styles.formCard}>
        <Text style={styles.cardTitle}>Nova senha</Text>
        <PasswordInput
          autoComplete="password-new"
          onChangeText={setPassword}
          placeholder="nova senha"
          secureTextEntry
          value={password}
        />
        <PasswordInput
          autoComplete="password-new"
          onChangeText={setPasswordConfirmation}
          placeholder="confirmar nova senha"
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
          Esta tela precisa ser aberta pelo email de recuperacao para receber uma sessao valida do Supabase.
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
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  cardText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    lineHeight: 18,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
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
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.textPrimary,
    fontSize: typography.caption,
    padding: spacing.md,
  },
  resultCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  resultText: {
    color: colors.textPrimary,
    fontSize: typography.caption,
  },
  secondaryAction: {
    alignSelf: "flex-start",
    paddingVertical: spacing.xs,
  },
  secondaryActionText: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  success: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
});
