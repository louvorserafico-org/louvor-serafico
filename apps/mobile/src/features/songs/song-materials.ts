import type { SongAsset } from "@louvor-serafico/shared";

export type SongMaterialSectionKey = "score" | "lyrics_and_chords" | "audio" | "video";

export type SongMaterialSection = {
  assets: SongAsset[];
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

  return badges.length > 0 ? badges : ["Em preparacao"];
}

export function buildSongMaterialSections(assets: SongAsset[]): SongMaterialSection[] {
  const scoreAssets = assets.filter((asset) => asset.type === "score_pdf");
  const lyricsAndChordAssets = assets.filter(isLyricsOrChordAsset);
  const audioAssets = assets.filter((asset) => asset.type === "audio");
  const videoAssets = assets.filter((asset) => asset.type === "video");

  return [
    {
      assets: scoreAssets,
      emptyText: "A partitura sera reunida aqui quando estiver pronta.",
      helperText: scoreAssets.length > 0 ? "Leitura musical pronta para consulta." : "Espaco reservado para a partitura deste canto.",
      key: "score",
      title: "Partitura",
    },
    {
      assets: lyricsAndChordAssets,
      emptyText: "A letra com a cifra sera reunida aqui.",
      helperText:
        lyricsAndChordAssets.length > 0
          ? "Texto e cifra preparados para estudo e execucao."
          : "Espaco reservado para letra e cifra deste canto.",
      key: "lyrics_and_chords",
      title: "Letra e cifra",
    },
    {
      assets: audioAssets,
      emptyText: "O audio de apoio sera reunido aqui.",
      helperText: audioAssets.length > 0 ? "Audios prontos para apoiar o preparo." : "Espaco reservado para audio deste canto.",
      key: "audio",
      title: "Audio",
    },
    {
      assets: videoAssets,
      emptyText: "O video de apoio sera reunido aqui.",
      helperText: videoAssets.length > 0 ? "Videos prontos para apoiar o servico." : "Espaco reservado para video deste canto.",
      key: "video",
      title: "Video",
    },
  ];
}
