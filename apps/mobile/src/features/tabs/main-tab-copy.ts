export function buildTodayTabSubtitle(isAuthenticated: boolean): string {
  return isAuthenticated
    ? "Repertório litúrgico-musical pronto para abrir, estudar e seguir na celebração de hoje."
    : "Repertório litúrgico-musical de hoje, com entrada rapida para abrir conta e continuar.";
}

export function buildCommunityTabSubtitle(isAuthenticated: boolean): string {
  return isAuthenticated
    ? "Publique sua partilha com o ministério e leia as demais na lista de partilhas públicas."
    : "Veja partilhas públicas do ministério e entre na conta para publicar a sua.";
}

export function buildProfileTabSubtitle(isAuthenticated: boolean): string {
  return isAuthenticated
    ? "Resumo da conta, assinatura e acessos liberados neste momento."
    : "Entre na conta para reunir favoritos, partilhas e acesso premium no mesmo lugar.";
}
