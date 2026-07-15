import { getInitialCelebrationCatalog } from "@louvor-serafico/shared";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { HomePreparedDayItem } from "@/components/HomePreparedDayItem";
import { PageHeader } from "@/components/PageHeader";
import { colors, spacing } from "@/theme/tokens";

export default function CelebrationsScreen() {
  const celebrations = [...getInitialCelebrationCatalog()].sort((first, second) =>
    first.dateMonthDay.localeCompare(second.dateMonthDay),
  );

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Celebrações" }} />
      <PageHeader
        eyebrow={`${celebrations.length} repertório${celebrations.length === 1 ? "" : "s"}`}
        subtitle="Consulte as celebrações já preparadas e abra cada repertório quando precisar."
        title="Celebrações"
      />

      <EditorialSectionHeader
        eyebrow="Consulta"
        subtitle="Os roteiros publicados seguem organizados por data litúrgica."
        title="Roteiros disponiveis"
      />

      <View style={styles.list}>
        {celebrations.map((celebration) => (
          <HomePreparedDayItem celebration={celebration} key={celebration.id} />
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
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  list: {
    gap: spacing.md,
  },
});
