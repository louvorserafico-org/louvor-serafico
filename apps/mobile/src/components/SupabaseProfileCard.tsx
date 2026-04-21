import { StyleSheet, Text, View } from "react-native";

import { useSupabaseProfile } from "@/features/auth/SupabaseProfileProvider";
import { colors, spacing, typography } from "@/theme/tokens";

export function SupabaseProfileCard() {
  const { profile } = useSupabaseProfile();

  return (
    <View
      style={[
        styles.card,
        profile.status === "ready"
          ? styles.ready
          : profile.status === "loading"
            ? styles.loading
            : styles.pending,
      ]}
    >
      <Text style={styles.title}>
        {profile.status === "ready"
          ? "Perfil remoto carregado"
          : profile.status === "loading"
            ? "Lendo perfil remoto"
            : "Perfil remoto indisponivel"}
      </Text>
      <Text style={styles.text}>Nome: {profile.displayName ?? "nao disponivel"}</Text>
      <Text style={styles.text}>Email: {profile.email ?? "nao disponivel"}</Text>
      <Text style={styles.text}>Provider: {profile.provider ?? "nao disponivel"}</Text>
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
