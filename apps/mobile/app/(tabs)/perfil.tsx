import { ScrollView, StyleSheet } from "react-native";

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
import { useDebugMode } from "@/features/debug/useDebugMode";
import { buildProfileTabSubtitle } from "@/features/tabs/main-tab-copy";
import { colors, spacing } from "@/theme/tokens";

export default function ProfileScreen() {
  const showDebugCards = useDebugMode();
  const { session } = useSupabaseSession();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow="Perfil"
        title="Conta e assinatura"
        subtitle={buildProfileTabSubtitle(session.status === "authenticated")}
      />
      <ProfileOverviewCard />
      <SubscriptionOverviewCard />
      {session.status === "authenticated" ? null : <AuthEntryCard />}
      <PaywallPreviewCard />
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
  container: {
    backgroundColor: colors.background,
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});
