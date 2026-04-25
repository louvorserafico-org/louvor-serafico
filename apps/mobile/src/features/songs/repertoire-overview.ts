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
      helperText: `${input.favoriteCount} guardado(s). Catalogo publicado pronto para consulta.`,
      title: "Acervo publicado",
    };
  }

  return {
    eyebrow: `${input.remoteCount} cantos`,
    helperText: `${input.favoriteCount} guardado(s). Acervo inicial disponivel neste aparelho.`,
    title: "Acervo inicial",
  };
}
