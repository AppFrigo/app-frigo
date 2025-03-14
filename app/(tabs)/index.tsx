import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Animated, Easing } from "react-native";

import DeleteIcon from "@/assets/icons/delete.svg";
import DefaultFoodIcon from "@/assets/icons/defaultFood.svg";

import { io } from "socket.io-client";

import { SafeAreaView } from "react-native-safe-area-context";
import { IFoodItem } from "@/types/foodTypes";
import {
  fetchAllFoods,
  deleteFoodItem,
  groupDataInPairs,
} from "@/services/indexServices";
import logger from "@/services/logger";

const socket = io("http://localhost:3000");

const Index = () => {
  const [allFoods, setAllFoods] = useState<IFoodItem[]>([]);
  const [inDeleteMode, setInDeleteMode] = useState(false);
  const [shakeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      const data = await fetchAllFoods();
      setAllFoods(data);
    };
    fetchData();

    // Listen for new food items via WebSocket
    socket.on("foodAdded", (newFood: IFoodItem) => {
      logger("New food added:", newFood.name);
      setAllFoods((prevFoods) => [newFood, ...prevFoods]); // Add new item to the list
    });

    // Listen for deleted food items via WebSocket
    socket.on("foodDeleted", (deletedFoodId: string) => {
      logger("Food deleted with id:", deletedFoodId);
      setAllFoods((prevFoods) =>
        prevFoods.filter((food) => food.id !== deletedFoodId)
      ); // Remove item from the list
    });

    return () => {
      socket.off("foodAdded"); // Clean up event listener
      socket.off("foodDeleted"); // Clean up event listener
    };
  }, []);

  // If in delete mode but no items are selected, exit delete mode
  useEffect(() => {
    if (inDeleteMode && allFoods.length === 0) {
      console.log("Exiting delete mode");
      setInDeleteMode(false);
    }
  }, [allFoods, inDeleteMode]);

  const handleDeleteMode = () => {
    console.log("Delete mode toggled");

    setInDeleteMode(!inDeleteMode);
  };

  const handleDeleteItem = (id: string | null) => {
    if (!id) return;
    deleteFoodItem(id);
  };

  useEffect(() => {
    if (inDeleteMode) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnimation, {
            toValue: 0.5,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: -0.5,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      shakeAnimation.setValue(0);
    }
  }, [inDeleteMode]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={groupDataInPairs(allFoods)}
        renderItem={({ item }) => (
          <View style={styles.rowContainer}>
            {/* First Element */}
            {item[0] && (
              <View>
                {inDeleteMode && (
                  <TouchableOpacity
                    style={styles.deleteIcon}
                    onPress={() => handleDeleteItem(item[0].id)}
                  >
                    <Animated.View
                      style={[
                        styles.itemContainer,
                        {
                          transform: [{ translateX: shakeAnimation }],
                        },
                      ]}
                    >
                      <DeleteIcon />
                    </Animated.View>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onLongPress={handleDeleteMode}
                  activeOpacity={1}
                  style={styles.itemContainer}
                >
                  {/* <View style={styles.fruitRow}> */}
                  <View style={styles.fruitIcon}>
                    <DefaultFoodIcon />
                  </View>
                  {/* </View> */}
                  <View
                    style={
                      item[1]
                        ? styles.labelContainerLeft
                        : styles.labelContainer
                    }
                  >
                    <Text style={styles.label}>
                      {item[0].quantity}
                      {item[0].unit === "pcs" ? "" : item[0].unit}{" "}
                      {item[0].name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {/* Second Element (can be null) */}
            {item[1] && (
              <View>
                {inDeleteMode && (
                  <TouchableOpacity
                    style={styles.deleteIcon}
                    onPress={() => item[1] && handleDeleteItem(item[1].id)}
                  >
                    <Animated.View
                      style={[
                        styles.itemContainer,
                        {
                          transform: [{ translateX: shakeAnimation }],
                        },
                      ]}
                    >
                      <DeleteIcon />
                    </Animated.View>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onLongPress={handleDeleteMode}
                  activeOpacity={1}
                  style={styles.itemContainer}
                >
                  <View style={styles.fruitIcon}>
                    <DefaultFoodIcon />
                  </View>
                  <View style={styles.labelContainerRight}>
                    <Text style={styles.label}>
                      {item[1].quantity}
                      {item[1].unit === "pcs" ? "" : item[1].unit}{" "}
                      {item[1].name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item, index) => `row-${index}`}
        contentContainerStyle={{
          paddingBottom: "16%",
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rowContainer: {
    flexDirection: "row", // Display the elements side by side
    justifyContent: "center",
    marginBottom: 10,
  },
  itemContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  fruitRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  fruitIcon: {
    height: 100,
    width: 100,
  },
  labelContainer: {
    backgroundColor: "#a47d52",
    width: 360,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  labelContainerLeft: {
    backgroundColor: "#a47d52",
    width: 180,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 10,
  },
  labelContainerRight: {
    backgroundColor: "#a47d52",
    width: 180,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 10,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  deleteIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 100,
    height: 20,
    width: 20,
  },
});

export default Index;
