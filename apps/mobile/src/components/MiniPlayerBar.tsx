import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { usePlayer } from "@/features/player/PlayerProvider";
import { formatAudioDuration } from "@/features/songs/audio-duration";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export function MiniPlayerBar() {
  const { currentTime, duration, isPlaying, message, repeatMode, skipNext, skipPrevious, stop, togglePlayPause, toggleRepeat, track } =
    usePlayer();

  if (!track) {
    return null;
  }

  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
  const timeLabel = message ?? `${formatAudioDuration(currentTime)} / ${formatAudioDuration(duration)}`;
  const repeatLabel = repeatMode === "off" ? "Repetir desativado" : repeatMode === "all" ? "Repetir fila" : "Repetir musica";

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.track}>
          <View style={[styles.trackFill, { width: `${progress * 100}%` }]} />
        </View>

        <View style={styles.content}>
          <View style={styles.nowPlayingRow}>
            <View style={styles.artwork}>
              <Ionicons color={colors.accentStrong} name="musical-notes" size={22} />
            </View>

            <View style={styles.info}>
              <Text numberOfLines={1} style={styles.kicker}>
                Tocando agora
              </Text>
              <Text numberOfLines={1} style={styles.title}>
                {track.title}
              </Text>
              <Text numberOfLines={1} style={styles.time}>
                {timeLabel}
              </Text>
            </View>

            <AnimatedPressable accessibilityLabel="Fechar player" accessibilityRole="button" onPress={stop} style={styles.closeButton}>
              <Ionicons color={colors.textMuted} name="close" size={18} />
            </AnimatedPressable>
          </View>

          <View style={styles.controls}>
            <AnimatedPressable accessibilityLabel={repeatLabel} accessibilityRole="button" onPress={toggleRepeat} style={styles.iconButton}>
              <Ionicons color={repeatMode === "off" ? colors.textMuted : colors.accentStrong} name="repeat" size={20} />
              {repeatMode === "one" ? <View style={styles.repeatOneDot} /> : null}
            </AnimatedPressable>

            <AnimatedPressable accessibilityLabel="Musica anterior" accessibilityRole="button" onPress={skipPrevious} style={styles.skipButton}>
              <Ionicons color={colors.textPrimary} name="play-skip-back" size={22} />
            </AnimatedPressable>

            <AnimatedPressable
              accessibilityLabel={isPlaying ? "Pausar" : "Tocar"}
              accessibilityRole="button"
              onPress={togglePlayPause}
              style={styles.playButton}
            >
              <Ionicons color={colors.background} name={isPlaying ? "pause" : "play"} size={24} />
            </AnimatedPressable>

            <AnimatedPressable accessibilityLabel="Proxima musica" accessibilityRole="button" onPress={skipNext} style={styles.skipButton}>
              <Ionicons color={colors.textPrimary} name="play-skip-forward" size={22} />
            </AnimatedPressable>

            <View style={styles.iconButtonSpacer} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  artwork: {
    alignItems: "center",
    backgroundColor: colors.goldSoft,
    borderColor: colors.accent,
    borderRadius: radii.lg,
    borderWidth: 1,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  closeButton: {
    alignItems: "center",
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderTopColor: colors.accent,
    borderTopWidth: 3,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.45,
    shadowRadius: 22,
  },
  content: {
    gap: spacing.sm,
    padding: spacing.md,
  },
  controls: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  iconButtonSpacer: {
    width: 40,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  kicker: {
    color: colors.accentStrong,
    fontFamily: fontFamilies.ui,
    fontSize: typography.tab,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  nowPlayingRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  overlay: {
    bottom: 88,
    left: spacing.md,
    position: "absolute",
    right: spacing.md,
    zIndex: 50,
  },
  playButton: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  repeatOneDot: {
    backgroundColor: colors.accentStrong,
    borderRadius: radii.pill,
    bottom: 7,
    height: 5,
    position: "absolute",
    right: 7,
    width: 5,
  },
  skipButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    width: 44,
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
  track: {
    backgroundColor: colors.surfaceMuted,
    height: 4,
    width: "100%",
  },
  trackFill: {
    backgroundColor: colors.accent,
    height: "100%",
  },
});
