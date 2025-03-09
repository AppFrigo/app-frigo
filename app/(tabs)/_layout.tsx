import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform, Animated, Dimensions } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AddButton from "@/components/ui/AddButton";

const iconSize = 50;

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: [
            {
              backgroundColor: Colors[colorScheme ?? "light"].navbar,
            },
            Platform.select({
              ios: {
                position: "absolute",
              },
              default: {},
            }),
          ],
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Frigo",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={iconSize} name="fridge" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            title: "Liste de course",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={iconSize} name="shoppingList" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recipes"
          options={{
            title: "Recettes",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={iconSize} name="recipe" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendrier",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={iconSize} name="calendar" color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Central button */}
      <AddButton />
    </>
  );
}
