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
      helperText: `${input.momentCount} momentos lidos do calendario remoto. ${input.missingMaterials} sem material.`,
      title: "Celebracao remota ativa",
    };
  }

  return {
    helperText: `${input.momentCount} momentos disponiveis no roteiro local. ${input.missingMaterials} sem material.`,
    title: "Roteiro local ativo",
  };
}
