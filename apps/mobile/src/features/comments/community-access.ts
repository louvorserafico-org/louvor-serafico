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
      helperText: "Partilhe um repertório celebrado ou deixe apenas uma palavra para o ministério.",
      inputPlaceholder: "Conte como este canto ajudou a assembleia, o coro ou o ensaio.",
      primaryLabel: "Publicar partilha",
      status: "remote",
      title: "Partilha entre ministérios",
    };
  }

  if (input.canComment) {
    return {
      helperText: "Partilhe um repertório celebrado ou guarde uma memória simples neste aparelho.",
      inputPlaceholder: "Conte como foi o ensaio, a escolha dos cantos ou a celebração.",
      primaryLabel: "Guardar partilha",
      status: "local",
      title: "Partilha do ministério",
    };
  }

  return {
    helperText: "Entre na sua conta para relacionar o repertório celebrado e partilhar a experiência do ministério.",
    inputPlaceholder: "Entre para escrever sua partilha.",
    primaryLabel: "Entrar para participar",
    status: "blocked",
    title: "Partilha do ministério",
  };
}
