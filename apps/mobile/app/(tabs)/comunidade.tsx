import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getInitialCelebrationCatalog } from "@louvor-serafico/shared";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { resolveCelebrationCatalogSource } from "@/features/celebrations/celebration-catalog-source";
import { fetchRemoteCelebrations } from "@/features/celebrations/remote-celebrations";
import { formatCommentDate } from "@/features/comments/comment-date";
import { buildCommunityAccess } from "@/features/comments/community-access";
import { buildCommunityRepertoireOptions } from "@/features/comments/community-repertoire";
import { postRemoteComment } from "@/features/comments/remote-comment-submit";
import { fetchRemoteComments } from "@/features/comments/remote-comments";
import { supabaseConfig } from "@/services/supabase/client";
import { buildCommunityTabSubtitle } from "@/features/tabs/main-tab-copy";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function CommunityScreen() {
  const { session: supabaseSession } = useSupabaseSession();
  const isAuthenticated = supabaseSession.status === "authenticated";
  const [draft, setDraft] = useState("");
  const [submitMessage, setSubmitMessage] = useState("Sua partilha pode fortalecer outros ministérios.");
  const [remoteState, setRemoteState] = useState<Awaited<ReturnType<typeof fetchRemoteComments>>>({
    comments: [],
    message: "Carregando comentários remotos.",
    status: "ready",
  });
  const [remoteCelebrationsState, setRemoteCelebrationsState] = useState<
    Awaited<ReturnType<typeof fetchRemoteCelebrations>>
  >({
    celebrations: [],
    message: "Carregando celebrações remotas.",
    status: "ready",
  });
  const [selectedCelebrationId, setSelectedCelebrationId] = useState<string | null>(null);
  const canSubmit = isAuthenticated && draft.trim().length > 0;
  const communityAccess = buildCommunityAccess({ isAuthenticated });
  const celebrationSource = useMemo(
    () => resolveCelebrationCatalogSource(remoteCelebrationsState, getInitialCelebrationCatalog()),
    [remoteCelebrationsState],
  );
  const repertoireOptions = useMemo(
    () => buildCommunityRepertoireOptions(celebrationSource.celebrations, new Date()),
    [celebrationSource.celebrations],
  );
  const selectedCelebration = useMemo(
    () => repertoireOptions.find((item) => item.id === selectedCelebrationId) ?? null,
    [repertoireOptions, selectedCelebrationId],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadCommunityData() {
      const [remoteComments, remoteCelebrations] = await Promise.all([
        fetchRemoteComments(fetch, supabaseConfig.url, supabaseConfig.publishableKey ?? supabaseConfig.anonKey),
        fetchRemoteCelebrations(fetch, supabaseConfig.url, supabaseConfig.publishableKey ?? supabaseConfig.anonKey),
      ]);

      if (!isMounted) {
        return;
      }

      setRemoteState(remoteComments);
      setRemoteCelebrationsState(remoteCelebrations);
    }

    void loadCommunityData();

    return () => {
      isMounted = false;
    };
  }, []);

  async function refreshRemoteComments() {
    const remote = await fetchRemoteComments(fetch, supabaseConfig.url, supabaseConfig.publishableKey ?? supabaseConfig.anonKey);
    setRemoteState(remote);
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow="Comunidade"
        title="Partilha entre músicos"
        subtitle={buildCommunityTabSubtitle(isAuthenticated)}
      />

      <View style={styles.formCard}>
        <EditorialSectionHeader
          eyebrow="Escrever"
          subtitle={isAuthenticated ? submitMessage : communityAccess.helperText}
          title="Nova partilha"
        />
        {isAuthenticated ? (
          <View style={styles.repertoireSection}>
            <Text style={styles.repertoireLabel}>Vincular ao repertório</Text>
            <View style={styles.repertoireOptions}>
              <Pressable
                onPress={() => setSelectedCelebrationId(null)}
                style={[
                  styles.repertoireOption,
                  selectedCelebrationId === null ? styles.repertoireOptionActive : undefined,
                ]}
              >
                <Text
                  style={[
                    styles.repertoireOptionTitle,
                    selectedCelebrationId === null ? styles.repertoireOptionTitleActive : undefined,
                  ]}
                >
                  Partilha livre
                </Text>
              </Pressable>
              {repertoireOptions.map((option) => (
                <Pressable
                  key={option.id}
                  onPress={() => setSelectedCelebrationId(option.id)}
                  style={[
                    styles.repertoireOption,
                    selectedCelebrationId === option.id ? styles.repertoireOptionActive : undefined,
                  ]}
                >
                  <Text
                    style={[
                      styles.repertoireOptionEyebrow,
                      selectedCelebrationId === option.id ? styles.repertoireOptionEyebrowActive : undefined,
                    ]}
                  >
                    {option.dateLabel}
                  </Text>
                  <Text
                    style={[
                      styles.repertoireOptionTitle,
                      selectedCelebrationId === option.id ? styles.repertoireOptionTitleActive : undefined,
                    ]}
                  >
                    {option.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}
        <TextInput
          editable={isAuthenticated}
          multiline
          onChangeText={setDraft}
          placeholder={communityAccess.inputPlaceholder}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, !isAuthenticated ? styles.inputDisabled : undefined]}
          value={draft}
        />
        {isAuthenticated ? (
          <Pressable
            disabled={!canSubmit}
            onPress={async () => {
              if (supabaseSession.status === "authenticated" && supabaseSession.userId && draft.trim()) {
                const result = await postRemoteComment(
                  {
                    body: draft,
                    celebrationId: selectedCelebration?.id ?? null,
                    profileId: supabaseSession.userId,
                  },
                  fetch,
                  supabaseConfig.url,
                  supabaseConfig.publishableKey ?? supabaseConfig.anonKey,
                  supabaseSession.accessToken,
                );

                setSubmitMessage(result.ok ? "Partilha publicada com sucesso." : result.message);

                if (result.ok) {
                  setDraft("");
                  setSelectedCelebrationId(null);
                  await refreshRemoteComments();
                }
              }
            }}
            style={[styles.button, !canSubmit ? styles.buttonDisabled : undefined]}
          >
            <Text style={[styles.buttonText, !canSubmit ? styles.buttonTextDisabled : undefined]}>
              {communityAccess.primaryLabel}
            </Text>
          </Pressable>
        ) : (
          <Link asChild href="/entrar">
            <Pressable style={[styles.button, styles.buttonAccent]}>
              <Text style={styles.buttonText}>{communityAccess.primaryLabel}</Text>
            </Pressable>
          </Link>
        )}
      </View>

      {isAuthenticated ? (
        <Link asChild href="/partilhas">
          <AnimatedPressable style={styles.readPublicButton}>
            <Text style={styles.readPublicButtonText}>Ler partilhas públicas</Text>
          </AnimatedPressable>
        </Link>
      ) : (
        <>
          <EditorialSectionHeader
            eyebrow="Leitura"
            subtitle="Vozes do ministério reunidas para memória, formação e serviço."
            title="Partilhas públicas"
          />

          {remoteState.comments.length > 0 ? (
            <View style={styles.commentList}>
              {remoteState.comments.map((comment, index) => (
                <View
                  key={comment.id}
                  style={[
                    styles.comment,
                    index !== remoteState.comments.length - 1 ? styles.commentBorder : undefined,
                  ]}
                >
                  <Text style={styles.commentEyebrow}>
                    {comment.celebrationTitle ? "Repertório celebrado" : "Partilha"}
                  </Text>
                  {comment.celebrationTitle ? (
                    <Text style={styles.commentLinkedCelebration}>
                      {comment.celebrationDateLabel ? `${comment.celebrationDateLabel} · ` : ""}
                      {comment.celebrationTitle}
                    </Text>
                  ) : null}
                  <Text style={styles.commentAuthor}>{comment.authorName}</Text>
                  <Text style={styles.commentText}>{comment.body}</Text>
                  {formatCommentDate(comment.createdAt) ? (
                    <Text style={styles.commentDate}>{formatCommentDate(comment.createdAt)}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.commentList}>
              <View style={styles.comment}>
                <Text style={styles.commentEyebrow}>Comunidade</Text>
                <Text style={styles.commentAuthor}>A primeira partilha ainda está por chegar</Text>
                <Text style={styles.commentText}>
                  Quando uma experiência for publicada, este espaço passará a reunir vozes do ministério.
                </Text>
              </View>
            </View>
          )}
        </>
      )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.olive,
    borderColor: colors.olive,
    borderRadius: radii.pill,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  buttonAccent: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  buttonText: {
    color: colors.background,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  buttonTextDisabled: {
    color: colors.textMuted,
  },
  comment: {
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  commentDate: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.tab,
    fontWeight: "700",
    paddingTop: spacing.xs,
    textTransform: "uppercase",
  },
  commentEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  commentAuthor: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  commentText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  commentBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  commentList: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    color: colors.textPrimary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    minHeight: 96,
    padding: spacing.md,
    textAlignVertical: "top",
  },
  inputDisabled: {
    color: colors.textMuted,
  },
  commentLinkedCelebration: {
    color: colors.accent,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  readPublicButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.xl,
    borderWidth: 1,
    paddingVertical: spacing.md,
  },
  readPublicButtonText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.body,
    fontWeight: "800",
  },
  repertoireLabel: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  repertoireOption: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    gap: spacing.xs,
    minWidth: 148,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  repertoireOptionActive: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.borderStrong,
  },
  repertoireOptionEyebrow: {
    color: colors.textMuted,
    fontFamily: fontFamilies.ui,
    fontSize: typography.tab,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  repertoireOptionEyebrowActive: {
    color: colors.gold,
  },
  repertoireOptionTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  repertoireOptionTitleActive: {
    color: colors.accent,
  },
  repertoireOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  repertoireSection: {
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
});
