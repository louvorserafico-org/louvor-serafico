import { isDebugModeEnabled } from "./debug-mode";

export function useDebugMode() {
  return isDebugModeEnabled({
    envValue: process.env.EXPO_PUBLIC_DEBUG_CARDS,
  });
}
