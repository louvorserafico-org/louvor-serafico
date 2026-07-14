import { describeAuthError, translateAuthErrorMessage } from "./auth-error-messages";

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

export const FAMILY_OPTIONS = [
  "OFMConv",
  "OFM",
  "OFMCap",
  "TOR",
  "OSC",
  "OFS",
  "Leigo",
  "Outros",
] as const;

export type Family = (typeof FAMILY_OPTIONS)[number];

export const JURISDICTION_OPTIONS = [
  "Provincia",
  "Mosteiro",
  "Convento",
  "Fraternidade",
  "Paróquia",
] as const;

export type Jurisdiction = (typeof JURISDICTION_OPTIONS)[number];

export type RegistrationForm = {
  city: string;
  email: string;
  family: string;
  fullName: string;
  jurisdiction: string;
  ministry: string;
  password: string;
  phone: string;
  state: string;
};

type RegistrationMetadata = {
  city: string;
  family: string;
  full_name: string;
  jurisdiction: string | null;
  ministry: string | null;
  phone: string;
  state: string;
};

export type CredentialsAuthResult = {
  detail?: string;
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
    family: form.family.trim(),
    full_name: form.fullName.trim(),
    jurisdiction: optionalText(form.jurisdiction),
    ministry: optionalText(form.ministry),
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
      message: "Cliente Supabase indisponível para cadastro.",
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
      const { detail, summary } = describeAuthError(error.message);
      return {
        detail: detail ?? undefined,
        message: summary,
        status: "error",
      };
    }

    return {
      message: "Cadastro criado. Se necessário, confirme o email antes de entrar.",
      status: "success",
    };
  } catch (error) {
    return {
      message: mapUnexpectedAuthError(error, "Não foi possível concluir o cadastro agora."),
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
      message: "Cliente Supabase indisponível para login.",
      status: "error",
    };
  }

  try {
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
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
      message: "Login realizado.",
      status: "success",
    };
  } catch (error) {
    return {
      message: mapUnexpectedAuthError(error, "Não foi possível entrar agora."),
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
      message: "Cliente Supabase indisponível para recuperação.",
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
      const { detail, summary } = describeAuthError(error.message);
      return {
        detail: detail ?? undefined,
        message: summary,
        status: "error",
      };
    }

    return {
      message: "Email de recuperação enviado.",
      status: "success",
    };
  } catch (error) {
    return {
      message: mapUnexpectedAuthError(error, "Não foi possível enviar o email de recuperação agora."),
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

  if (!form.family.trim()) {
    return "Informe sua família franciscana.";
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

    return translateAuthErrorMessage(message);
  }

  return fallback;
}
