import { ScrollView, StyleSheet, Text, View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { useSessionPreview } from "@/features/auth/SessionProvider";
import { colors, spacing, typography } from "@/theme/tokens";

const comments = [
  "Usamos este salmo no ensaio de quarta e funcionou muito bem com assembleia.",
  "Comunhao ficou melhor um tom abaixo para comunidade acompanhar.",
];

export default function CommunityScreen() {
  const { session } = useSessionPreview();
  const canComment = session.status === "signed_in";

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
          {canComment
            ? "Sessao local ativa. Proxima etapa pode liberar formulario de comentario."
            : "Ative sessao teste em Perfil para liberar UX condicionada."}
        </Text>
      </View>

      {comments.map((comment) => (
        <View key={comment} style={styles.comment}>
          <Text style={styles.commentText}>{comment}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  comment: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: spacing.md,
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
