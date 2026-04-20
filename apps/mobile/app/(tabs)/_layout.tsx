import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { colors, typography } from "@/theme/tokens";

type TabIconName = keyof typeof Ionicons.glyphMap;

const tabs: Record<string, TabIconName> = {
  calendario: "calendar-outline",
  comunidade: "people-outline",
  index: "home-outline",
  perfil: "person-outline",
  repertorio: "musical-notes-outline",
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: typography.tab,
          fontWeight: "700",
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 66,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons color={color} name={tabs[route.name] ?? "ellipse-outline"} size={size} />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Hoje" }} />
      <Tabs.Screen name="calendario" options={{ title: "Calendario" }} />
      <Tabs.Screen name="repertorio" options={{ title: "Repertorio" }} />
      <Tabs.Screen name="comunidade" options={{ title: "Comunidade" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
