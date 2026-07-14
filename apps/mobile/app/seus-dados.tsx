import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function PersonalDataScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Seus dados" }} />
      <PageHeader
        eyebrow="Conta"
        title="Seus dados"
        subtitle="Veja com clareza quais informacoes ajudam a manter sua conta, sua comunidade e seu acervo organizados."
      />
      <View style={styles.card}>
        <EditorialSectionHeader
          eyebrow="LGPD"
          subtitle="Nome, email, telefone, cidade, estado, paroquia e ministerio servem para identificar seu perfil e apoiar sua experiencia."
          title="Dados essenciais"
        />
        <Text style={styles.text}>
          Seus dados acompanham autenticacao, favoritos, partilhas e organizacao pastoral da conta. Quando necessario,
          esta area pode receber opcoes adicionais de revisao e exclusao.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
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
