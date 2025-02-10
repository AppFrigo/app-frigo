import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
} from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const iconSize = 30;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              //   height: 80,
              backgroundColor: Colors[colorScheme ?? "light"].navbar,
            },
            default: {
              //   height: 80,
              backgroundColor: Colors[colorScheme ?? "light"].navbar,
            },
          }),
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
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={{ fontSize: 30, color: Colors.light.tint }}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for popup */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.addPopupContainer}>
          <View style={styles.addPopupContainerText}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Ajouter un élément
            </Text>
            <Text style={{ marginTop: 10 }}>Que veux-tu ajouter ?</Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.addClosePopupButton}
            >
              <Text style={{ color: "white" }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    position: "absolute",
    bottom: 20, // Adjust to the navbar height
    left: "50%",
    transform: [{ translateX: -30 }], // Center the button
    zIndex: 10,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    backgroundColor: Colors.light.text,
    justifyContent: "center",
    alignItems: "center",
  },
  addPopupContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  addPopupContainerText: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  addClosePopupButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.light.tint,
    borderRadius: 5,
  },
});
