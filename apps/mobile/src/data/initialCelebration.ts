import {
  buildCelebrationMomentRows,
  santissimoNomeDeJesusCelebration,
} from "@louvor-serafico/shared";

export const initialCelebration = {
  ...santissimoNomeDeJesusCelebration,
  moments: buildCelebrationMomentRows(santissimoNomeDeJesusCelebration),
} as const;
