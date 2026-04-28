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
      helperText: "Compartilhe o que ajudou o canto, a assembleia e o servico do ministerio.",
      inputPlaceholder: "Conte como este canto ajudou a assembleia, o coro ou o ensaio.",
      primaryLabel: "Publicar partilha",
      status: "remote",
      title: "Partilha entre ministerios",
    };
  }

  if (input.canComment) {
    return {
      helperText: "Sua partilha pode ser guardada neste aparelho para consulta e memoria do ministerio.",
      inputPlaceholder: "Conte como foi o ensaio, a escolha dos cantos ou a celebracao.",
      primaryLabel: "Guardar partilha",
      status: "local",
      title: "Partilha do ministerio",
    };
  }

  return {
    helperText: "Entre na sua conta para acompanhar partilhas e guardar experiencias do ministerio.",
    inputPlaceholder: "Entre para escrever sua partilha.",
    primaryLabel: "Entrar para participar",
    status: "blocked",
    title: "Partilha e escuta",
  };
}
