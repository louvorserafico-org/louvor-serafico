import type { LiturgicalDay } from "@louvor-serafico/shared";

import { buildSaintClassification } from "../santoral/saint-detail.ts";

export type HomeSaintEntry = {
  classification: string;
  href: string;
  name: string;
};

export type HomeSaint = {
  description: string;
  eyebrow: string;
  href: string | null;
  saints: HomeSaintEntry[];
  status: "saint" | "none";
  title: string;
};

export function buildHomeSaint(day: LiturgicalDay): HomeSaint {
  const [primary] = day.saints;

  if (!primary) {
    return {
      description: "Acompanhe o calendário seráfico para as próximas memórias Franciscanas.",
      eyebrow: "Santo do dia",
      href: null,
      saints: [],
      status: "none",
      title: "Sem santo Franciscano hoje",
    };
  }

  return {
    description: buildSaintClassification(primary),
    eyebrow: day.saints.length > 1 ? "Santos do dia" : "Santo do dia",
    href: `/santos/${day.monthDay}`,
    saints: day.saints.map((saint) => ({
      classification: buildSaintClassification(saint),
      href: `/santos/${day.monthDay}?saintId=${saint.id}`,
      name: saint.name,
    })),
    status: "saint",
    title: primary.name,
  };
}
