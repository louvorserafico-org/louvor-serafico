export const standardMassMomentKeys = [
  "entrance_chant",
  "responsorial_psalm",
  "gospel_acclamation",
  "offertory",
  "communion_chant",
  "final_chant",
] as const;

export type MassMomentKey = (typeof standardMassMomentKeys)[number];

export type MassMoment = {
  key: MassMomentKey;
  label: string;
  order: number;
  required: boolean;
};

export type CelebrationRepertoireInput = Partial<Record<MassMomentKey, string[]>>;

export type CelebrationRepertoireValidation = {
  complete: boolean;
  missingMomentKeys: MassMomentKey[];
};

export const standardMassMoments: MassMoment[] = [
  {
    key: "entrance_chant",
    label: "Canto de entrada",
    order: 1,
    required: true,
  },
  {
    key: "responsorial_psalm",
    label: "Salmo Responsorial",
    order: 2,
    required: true,
  },
  {
    key: "gospel_acclamation",
    label: "Aclamação ao Evangelho",
    order: 3,
    required: true,
  },
  {
    key: "offertory",
    label: "Apresentação das oferendas",
    order: 4,
    required: true,
  },
  {
    key: "communion_chant",
    label: "Canto de comunhao",
    order: 5,
    required: true,
  },
  {
    key: "final_chant",
    label: "Canto final",
    order: 6,
    required: true,
  },
];

export function getMassMomentByKey(key: string): MassMoment | undefined {
  return standardMassMoments.find((moment) => moment.key === key);
}

export function validateCelebrationRepertoire(
  repertoire: CelebrationRepertoireInput,
): CelebrationRepertoireValidation {
  const missingMomentKeys = standardMassMoments
    .filter((moment) => moment.required)
    .filter((moment) => {
      const songs = repertoire[moment.key];

      return !songs || songs.length === 0;
    })
    .map((moment) => moment.key);

  return {
    complete: missingMomentKeys.length === 0,
    missingMomentKeys,
  };
}
