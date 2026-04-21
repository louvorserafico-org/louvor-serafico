type PasswordResetClient = {
  auth: {
    updateUser: (payload: { password: string }) => Promise<PasswordResetResponse>;
  };
};

type PasswordResetResponse = {
  data: unknown;
  error: { message: string } | null;
};

export type PasswordResetResult = {
  message: string;
  status: "error" | "success";
};

export async function updatePasswordFromRecovery(
  client: PasswordResetClient | null,
  password: string,
  passwordConfirmation: string,
): Promise<PasswordResetResult> {
  if (password.length < 8) {
    return {
      message: "A senha deve ter pelo menos 8 caracteres.",
      status: "error",
    };
  }

  if (password !== passwordConfirmation) {
    return {
      message: "As senhas nao conferem.",
      status: "error",
    };
  }

  if (!client) {
    return {
      message: "Cliente Supabase indisponivel para redefinir senha.",
      status: "error",
    };
  }

  const { error } = await client.auth.updateUser({
    password,
  });

  if (error) {
    return {
      message: error.message,
      status: "error",
    };
  }

  return {
    message: "Senha atualizada.",
    status: "success",
  };
}
