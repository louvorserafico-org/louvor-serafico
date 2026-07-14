import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";
import { buildEmailConfirmationCopy } from "@/features/auth/auth-navigation";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function ConfirmEmailScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const copy = buildEmailConfirmationCopy(params.email ?? "");

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Cadastro" }} />
      <View style={styles.heroSection}>
        <EditorialSectionHeader eyebrow="Cadastro" title={copy.title} />
        <Text style={styles.helperText}>{copy.message}</Text>
        <OrnamentalDivider />
      </View>

      <View style={styles.card}>
        <EditorialSectionHeader
          eyebrow="Proximo passo"
          subtitle="Depois de confirmar o email, volte para o app e entre com a mesma conta."
          title="Continuar"
        />
        <Link asChild href="/entrar">
          <Text style={styles.linkText}>{copy.actionLabel}</Text>
        </Link>
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
  linkText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
});
