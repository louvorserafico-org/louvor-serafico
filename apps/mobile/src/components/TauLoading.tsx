import { Asset } from "expo-asset";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

import { colors, fontFamilies, spacing, typography } from "@/theme/tokens";

const tauElement = require("../../assets/tau-element.png");
const tauAssetUri = Asset.fromModule(tauElement).uri;

type TauLoadingProps = {
  label?: string;
  fullscreen?: boolean;
};

function Dot({ delay }: { delay: number }) {
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(value, { duration: 320, toValue: 1, useNativeDriver: true }),
        Animated.timing(value, { duration: 320, toValue: 0, useNativeDriver: true }),
        Animated.delay(600 - delay),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [delay, value]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          opacity: value.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }),
          transform: [{ translateY: value.interpolate({ inputRange: [0, 1], outputRange: [0, -4] }) }],
        },
      ]}
    />
  );
}

export function TauLoading({ label = "Carregando", fullscreen = false }: TauLoadingProps) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spin, { duration: 2600, easing: undefined, toValue: 1, useNativeDriver: true }),
    );
    animation.start();
    return () => animation.stop();
  }, [spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <View style={[styles.container, fullscreen ? styles.fullscreen : undefined]}>
      <Animated.View style={[styles.markFrame, { transform: [{ rotate }] }]}>
        <Image defaultSource={tauElement} resizeMode="contain" source={{ uri: tauAssetUri }} style={styles.mark} />
      </Animated.View>
      <View style={styles.dots}>
        <Dot delay={0} />
        <Dot delay={150} />
        <Dot delay={300} />
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.sm,
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  dot: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  dots: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  fullscreen: {
    backgroundColor: colors.background,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  label: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  mark: {
    height: 40,
    width: 38,
  },
  markFrame: {
    alignItems: "center",
    justifyContent: "center",
  },
});
