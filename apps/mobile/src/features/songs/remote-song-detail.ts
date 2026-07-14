import type { Song, SongAssetType } from "@louvor-serafico/shared";

type FetchLike = typeof fetch;

type RemoteSongAssetRow = {
  asset_type: SongAssetType;
  id: string;
  premium: boolean;
  storage_path: string | null;
  title: string;
};

type RemoteSongRow = {
  id: string;
  slug: string;
  song_assets?: RemoteSongAssetRow[] | null;
  title: string;
};

type RemoteSongDetailResult = {
  detail?: string;
  message: string;
  song: Song | null;
  status: "error" | "not_configured" | "not_found" | "ready";
};

export async function fetchRemoteSongDetail(
  slug: string,
  fetchImpl: FetchLike = fetch,
  url?: string | null,
  publicKey?: string | null,
): Promise<RemoteSongDetailResult> {
  if (!url || !publicKey) {
    return {
      message: "Configurar Supabase antes da leitura remota da musica.",
      song: null,
      status: "not_configured",
    };
  }

  const response = await fetchImpl(
    `${url}/rest/v1/songs?select=id,title,slug,song_assets(id,asset_type,title,storage_path,premium)&slug=eq.${slug}&limit=1`,
    {
      headers: {
        apikey: publicKey,
        Authorization: `Bearer ${publicKey}`,
      },
    },
  );

  if (!response.ok) {
    const errorBody = (await response.json()) as { message?: string };

    return {
      detail: errorBody.message,
      message: "Falha ao carregar musica remota.",
      song: null,
      status: "error",
    };
  }

  const rows = (await response.json()) as RemoteSongRow[];
  const row = rows[0];

  if (!row) {
    return {
      message: "Musica remota ainda nao encontrada.",
      song: null,
      status: "not_found",
    };
  }

  return {
    message: "Musica remota carregada.",
    song: {
      assets: (row.song_assets ?? []).map((asset) => ({
        id: asset.id,
        path: asset.storage_path ?? "",
        premium: asset.premium,
        title: asset.title,
        type: asset.asset_type,
      })),
      id: row.id,
      slug: row.slug,
      title: row.title,
    },
    status: "ready",
  };
}
