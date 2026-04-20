import { ScrollView, StyleSheet, Text, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { colors, spacing, typography } from "@/theme/tokens";

type PlaceholderScreenProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function PlaceholderScreen({ eyebrow, title, body }: PlaceholderScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={body} />
      <View style={styles.panel}>
        <Text style={styles.panelText}>Base reservada para proximo incremento.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: spacing.md,
  },
  panelText: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
});
