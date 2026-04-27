export function buildTodayTabSubtitle(isAuthenticated: boolean): string {
  return isAuthenticated
    ? "Roteiro liturgico-musical pronto para abrir, estudar e seguir na celebracao de hoje."
    : "Roteiro liturgico-musical de hoje, com entrada rapida para abrir conta e continuar.";
}

export function buildCommunityTabSubtitle(canComment: boolean): string {
  return canComment
    ? "Espaco para partilhas, comentarios e experiencias musicais da comunidade."
    : "Leia partilhas da comunidade e entre na conta para deixar a sua quando desejar.";
}

export function buildProfileTabSubtitle(isAuthenticated: boolean): string {
  return isAuthenticated
    ? "Resumo da conta, assinatura e acessos liberados neste momento."
    : "Entre na conta para reunir favoritos, partilhas e acesso premium no mesmo lugar.";
}
