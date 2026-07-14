import { Link, Stack } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { buildDevotionRoute, getDevotionItems } from "@/features/devotions/devotions";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function DevotionsHubScreen() {
  const items = getDevotionItems();

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Devoções" }} />
      <PageHeader
        eyebrow="Devoções"
        title="Oração franciscana"
        subtitle="Devocional, novena e trânsito para rezar no espírito de São Francisco."
      />

      <EditorialSectionHeader
        eyebrow="Consulta"
        subtitle="Materiais de oração em preparação editorial."
        title="Devoções disponíveis"
      />

      <View style={styles.list}>
        {items.map((item, index) => (
          <Link asChild href={buildDevotionRoute(item.slug)} key={item.slug}>
            <Pressable style={[styles.item, index !== items.length - 1 ? styles.itemBorder : undefined]}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>{item.description}</Text>
              <Text style={item.status === "available" ? styles.action : styles.actionMuted}>
                {item.status === "available" ? "Abrir" : "Em preparação"}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  action: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    paddingTop: spacing.xs,
  },
  actionMuted: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    paddingTop: spacing.xs,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  item: {
    gap: spacing.xs,
    paddingBottom: spacing.lg,
    paddingTop: spacing.lg,
  },
  itemBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  list: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
  },
  meta: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
});
