import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import {
  fetchSupabaseRemoteStatus,
  type SupabaseRemoteStatus,
} from "@/services/supabase/remote-status";
import { colors, spacing, typography } from "@/theme/tokens";

type RemoteCardState =
  | {
      status: "loading";
    }
  | SupabaseRemoteStatus;

export function SupabaseRemoteStatusCard() {
  const [state, setState] = useState<RemoteCardState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    void fetchSupabaseRemoteStatus().then((result) => {
      if (active) {
        setState(result);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <View style={[styles.card, styles.loading]}>
        <View style={styles.loadingRow}>
          <ActivityIndicator color={colors.olive} />
          <Text style={styles.title}>Lendo estado remoto</Text>
        </View>
        <Text style={styles.text}>Consultando endpoint publico do projeto.</Text>
      </View>
    );
  }

  if (state.status === "ready") {
    return (
      <View style={[styles.card, styles.ready]}>
        <Text style={styles.title}>Leitura remota ativa</Text>
        <Text style={styles.text}>Projeto: {state.projectRef ?? "nao definido"}</Text>
        <Text style={styles.text}>Cadastro por email: {state.externalEmailEnabled ? "ativo" : "inativo"}</Text>
        <Text style={styles.text}>Bloqueio de cadastro: {state.disableSignup ? "ativo" : "inativo"}</Text>
        <Text style={styles.text}>{state.message}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.card, state.status === "error" ? styles.error : styles.pending]}>
      <Text style={styles.title}>
        {state.status === "error" ? "Falha na leitura remota" : "Leitura remota pendente"}
      </Text>
      <Text style={styles.text}>{state.message}</Text>
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
  error: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  loading: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  loadingRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
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
