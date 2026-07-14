export type CommunityAccessInput = {
  isAuthenticated: boolean;
};

export type CommunityAccess = {
  helperText: string;
  inputPlaceholder: string;
  primaryLabel: string;
  status: "authenticated" | "guest";
  title: string;
};

export function buildCommunityAccess(input: CommunityAccessInput): CommunityAccess {
  if (input.isAuthenticated) {
    return {
      helperText: "Partilhe um repertório celebrado ou deixe apenas uma palavra para o ministério.",
      inputPlaceholder: "Conte como este canto ajudou a assembleia, o coro ou o ensaio.",
      primaryLabel: "Publicar partilha",
      status: "authenticated",
      title: "Partilha entre ministérios",
    };
  }

  return {
    helperText: "Entre na sua conta para relacionar o repertório celebrado e partilhar a experiência do ministério.",
    inputPlaceholder: "Entre para escrever sua partilha.",
    primaryLabel: "Entrar para participar",
    status: "guest",
    title: "Partilha do ministério",
  };
}
