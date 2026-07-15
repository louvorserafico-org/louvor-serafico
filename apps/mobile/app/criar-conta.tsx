import { Ionicons } from "@expo/vector-icons";
import { Link, router, Stack } from "expo-router";
import { useState, type ComponentProps, type ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, type StyleProp, type ViewStyle } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { ResultBanner } from "@/components/ResultBanner";
import { SelectField } from "@/components/SelectField";
import {
  FAMILY_OPTIONS,
  JURISDICTION_OPTIONS,
  registerWithPassword,
  type CredentialsAuthResult,
  type RegistrationForm,
} from "@/features/auth/credentials-auth";
import { formatBrazilianPhone } from "@/features/auth/phone-mask";
import {
  validateEmailField,
  validateFullNameField,
  validatePasswordConfirmationField,
  validatePasswordField,
  validatePhoneField,
} from "@/features/auth/registration-field-validation";
import { supabase } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

const emptyRegistration: RegistrationForm = {
  city: "",
  email: "",
  family: "",
  fullName: "",
  jurisdiction: "",
  ministry: "",
  password: "",
  phone: "",
  state: "",
};

type FieldName = "city" | "email" | "family" | "fullName" | "password" | "passwordConfirmation" | "phone" | "state";

export default function CreateAccountScreen() {
  const [registration, setRegistration] = useState<RegistrationForm>(emptyRegistration);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [result, setResult] = useState<CredentialsAuthResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const updateRegistration = (field: keyof RegistrationForm, value: string) => {
    setRegistration((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const markTouched = (field: FieldName) => setTouched((current) => ({ ...current, [field]: true }));

  const errors: Partial<Record<FieldName, string>> = {
    city: registration.city.trim() ? undefined : "Informe sua cidade.",
    email: validateEmailField(registration.email) ?? undefined,
    family: registration.family ? undefined : "Selecione sua família Franciscana.",
    fullName: validateFullNameField(registration.fullName) ?? undefined,
    password: validatePasswordField(registration.password) ?? undefined,
    passwordConfirmation:
      validatePasswordConfirmationField(registration.password, passwordConfirmation) ?? undefined,
    phone: validatePhoneField(registration.phone) ?? undefined,
    state: registration.state.trim() ? undefined : "Informe seu estado.",
  };

  const isFormValid = Object.values(errors).every((message) => !message);

  const showError = (field: FieldName) => (touched[field] ? errors[field] : undefined);

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Nova conta" }} />
      <EditorialSectionHeader eyebrow="Dados principais" title="Nova conta" />

      <FormField error={showError("fullName")} label="Nome completo">
        <AuthInput
          autoComplete="name"
          onBlur={() => markTouched("fullName")}
          onChangeText={(value) => updateRegistration("fullName", value)}
          placeholder="Nome completo"
          value={registration.fullName}
        />
      </FormField>

      <FormField error={showError("email")} label="E-mail">
        <AuthInput
          autoComplete="email"
          keyboardType="email-address"
          onBlur={() => markTouched("email")}
          onChangeText={(value) => updateRegistration("email", value)}
          placeholder="email@email.com"
          value={registration.email}
        />
      </FormField>

      <FormField error={showError("password")} label="Senha">
        <View style={styles.passwordRow}>
          <AuthInput
            autoComplete="password-new"
            onBlur={() => markTouched("password")}
            onChangeText={(value) => updateRegistration("password", value)}
            placeholder="Crie uma senha com 8 ou mais caracteres"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            value={registration.password}
          />
          <Pressable
            accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
            accessibilityRole="button"
            onPress={() => setShowPassword((current) => !current)}
            style={styles.passwordToggle}
          >
            <Ionicons color={colors.textMuted} name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} />
          </Pressable>
        </View>
      </FormField>

      <FormField error={showError("passwordConfirmation")} label="Repita a senha">
        <View style={styles.passwordRow}>
          <AuthInput
            autoComplete="password-new"
            onBlur={() => markTouched("passwordConfirmation")}
            onChangeText={setPasswordConfirmation}
            placeholder="Digite a senha novamente"
            secureTextEntry={!showPasswordConfirmation}
            style={styles.passwordInput}
            value={passwordConfirmation}
          />
          <Pressable
            accessibilityLabel={showPasswordConfirmation ? "Ocultar senha" : "Mostrar senha"}
            accessibilityRole="button"
            onPress={() => setShowPasswordConfirmation((current) => !current)}
            style={styles.passwordToggle}
          >
            <Ionicons
              color={colors.textMuted}
              name={showPasswordConfirmation ? "eye-off-outline" : "eye-outline"}
              size={20}
            />
          </Pressable>
        </View>
      </FormField>

      <FormField error={showError("phone")} label="Telefone">
        <AuthInput
          autoComplete="tel"
          keyboardType="phone-pad"
          onBlur={() => markTouched("phone")}
          onChangeText={(value) => updateRegistration("phone", formatBrazilianPhone(value))}
          placeholder="(24) 9-9999-9999"
          value={registration.phone}
        />
      </FormField>

      <View style={styles.inlineFields}>
        <FormField error={showError("state")} label="Estado" style={styles.inlineField}>
          <AuthInput
            autoCapitalize="characters"
            maxLength={2}
            onBlur={() => markTouched("state")}
            onChangeText={(value) => updateRegistration("state", value)}
            placeholder="UF"
            value={registration.state}
          />
        </FormField>
        <FormField error={showError("city")} label="Cidade" style={styles.inlineField}>
          <AuthInput
            onBlur={() => markTouched("city")}
            onChangeText={(value) => updateRegistration("city", value)}
            placeholder="Cidade"
            value={registration.city}
          />
        </FormField>
      </View>

      <FormField error={showError("family")} label="">
        <SelectField
          label="Família Franciscana"
          onSelect={(value) => {
            updateRegistration("family", value);
            markTouched("family");
          }}
          options={FAMILY_OPTIONS}
          placeholder="Selecione sua família Franciscana"
          value={registration.family}
        />
      </FormField>

      <SelectField
        label="Jurisdição (opcional)"
        onSelect={(value) => updateRegistration("jurisdiction", value)}
        options={JURISDICTION_OPTIONS}
        placeholder="Selecione a jurisdição"
        value={registration.jurisdiction}
      />

      <FormField label="Pastoral ou banda (opcional)">
        <AuthInput
          onChangeText={(value) => updateRegistration("ministry", value)}
          placeholder="Pastoral ou banda (opcional)"
          value={registration.ministry}
        />
      </FormField>

      <SubmitButton
        disabled={submitting || !isFormValid}
        label={submitting ? "Criando..." : "Criar conta"}
        onPress={async () => {
          setTouched({
            city: true,
            email: true,
            family: true,
            fullName: true,
            password: true,
            passwordConfirmation: true,
            phone: true,
            state: true,
          });

          if (!isFormValid) {
            return;
          }

          setSubmitting(true);
          const nextResult = await registerWithPassword(supabase, registration);
          if (nextResult.status === "success") {
            setResult(null);
            setSubmitting(false);
            router.replace({
              params: { email: registration.email.trim().toLowerCase() },
              pathname: "/confirmar-email",
            });
            return;
          }

          setResult(nextResult);
          setSubmitting(false);
        }}
      />

      <Text style={styles.legalText}>
        Ao seguir, você declara ciência de nossas condições de uso, política de privacidade e cuidado com seus dados.
      </Text>
      <View style={styles.inlineLinks}>
        <Link asChild href="/politica-privacidade">
          <Pressable accessibilityRole="button" style={styles.inlineButton}>
            <Text style={styles.inlineButtonText}>Política de privacidade</Text>
          </Pressable>
        </Link>
        <Link asChild href="/termos-de-uso">
          <Pressable accessibilityRole="button" style={styles.inlineButton}>
            <Text style={styles.inlineButtonText}>Termos de uso</Text>
          </Pressable>
        </Link>
      </View>

      {result ? <ResultBanner detail={result.detail} message={result.message} status={result.status} /> : null}

      <View style={styles.returnSection}>
        <EditorialSectionHeader
          eyebrow="Já possui conta"
          subtitle="Se você já criou seu acesso anteriormente, entre com a mesma conta para seguir."
          title="Voltar para login"
        />
        <Link asChild href="/entrar">
          <Pressable accessibilityRole="button" style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Entrar</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

function FormField({
  children,
  error,
  label,
  style,
}: {
  children: ReactNode;
  error?: string;
  label: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.field, style]}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      {children}
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
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

function AuthInput({ style, ...rest }: ComponentProps<typeof TextInput>) {
  return (
    <TextInput autoCapitalize="none" placeholderTextColor={colors.textMuted} style={[styles.input, style]} {...rest} />
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
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  field: {
    gap: spacing.xs,
  },
  fieldError: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.tab,
    fontWeight: "700",
  },
  fieldLabel: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
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
  inlineField: {
    flex: 1,
  },
  inlineFields: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  inlineLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  legalText: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  linkButton: {
    alignSelf: "flex-start",
    paddingVertical: spacing.xs,
  },
  linkButtonText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  passwordInput: {
    flex: 1,
  },
  passwordRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  passwordToggle: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  returnSection: {
    gap: spacing.sm,
  },
});
