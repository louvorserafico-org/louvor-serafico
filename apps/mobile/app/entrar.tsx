import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { requestEmailSignIn } from "@/features/auth/email-auth";
import { supabase } from "@/services/supabase/client";
import { colors, spacing, typography } from "@/theme/tokens";

const steps = [
  {
    body: "Entrar com email primeiro. Apple e Google ficam para iteracao futura.",
    title: "Metodo inicial",
  },
  {
    body: "Fluxo preferido sera magic link ou OTP curto, sem senha no MVP.",
    title: "Experiencia",
  },
  {
    body: "Assinatura, comentarios e favoritos dependerao de sessao valida.",
    title: "Uso no produto",
  },
];

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ message: string; status: "error" | "success" } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow="Conta"
        title="Fluxo de entrada"
        subtitle="Primeira iteracao de email login com Supabase Auth."
      />

      <View style={styles.formCard}>
        <Text style={styles.cardTitle}>Entrar por email</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="frei@exemplo.com"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={email}
        />
        <Pressable
          accessibilityRole="button"
          disabled={submitting}
          onPress={async () => {
            setSubmitting(true);
            const nextResult = await requestEmailSignIn(supabase, email);
            setResult(nextResult);
            setSubmitting(false);
          }}
          style={[styles.button, submitting ? styles.buttonDisabled : undefined]}
        >
          <Text style={[styles.buttonText, submitting ? styles.buttonTextDisabled : undefined]}>
            {submitting ? "Enviando..." : "Enviar acesso"}
          </Text>
        </Pressable>
        {result ? (
          <View style={[styles.resultCard, result.status === "success" ? styles.success : styles.error]}>
            <Text style={styles.resultText}>{result.message}</Text>
          </View>
        ) : null}
      </View>

      {steps.map((step) => (
        <View key={step.title} style={styles.card}>
          <Text style={styles.cardTitle}>{step.title}</Text>
          <Text style={styles.cardText}>{step.body}</Text>
        </View>
      ))}
    </ScrollView>
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
    gap: spacing.xs,
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
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  resultText: {
    color: colors.textPrimary,
    fontSize: typography.caption,
  },
  success: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
});
