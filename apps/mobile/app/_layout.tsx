import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SupabaseProfileProvider } from "@/features/auth/SupabaseProfileProvider";
import { SessionProvider } from "@/features/auth/SessionProvider";
import { SupabaseSessionProvider } from "@/features/auth/SupabaseSessionProvider";
import { CommentsProvider } from "@/features/comments/CommentsProvider";
import { FavoritesProvider } from "@/features/favorites/FavoritesProvider";
import { colors } from "@/theme/tokens";

export default function RootLayout() {
  return (
    <SupabaseSessionProvider>
      <SupabaseProfileProvider>
        <SessionProvider>
          <CommentsProvider>
            <FavoritesProvider>
              <StatusBar style="dark" />
              <Stack
                screenOptions={{
                  contentStyle: { backgroundColor: colors.background },
                  headerShown: false,
                  headerStyle: { backgroundColor: colors.background },
                  headerTitleStyle: { color: colors.textPrimary },
                  headerTintColor: colors.accent,
                }}
              />
            </FavoritesProvider>
          </CommentsProvider>
        </SessionProvider>
      </SupabaseProfileProvider>
    </SupabaseSessionProvider>
  );
}
