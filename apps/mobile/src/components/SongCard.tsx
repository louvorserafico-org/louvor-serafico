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
  const { isFavoriteSong } = useFavorites();
  const isFavorite = isFavoriteSong(song.id);
  const materialLabel = hasAssets
    ? `${song.assets.length} material${song.assets.length > 1 ? "s" : ""}`
    : "Sem material";

  return (
    <Link asChild href={`/musicas/${song.slug}`}>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <View style={styles.content}>
          <Text style={styles.eyebrow}>{materialLabel}</Text>
          <View style={styles.row}>
            <Text style={styles.title}>{song.title}</Text>
            {isFavorite ? <Text style={styles.favorite}>Guardado</Text> : null}
          </View>
          <Text style={styles.meta}>
            {hasAssets
              ? "Partituras e apoios disponiveis para consulta."
              : "Material em preparacao para publicacao."}
          </Text>
        </View>
        <Text style={styles.action}>Ver canto</Text>
      </Pressable>
    </Link>
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
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
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
  meta: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
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
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
