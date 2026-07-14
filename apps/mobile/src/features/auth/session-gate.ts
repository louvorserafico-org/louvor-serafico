export type LocalSession =
  | {
      status: "booting";
    }
  | {
      status: "guest";
    }
  | {
      displayName: string;
      email: string;
      status: "signed_in";
    };

export type SessionGate = {
  actionLabel: string;
  helperText: string;
  status: "closed" | "loading" | "open";
  title: string;
};

export function buildSessionGate(session: LocalSession): SessionGate {
  if (session.status === "booting") {
    return {
      actionLabel: "Aguardando sessão",
      helperText: "Estado local ainda inicializando.",
      status: "loading",
      title: "Preparando sessão teste",
    };
  }

  if (session.status === "guest") {
    return {
      actionLabel: "Entrar modo teste",
      helperText: "Ative sessão local para liberar UX de favoritos e comentários.",
      status: "closed",
      title: "Sessão teste inativa",
    };
  }

  return {
    actionLabel: "Sair sessão teste",
    helperText: "Sessão local ativa para favoritos, comentários e fluxos protegidos.",
    status: "open",
    title: "Sessão teste ativa",
  };
}
