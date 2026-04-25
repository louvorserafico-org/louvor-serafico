import { getInitialCelebrationCatalog } from "@louvor-serafico/shared";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { CelebrationCard } from "@/components/CelebrationCard";
import { PageHeader } from "@/components/PageHeader";
import { RemoteCelebrationsCard } from "@/components/RemoteCelebrationsCard";
import { SectionTitle } from "@/components/SectionTitle";
import { buildCalendarOverview } from "@/features/celebrations/calendar-overview";
import { resolveCelebrationCatalogSource } from "@/features/celebrations/celebration-catalog-source";
import { fetchRemoteCelebrations } from "@/features/celebrations/remote-celebrations";
import { buildRemoteFeedback } from "@/features/remote/remote-feedback";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, spacing, typography } from "@/theme/tokens";

export default function CalendarScreen() {
  const localCelebrations = useMemo(() => getInitialCelebrationCatalog(), []);
  const [celebrations, setCelebrations] = useState(localCelebrations);
  const [sourceMode, setSourceMode] = useState<"local" | "remote">("local");
  const [remoteCount, setRemoteCount] = useState(0);
  const [remoteStatus, setRemoteStatus] = useState<"error" | "not_configured" | "ready">("not_configured");
  const [subtitle, setSubtitle] = useState("Datas liturgicas iniciais disponiveis para consulta.");
  const [remoteMessage, setRemoteMessage] = useState("Configurar Supabase antes da leitura remota de celebracoes.");

  useEffect(() => {
    let active = true;

    void fetchRemoteCelebrations(
      fetch,
      supabaseConfig.url,
      supabaseConfig.publishableKey ?? supabaseConfig.anonKey,
    ).then((remote) => {
      if (active) {
        const source = resolveCelebrationCatalogSource(remote, localCelebrations);
        setCelebrations(source.celebrations);
        setSourceMode(source.mode);
        setRemoteCount(remote.celebrations.length);
        setRemoteStatus(remote.status);
        setRemoteMessage(remote.message);
        setSubtitle(source.message);
      }
    });

    return () => {
      active = false;
    };
  }, [localCelebrations]);

  const overview = buildCalendarOverview({
    localCount: localCelebrations.length,
    remoteCount,
    sourceMode,
  });
  const remoteFeedback = buildRemoteFeedback({
    emptyLabel: "Nenhuma celebracao remota encontrada.",
    itemCount: remoteCount,
    readyLabel: "celebracoes remotas prontas",
    status: remoteStatus,
    statusMessage: remoteMessage,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow={overview.eyebrow}
        title={overview.title}
        subtitle={subtitle}
      />

      <View style={[styles.summary, sourceMode === "remote" ? styles.summaryRemote : styles.summaryLocal]}>
        <Text style={styles.summaryTitle}>{overview.helperText}</Text>
        <Text style={styles.summaryText}>
          {sourceMode === "remote" ? remoteFeedback.detail : `${localCelebrations.length} celebracoes locais disponiveis neste aparelho.`}
        </Text>
      </View>

      <SectionTitle title="Janeiro" />

      <RemoteCelebrationsCard />

      <View style={styles.list}>
        {celebrations.length > 0 ? (
          celebrations.map((celebration) => <CelebrationCard celebration={celebration} key={celebration.id} />)
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.summaryTitle}>Calendario vazio</Text>
            <Text style={styles.summaryText}>Nenhuma celebracao disponivel neste momento.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  summary: {
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  summaryLocal: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  summaryRemote: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
  },
  summaryText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
