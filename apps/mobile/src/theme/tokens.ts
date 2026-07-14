import { Platform } from "react-native";

// Identidade franciscana (dark): chumbo (charcoal) + creme + dourado.
// Alinhada ao site frei-luis-ventura (fundo ~HSL 220 13% 10%, ouro ~HSL 43 52% 54%).
export const colors = {
  // Ação / dourado
  accent: "#c7a24e", // dourado principal (CTAs, links, destaque)
  accentStrong: "#e2c77f", // dourado claro para enfase/texto
  gold: "#c7a24e", // eyebrows e marcacoes liturgicas
  goldSoft: "#2c2719", // superficie escura com tom dourado (estados/realces)

  // Chumbo / superficies
  background: "#16171a", // chumbo profundo
  surface: "#1e2024", // cartoes
  surfaceMuted: "#25272c", // inputs / superficie elevada
  tabBackground: "#101114", // navegação inferior
  border: "#2b2e34",
  borderStrong: "#3c4048",

  // Verde bronze (marcação de repertório) e superficie sutil
  olive: "#7e8659",
  oliveSoft: "#1f231a",

  // Texto (creme sobre chumbo)
  textPrimary: "#f4f2ea",
  textSecondary: "#bec1c9",
  textMuted: "#878c95",

  // Sombra
  ink: "#000000",
  shadow: "rgba(0, 0, 0, 0.45)",
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
  tab: 11,
  title: 40,
} as const;
