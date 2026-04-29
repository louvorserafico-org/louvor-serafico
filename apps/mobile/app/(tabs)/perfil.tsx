import { useState } from "react";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { PageHeader } from "@/components/PageHeader";
import { AuthEntryCard } from "@/components/AuthEntryCard";
import { AuthStabilityCard } from "@/components/AuthStabilityCard";
import { PaywallPreviewCard } from "@/components/PaywallPreviewCard";
import { ProfileOverviewCard } from "@/components/ProfileOverviewCard";
import { SessionPreviewCard } from "@/components/SessionPreviewCard";
import { SubscriptionOverviewCard } from "@/components/SubscriptionOverviewCard";
import { SubscriptionPreviewCard } from "@/components/SubscriptionPreviewCard";
import { SupabaseProfileCard } from "@/components/SupabaseProfileCard";
import { SupabaseRemoteStatusCard } from "@/components/SupabaseRemoteStatusCard";
import { SupabaseSessionCard } from "@/components/SupabaseSessionCard";
import { SupabaseStatusCard } from "@/components/SupabaseStatusCard";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { signOutFromSupabase } from "@/features/auth/sign-out";
import { useDebugMode } from "@/features/debug/useDebugMode";
import { supabase } from "@/services/supabase/client";
import { buildProfileTabSubtitle } from "@/features/tabs/main-tab-copy";
import { colors, fontFamilies, radii, spacing, typography } from "@/theme/tokens";

export default function ProfileScreen() {
  const showDebugCards = useDebugMode();
  const { session } = useSupabaseSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutMessage, setSignOutMessage] = useState<string | null>(null);
  const isAuthenticated = session.status === "authenticated";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow={isAuthenticated ? "Perfil" : "Conta"}
        title={isAuthenticated ? "Conta e assinatura" : "Conta"}
        subtitle={
          isAuthenticated
            ? buildProfileTabSubtitle(true)
            : "Entre para guardar favoritos, seguir suas partilhas e manter seus materiais no mesmo lugar."
        }
      />
      {isAuthenticated ? (
        <>
          <EditorialSectionHeader
            eyebrow="Conta"
            subtitle="Dados da conta, identificacao pastoral e estado atual do acesso."
            title="Visao da conta"
          />
          <ProfileOverviewCard />
          <View style={styles.linksCard}>
            <Text style={styles.linksEyebrow}>Acessos uteis</Text>
            <Text style={styles.linksTitle}>Sua conta no app</Text>
            <View style={styles.linkGroup}>
              <Link asChild href="/repertorio">
                <Pressable accessibilityRole="button" style={styles.inlineLink}>
                  <Text style={styles.inlineLinkText}>Favoritos e repertorio</Text>
                </Pressable>
              </Link>
              <Link asChild href="/comunidade">
                <Pressable accessibilityRole="button" style={styles.inlineLink}>
                  <Text style={styles.inlineLinkText}>Partilhas da comunidade</Text>
                </Pressable>
              </Link>
              <Link asChild href="/seus-dados">
                <Pressable accessibilityRole="button" style={styles.inlineLink}>
                  <Text style={styles.inlineLinkText}>Privacidade e LGPD</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </>
      ) : (
        <AuthEntryCard />
      )}
      {isAuthenticated ? (
        <View style={styles.actionsCard}>
          <Text style={styles.actionsEyebrow}>Conta</Text>
          <Text style={styles.actionsTitle}>Encerrar sessao</Text>
          <Text style={styles.actionsText}>Saia desta conta quando precisar trocar de acesso neste aparelho.</Text>
          <Pressable
            accessibilityRole="button"
            disabled={isSigningOut}
            onPress={() => {
              setIsSigningOut(true);
              setSignOutMessage(null);

              void signOutFromSupabase(supabase).then((result) => {
                setSignOutMessage(result.message);
                setIsSigningOut(false);
              });
            }}
            style={[styles.signOutButton, isSigningOut ? styles.signOutButtonDisabled : undefined]}
          >
            <Text style={styles.signOutButtonText}>{isSigningOut ? "Saindo..." : "Sair da conta"}</Text>
          </Pressable>
          {signOutMessage ? <Text style={styles.signOutMessage}>{signOutMessage}</Text> : null}
        </View>
      ) : null}

      {isAuthenticated ? (
        <>
          <EditorialSectionHeader
            eyebrow="Premium"
            subtitle="Acesso aos materiais completos e estado atual da assinatura."
            title="Assinatura e acesso"
          />
          <SubscriptionOverviewCard />
          <PaywallPreviewCard />
        </>
      ) : null}
      {showDebugCards ? (
        <>
          <AuthStabilityCard />
          <SupabaseStatusCard />
          <SupabaseRemoteStatusCard />
          <SupabaseSessionCard />
          <SupabaseProfileCard />
          <SubscriptionPreviewCard />
          <SessionPreviewCard />
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actionsCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  actionsEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  actionsText: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
  },
  actionsTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  inlineLink: {
    paddingVertical: spacing.xs,
  },
  inlineLinkText: {
    color: colors.accent,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  linkGroup: {
    gap: spacing.xs,
  },
  linksCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  linksEyebrow: {
    color: colors.gold,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  linksTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.display,
    fontSize: typography.lead,
    fontWeight: "700",
  },
  signOutButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderStrong,
    borderRadius: radii.pill,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  signOutButtonDisabled: {
    opacity: 0.7,
  },
  signOutButtonText: {
    color: colors.accentStrong,
    fontFamily: fontFamilies.ui,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  signOutMessage: {
    color: colors.textMuted,
    fontFamily: fontFamilies.body,
    fontSize: typography.caption,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
});
