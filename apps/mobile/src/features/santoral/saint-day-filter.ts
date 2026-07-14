import type { SaintDay } from "@louvor-serafico/shared";

// Quando o usuário abre o link de um santo específico (ex.: a partir da Home),
// a página do dia pode filtrar para mostrar só aquele santo.
export function resolveSaintsForDay(saints: SaintDay[], saintId?: string): SaintDay[] {
  if (!saintId) {
    return saints;
  }

  const match = saints.find((saint) => saint.id === saintId);

  return match ? [match] : saints;
}
