import { useState, type ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { registerWithPassword, signInWithPassword, type RegistrationForm } from "@/features/auth/credentials-auth";
import { supabase } from "@/services/supabase/client";
import { colors, spacing, typography } from "@/theme/tokens";

type AuthMode = "login" | "register";

const emptyRegistration: RegistrationForm = {
  city: "",
  email: "",
  fullName: "",
  ministry: "",
  parish: "",
  password: "",
  phone: "",
  state: "",
};

export default function SignInScreen() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registration, setRegistration] = useState<RegistrationForm>(emptyRegistration);
  const [result, setResult] = useState<{ message: string; status: "error" | "success" } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const updateRegistration = (field: keyof RegistrationForm, value: string) => {
    setRegistration((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <PageHeader
        eyebrow="Conta"
        title={mode === "login" ? "Entrar" : "Criar conta"}
        subtitle="Use email e senha para testar o fluxo real no Supabase Auth."
      />

      <View style={styles.switchRow}>
        <ModeButton active={mode === "login"} label="Entrar" onPress={() => setMode("login")} />
        <ModeButton active={mode === "register"} label="Cadastrar" onPress={() => setMode("register")} />
      </View>

      {mode === "login" ? (
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>Login</Text>
          <AuthInput
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setLoginEmail}
            placeholder="email"
            value={loginEmail}
          />
          <AuthInput
            autoComplete="password"
            onChangeText={setLoginPassword}
            placeholder="senha"
            secureTextEntry
            value={loginPassword}
          />
          <SubmitButton
            disabled={submitting}
            label={submitting ? "Entrando..." : "Entrar"}
            onPress={async () => {
              setSubmitting(true);
              const nextResult = await signInWithPassword(supabase, loginEmail, loginPassword);
              setResult(nextResult);
              setSubmitting(false);
            }}
          />
        </View>
      ) : (
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>Cadastro</Text>
          <AuthInput
            autoComplete="name"
            onChangeText={(value) => updateRegistration("fullName", value)}
            placeholder="nome completo"
            value={registration.fullName}
          />
          <AuthInput
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={(value) => updateRegistration("email", value)}
            placeholder="email"
            value={registration.email}
          />
          <AuthInput
            autoComplete="password-new"
            onChangeText={(value) => updateRegistration("password", value)}
            placeholder="senha com 8+ caracteres"
            secureTextEntry
            value={registration.password}
          />
          <AuthInput
            autoComplete="tel"
            keyboardType="phone-pad"
            onChangeText={(value) => updateRegistration("phone", value)}
            placeholder="telefone"
            value={registration.phone}
          />
          <View style={styles.inlineFields}>
            <AuthInput
              autoCapitalize="characters"
              onChangeText={(value) => updateRegistration("state", value)}
              placeholder="estado"
              value={registration.state}
            />
            <AuthInput
              onChangeText={(value) => updateRegistration("city", value)}
              placeholder="cidade"
              value={registration.city}
            />
          </View>
          <AuthInput
            onChangeText={(value) => updateRegistration("parish", value)}
            placeholder="paroquia opcional"
            value={registration.parish}
          />
          <AuthInput
            onChangeText={(value) => updateRegistration("ministry", value)}
            placeholder="pastoral ou banda opcional"
            value={registration.ministry}
          />
          <SubmitButton
            disabled={submitting}
            label={submitting ? "Criando..." : "Criar conta"}
            onPress={async () => {
              setSubmitting(true);
              const nextResult = await registerWithPassword(supabase, registration);
              setResult(nextResult);
              setSubmitting(false);
            }}
          />
        </View>
      )}

      {result ? (
        <View style={[styles.resultCard, result.status === "success" ? styles.success : styles.error]}>
          <Text style={styles.resultText}>{result.message}</Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dados usados</Text>
        <Text style={styles.cardText}>
          Nome, email, telefone, estado e cidade entram no cadastro. Paroquia e pastoral ou banda ficam opcionais.
        </Text>
      </View>
    </ScrollView>
  );
}

function ModeButton({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.modeButton, active ? styles.modeButtonActive : undefined]}
    >
      <Text style={[styles.modeButtonText, active ? styles.modeButtonTextActive : undefined]}>{label}</Text>
    </Pressable>
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
  inlineFields: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.textPrimary,
    flex: 1,
    fontSize: typography.caption,
    padding: spacing.md,
  },
  modeButton: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: spacing.sm,
  },
  modeButtonActive: {
    backgroundColor: colors.olive,
    borderColor: colors.olive,
  },
  modeButtonText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    fontWeight: "800",
    textAlign: "center",
  },
  modeButtonTextActive: {
    color: colors.background,
  },
  resultCard: {
    borderRadius: 8,
    borderWidth: 1,
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
  switchRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
