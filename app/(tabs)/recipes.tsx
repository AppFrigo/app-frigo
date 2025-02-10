import { Text, View, StyleSheet } from "react-native";

export default function Recipes() {
  return (
    <View style={styles.container}>
      <Text>Recipes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
