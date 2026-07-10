import type { LiturgicalDay } from "@louvor-serafico/shared";

import { buildSaintClassification } from "../santoral/saint-detail.ts";

export type HomeSaint = {
  classification: string;
  eyebrow: string;
  href: string | null;
  moreCount: number;
  status: "saint" | "none";
  title: string;
};

export function buildHomeSaint(day: LiturgicalDay): HomeSaint {
  const [primary, ...rest] = day.saints;

  if (!primary) {
    return {
      classification: "Acompanhe o calendário seráfico para as próximas memórias franciscanas.",
      eyebrow: "Santo do dia",
      href: null,
      moreCount: 0,
      status: "none",
      title: "Sem santo franciscano hoje",
    };
  }

  return {
    classification: buildSaintClassification(primary),
    eyebrow: "Santo do dia",
    href: `/santos/${day.monthDay}`,
    moreCount: rest.length,
    status: "saint",
    title: primary.name,
  };
}
