import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function TermsOfUseScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Termos de uso" }} />
      <PageHeader
        eyebrow="Conta"
        title="Termos de uso"
        subtitle="O acesso ao app pressupoe cuidado com os materiais, respeito a comunidade e uso pessoal da conta."
      />
      <View style={styles.card}>
        <EditorialSectionHeader
          eyebrow="Uso do app"
          subtitle="Sua conta deve ser usada de forma pessoal, respeitando os materiais, o espaco de partilha e a integridade do acervo."
          title="Condicoes de uso"
        />
        <Text style={styles.text}>
          O Louvor Serafico oferece conteudo liturgico-musical para consulta, organizacao e servico ministerial. O uso
          indevido do acervo ou da area de partilha pode limitar o acesso da conta.
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
