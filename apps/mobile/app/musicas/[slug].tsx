import { findSongBySlug } from "@louvor-serafico/shared";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { colors, spacing, typography } from "@/theme/tokens";

export default function SongDetailScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const song = findSongBySlug(params.slug ?? "");

  if (!song) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ headerShown: true, title: "Musica" }} />
        <PageHeader
          eyebrow="Nao encontrada"
          title="Canto indisponivel"
          subtitle="Este canto ainda nao existe no catalogo local."
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Musica" }} />
      <PageHeader
        eyebrow="Canto sacro"
        title={song.title}
        subtitle="Detalhe inicial com materiais cadastrados no mock local."
      />

      <SectionTitle title="Materiais" />

      <View style={styles.list}>
        {song.assets.length > 0 ? (
          song.assets.map((asset) => (
            <View key={asset.id} style={styles.asset}>
              <Text style={styles.assetTitle}>{asset.title}</Text>
              <Text style={styles.assetMeta}>{asset.premium ? "Premium" : "Livre"}</Text>
              <Text style={styles.assetPath}>{asset.path}</Text>
            </View>
          ))
        ) : (
          <View style={styles.asset}>
            <Text style={styles.assetTitle}>Material pendente</Text>
            <Text style={styles.assetMeta}>Aguardando curadoria editorial.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  asset: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  assetMeta: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  assetPath: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  assetTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
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
