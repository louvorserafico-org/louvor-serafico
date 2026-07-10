// Hub de devocoes franciscanas. Conteudo textual (oracoes, novena, transito) fica
// como "preparing" ate a curadoria editorial; nada de texto liturgico fabricado.

export type DevotionStatus = "available" | "preparing";

export type DevotionItem = {
  description: string;
  slug: string;
  status: DevotionStatus;
  title: string;
};

const devotionItems: DevotionItem[] = [
  {
    description: "Orações diárias e preparatórias para a oração pessoal e comunitária.",
    slug: "devocional",
    status: "preparing",
    title: "Devocional",
  },
  {
    description: "Nove dias de oração na companhia de São Francisco de Assis.",
    slug: "novena-sao-francisco",
    status: "preparing",
    title: "Novena de São Francisco",
  },
  {
    description: "Memória da passagem (trânsito) de São Francisco de Assis.",
    slug: "transito-sao-francisco",
    status: "preparing",
    title: "Trânsito de São Francisco",
  },
];

export function getDevotionItems(): DevotionItem[] {
  return devotionItems;
}

export function findDevotionBySlug(slug: string): DevotionItem | undefined {
  return devotionItems.find((item) => item.slug === slug);
}

export function buildDevotionRoute(slug: string): string {
  return `/devocoes/${slug}`;
}
