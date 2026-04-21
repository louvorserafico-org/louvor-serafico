import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { fetchRemoteComments } from "@/features/comments/remote-comments";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, spacing, typography } from "@/theme/tokens";

type RemoteCommentsState =
  | {
      status: "loading";
    }
  | Awaited<ReturnType<typeof fetchRemoteComments>>;

export function RemoteCommentsCard() {
  const [state, setState] = useState<RemoteCommentsState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    void fetchRemoteComments(fetch, supabaseConfig.url, supabaseConfig.publishableKey ?? supabaseConfig.anonKey).then(
      (result) => {
        if (active) {
          setState(result);
        }
      },
    );

    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <View style={[styles.card, styles.loading]}>
        <Text style={styles.title}>Lendo comentarios remotos</Text>
        <Text style={styles.text}>Consultando catalogo remoto de comunidade.</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.card,
        state.status === "ready" ? styles.ready : state.status === "not_configured" ? styles.loading : styles.pending,
      ]}
    >
      <Text style={styles.title}>
        {state.status === "ready"
          ? "Catalogo remoto consultado"
          : state.status === "not_configured"
            ? "Catalogo remoto nao configurado"
            : "Catalogo remoto bloqueado"}
      </Text>
      <Text style={styles.text}>{state.message}</Text>
      <Text style={styles.text}>Itens remotos: {state.comments.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  loading: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  pending: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  ready: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  text: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
