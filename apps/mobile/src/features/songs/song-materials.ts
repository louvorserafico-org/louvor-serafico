import type { SongAsset } from "@louvor-serafico/shared";

export type SongMaterialSectionKey = "score" | "lyrics_and_chords" | "audio" | "video";

export type SongMaterialSection = {
  assets: SongAsset[];
  ctaLabel: string;
  emptyText: string;
  helperText: string;
  key: SongMaterialSectionKey;
  title: string;
};

function isLyricsOrChordAsset(asset: SongAsset) {
  return asset.type === "lyrics" || asset.type === "chord_sheet";
}

export function buildSongMaterialBadges(assets: SongAsset[]) {
  const badges: string[] = [];

  if (assets.some((asset) => asset.type === "score_pdf")) {
    badges.push("Partitura");
  }

  if (assets.some(isLyricsOrChordAsset)) {
    badges.push("Letra e cifra");
  }

  if (assets.some((asset) => asset.type === "audio")) {
    badges.push("Audio");
  }

  if (assets.some((asset) => asset.type === "video")) {
    badges.push("Video");
  }

  return badges.length > 0 ? badges : ["Em preparação"];
}

export function buildSongMaterialSections(assets: SongAsset[]): SongMaterialSection[] {
  const scoreAssets = assets.filter((asset) => asset.type === "score_pdf");
  const lyricsAndChordAssets = assets.filter(isLyricsOrChordAsset);
  const audioAssets = assets.filter((asset) => asset.type === "audio");
  const videoAssets = assets.filter((asset) => asset.type === "video");

  return [
    {
      assets: scoreAssets,
      ctaLabel: "Abrir partitura",
      emptyText: "A partitura será reunida aqui quando estiver pronta.",
      helperText: scoreAssets.length > 0 ? "Leitura musical pronta para consulta." : "Espaco reservado para a partitura deste canto.",
      key: "score",
      title: "Partitura",
    },
    {
      assets: lyricsAndChordAssets,
      ctaLabel: "Abrir letra e cifra",
      emptyText: "A letra com a cifra será reunida aqui.",
      helperText:
        lyricsAndChordAssets.length > 0
          ? "Texto e cifra preparados para estudo e execução."
          : "Espaco reservado para letra e cifra deste canto.",
      key: "lyrics_and_chords",
      title: "Letra e cifra",
    },
    {
      assets: audioAssets,
      ctaLabel: "Ouvir audio",
      emptyText: "O audio de apoio será reunido aqui.",
      helperText: audioAssets.length > 0 ? "Audios prontos para apoiar o preparo." : "Espaco reservado para audio deste canto.",
      key: "audio",
      title: "Audio",
    },
    {
      assets: videoAssets,
      ctaLabel: "Ver video",
      emptyText: "O video de apoio será reunido aqui.",
      helperText: videoAssets.length > 0 ? "Videos prontos para apoiar o serviço." : "Espaco reservado para video deste canto.",
      key: "video",
      title: "Video",
    },
  ];
}
