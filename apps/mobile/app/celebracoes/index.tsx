import { getInitialCelebrationCatalog } from "@louvor-serafico/shared";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { HomePreparedDayItem } from "@/components/HomePreparedDayItem";
import { PageHeader } from "@/components/PageHeader";
import { colors, radii, spacing } from "@/theme/tokens";

export default function CelebrationsScreen() {
  const celebrations = [...getInitialCelebrationCatalog()].sort((first, second) =>
    first.dateMonthDay.localeCompare(second.dateMonthDay),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Celebrações" }} />
      <PageHeader
        eyebrow={`${celebrations.length} roteiro${celebrations.length === 1 ? "" : "s"}`}
        subtitle="Consulte as celebracoes ja preparadas e abra cada roteiro quando precisar."
        title="Celebracoes"
      />

      <EditorialSectionHeader
        eyebrow="Consulta"
        subtitle="Os roteiros publicados seguem organizados por data liturgica."
        title="Roteiros disponiveis"
      />

      <View style={styles.list}>
        {celebrations.map((celebration, index) => (
          <HomePreparedDayItem
            celebration={celebration}
            isLast={index === celebrations.length - 1}
            key={celebration.id}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  list: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.md,
  },
});
