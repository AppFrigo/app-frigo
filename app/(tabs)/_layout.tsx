import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const screenHeight = Dimensions.get("window").height;
const iconSize = 30;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = React.useRef(new Animated.Value(screenHeight)).current;

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

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
              backgroundColor: Colors[colorScheme ?? "light"].navbar,
            },
            default: {
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
      {!modalVisible && (
        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={openModal} style={styles.addButton}>
            <Text style={{ fontSize: 30, color: Colors.light.tint }}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal for popup */}
      {modalVisible && (
        <View style={styles.modalBackground}>
          {/* Animated sliding modal */}
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <Text style={styles.modalTitle}>Ajouter un élément</Text>
            <Text style={styles.modalText}>Que veux-tu ajouter ?</Text>

            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -30 }],
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
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)", // Fixed semi-transparent background
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 25, // Rounded corners for the modal
    borderTopRightRadius: 25,
    width: "100%",
    alignItems: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
