import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Frigo",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="fridge" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendrier",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="add"
        options={{
          title: "Ajouter",
        }}
      /> */}
      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recette",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="recipe" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "Listes",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="shoppingList" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
