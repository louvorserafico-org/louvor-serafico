export type CommunityAccessInput = {
  canComment: boolean;
  hasRemoteSession: boolean;
};

export type CommunityAccess = {
  helperText: string;
  inputPlaceholder: string;
  primaryLabel: string;
  status: "blocked" | "local" | "remote";
  title: string;
};

export function buildCommunityAccess(input: CommunityAccessInput): CommunityAccess {
  if (input.hasRemoteSession) {
    return {
      helperText: "Sessao Supabase ativa. Sua partilha pode ser publicada para toda comunidade.",
      inputPlaceholder: "Compartilhe como este repertorio funcionou na missa.",
      primaryLabel: "Publicar comentario remoto",
      status: "remote",
      title: "Comunidade ativa",
    };
  }

  if (input.canComment) {
    return {
      helperText: "Sessao local ativa. A partilha fica salva apenas neste aparelho para validar UX.",
      inputPlaceholder: "Compartilhe experiencia local de ensaio ou celebracao.",
      primaryLabel: "Publicar comentario",
      status: "local",
      title: "Preview local ativo",
    };
  }

  return {
    helperText: "Entre para comentar, responder e acompanhar partilhas da comunidade.",
    inputPlaceholder: "Entre para liberar comentarios.",
    primaryLabel: "Entrar para comentar",
    status: "blocked",
    title: "Comunidade bloqueada",
  };
}
