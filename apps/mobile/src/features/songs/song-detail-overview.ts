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
      helperText: `${input.assetCount} materiais lidos do catalogo remoto. Favoritos ${input.favoriteEnabled ? "ativos" : "bloqueados"}.`,
      title: "Musica remota ativa",
    };
  }

  return {
    helperText: `${input.assetCount} materiais disponiveis no catalogo local. Favoritos ${input.favoriteEnabled ? "ativos" : "bloqueados"}.`,
    title: "Catalogo local ativo",
  };
}
