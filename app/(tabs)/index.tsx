import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { io } from "socket.io-client";

import { SafeAreaView } from "react-native-safe-area-context";
import FoodService from "@/services/foodService";
import { IFoodItem } from "@/types/foodTypes";

const socket = io("http://localhost:3000");

const groupDataInPairs = (
  data: IFoodItem[]
): Array<[IFoodItem, IFoodItem | null]> => {
  return data.reduce<Array<[IFoodItem, IFoodItem | null]>>(
    (acc, _, index, arr) => {
      if (index % 2 === 0) {
        acc.push([arr[index], arr[index + 1] ?? null]); // Pair elements or set null
      }
      return acc;
    },
    []
  );
};

const fetchAllFoods = async () => {
  try {
    const response = await FoodService.getAllFoods();
    console.log("response", response);

    return response ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const Index = () => {
  const [allFoods, setAllFoods] = useState<IFoodItem[]>([]);

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      const data = await fetchAllFoods();
      setAllFoods(data);
    };
    fetchData();

    // Listen for new food items via WebSocket
    socket.on("foodAdded", (newFood: IFoodItem) => {
      console.log("New food added:", newFood);
      setAllFoods((prevFoods) => [newFood, ...prevFoods]); // Add new item to the list
    });

    return () => {
      socket.off("foodAdded"); // Clean up event listener
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={groupDataInPairs(allFoods)}
        renderItem={({ item }) => (
          <View style={styles.rowContainer}>
            {/* First Element */}
            {item[0] && (
              <View style={styles.itemContainer}>
                <View style={styles.fruitRow}>
                  <Text style={styles.fruitIcon}>{item[0].name[0]}</Text>
                </View>
                <View
                  style={
                    item[1] ? styles.labelContainerLeft : styles.labelContainer
                  }
                >
                  <Text style={styles.label}>
                    {item[0].quantity}
                    {item[0].unit === "pcs" ? "" : item[0].unit} {item[0].name}
                  </Text>
                </View>
              </View>
            )}
            {/* Second Element (can be null) */}
            {item[1] && (
              <View style={styles.itemContainer}>
                <View style={styles.fruitRow}>
                  <Text style={styles.fruitIcon}>{item[1].name[0]}</Text>
                </View>
                <View style={styles.labelContainerRight}>
                  <Text style={styles.label}>
                    {item[1].quantity}
                    {item[1].unit === "pcs" ? "" : item[1].unit} {item[1].name}
                  </Text>
                </View>
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
    fontSize: 40,
    color: "#3f6131",
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
});

export default Index;
