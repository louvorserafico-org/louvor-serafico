import { describeAuthError } from "./auth-error-messages";

type SignOutClient = {
  auth: {
    signOut: () => Promise<{
      error: { message: string } | null;
    }>;
  };
};

export type SignOutResult = {
  detail?: string;
  message: string;
  status: "error" | "success";
};

export async function signOutFromSupabase(client: SignOutClient | null): Promise<SignOutResult> {
  if (!client) {
    return {
      message: "Cliente Supabase indisponível para sair.",
      status: "error",
    };
  }

  const { error } = await client.auth.signOut();

  if (error) {
    const { detail, summary } = describeAuthError(error.message);
    return {
      detail: detail ?? undefined,
      message: summary,
      status: "error",
    };
  }

  return {
    message: "Sessão encerrada.",
    status: "success",
  };
}
