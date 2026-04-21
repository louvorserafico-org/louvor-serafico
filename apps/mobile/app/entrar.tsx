import { ScrollView, StyleSheet, Text, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow="Conta"
        title="Fluxo de entrada"
        subtitle="Base de UX para autenticacao antes da implementacao real do login."
      />

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
});
