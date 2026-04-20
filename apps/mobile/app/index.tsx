import { standardMassMoments } from "@louvor-serafico/shared";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme/tokens";

const celebrationSongs = [
  "Fazei em nome do Senhor",
  "Bendito seja o nome do Senhor",
  "Aleluia, bendizei o seu nome",
  "Invocando o nome do Senhor",
  "Por teu nome, o Senhor",
  "Vamos em nome do Senhor",
];

export default function TodayScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.kicker}>03 de janeiro</Text>
      <Text style={styles.title}>Missa do Santissimo Nome de Jesus</Text>
      <Text style={styles.subtitle}>
        Roteiro inicial para validar a ordem liturgico-musical do Louvor Serafico.
      </Text>

      <View style={styles.list}>
        {standardMassMoments.map((moment, index) => (
          <View key={moment.key} style={styles.moment}>
            <Text style={styles.momentOrder}>{moment.order}</Text>
            <View style={styles.momentContent}>
              <Text style={styles.momentLabel}>{moment.label}</Text>
              <Text style={styles.songTitle}>{celebrationSongs[index]}</Text>
            </View>
          </View>
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
  kicker: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  list: {
    gap: spacing.md,
  },
  moment: {
    alignItems: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  momentContent: {
    flex: 1,
    gap: spacing.xs,
  },
  momentLabel: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  momentOrder: {
    color: colors.gold,
    fontSize: typography.body,
    fontWeight: "800",
    minWidth: 20,
  },
  songTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: "800",
    lineHeight: 38,
  },
});
