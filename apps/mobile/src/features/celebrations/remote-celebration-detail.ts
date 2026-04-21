import type { Celebration, RecommendationPriority, SongAssetType } from "@louvor-serafico/shared";

type FetchLike = typeof fetch;

type RemoteCelebrationAssetRow = {
  asset_type: SongAssetType;
  id: string;
  premium: boolean;
  storage_path: string | null;
  title: string;
};

type RemoteCelebrationSongRow = {
  id: string;
  slug: string;
  song_assets?: RemoteCelebrationAssetRow[] | null;
  title: string;
};

type RemoteCelebrationMomentRow = {
  key: string;
};

type RemoteCelebrationRecommendationRow = {
  id: string;
  mass_moments: RemoteCelebrationMomentRow | null;
  priority: RecommendationPriority;
  songs: RemoteCelebrationSongRow | null;
};

type RemoteCelebrationRow = {
  celebration_recommendations?: RemoteCelebrationRecommendationRow[] | null;
  date_label: string;
  date_month_day: string;
  id: string;
  slug: string;
  title: string;
};

type RemoteCelebrationDetailResult = {
  celebration: Celebration | null;
  message: string;
  status: "error" | "not_configured" | "not_found" | "ready";
};

export async function fetchRemoteCelebrationDetail(
  slug: string,
  fetchImpl: FetchLike = fetch,
  url?: string | null,
  publicKey?: string | null,
): Promise<RemoteCelebrationDetailResult> {
  if (!url || !publicKey) {
    return {
      celebration: null,
      message: "Configurar Supabase antes da leitura remota da celebracao.",
      status: "not_configured",
    };
  }

  const query = `${url}/rest/v1/celebrations?select=id,title,slug,date_label,date_month_day,celebration_recommendations(id,priority,mass_moments(key),songs(id,slug,title,song_assets(id,asset_type,title,storage_path,premium)))&slug=eq.${slug}&limit=1`;
  const response = await fetchImpl(query, {
    headers: {
      apikey: publicKey,
      Authorization: `Bearer ${publicKey}`,
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json()) as { message?: string };

    return {
      celebration: null,
      message: errorBody.message ?? "Falha ao carregar celebracao remota.",
      status: "error",
    };
  }

  const rows = (await response.json()) as RemoteCelebrationRow[];
  const row = rows[0];

  if (!row) {
    return {
      celebration: null,
      message: "Celebracao remota ainda nao encontrada.",
      status: "not_found",
    };
  }

  const recommendations = (row.celebration_recommendations ?? []).flatMap((recommendation) => {
    if (!recommendation.mass_moments?.key || !recommendation.songs) {
      return [];
    }

    return [
      {
        id: recommendation.id,
        momentKey: recommendation.mass_moments.key as Celebration["recommendations"][number]["momentKey"],
        priority: recommendation.priority,
        songId: recommendation.songs.id,
      },
    ];
  });

  const songsMap = new Map<string, Celebration["songs"][number]>();

  for (const recommendation of row.celebration_recommendations ?? []) {
    const song = recommendation.songs;

    if (!song) {
      continue;
    }

    songsMap.set(song.id, {
      assets: (song.song_assets ?? []).map((asset) => ({
        id: asset.id,
        path: asset.storage_path ?? "",
        premium: asset.premium,
        title: asset.title,
        type: asset.asset_type,
      })),
      id: song.id,
      slug: song.slug,
      title: song.title,
    });
  }

  return {
    celebration: {
      dateLabel: row.date_label,
      dateMonthDay: row.date_month_day,
      id: row.id,
      recommendations,
      slug: row.slug,
      songs: Array.from(songsMap.values()),
      title: row.title,
    },
    message: "Celebracao remota carregada.",
    status: "ready",
  };
}
