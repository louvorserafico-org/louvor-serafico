import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { formatAudioDuration } from "@/features/songs/audio-duration";
import { usePlayer } from "@/features/player/PlayerProvider";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export function MiniPlayerBar() {
  const { currentTime, duration, isPlaying, message, repeatMode, skipNext, skipPrevious, stop, toggleRepeat, togglePlayPause, track } =
    usePlayer();

  if (!track) {
    return null;
  }

  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.trackFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.row}>
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.title}>
            {track.title}
          </Text>
          <Text style={styles.time}>
            {message ?? `${formatAudioDuration(currentTime)} / ${formatAudioDuration(duration)}`}
          </Text>
        </View>

        <View style={styles.controls}>
          <AnimatedPressable
            accessibilityLabel={repeatMode === "off" ? "Repetir desativado" : repeatMode === "all" ? "Repetir fila" : "Repetir música"}
            accessibilityRole="button"
            onPress={toggleRepeat}
            style={styles.iconButton}
          >
            <Ionicons color={repeatMode === "off" ? colors.textMuted : colors.accent} name="repeat" size={18} />
            {repeatMode === "one" ? <View style={styles.repeatOneDot} /> : null}
          </AnimatedPressable>

          <AnimatedPressable accessibilityLabel="Música anterior" accessibilityRole="button" onPress={skipPrevious} style={styles.iconButton}>
            <Ionicons color={colors.textPrimary} name="play-skip-back" size={20} />
          </AnimatedPressable>

          <AnimatedPressable
            accessibilityLabel={isPlaying ? "Pausar" : "Tocar"}
            accessibilityRole="button"
            onPress={togglePlayPause}
            style={styles.playButton}
          >
            <Ionicons color={colors.background} name={isPlaying ? "pause" : "play"} size={20} />
          </AnimatedPressable>

          <AnimatedPressable accessibilityLabel="Próxima música" accessibilityRole="button" onPress={skipNext} style={styles.iconButton}>
            <Ionicons color={colors.textPrimary} name="play-skip-forward" size={20} />
          </AnimatedPressable>

          <AnimatedPressable accessibilityLabel="Fechar player" accessibilityRole="button" onPress={stop} style={styles.iconButton}>
            <Ionicons color={colors.textMuted} name="close" size={18} />
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderTopColor: colors.accent,
    borderTopWidth: 2,
    borderWidth: 1,
    bottom: 76,
    left: spacing.md,
    position: "absolute",
    right: spacing.md,
    borderRadius: radii.lg,
    overflow: "hidden",
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },
  controls: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  iconButton: {
    alignItems: "center",
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  info: {
    flex: 1,
    gap: 2,
    paddingRight: spacing.sm,
  },
  playButton: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  repeatOneDot: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    bottom: 4,
    height: 5,
    position: "absolute",
    right: 4,
    width: 5,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  time: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.tab,
    fontWeight: "600",
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  trackFill: {
    backgroundColor: colors.accent,
    height: "100%",
  },
  track: {
    backgroundColor: colors.surfaceMuted,
    height: 3,
    width: "100%",
  },
});
