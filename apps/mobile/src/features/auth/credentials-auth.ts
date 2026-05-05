type CredentialsClient = {
  auth: {
    resetPasswordForEmail: (email: string, options?: { redirectTo?: string }) => Promise<AuthResponse>;
    signInWithPassword: (payload: { email: string; password: string }) => Promise<AuthResponse>;
    signUp: (payload: {
      email: string;
      password: string;
      options: {
        data: RegistrationMetadata;
      };
    }) => Promise<AuthResponse>;
  };
};

type AuthResponse = {
  data: unknown;
  error: { message: string } | null;
};

export type RegistrationForm = {
  city: string;
  email: string;
  fullName: string;
  ministry: string;
  parish: string;
  password: string;
  phone: string;
  state: string;
};

type RegistrationMetadata = {
  city: string;
  full_name: string;
  ministry: string | null;
  parish: string | null;
  phone: string;
  state: string;
};

export type CredentialsAuthResult = {
  message: string;
  status: "error" | "success";
};

export function normalizeAuthEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

export function buildRegistrationMetadata(form: RegistrationForm): RegistrationMetadata {
  return {
    city: form.city.trim(),
    full_name: form.fullName.trim(),
    ministry: optionalText(form.ministry),
    parish: optionalText(form.parish),
    phone: normalizePhone(form.phone),
    state: form.state.trim().toUpperCase(),
  };
}

export async function registerWithPassword(
  client: CredentialsClient | null,
  form: RegistrationForm,
): Promise<CredentialsAuthResult> {
  const email = normalizeAuthEmail(form.email);
  const validationMessage = validateRegistration(form, email);

  if (validationMessage) {
    return {
      message: validationMessage,
      status: "error",
    };
  }

  if (!client) {
    return {
      message: "Cliente Supabase indisponivel para cadastro.",
      status: "error",
    };
  }

  try {
    const { error } = await client.auth.signUp({
      email,
      password: form.password,
      options: {
        data: buildRegistrationMetadata(form),
      },
    });

    if (error) {
      return {
        message: error.message,
        status: "error",
      };
    }

    return {
      message: "Cadastro criado. Se necessario, confirme o email antes de entrar.",
      status: "success",
    };
  } catch (error) {
    return {
      message: mapUnexpectedAuthError(error, "Nao foi possivel concluir o cadastro agora."),
      status: "error",
    };
  }
}

export async function signInWithPassword(
  client: CredentialsClient | null,
  emailInput: string,
  password: string,
): Promise<CredentialsAuthResult> {
  const email = normalizeAuthEmail(emailInput);

  if (!isValidEmail(email)) {
    return {
      message: "Digite um email valido para continuar.",
      status: "error",
    };
  }

  if (!password) {
    return {
      message: "Digite sua senha.",
      status: "error",
    };
  }

  if (!client) {
    return {
      message: "Cliente Supabase indisponivel para login.",
      status: "error",
    };
  }

  try {
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        message: error.message,
        status: "error",
      };
    }

    return {
      message: "Login realizado.",
      status: "success",
    };
  } catch (error) {
    return {
      message: mapUnexpectedAuthError(error, "Nao foi possivel entrar agora."),
      status: "error",
    };
  }
}

export async function requestPasswordReset(
  client: CredentialsClient | null,
  emailInput: string,
  redirectTo?: string,
): Promise<CredentialsAuthResult> {
  const email = normalizeAuthEmail(emailInput);

  if (!isValidEmail(email)) {
    return {
      message: "Digite um email valido para recuperar a senha.",
      status: "error",
    };
  }

  if (!client) {
    return {
      message: "Cliente Supabase indisponivel para recuperacao.",
      status: "error",
    };
  }

  try {
    const { error } = await client.auth.resetPasswordForEmail(
      email,
      redirectTo
        ? {
            redirectTo,
          }
        : undefined,
    );

    if (error) {
      return {
        message: error.message,
        status: "error",
      };
    }

    return {
      message: "Email de recuperacao enviado.",
      status: "success",
    };
  } catch (error) {
    return {
      message: mapUnexpectedAuthError(error, "Nao foi possivel enviar o email de recuperacao agora."),
      status: "error",
    };
  }
}

function validateRegistration(form: RegistrationForm, email: string): string | null {
  if (!form.fullName.trim()) {
    return "Informe seu nome.";
  }

  if (!isValidEmail(email)) {
    return "Digite um email valido para continuar.";
  }

  if (form.password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres.";
  }

  if (normalizePhone(form.phone).length < 10) {
    return "Informe um telefone valido.";
  }

  if (!form.state.trim()) {
    return "Informe seu estado.";
  }

  if (!form.city.trim()) {
    return "Informe sua cidade.";
  }

  return null;
}

function isValidEmail(email: string): boolean {
  return email.includes("@") && email.includes(".");
}

function optionalText(value: string): string | null {
  const nextValue = value.trim();
  return nextValue ? nextValue : null;
}

function mapUnexpectedAuthError(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    const message = error.message.trim();

    if (!message) {
      return fallback;
    }

    if (/network request failed/i.test(message)) {
      return "Falha de rede ao falar com o Supabase. Verifique a conexao e tente novamente.";
    }

    return message;
  }

  return fallback;
}
