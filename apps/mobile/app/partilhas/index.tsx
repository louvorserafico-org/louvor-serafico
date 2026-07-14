import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { TauLoading } from "@/components/TauLoading";
import { formatCommentDate } from "@/features/comments/comment-date";
import { fetchRemoteComments } from "@/features/comments/remote-comments";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function PublicPartilhasScreen() {
  const [state, setState] = useState<Awaited<ReturnType<typeof fetchRemoteComments>> | null>(null);

  useEffect(() => {
    let isMounted = true;

    void fetchRemoteComments(fetch, supabaseConfig.url, supabaseConfig.publishableKey ?? supabaseConfig.anonKey).then(
      (result) => {
        if (isMounted) {
          setState(result);
        }
      },
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.screen}>
      <Stack.Screen options={{ headerShown: true, title: "Partilhas públicas" }} />
      <PageHeader
        eyebrow="Comunidade"
        title="Partilhas públicas"
        subtitle="Experiências e repertórios compartilhados por músicos e ministérios de todo o Brasil."
      />

      {!state ? (
        <TauLoading label="Carregando partilhas..." />
      ) : state.comments.length > 0 ? (
        <View style={styles.list}>
          {state.comments.map((comment) => {
            const dateLabel = formatCommentDate(comment.createdAt);

            return (
              <View key={comment.id} style={styles.card}>
                <Text style={styles.cardEyebrow}>{comment.celebrationTitle ? "Repertório celebrado" : "Partilha"}</Text>
                {comment.celebrationTitle ? (
                  <Text style={styles.cardCelebration}>
                    {comment.celebrationDateLabel ? `${comment.celebrationDateLabel} · ` : ""}
                    {comment.celebrationTitle}
                  </Text>
                ) : null}
                <Text style={styles.cardAuthor}>{comment.authorName}</Text>
                <Text style={styles.cardBody}>{comment.body}</Text>
                {dateLabel ? <Text style={styles.cardDate}>{dateLabel}</Text> : null}
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.list}>
          <View style={styles.card}>
            <Text style={styles.cardEyebrow}>Comunidade</Text>
            <Text style={styles.cardAuthor}>A primeira partilha ainda está por chegar</Text>
            <Text style={styles.cardBody}>
              Quando uma experiência for publicada, este espaço passará a reunir vozes do ministério.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  cardAuthor: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
  cardBody: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  cardCelebration: {
    color: colors.accent,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  cardDate: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.tab,
    fontWeight: "700",
    paddingTop: spacing.xs,
    textTransform: "uppercase",
  },
  cardEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  list: {
    gap: spacing.md,
  },
});
