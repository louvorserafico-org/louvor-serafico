import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { MiniPlayerBar } from "@/components/MiniPlayerBar";
import { SupabaseProfileProvider } from "@/features/auth/SupabaseProfileProvider";
import { SessionProvider } from "@/features/auth/SessionProvider";
import { SupabaseSessionProvider } from "@/features/auth/SupabaseSessionProvider";
import { CommentsProvider } from "@/features/comments/CommentsProvider";
import { FavoritesProvider } from "@/features/favorites/FavoritesProvider";
import { PlayerProvider } from "@/features/player/PlayerProvider";
import { SubscriptionPreviewProvider } from "@/features/subscription/SubscriptionPreviewProvider";
import { colors, fontFamilies } from "@/theme/tokens";

export default function RootLayout() {
  return (
    <SupabaseSessionProvider>
      <SupabaseProfileProvider>
        <SessionProvider>
          <CommentsProvider>
            <SubscriptionPreviewProvider>
              <FavoritesProvider>
                <PlayerProvider>
                  <StatusBar backgroundColor={colors.background} style="light" />
                  <View style={{ flex: 1 }}>
                    <Stack
                      screenOptions={{
                        animation: "fade_from_bottom",
                        animationDuration: 220,
                        contentStyle: { backgroundColor: colors.background },
                        headerBackButtonDisplayMode: "minimal",
                        headerBackTitle: "",
                        headerShown: false,
                        headerStyle: { backgroundColor: colors.background },
                        headerTitleStyle: { color: colors.textPrimary, fontFamily: fontFamilies.display },
                        headerTintColor: colors.accent,
                      }}
                    />
                    <MiniPlayerBar />
                  </View>
                </PlayerProvider>
              </FavoritesProvider>
            </SubscriptionPreviewProvider>
          </CommentsProvider>
        </SessionProvider>
      </SupabaseProfileProvider>
    </SupabaseSessionProvider>
  );
}
