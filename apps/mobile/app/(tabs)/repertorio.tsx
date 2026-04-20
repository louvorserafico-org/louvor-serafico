import { getInitialSongCatalog } from "@louvor-serafico/shared";
import { ScrollView, StyleSheet, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { SongCard } from "@/components/SongCard";
import { colors, spacing } from "@/theme/tokens";

export default function RepertoireScreen() {
  const songs = getInitialSongCatalog();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow={`${songs.length} cantos`}
        title="Repertorio"
        subtitle="Cantos iniciais da Missa do Santissimo Nome de Jesus."
      />

      <SectionTitle title="Catalogo inicial" />

      <View style={styles.list}>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </View>
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
  list: {
    gap: spacing.md,
  },
});
