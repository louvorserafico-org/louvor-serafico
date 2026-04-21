import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { RemoteCommentsCard } from "@/components/RemoteCommentsCard";
import { useSessionPreview } from "@/features/auth/SessionProvider";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { resolveCommentFeedSource } from "@/features/comments/comment-feed-source";
import { useCommentsPreview } from "@/features/comments/CommentsProvider";
import { postRemoteComment } from "@/features/comments/remote-comment-submit";
import { fetchRemoteComments } from "@/features/comments/remote-comments";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, spacing, typography } from "@/theme/tokens";

export default function CommunityScreen() {
  const { session } = useSessionPreview();
  const { session: supabaseSession } = useSupabaseSession();
  const { comments, addCommunityComment } = useCommentsPreview();
  const canComment = session.status === "signed_in" || supabaseSession.status === "authenticated";
  const [draft, setDraft] = useState("");
  const [submitMessage, setSubmitMessage] = useState("Nenhum envio remoto nesta sessao.");
  const [remoteState, setRemoteState] = useState<Awaited<ReturnType<typeof fetchRemoteComments>>>({
    comments: [],
    message: "Carregando comentarios remotos.",
    status: "ready",
  });
  const canSubmit = canComment && draft.trim().length > 0;
  const feedSource = useMemo(() => resolveCommentFeedSource(remoteState, comments), [comments, remoteState]);

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
        subtitle="Base inicial para comentarios publicos e experiencias de repertorio."
      />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{canComment ? "Comentarios liberados" : "Comentarios bloqueados"}</Text>
        <Text style={styles.panelText}>
          {supabaseSession.status === "authenticated"
            ? "Sessao Supabase ativa. Comentario remoto pode ser publicado."
            : canComment
              ? "Sessao local ativa. Comentario local liberado para validacao de UX."
              : "Ative sessao teste em Perfil para liberar UX condicionada."}
        </Text>
        <Text style={styles.panelText}>{feedSource.message}</Text>
        <Text style={styles.panelText}>{submitMessage}</Text>
      </View>

      <RemoteCommentsCard />

      <View style={styles.formCard}>
        <Text style={styles.panelTitle}>Novo comentario</Text>
        <TextInput
          editable={canComment}
          multiline
          onChangeText={setDraft}
          placeholder="Compartilhe experiencia musical deste repertorio."
          placeholderTextColor={colors.textMuted}
          style={[styles.input, !canComment ? styles.inputDisabled : undefined]}
          value={draft}
        />
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

              setSubmitMessage(result.message);

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
              setSubmitMessage("Comentario salvo apenas no preview local.");
              setDraft("");
            }
          }}
          style={[styles.button, !canSubmit ? styles.buttonDisabled : undefined]}
        >
          <Text style={[styles.buttonText, !canSubmit ? styles.buttonTextDisabled : undefined]}>
            {supabaseSession.status === "authenticated"
              ? "Publicar comentario remoto"
              : canComment
                ? "Publicar comentario"
                : "Sessao necessaria"}
          </Text>
        </Pressable>
      </View>

      {feedSource.comments.map((comment) => (
        <View key={comment.id} style={styles.comment}>
          <Text style={styles.commentAuthor}>{comment.authorName}</Text>
          <Text style={styles.commentText}>{comment.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.olive,
    borderColor: colors.olive,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  buttonTextDisabled: {
    color: colors.textMuted,
  },
  comment: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  commentAuthor: {
    color: colors.textPrimary,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  commentText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    lineHeight: 18,
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.textPrimary,
    fontSize: typography.caption,
    minHeight: 96,
    padding: spacing.md,
    textAlignVertical: "top",
  },
  inputDisabled: {
    color: colors.textMuted,
  },
  panel: {
    backgroundColor: colors.oliveSoft,
    borderColor: colors.olive,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  panelText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  panelTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
