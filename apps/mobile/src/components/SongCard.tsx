import type { Song } from "@louvor-serafico/shared";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type SongCardProps = {
  song: Song;
};

export function SongCard({ song }: SongCardProps) {
  const hasAssets = song.assets.length > 0;
  const { isFavoriteSong, toggleSongFavorite } = useFavorites();
  const isFavorite = isFavoriteSong(song.id);
  const materialLabel = hasAssets
    ? `${song.assets.length} material${song.assets.length > 1 ? "s" : ""}`
    : "Sem material";

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        hitSlop={8}
        onPress={() => {
          void toggleSongFavorite(song.id);
        }}
        style={styles.favoriteAction}
      >
        <Text style={[styles.favoriteIcon, isFavorite ? styles.favoriteIconActive : undefined]}>
          {isFavorite ? "★" : "☆"}
        </Text>
      </Pressable>
      <Link asChild href={`/musicas/${song.slug}`}>
        <Pressable style={({ pressed }) => [styles.mainAction, pressed && styles.pressed]}>
          <View style={styles.content}>
            <Text style={styles.eyebrow}>{materialLabel}</Text>
            <Text style={styles.title}>{song.title}</Text>
            <Text style={styles.meta}>
              {hasAssets
                ? "Partituras e apoios disponiveis para consulta."
                : "Material em preparação para públicação."}
            </Text>
          </View>
          <Text style={styles.action}>Abrir</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  card: {
    alignItems: "center",
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  eyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  favoriteIcon: {
    color: colors.textMuted,
    fontFamily: fontFamilies.display,
    fontSize: 22,
    lineHeight: 24,
  },
  favoriteIconActive: {
    color: colors.accent,
  },
  favoriteAction: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 28,
    minWidth: 28,
  },
  mainAction: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: spacing.md,
  },
  meta: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.82,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
});
