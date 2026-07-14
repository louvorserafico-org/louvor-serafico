import type { Celebration } from "@louvor-serafico/shared";

import type { fetchRemoteCelebrations } from "./remote-celebrations";

type RemoteCelebrationsResult = Awaited<ReturnType<typeof fetchRemoteCelebrations>>;

export function resolveCelebrationCatalogSource(
  remote: RemoteCelebrationsResult,
  localCelebrations: Celebration[],
) {
  if (remote.status === "ready" && remote.celebrations.length > 0) {
    return {
      celebrations: remote.celebrations,
      message: "Fonte remota ativa.",
      mode: "remote" as const,
    };
  }

  if (remote.status === "ready") {
    return {
      celebrations: localCelebrations,
      message: "Calendário remoto vazio. Mantendo fonte local.",
      mode: "local" as const,
    };
  }

  return {
    celebrations: localCelebrations,
    message: remote.message,
    mode: "local" as const,
  };
}
