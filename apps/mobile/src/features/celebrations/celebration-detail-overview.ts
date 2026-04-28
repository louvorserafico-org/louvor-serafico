type CelebrationDetailOverviewInput = {
  missingMaterials: number;
  momentCount: number;
  sourceMode: "local" | "remote";
};

export type CelebrationDetailOverview = {
  helperText: string;
  title: string;
};

export function buildCelebrationDetailOverview(
  input: CelebrationDetailOverviewInput,
): CelebrationDetailOverview {
  if (input.sourceMode === "remote") {
    return {
      helperText: `${input.momentCount} momentos reunidos neste roteiro. ${input.missingMaterials} ainda sem material.`,
      title: "Roteiro da celebracao",
    };
  }

  return {
    helperText: `${input.momentCount} momentos reunidos neste roteiro. ${input.missingMaterials} ainda sem material.`,
    title: "Roteiro da celebracao",
  };
}
