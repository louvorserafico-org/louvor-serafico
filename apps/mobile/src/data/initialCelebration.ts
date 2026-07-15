import {
  buildCelebrationMomentRows,
  SantíssimoNomeDeJesusCelebration,
} from "@louvor-serafico/shared";

export const initialCelebration = {
  ...SantíssimoNomeDeJesusCelebration,
  moments: buildCelebrationMomentRows(SantíssimoNomeDeJesusCelebration),
} as const;
