import { StyleSheet, Text, View } from "react-native";

import { supabaseConfig } from "@/services/supabase/client";
import { colors, spacing, typography } from "@/theme/tokens";

export function SupabaseStatusCard() {
  const configured = Boolean(supabaseConfig.url && (supabaseConfig.publishableKey || supabaseConfig.anonKey));

  return (
    <View style={[styles.card, configured ? styles.ready : styles.pending]}>
      <Text style={styles.title}>{configured ? "Supabase conectado" : "Supabase pendente"}</Text>
      <Text style={styles.text}>Projeto: {supabaseConfig.projectRef ?? "nao definido"}</Text>
      <Text style={styles.text}>Host: {supabaseConfig.projectHost ?? "nao definido"}</Text>
      <Text style={styles.text}>
        Chave publica: {supabaseConfig.publishableKey ? "configurada" : "nao configurada"}
      </Text>
      <Text style={styles.text}>Anon key: {supabaseConfig.anonKey ? "configurada" : "nao configurada"}</Text>
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
