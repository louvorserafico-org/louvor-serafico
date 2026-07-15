import { Ionicons } from "@expo/vector-icons";
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { formatAudioDuration } from "@/features/songs/audio-duration";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type SongAudioPlayerProps = {
  uri: string;
};

export function SongAudioPlayer({ uri }: SongAudioPlayerProps) {
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);
  const progress = status.duration > 0 ? Math.min(status.currentTime / status.duration, 1) : 0;

  useEffect(() => {
    void setAudioModeAsync({ playsInSilentMode: true });
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedPressable
        accessibilityLabel={status.playing ? "Pausar áudio" : "Tocar áudio"}
        accessibilityRole="button"
        onPress={() => {
          if (status.playing) {
            player.pause();
            return;
          }

          if (status.didJustFinish || status.currentTime >= status.duration) {
            player.seekTo(0);
          }

          player.play();
        }}
        style={styles.button}
      >
        <Ionicons color={colors.background} name={status.playing ? "pause" : "play"} size={20} />
      </AnimatedPressable>
      <View style={styles.trackColumn}>
        <View style={styles.track}>
          <View style={[styles.trackFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.time}>
          {formatAudioDuration(status.currentTime)} / {formatAudioDuration(status.duration)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  time: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.tab,
    fontWeight: "700",
  },
  track: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.pill,
    height: 6,
    overflow: "hidden",
  },
  trackColumn: {
    flex: 1,
    gap: spacing.xs,
  },
  trackFill: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    height: "100%",
  },
});
