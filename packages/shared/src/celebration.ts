import {
  type MassMoment,
  type MassMomentKey,
  standardMassMoments,
  validateCelebrationRepertoire,
  // @ts-ignore Node runs TypeScript sources directly in this dev setup.
} from "./mass-template.ts";

export type SongAssetType = "lyrics" | "chord_sheet" | "score_pdf" | "audio" | "video";
export type RecommendationPriority = "required" | "recommended" | "optional";

export type SongAsset = {
  id: string;
  type: SongAssetType;
  title: string;
  path: string;
  premium: boolean;
};

export type Song = {
  id: string;
  title: string;
  slug: string;
  assets: SongAsset[];
};

export type RepertoireRecommendation = {
  id: string;
  momentKey: MassMomentKey;
  songId: string;
  priority: RecommendationPriority;
};

export type Celebration = {
  id: string;
  slug: string;
  title: string;
  dateLabel: string;
  dateMonthDay: string;
  songs: Song[];
  recommendations: RepertoireRecommendation[];
};

export type CelebrationMomentRow = {
  moment: MassMoment;
  recommendation: RepertoireRecommendation;
  song: Song;
};

export function buildCelebrationMomentRows(celebration: Celebration): CelebrationMomentRow[] {
  return standardMassMoments.flatMap((moment) => {
    return celebration.recommendations
      .filter((recommendation) => recommendation.momentKey === moment.key)
      .map((recommendation) => {
        const song = celebration.songs.find((item) => item.id === recommendation.songId);

        if (!song) {
          throw new Error(`Unknown song: ${recommendation.songId}`);
        }

        return {
          moment,
          recommendation,
          song,
        };
      });
  });
}

export function validateCelebration(celebration: Celebration) {
  const repertoire = celebration.recommendations.reduce<Partial<Record<MassMomentKey, string[]>>>(
    (accumulator, recommendation) => {
      const songs = accumulator[recommendation.momentKey] ?? [];

      return {
        ...accumulator,
        [recommendation.momentKey]: [...songs, recommendation.songId],
      };
    },
    {},
  );

  return validateCelebrationRepertoire(repertoire);
}

export function getInitialSongCatalog(): Song[] {
  return getInitialCelebrationCatalog()
    .flatMap((celebration) => celebration.songs)
    .sort((first, second) => first.title.localeCompare(second.title, "pt-BR"));
}

export function findSongBySlug(slug: string): Song | undefined {
  return getInitialSongCatalog().find((song) => song.slug === slug);
}

export function getInitialCelebrationCatalog(): Celebration[] {
  return [SantíssimoNomeDeJesusCelebration, BasílicaDeSãoFranciscoCelebration];
}

export function findCelebrationByDate(dateMonthDay: string): Celebration | undefined {
  return getInitialCelebrationCatalog().find(
    (celebration) => celebration.dateMonthDay === dateMonthDay,
  );
}

export function findCelebrationBySlug(slug: string): Celebration | undefined {
  return getInitialCelebrationCatalog().find((celebration) => celebration.slug === slug);
}

export const SantíssimoNomeDeJesusCelebration: Celebration = {
  id: "celebration-Santíssimo-nome-de-jesus",
  slug: "Santíssimo-nome-de-jesus",
  title: "Missa do Santíssimo Nome de Jesus",
  dateLabel: "03 de janeiro",
  dateMonthDay: "01-03",
  songs: [
    {
      id: "song-fazei-em-nome-do-senhor",
      title: "Fazei em nome do Senhor",
      slug: "fazei-em-nome-do-senhor",
      assets: [
        {
          id: "asset-fazei-score",
          path: "Fazei em Nomedo Senhor.pdf",
          premium: true,
          title: "Partitura",
          type: "score_pdf",
        },
        {
          id: "asset-fazei-audio",
          path: "Fazei em nome do Senhor.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
    {
      id: "song-bendito-seja-o-nome-do-senhor",
      title: "Bendito seja o nome do Senhor",
      slug: "bendito-seja-o-nome-do-senhor",
      assets: [
        {
          id: "asset-bendito-score",
          path: "Benndito seja o nome do Senhor (Salmo Responsotial).pdf",
          premium: true,
          title: "Partitura",
          type: "score_pdf",
        },
        {
          id: "asset-bendito-audio",
          path: "Bendito seja o nome do Senhor.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
    {
      id: "song-aleluia-bendizei-o-seu-nome",
      title: "Aleluia, bendizei o seu nome",
      slug: "aleluia-bendizei-o-seu-nome",
      assets: [
        {
          id: "asset-aleluia-score",
          path: "Aleluia, bendizei o seu nome.pdf",
          premium: true,
          title: "Partitura",
          type: "score_pdf",
        },
        {
          id: "asset-aleluia-audio",
          path: "Aleluia, bendizei o seu nome.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
    {
      id: "song-invocando-o-nome-do-senhor",
      title: "Invocando o nome do Senhor",
      slug: "invocando-o-nome-do-senhor",
      assets: [
        {
          id: "asset-invocando-audio",
          path: "Invocando o nome do Senhor.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
    {
      id: "song-por-teu-nome-o-senhor",
      title: "Por teu nome, o Senhor",
      slug: "por-teu-nome-o-senhor",
      assets: [
        {
          id: "asset-por-teu-nome-score",
          path: "Por teu nome, Ã³ Senhor.pdf",
          premium: true,
          title: "Partitura",
          type: "score_pdf",
        },
        {
          id: "asset-por-teu-nome-audio",
          path: "Por teu nome, o Senhor.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
    {
      id: "song-vamos-em-nome-do-senhor",
      title: "Vamos em nome do Senhor",
      slug: "vamos-em-nome-do-senhor",
      assets: [
        {
          id: "asset-vamos-score",
          path: "Vamos em nome do Senhor.pdf",
          premium: true,
          title: "Partitura",
          type: "score_pdf",
        },
        {
          id: "asset-vamos-audio",
          path: "Vamos em nome do Senhor.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
  ],
  recommendations: [
    {
      id: "rec-entrada",
      momentKey: "entrance_chant",
      priority: "required",
      songId: "song-fazei-em-nome-do-senhor",
    },
    {
      id: "rec-salmo",
      momentKey: "responsorial_psalm",
      priority: "required",
      songId: "song-bendito-seja-o-nome-do-senhor",
    },
    {
      id: "rec-aclamacao",
      momentKey: "gospel_acclamation",
      priority: "required",
      songId: "song-aleluia-bendizei-o-seu-nome",
    },
    {
      id: "rec-oferendas",
      momentKey: "offertory",
      priority: "required",
      songId: "song-invocando-o-nome-do-senhor",
    },
    {
      id: "rec-comunhao",
      momentKey: "communion_chant",
      priority: "required",
      songId: "song-por-teu-nome-o-senhor",
    },
    {
      id: "rec-final",
      momentKey: "final_chant",
      priority: "required",
      songId: "song-vamos-em-nome-do-senhor",
    },
  ],
};

export const BasílicaDeSãoFranciscoCelebration: Celebration = {
  id: "celebration-basilica-de-sao-francisco",
  slug: "basilica-de-sao-francisco",
  title: "Missa da Basílica de São Francisco",
  dateLabel: "24 de maio",
  dateMonthDay: "05-24",
  songs: [
    {
      id: "song-a-nova-jerusalem",
      title: "Á nova Jerusalém",
      slug: "a-nova-jerusalem",
      assets: [
        {
          id: "asset-a-nova-jerusalem-score",
          path: "A nova Jerusalem.pdf",
          premium: true,
          title: "Partitura",
          type: "score_pdf",
        },
        {
          id: "asset-a-nova-jerusalem-audio",
          path: "A nova Jerusalem.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
    {
      id: "song-aleluia-santo-antonio-pregador",
      title: "Aleluia, Santo Antônio Pregador",
      slug: "aleluia-santo-antonio-pregador",
      assets: [
        {
          id: "asset-aleluia-santo-antonio-score",
          path: "Aleluia, Santo Antonio Pregador.pdf",
          premium: true,
          title: "Partitura",
          type: "score_pdf",
        },
        {
          id: "asset-aleluia-santo-antonio-audio",
          path: "Aleluia, Santo Antonio Pregador.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
    {
      id: "song-qual-andorinha",
      title: "Qual andorinha",
      slug: "qual-andorinha",
      assets: [
        {
          id: "asset-qual-andorinha-score",
          path: "Qual andorinha.pdf",
          premium: true,
          title: "Partitura",
          type: "score_pdf",
        },
        {
          id: "asset-qual-andorinha-audio",
          path: "Qual andorinha.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
    {
      id: "song-somos-templos-vivos",
      title: "Somos templos vivos",
      slug: "somos-templos-vivos",
      assets: [
        {
          id: "asset-somos-templos-vivos-score",
          path: "Somos templos vivos.pdf",
          premium: true,
          title: "Partitura",
          type: "score_pdf",
        },
        {
          id: "asset-somos-templos-vivos-audio",
          path: "Somos templos vivos.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
    {
      id: "song-es-francisco-coluna-da-igreja",
      title: "És Francisco coluna da Igreja",
      slug: "es-francisco-coluna-da-igreja",
      assets: [
        {
          id: "asset-es-francisco-coluna-score",
          path: "Es Francisco coluna da Igreja.pdf",
          premium: true,
          title: "Partitura",
          type: "score_pdf",
        },
        {
          id: "asset-es-francisco-coluna-audio",
          path: "Es Francisco coluna da Igreja.mp3",
          premium: true,
          title: "Áudio",
          type: "audio",
        },
      ],
    },
  ],
  recommendations: [
    {
      id: "rec-basilica-entrada",
      momentKey: "entrance_chant",
      priority: "required",
      songId: "song-a-nova-jerusalem",
    },
    {
      id: "rec-basilica-aclamacao",
      momentKey: "gospel_acclamation",
      priority: "required",
      songId: "song-aleluia-santo-antonio-pregador",
    },
    {
      id: "rec-basilica-oferendas",
      momentKey: "offertory",
      priority: "required",
      songId: "song-qual-andorinha",
    },
    {
      id: "rec-basilica-comunhao",
      momentKey: "communion_chant",
      priority: "required",
      songId: "song-somos-templos-vivos",
    },
    {
      id: "rec-basilica-final",
      momentKey: "final_chant",
      priority: "required",
      songId: "song-es-francisco-coluna-da-igreja",
    },
  ],
};
