import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { findDevotionBySlug } from "@/features/devotions/devotions";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function DevotionScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const devotion = findDevotionBySlug(params.slug ?? "");

  if (!devotion) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ headerShown: true, title: "Devoção" }} />
        <PageHeader
          eyebrow="Devoções"
          title="Devoção não encontrada"
          subtitle="Esta devoção ainda não está disponível no aplicativo."
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: devotion.title }} />
      <PageHeader eyebrow="Devoção" title={devotion.title} subtitle={devotion.description} />

      <View style={styles.card}>
        <EditorialSectionHeader
          eyebrow="Em preparação"
          subtitle="O texto desta devoção está sendo preparado com cuidado editorial."
          title="Oração em preparação"
        />
        <Text style={styles.text}>
          Em breve esta página trará o roteiro completo de oração. Enquanto isso, acompanhe as demais
          seções do aplicativo.
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
