import Constants, { ExecutionEnvironment } from "expo-constants";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState, type ComponentType } from "react";
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { buildPdfCacheFileName, resolvePdfViewerSource } from "@/features/assets/pdf-viewer-source";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { supabaseConfig } from "@/services/supabase/client";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

type ViewerState =
  | { status: "loading"; url: null }
  | { message: string; status: "error"; url: string | null }
  | { status: "ready"; url: string };

export default function PdfViewerScreen() {
  const params = useLocalSearchParams<{
    assetId?: string;
    fileUrl?: string;
    premium?: string;
    storagePath?: string;
    title?: string;
    type?: string;
  }>();
  const [state, setState] = useState<ViewerState>({ status: "loading", url: null });
  const [loadingPdf, setLoadingPdf] = useState(true);
  const { session } = useSupabaseSession();
  const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
  const PdfComponent = useMemo(() => {
    if (isExpoGo) {
      return null;
    }

    try {
      return require("react-native-pdf").default as ComponentType<Record<string, unknown>>;
    } catch {
      return null;
    }
  }, [isExpoGo]);

  const screenTitle = params.title?.trim() || "Documento";
  const documentLabel = params.type?.trim() || "PDF";
  const canRenderInternally = Boolean(PdfComponent);
  const assetId = params.assetId?.trim() || "";
  const storagePath = params.storagePath?.trim() || "";

  const prepareLocalPdfUri = useCallback(
    async (remoteUrl: string) => {
      if (!/^https?:\/\//i.test(remoteUrl)) {
        return remoteUrl;
      }

      const ReactNativeBlobUtil = require("react-native-blob-util").default as {
        config: (options: { fileCache: boolean; path: string }) => {
          fetch: (method: string, url: string) => Promise<{ path: () => string }>;
        };
        fs: {
          dirs: { CacheDir: string };
          unlink: (path: string) => Promise<void>;
        };
      };

      const filename = buildPdfCacheFileName(assetId, storagePath, documentLabel);
      const targetPath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${filename}`;

      try {
        await ReactNativeBlobUtil.fs.unlink(targetPath);
      } catch {
        // noop
      }

      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: targetPath,
      }).fetch("GET", remoteUrl);

      return `file://${response.path()}`;
    },
    [assetId, documentLabel, storagePath],
  );

  const loadDocument = useCallback(async () => {
    setLoadingPdf(true);
    setState({ status: "loading", url: null });

    const result = await resolvePdfViewerSource({
      accessToken: session.accessToken,
      assetId,
      bucket: supabaseConfig.assetBucket,
      fileUrl: params.fileUrl,
      functionsUrl: supabaseConfig.functionsUrl,
      premium: params.premium === "1",
      storagePath,
      supabaseUrl: supabaseConfig.url,
    });

    if (result.status !== "ready") {
      setState({
        message: result.message,
        status: "error",
        url: result.url,
      });
      return;
    }

    if (!canRenderInternally) {
      setState({
        message: "A leitura interna de PDF exige development build ou build EAS. No Expo Go, use a abertura externa.",
        status: "error",
        url: result.url,
      });
      return;
    }

    try {
      const localUri = await prepareLocalPdfUri(result.url);
      setState({
        status: "ready",
        url: localUri,
      });
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao preparar o documento para leitura.";
      setState({
        message,
        status: "error",
        url: result.url,
      });
      return;
    }

  }, [
    assetId,
    canRenderInternally,
    params.fileUrl,
    params.premium,
    prepareLocalPdfUri,
    session.accessToken,
    storagePath,
  ]);

  useEffect(() => {
    void loadDocument();
  }, [loadDocument]);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: true, title: screenTitle }} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{documentLabel}</Text>
          <Text style={styles.title}>{screenTitle}</Text>
        </View>

        {state.status === "ready" && PdfComponent ? (
          <View style={styles.viewerFrame}>
            <PdfComponent
              enableDoubleTapZoom
              fitPolicy={0}
              maxScale={4}
              minScale={1}
              onError={(error: unknown) => {
                const message = error instanceof Error ? error.message : "Falha ao abrir o documento internamente.";
                setState({
                  message,
                  status: "error",
                  url: state.url,
                });
              }}
              onLoadComplete={() => {
                setLoadingPdf(false);
              }}
              onLoadProgress={(progress: number) => {
                if (progress >= 1) {
                  setLoadingPdf(false);
                }
              }}
              onPageChanged={() => {
                setLoadingPdf(false);
              }}
              source={{ cache: false, uri: state.url }}
              style={styles.viewer}
            />

            {loadingPdf ? (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator color={colors.accent} />
                <Text style={styles.loadingText}>Carregando documento...</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.feedbackCard}>
            {state.status === "loading" ? (
              <>
                <ActivityIndicator color={colors.accent} />
                <Text style={styles.feedbackText}>Preparando documento...</Text>
              </>
            ) : (
              <>
                <Text style={styles.feedbackTitle}>Nao foi possivel abrir aqui</Text>
                <Text style={styles.feedbackText}>{state.status === "error" ? state.message : ""}</Text>
                <View style={styles.actions}>
                  <Pressable onPress={() => void loadDocument()} style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Tentar novamente</Text>
                  </Pressable>

                  {state.url ? (
                    <Pressable
                      onPress={() => {
                        void Linking.openURL(state.url!);
                      }}
                      style={styles.secondaryButton}
                    >
                      <Text style={styles.secondaryButtonText}>Abrir externamente</Text>
                    </Pressable>
                  ) : null}
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    gap: spacing.lg,
    padding: spacing.xl,
    paddingTop: spacing.lg,
  },
  eyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  feedbackCard: {
    alignItems: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  feedbackText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
    lineHeight: 24,
  },
  feedbackTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
  },
  header: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    gap: spacing.xs,
    paddingBottom: spacing.md,
  },
  loadingOverlay: {
    alignItems: "center",
    backgroundColor: "rgba(22, 23, 26, 0.94)",
    bottom: 0,
    gap: spacing.sm,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  loadingText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.body,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  primaryButtonText: {
    color: colors.background,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  secondaryButtonText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "700",
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.heading,
    fontWeight: "700",
    lineHeight: 36,
  },
  viewer: {
    backgroundColor: colors.surface,
    flex: 1,
    width: "100%",
  },
  viewerFrame: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flex: 1,
    minHeight: 480,
    overflow: "hidden",
  },
});
