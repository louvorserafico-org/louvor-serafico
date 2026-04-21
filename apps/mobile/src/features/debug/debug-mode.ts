export type DebugModeInput = {
  envValue?: string | null;
};

export function isDebugModeEnabled(input: DebugModeInput): boolean {
  return input.envValue === "true" || input.envValue === "1";
}
