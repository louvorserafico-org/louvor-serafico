import { Link, router } from "expo-router";
import { useState, type ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";
import {
  FAMILY_OPTIONS,
  JURISDICTION_OPTIONS,
  registerWithPassword,
  type RegistrationForm,
} from "@/features/auth/credentials-auth";
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

export default function CreateAccountScreen() {
  const [registration, setRegistration] = useState<RegistrationForm>(emptyRegistration);
  const [result, setResult] = useState<{ message: string; status: "error" | "success" } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updateRegistration = (field: keyof RegistrationForm, value: string) => {
    setRegistration((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.heroSection}>
        <EditorialSectionHeader eyebrow="Dados principais" title="Nova conta" />
        <Text style={styles.helperText}>
          Reuna seus dados principais para guardar favoritos, acompanhar partilhas e manter seu ministerio em ordem.
        </Text>
        <OrnamentalDivider />
      </View>

      <View style={styles.formPanel}>
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
        <View style={styles.passwordRow}>
          <View style={styles.passwordField}>
            <AuthInput
              autoComplete="password-new"
              onChangeText={(value) => updateRegistration("password", value)}
              placeholder="Crie uma senha com 8 ou mais caracteres"
              secureTextEntry={!showPassword}
              value={registration.password}
            />
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowPassword((current) => !current)}
            style={styles.passwordToggle}
          >
            <Text style={styles.passwordToggleText}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
          </Pressable>
        </View>
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
        <ChipSelect
          label="Família franciscana"
          onSelect={(value) => updateRegistration("family", value)}
          options={FAMILY_OPTIONS}
          value={registration.family}
        />
        <ChipSelect
          label="Jurisdição (opcional)"
          onSelect={(value) =>
            updateRegistration("jurisdiction", value === registration.jurisdiction ? "" : value)
          }
          options={JURISDICTION_OPTIONS}
          value={registration.jurisdiction}
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
          Ao seguir, voce declara ciencia de nossas condicoes de uso, politica de privacidade e cuidado com seus dados.
        </Text>
        <View style={styles.inlineLinks}>
          <Link asChild href="/politica-privacidade">
            <Pressable accessibilityRole="button" style={styles.inlineButton}>
              <Text style={styles.inlineButtonText}>Politica de privacidade</Text>
            </Pressable>
          </Link>
          <Link asChild href="/termos-de-uso">
            <Pressable accessibilityRole="button" style={styles.inlineButton}>
              <Text style={styles.inlineButtonText}>Termos de uso</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {result ? (
        <View style={[styles.resultCard, result.status === "success" ? styles.success : styles.error]}>
          <Text style={styles.resultText}>{result.message}</Text>
        </View>
      ) : null}

      <View style={styles.returnSection}>
        <EditorialSectionHeader
          eyebrow="Ja possui conta"
          subtitle="Se voce ja criou seu acesso anteriormente, entre com a mesma conta para seguir."
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

function ChipSelect({
  label,
  onSelect,
  options,
  value,
}: {
  label: string;
  onSelect: (value: string) => void;
  options: readonly string[];
  value: string;
}) {
  return (
    <View style={styles.selectBlock}>
      <Text style={styles.selectLabel}>{label}</Text>
      <View style={styles.chips}>
        {options.map((option) => {
          const active = value === option;

          return (
            <Pressable
              accessibilityRole="button"
              key={option}
              onPress={() => onSelect(option)}
              style={[styles.chip, active ? styles.chipActive : undefined]}
            >
              <Text style={[styles.chipText, active ? styles.chipTextActive : undefined]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
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
  chip: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chipActive: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.borderStrong,
  },
  chipText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  chipTextActive: {
    color: colors.accentStrong,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  passwordField: {
    flex: 1,
  },
  passwordRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  passwordToggle: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  passwordToggleText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  selectBlock: {
    gap: spacing.sm,
  },
  selectLabel: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  legalText: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
    marginTop: spacing.xs,
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
  returnSection: {
    gap: spacing.sm,
  },
  success: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
});
