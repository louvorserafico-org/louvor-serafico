import { findSongBySlug } from "@louvor-serafico/shared";
import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { useSessionPreview } from "@/features/auth/SessionProvider";
import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { colors, spacing, typography } from "@/theme/tokens";

export default function SongDetailScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const song = findSongBySlug(params.slug ?? "");
  const { session } = useSessionPreview();
  const { isFavoriteSong, toggleSongFavorite } = useFavorites();
  const canFavorite = session.status === "signed_in";

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

  const isFavorite = isFavoriteSong(song.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Musica" }} />
      <PageHeader
        eyebrow="Canto sacro"
        title={song.title}
        subtitle="Detalhe inicial com materiais cadastrados no mock local."
      />

      <SectionTitle title="Materiais" />

      <View style={[styles.favoriteCard, canFavorite ? styles.favoriteReady : styles.favoriteBlocked]}>
        <Text style={styles.assetTitle}>{canFavorite ? "Favoritos liberados" : "Favoritos bloqueados"}</Text>
        <Text style={styles.assetMeta}>
          {canFavorite
            ? "Sessao teste ativa. Favorito local liberado."
            : "Ative sessao teste em Perfil para liberar fluxo protegido."}
        </Text>
        <Pressable
          disabled={!canFavorite}
          onPress={() => toggleSongFavorite(song.id)}
          style={[styles.favoriteButton, !canFavorite ? styles.favoriteButtonDisabled : undefined]}
        >
          <Text style={[styles.favoriteButtonText, !canFavorite ? styles.favoriteButtonTextDisabled : undefined]}>
            {canFavorite ? (isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos") : "Sessao necessaria"}
          </Text>
        </Pressable>
      </View>

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
  favoriteBlocked: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  favoriteButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.olive,
    borderColor: colors.olive,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  favoriteButtonDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  favoriteButtonText: {
    color: colors.background,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  favoriteButtonTextDisabled: {
    color: colors.textMuted,
  },
  favoriteCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  favoriteReady: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  list: {
    gap: spacing.md,
  },
});
