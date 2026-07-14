import type { SaintDay } from "@louvor-serafico/shared";

// Quando o usuario abre o link de um santo especifico (ex.: a partir da Home),
// a pagina do dia pode filtrar para mostrar so aquele santo.
export function resolveSaintsForDay(saints: SaintDay[], saintId?: string): SaintDay[] {
  if (!saintId) {
    return saints;
  }

  const match = saints.find((saint) => saint.id === saintId);

  return match ? [match] : saints;
}
