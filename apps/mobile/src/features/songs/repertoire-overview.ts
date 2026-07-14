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
      helperText: `${input.favoriteCount} guardado(s). Acervo publicado para estudo, escolha e preparação.`,
      title: "Repertorio de cantos",
    };
  }

  return {
    eyebrow: `${input.remoteCount} cantos`,
    helperText: `${input.favoriteCount} guardado(s). Acervo inicial disponível neste aparelho para consulta serena.`,
    title: "Repertorio de cantos",
  };
}
