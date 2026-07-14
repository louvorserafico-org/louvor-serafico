import { describeAuthError } from "./auth-error-messages";

type OtpClient = {
  auth: {
    signInWithOtp: (payload: {
      email: string;
      options?: {
        shouldCreateUser?: boolean;
      };
    }) => Promise<{
      data: unknown;
      error: { message: string } | null;
    }>;
  };
};

export type EmailAuthResult = {
  detail?: string;
  message: string;
  status: "error" | "success";
};

export function normalizeSignInEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function requestEmailSignIn(
  client: OtpClient | null,
  rawEmail: string,
): Promise<EmailAuthResult> {
  const email = normalizeSignInEmail(rawEmail);

  if (!email.includes("@") || !email.includes(".")) {
    return {
      message: "Digite um email valido para continuar.",
      status: "error",
    };
  }

  if (!client) {
    return {
      message: "Cliente Supabase indisponivel para autenticacao.",
      status: "error",
    };
  }

  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    const { detail, summary } = describeAuthError(error.message);
    return {
      detail: detail ?? undefined,
      message: summary,
      status: "error",
    };
  }

  return {
    message: "Email enviado. Verifique caixa de entrada para continuar.",
    status: "success",
  };
}
