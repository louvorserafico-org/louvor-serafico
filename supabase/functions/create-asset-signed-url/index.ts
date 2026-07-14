import { createClient } from "https://esm.sh/@supabase/supabase-js@2.104.0";

type RequestBody = {
  assetId?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Origin": "*",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json({ message: "Método não permitido." }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ message: "Função sem configuração de servidor." }, 500);
  }

  const authorization = request.headers.get("Authorization");

  if (!authorization) {
    return json({ message: "Sessão obrigatória para abrir material." }, 401);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const userResult = await fetchAuthenticatedUserId(supabaseUrl, serviceRoleKey, authorization);

  if (!userResult.userId) {
    return json({ message: userResult.message }, 401);
  }

  const body = await readJson(request);

  if (!body.assetId) {
    return json({ message: "Asset obrigatório." }, 400);
  }

  const { data: asset, error: assetError } = await admin
    .from("song_assets")
    .select("id, storage_path, premium, status")
    .eq("id", body.assetId)
    .single();

  if (assetError || !asset) {
    return json({ message: "Material não encontrado." }, 404);
  }

  if (asset.status !== "published") {
    return json({ message: "Material indisponível." }, 403);
  }

  if (asset.premium) {
    const { data: subscription } = await admin
      .from("subscriptions")
      .select("id")
      .eq("profile_id", userResult.userId)
      .eq("status", "active")
      .maybeSingle();

    if (!subscription) {
      return json({ message: "Assinatura ativa necessária." }, 403);
    }
  }

  if (!asset.storage_path) {
    return json({ message: "Material sem arquivo vinculado." }, 422);
  }

  const { data: signedUrl, error: signedUrlError } = await admin.storage
    .from("song-assets")
    .createSignedUrl(asset.storage_path, 300);

  if (signedUrlError || !signedUrl?.signedUrl) {
    return json({ message: "Falha ao gerar link temporario." }, 500);
  }

  return json({
    expiresIn: 300,
    signedUrl: signedUrl.signedUrl,
  });
});

async function readJson(request: Request): Promise<RequestBody> {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

async function fetchAuthenticatedUserId(
  supabaseUrl: string,
  serviceRoleKey: string,
  authorization: string,
): Promise<{ message: string; userId: string | null }> {
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: authorization,
    },
  });

  if (!response.ok) {
    return {
      message: "Sessão inválida.",
      userId: null,
    };
  }

  const body = await response.json();

  return {
    message: "Sessão válida.",
    userId: typeof body.id === "string" ? body.id : null,
  };
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
    status,
  });
}
