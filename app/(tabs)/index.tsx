import { IconSymbol } from "@/components/ui/IconSymbol";
import { Text, View, StyleSheet } from "react-native";
import FridgeIcon from "@/assets/icons/fridge.svg";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
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
