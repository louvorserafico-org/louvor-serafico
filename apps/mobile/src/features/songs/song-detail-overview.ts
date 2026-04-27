type SongDetailOverviewInput = {
  assetCount: number;
  favoriteEnabled: boolean;
  sourceMode: "local" | "remote";
};

export type SongDetailOverview = {
  helperText: string;
  title: string;
};

export function buildSongDetailOverview(input: SongDetailOverviewInput): SongDetailOverview {
  if (input.sourceMode === "remote") {
    return {
      helperText: `${input.assetCount} materiais reunidos para este canto. Favoritos ${input.favoriteEnabled ? "ativos" : "indisponiveis por enquanto"}.`,
      title: "Canto pronto para servir",
    };
  }

  return {
    helperText: `${input.assetCount} materiais ja podem ser consultados neste canto. Favoritos ${input.favoriteEnabled ? "ativos" : "indisponiveis por enquanto"}.`,
    title: "Canto em consulta",
  };
}
