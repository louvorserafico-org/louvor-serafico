import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { useSessionPreview } from "@/features/auth/SessionProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { buildCommunityAccess } from "@/features/comments/community-access";
import { resolveCommentFeedSource } from "@/features/comments/comment-feed-source";
import { useCommentsPreview } from "@/features/comments/CommentsProvider";
import { postRemoteComment } from "@/features/comments/remote-comment-submit";
import { fetchRemoteComments } from "@/features/comments/remote-comments";
import { supabaseConfig } from "@/services/supabase/client";
import { buildCommunityTabSubtitle } from "@/features/tabs/main-tab-copy";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function CommunityScreen() {
  const { session } = useSessionPreview();
  const { session: supabaseSession } = useSupabaseSession();
  const { comments, addCommunityComment } = useCommentsPreview();
  const canComment = session.status === "signed_in" || supabaseSession.status === "authenticated";
  const hasRemoteSession = supabaseSession.status === "authenticated";
  const [draft, setDraft] = useState("");
  const [submitMessage, setSubmitMessage] = useState("Sua partilha pode inspirar outros musicos.");
  const [remoteState, setRemoteState] = useState<Awaited<ReturnType<typeof fetchRemoteComments>>>({
    comments: [],
    message: "Carregando comentarios remotos.",
    status: "ready",
  });
  const canSubmit = canComment && draft.trim().length > 0;
  const feedSource = useMemo(() => resolveCommentFeedSource(remoteState, comments), [comments, remoteState]);
  const communityAccess = buildCommunityAccess({ canComment, hasRemoteSession });

  useEffect(() => {
    let isMounted = true;

    async function loadRemoteComments() {
      const remote = await fetchRemoteComments(fetch, supabaseConfig.url, supabaseConfig.publishableKey ?? supabaseConfig.anonKey);

      if (!isMounted) {
        return;
      }

      setRemoteState(remote);
    }

    void loadRemoteComments();

    return () => {
      isMounted = false;
    };
  }, []);

  async function refreshRemoteComments() {
    const remote = await fetchRemoteComments(fetch, supabaseConfig.url, supabaseConfig.publishableKey ?? supabaseConfig.anonKey);
    setRemoteState(remote);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow="Comunidade"
        title="Partilha entre musicos"
        subtitle={buildCommunityTabSubtitle(canComment)}
      />

      <View
        style={[
          styles.panel,
          communityAccess.status === "remote"
            ? styles.panelRemote
            : communityAccess.status === "local"
              ? styles.panelLocal
              : styles.panelBlocked,
        ]}
      >
        <Text style={styles.panelTitle}>{communityAccess.title}</Text>
        <Text style={styles.panelText}>{communityAccess.helperText}</Text>
        <Text style={styles.panelText}>
          {canComment ? submitMessage : "Entre para guardar favoritos, comentar e acompanhar novas partilhas."}
        </Text>
        {!canComment ? (
          <Link asChild href="/entrar">
            <Pressable style={[styles.button, styles.buttonAccent]}>
              <Text style={styles.buttonText}>{communityAccess.primaryLabel}</Text>
            </Pressable>
          </Link>
        ) : null}
      </View>

      <View style={styles.formCard}>
        <Text style={styles.panelTitle}>Nova partilha</Text>
        <TextInput
          editable={canComment}
          multiline
          onChangeText={setDraft}
          placeholder={communityAccess.inputPlaceholder}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, !canComment ? styles.inputDisabled : undefined]}
          value={draft}
        />
        {canComment ? (
          <Pressable
            disabled={!canSubmit}
            onPress={async () => {
              if (supabaseSession.status === "authenticated" && supabaseSession.userId && draft.trim()) {
                const result = await postRemoteComment(
                  {
                    body: draft,
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
                  await refreshRemoteComments();
                }

                return;
              }

              if (session.status === "signed_in" && draft.trim()) {
                addCommunityComment({
                  authorName: session.displayName,
                  body: draft,
                });
                setSubmitMessage("Partilha guardada nesta sessao.");
                setDraft("");
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

      {feedSource.comments.length > 0 ? (
        feedSource.comments.map((comment) => (
          <View key={comment.id} style={styles.comment}>
            <Text style={styles.commentAuthor}>{comment.authorName}</Text>
            <Text style={styles.commentText}>{comment.body}</Text>
          </View>
        ))
      ) : (
        <View style={styles.comment}>
          <Text style={styles.commentAuthor}>Partilha inicial</Text>
          <Text style={styles.commentText}>
            Ainda sem comentarios publicados. Assim que primeira partilha entrar, ela aparecera aqui.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  commentAuthor: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.caption,
    fontStyle: "italic",
    fontWeight: "700",
  },
  commentText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
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
  panel: {
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  panelBlocked: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  panelLocal: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderStrong,
  },
  panelRemote: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
  },
  panelText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  panelTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontStyle: "italic",
    fontWeight: "700",
  },
});
