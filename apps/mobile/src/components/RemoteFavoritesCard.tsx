import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { fetchRemoteFavorites } from "@/features/favorites/remote-favorites";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, spacing, typography } from "@/theme/tokens";

type RemoteFavoritesState =
  | {
      status: "loading";
    }
  | Awaited<ReturnType<typeof fetchRemoteFavorites>>;

export function RemoteFavoritesCard() {
  const { session } = useSupabaseSession();
  const [state, setState] = useState<RemoteFavoritesState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    void fetchRemoteFavorites(
      fetch,
      supabaseConfig.url,
      supabaseConfig.publishableKey ?? supabaseConfig.anonKey,
      session.accessToken,
    ).then((result) => {
      if (active) {
        setState(result);
      }
    });

    return () => {
      active = false;
    };
  }, [session.accessToken]);

  if (state.status === "loading") {
    return (
      <View style={[styles.card, styles.loading]}>
        <Text style={styles.title}>Lendo favoritos remotos</Text>
        <Text style={styles.text}>Consultando favoritos da sessão Supabase.</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.card,
        state.status === "ready"
          ? styles.ready
          : state.status === "not_configured" || state.status === "not_authenticated"
            ? styles.loading
            : styles.pending,
      ]}
    >
      <Text style={styles.title}>
        {state.status === "ready"
          ? "Favoritos remotos consultados"
          : state.status === "not_authenticated"
            ? "Favoritos remotos aguardando sessão"
            : state.status === "not_configured"
              ? "Favoritos remotos não configurados"
              : "Favoritos remotos bloqueados"}
      </Text>
      <Text style={styles.text}>{state.message}</Text>
      <Text style={styles.text}>Favoritos remotos: {state.songIds.length}</Text>
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
