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
      actionLabel: "Aguardando sessao",
      helperText: "Estado local ainda inicializando.",
      status: "loading",
      title: "Preparando sessao teste",
    };
  }

  if (session.status === "guest") {
    return {
      actionLabel: "Entrar modo teste",
      helperText: "Ative sessao local para liberar UX de favoritos e comentarios.",
      status: "closed",
      title: "Sessao teste inativa",
    };
  }

  return {
    actionLabel: "Sair sessao teste",
    helperText: "Sessao local ativa para favoritos, comentarios e fluxos protegidos.",
    status: "open",
    title: "Sessao teste ativa",
  };
}
