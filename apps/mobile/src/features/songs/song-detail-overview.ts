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
  const materialsLabel = `${input.assetCount} ${input.assetCount === 1 ? "material reunido" : "materiais reunidos"}`;

  if (input.sourceMode === "remote") {
    return {
      helperText: `${materialsLabel} para este canto. Favoritos ${input.favoriteEnabled ? "ativos" : "aguardando entrada na conta"}.`,
      title: "Canto preparado",
    };
  }

  return {
    helperText: `${input.assetCount} ${input.assetCount === 1 ? "material já pode ser consultado" : "materiais já podem ser consultados"} neste canto. Favoritos ${input.favoriteEnabled ? "ativos" : "aguardando entrada na conta"}.`,
    title: "Canto em consulta",
  };
}
