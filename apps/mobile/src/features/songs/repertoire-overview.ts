type RepertoireOverviewInput = {
  favoriteCount: number;
  remoteCount: number;
  sourceMode: "local" | "remote";
};

export type RepertoireOverview = {
  eyebrow: string;
  helperText: string;
  title: string;
};

export function buildRepertoireOverview(input: RepertoireOverviewInput): RepertoireOverview {
  if (input.sourceMode === "remote") {
    return {
      eyebrow: `${input.remoteCount} cantos`,
      helperText: `${input.favoriteCount} favorito(s). Catalogo remoto ativo para consulta.`,
      title: "Repertorio publicado",
    };
  }

  return {
    eyebrow: `${input.remoteCount} cantos`,
    helperText: `${input.favoriteCount} favorito(s). Catalogo local ativo neste aparelho.`,
    title: "Repertorio inicial",
  };
}
