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
      helperText: "Compartilhe como o repertorio serviu a celebracao e fortaleceu outros ministerios.",
      inputPlaceholder: "Conte como este canto ajudou a assembleia, o coro ou o ensaio.",
      primaryLabel: "Publicar partilha",
      status: "remote",
      title: "Partilhe com a comunidade",
    };
  }

  if (input.canComment) {
    return {
      helperText: "Sua partilha fica guardada neste aparelho ate que a comunidade completa esteja pronta para voce.",
      inputPlaceholder: "Conte como foi o ensaio, a escolha dos cantos ou a celebracao.",
      primaryLabel: "Guardar partilha",
      status: "local",
      title: "Espaco de partilha",
    };
  }

  return {
    helperText: "Entre na sua conta para acompanhar partilhas, guardar experiencias e caminhar com outros musicos.",
    inputPlaceholder: "Entre para escrever sua partilha.",
    primaryLabel: "Entrar para participar",
    status: "blocked",
    title: "Partilhe sua experiencia",
  };
}
