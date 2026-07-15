import { useRef, type ComponentProps } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

type AnimatedPressableProps = ComponentProps<typeof Pressable>;

export function AnimatedPressable({ onPressIn, onPressOut, style, ...rest }: AnimatedPressableProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const flatStyle = typeof style === "function" ? undefined : StyleSheet.flatten(style);

  return (
    <AnimatedPressableBase
      {...rest}
      onPressIn={(event) => {
        Animated.timing(scale, { duration: 90, toValue: 0.96, useNativeDriver: true }).start();
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        Animated.timing(scale, { duration: 120, toValue: 1, useNativeDriver: true }).start();
        onPressOut?.(event);
      }}
      style={[flatStyle, { transform: [{ scale }] }]}
    />
  );
}
