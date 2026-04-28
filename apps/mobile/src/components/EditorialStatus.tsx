import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamilies, spacing, typography } from "@/theme/tokens";

type EditorialStatusProps = {
  missingCount: number;
};

export function EditorialStatus({ missingCount }: EditorialStatusProps) {
  const complete = missingCount === 0;

  return (
    <View style={[styles.card, complete ? styles.complete : styles.pending]}>
      <Text style={styles.eyebrow}>{complete ? "Completo" : "Revisao"}</Text>
      <Text style={styles.title}>{complete ? "Conteudo completo" : "Revisao pendente"}</Text>
      <Text style={styles.text}>
        {complete
          ? "Todos os momentos possuem material cadastrado."
          : `${missingCount} canto ainda precisa de material.`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  complete: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  pending: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  eyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  text: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 23,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.body,
    fontWeight: "700",
  },
});
