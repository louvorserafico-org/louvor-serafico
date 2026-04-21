import { StyleSheet, Text, View } from "react-native";

import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { colors, spacing, typography } from "@/theme/tokens";

export function SupabaseSessionCard() {
  const { session } = useSupabaseSession();

  return (
    <View
      style={[
        styles.card,
        session.status === "authenticated"
          ? styles.ready
          : session.status === "loading"
            ? styles.loading
            : styles.pending,
      ]}
    >
      <Text style={styles.title}>
        {session.status === "authenticated"
          ? "Sessao real detectada"
          : session.status === "loading"
            ? "Lendo sessao real"
            : "Sem sessao real"}
      </Text>
      <Text style={styles.text}>Email: {session.email ?? "nao autenticado"}</Text>
      <Text style={styles.text}>Provider: {session.provider ?? "nao definido"}</Text>
      <Text style={styles.text}>User ID: {session.userId ?? "nao autenticado"}</Text>
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
  loading: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  pending: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  ready: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  text: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
