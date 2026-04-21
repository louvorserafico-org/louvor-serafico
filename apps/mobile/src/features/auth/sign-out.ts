type SignOutClient = {
  auth: {
    signOut: () => Promise<{
      error: { message: string } | null;
    }>;
  };
};

export type SignOutResult = {
  message: string;
  status: "error" | "success";
};

export async function signOutFromSupabase(client: SignOutClient | null): Promise<SignOutResult> {
  if (!client) {
    return {
      message: "Cliente Supabase indisponivel para sair.",
      status: "error",
    };
  }

  const { error } = await client.auth.signOut();

  if (error) {
    return {
      message: error.message,
      status: "error",
    };
  }

  return {
    message: "Sessao encerrada.",
    status: "success",
  };
}
