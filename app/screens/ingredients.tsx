import { Text, View, StyleSheet } from "react-native";

export default function Ingredients() {
  return (
    <View style={styles.container}>
      <Text>Ingredients Screen</Text>
    </View>
  );
}

export const options = {
  title: "Ingredients",
  headerBackTitle: "Retour",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
