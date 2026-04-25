import { Platform } from "react-native";

export const colors = {
  accent: "#7b2f45",
  accentStrong: "#5f2033",
  background: "#f5efe4",
  border: "#d8c9b1",
  borderStrong: "#ad9562",
  gold: "#a7894f",
  goldSoft: "#efe1c0",
  ink: "#2a241f",
  olive: "#626b4d",
  oliveSoft: "#e7ebde",
  shadow: "rgba(42, 36, 31, 0.12)",
  surface: "#fffaf2",
  surfaceMuted: "#f1e9da",
  tabBackground: "#f9f3e8",
  textMuted: "#8b7d69",
  textPrimary: "#2f2822",
  textSecondary: "#5f5549",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const fontFamilies = {
  body: Platform.select({
    android: "serif",
    default: "serif",
    ios: "Georgia",
  }),
  display: Platform.select({
    android: "serif",
    default: "serif",
    ios: "Times New Roman",
  }),
  ui: Platform.select({
    android: "sans-serif-medium",
    default: "sans-serif",
    ios: "System",
  }),
} as const;

export const radii = {
  md: 8,
  lg: 14,
  xl: 20,
  pill: 999,
} as const;

export const typography = {
  caption: 13,
  body: 16,
  heading: 24,
  lead: 18,
  tab: 10,
  title: 40,
} as const;
