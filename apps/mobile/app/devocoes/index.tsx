import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
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
        title="Oração Franciscana"
        subtitle="Devocional, novena e trânsito para rezar no espírito de São Francisco."
      />

      <EditorialSectionHeader
        eyebrow="Consulta"
        subtitle="Materiais de oração em preparação editorial."
        title="Devoções disponíveis"
      />

      <View style={styles.list}>
        {items.map((item) => (
          <Link asChild href={buildDevotionRoute(item.slug)} key={item.slug}>
            <AnimatedPressable style={styles.item}>
              <View style={styles.itemCopy}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.meta}>{item.description}</Text>
                {item.status === "preparing" ? <Text style={styles.actionMuted}>Em preparação</Text> : null}
              </View>
              {item.status === "available" ? (
                <Ionicons color={colors.textMuted} name="chevron-forward" size={20} />
              ) : null}
            </AnimatedPressable>
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
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  itemCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  list: {
    gap: spacing.md,
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
