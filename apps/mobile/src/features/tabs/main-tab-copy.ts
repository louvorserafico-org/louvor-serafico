export function buildTodayTabSubtitle(isAuthenticated: boolean): string {
  return isAuthenticated
    ? "Roteiro litúrgico-musical pronto para abrir, estudar e seguir na celebração de hoje."
    : "Roteiro litúrgico-musical de hoje, com entrada rapida para abrir conta e continuar.";
}

export function buildCommunityTabSubtitle(canComment: boolean): string {
  return canComment
    ? "Leia experiencias do ministério e deixe a sua quando desejar."
    : "Entre na conta para acompanhar partilhas e registrar a sua com serenidade.";
}

export function buildProfileTabSubtitle(isAuthenticated: boolean): string {
  return isAuthenticated
    ? "Resumo da conta, assinatura e acessos liberados neste momento."
    : "Entre na conta para reunir favoritos, partilhas e acesso premium no mesmo lugar.";
}
