import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SessionProvider } from "@/features/auth/SessionProvider";
import { CommentsProvider } from "@/features/comments/CommentsProvider";
import { FavoritesProvider } from "@/features/favorites/FavoritesProvider";
import { colors } from "@/theme/tokens";

export default function RootLayout() {
  return (
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
  );
}
