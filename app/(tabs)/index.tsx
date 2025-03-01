import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { dataTest } from "./testData";

import { SafeAreaView } from "react-native-safe-area-context";

const groupDataInPairs = (data: any) => {
  const pairedData = [];
  for (let i = 0; i < data.length; i += 2) {
    pairedData.push([data[i], data[i + 1] ? data[i + 1] : null]); // If the element is alone, add `null`
  }
  return pairedData;
};

const Index = () => {
  const groupedData = groupDataInPairs(dataTest);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={groupedData}
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
