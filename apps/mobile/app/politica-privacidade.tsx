import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Política de privacidade" }} />
      <PageHeader
        eyebrow="Conta"
        title="Politica de privacidade"
        subtitle="Cuidamos dos dados essenciais da sua conta para manter acesso, favoritos e partilhas."
      />
      <View style={styles.card}>
        <EditorialSectionHeader
          eyebrow="Privacidade"
          subtitle="Nome, email, telefone e dados pastorais servem apenas para identificar seu acesso e organizar a experiencia no app."
          title="Uso dos dados"
        />
        <Text style={styles.text}>
          O Louvor Serafico guarda somente as informacoes necessarias para autenticar sua conta, manter preferencias e
          associar partilhas e materiais ao seu perfil.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  text: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
});
