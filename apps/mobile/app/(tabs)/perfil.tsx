import { ScrollView, StyleSheet } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { AuthEntryCard } from "@/components/AuthEntryCard";
import { SupabaseRemoteStatusCard } from "@/components/SupabaseRemoteStatusCard";
import { SupabaseStatusCard } from "@/components/SupabaseStatusCard";
import { colors, spacing } from "@/theme/tokens";

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow="Perfil"
        title="Conta e assinatura"
        subtitle="Estado local e leitura remota inicial do projeto Supabase."
      />
      <SupabaseStatusCard />
      <SupabaseRemoteStatusCard />
      <AuthEntryCard />
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
});
