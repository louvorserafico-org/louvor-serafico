import type { Song } from "@louvor-serafico/shared";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useFavorites } from "@/features/favorites/FavoritesProvider";
import { colors, spacing, typography } from "@/theme/tokens";

type SongCardProps = {
  song: Song;
};

export function SongCard({ song }: SongCardProps) {
  const hasAssets = song.assets.length > 0;
  const { isFavoriteSong } = useFavorites();
  const isFavorite = isFavoriteSong(song.id);

  return (
    <Link asChild href={`/musicas/${song.slug}`}>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.title}>{song.title}</Text>
            {isFavorite ? <Text style={styles.favorite}>Favorito</Text> : null}
          </View>
          <Text style={styles.meta}>
            {hasAssets ? `${song.assets.length} material premium` : "Material pendente"}
          </Text>
        </View>
        <Text style={styles.action}>Abrir</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  action: {
    color: colors.accent,
    fontSize: typography.body,
    fontWeight: "800",
  },
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  meta: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  pressed: {
    opacity: 0.82,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
  favorite: {
    color: colors.olive,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
