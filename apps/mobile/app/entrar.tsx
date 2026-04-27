import { useState, type ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { getAuthRedirectUrl } from "@/features/auth/auth-deep-link";
import { buildAuthScreenOverview } from "@/features/auth/auth-screen-overview";
import {
  registerWithPassword,
  requestPasswordReset,
  signInWithPassword,
  type RegistrationForm,
} from "@/features/auth/credentials-auth";
import { supabase } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

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
  const overview = buildAuthScreenOverview({ mode });

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
        subtitle="Guarde seu caminho no ministerio e mantenha o acervo sempre ao alcance."
      />

      <View style={styles.switchRow}>
        <ModeButton active={mode === "login"} label="Entrar" onPress={() => setMode("login")} />
        <ModeButton active={mode === "register"} label="Cadastrar" onPress={() => setMode("register")} />
      </View>

      <View style={[styles.summaryCard, mode === "login" ? styles.summaryLogin : styles.summaryRegister]}>
        <Text style={styles.summaryEyebrow}>{mode === "login" ? "Acesso" : "Cadastro"}</Text>
        <Text style={styles.summaryTitle}>{overview.title}</Text>
        <Text style={styles.summaryText}>{overview.helperText}</Text>
      </View>

      {mode === "login" ? (
        <View style={styles.formCard}>
          <Text style={styles.formEyebrow}>Ja possui conta</Text>
          <Text style={styles.cardTitle}>Entrar</Text>
          <Text style={styles.cardText}>
            Informe seu email e sua senha para seguir com seus materiais, favoritos e partilhas.
          </Text>
          <AuthInput
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setLoginEmail}
            placeholder="Seu email"
            value={loginEmail}
          />
          <AuthInput
            autoComplete="password"
            onChangeText={setLoginPassword}
            placeholder="Sua senha"
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
          <Pressable
            accessibilityRole="button"
            disabled={submitting}
            onPress={async () => {
              setSubmitting(true);
              const nextResult = await requestPasswordReset(
                supabase,
                loginEmail,
                getAuthRedirectUrl("passwordRecovery"),
              );
              setResult(nextResult);
              setSubmitting(false);
            }}
            style={styles.secondaryAction}
          >
            <Text style={styles.secondaryActionText}>Esqueci minha senha</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.formCard}>
          <Text style={styles.formEyebrow}>Dados principais</Text>
          <Text style={styles.cardTitle}>Nova conta</Text>
          <Text style={styles.cardText}>
            Comece com os dados essenciais. Os campos de paroquia e pastoral podem ser preenchidos com calma.
          </Text>
          <AuthInput
            autoComplete="name"
            onChangeText={(value) => updateRegistration("fullName", value)}
            placeholder="Nome completo"
            value={registration.fullName}
          />
          <AuthInput
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={(value) => updateRegistration("email", value)}
            placeholder="Seu email"
            value={registration.email}
          />
          <AuthInput
            autoComplete="password-new"
            onChangeText={(value) => updateRegistration("password", value)}
            placeholder="Crie uma senha com 8 ou mais caracteres"
            secureTextEntry
            value={registration.password}
          />
          <AuthInput
            autoComplete="tel"
            keyboardType="phone-pad"
            onChangeText={(value) => updateRegistration("phone", value)}
            placeholder="Telefone"
            value={registration.phone}
          />
          <View style={styles.inlineFields}>
            <AuthInput
              autoCapitalize="characters"
              onChangeText={(value) => updateRegistration("state", value)}
              placeholder="Estado"
              value={registration.state}
            />
            <AuthInput
              onChangeText={(value) => updateRegistration("city", value)}
              placeholder="Cidade"
              value={registration.city}
            />
          </View>
          <AuthInput
            onChangeText={(value) => updateRegistration("parish", value)}
            placeholder="Paroquia (opcional)"
            value={registration.parish}
          />
          <AuthInput
            onChangeText={(value) => updateRegistration("ministry", value)}
            placeholder="Pastoral ou banda (opcional)"
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
        <Text style={styles.formEyebrow}>Cuidado com a conta</Text>
        <Text style={styles.cardTitle}>Seus dados</Text>
        <Text style={styles.cardText}>
          Nome, email, telefone, estado e cidade ajudam a manter sua conta organizada. Paroquia e pastoral podem ser adicionadas livremente.
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
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
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
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  formEyebrow: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  inlineFields: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    color: colors.textPrimary,
    flex: 1,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    padding: spacing.md,
  },
  modeButton: {
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    flex: 1,
    padding: spacing.md,
  },
  modeButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  modeButtonText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textAlign: "center",
  },
  modeButtonTextActive: {
    color: colors.background,
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
  summaryEyebrow: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
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
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  summaryLogin: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderStrong,
  },
  summaryRegister: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
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
  switchRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
