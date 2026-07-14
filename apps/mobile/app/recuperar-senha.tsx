import { router, Stack } from "expo-router";
import { useState, type ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { ResultBanner } from "@/components/ResultBanner";
import { buildPasswordRecoveryOverview } from "@/features/auth/password-recovery-overview";
import { updatePasswordFromRecovery, type PasswordResetResult } from "@/features/auth/password-reset";
import { supabase } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function PasswordRecoveryScreen() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<PasswordResetResult | null>(null);
  const overview = buildPasswordRecoveryOverview();

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Redefinir senha" }} />
      <PageHeader
        eyebrow="Conta"
        title="Redefinir senha"
        subtitle="Defina uma nova senha e retome sua conta com tudo em ordem."
      />

      <View style={styles.summaryCard}>
        <EditorialSectionHeader eyebrow="Recuperacao" subtitle={overview.helperText} title={overview.title} />
      </View>

      <View style={styles.formCard}>
        <EditorialSectionHeader
          eyebrow="Nova senha"
          subtitle="Escolha uma senha nova para concluir o retorno a sua conta com seguranca e continuidade."
          title="Nova senha"
        />
        <PasswordInput
          autoComplete="password-new"
          onChangeText={setPassword}
          placeholder="Escolha uma nova senha"
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
        <View style={styles.resultGroup}>
          <ResultBanner detail={result.detail} message={result.message} status={result.status} />
          {result.status === "success" ? (
            <Pressable accessibilityRole="button" onPress={() => router.replace("/entrar")} style={styles.secondaryAction}>
              <Text style={styles.secondaryActionText}>Voltar para login</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <View style={styles.card}>
        <EditorialSectionHeader
          eyebrow="Antes de concluir"
          subtitle="Abra esta tela a partir do email de recuperacao para concluir a troca da senha sem interrupcoes."
          title="Link necessario"
        />
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
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
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
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
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
    fontSize: typography.body,
    padding: spacing.md,
  },
  resultGroup: {
    gap: spacing.sm,
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
  summaryCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
});
