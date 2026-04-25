type SongAssetActionInput = {
  canAccess: boolean;
  hasActiveSubscription: boolean;
  isAuthenticated: boolean;
};

export type SongAssetAction =
  | {
      href: null;
      kind: "open";
      label: "Abrir material";
    }
  | {
      href: "/entrar";
      kind: "sign_in";
      label: "Entrar para acessar";
    }
  | {
      href: "/perfil";
      kind: "subscribe";
      label: "Ver premium";
    };

export function resolveSongAssetAction(input: SongAssetActionInput): SongAssetAction {
  if (input.canAccess) {
    return {
      href: null,
      kind: "open",
      label: "Abrir material",
    };
  }

  if (!input.isAuthenticated) {
    return {
      href: "/entrar",
      kind: "sign_in",
      label: "Entrar para acessar",
    };
  }

  return {
    href: "/perfil",
    kind: "subscribe",
    label: input.hasActiveSubscription ? "Ver premium" : "Ver premium",
  };
}
