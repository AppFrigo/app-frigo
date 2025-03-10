import { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";

const screenHeight = Dimensions.get("window").height;

export default function AddButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const navigation = useNavigation();

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

  const goToIngredients = () => {
    // Go to the ingredients screen
    navigation.navigate("screens/ingredients");
    closeModal();
  };

  return (
    <>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={openModal} style={styles.addButton}>
          <Text style={styles.addButtonTextIcon}>+</Text>
        </TouchableOpacity>
      </View>
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
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Ajouter un élément</Text>
            <Text style={styles.modalText}>Que veux-tu ajouter ?</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={goToIngredients} style={styles.button}>
                <Text style={styles.buttonText}>Ingrédients</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeModal} style={styles.button}>
                <Text style={styles.buttonText}>Recettes</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    position: "absolute",
    bottom: 25,
    left: "50%",
    transform: [{ translateX: -25 }],
    zIndex: 10,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    borderWidth: 3,
    borderColor: Colors.light.tint,
    backgroundColor: Colors.light.text,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonTextIcon: {
    fontSize: 30,
    color: Colors.light.tint,
    position: "relative",
    bottom: 3,
    left: 0.5,
    fontWeight: "500",
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)", // Fixed semi-transparent background
    justifyContent: "flex-end",
    zIndex: 15,
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
    position: "absolute",
    left: 20,
    top: 5,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.light.green,
    width: "40%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.light.text,
    textAlign: "center",
    fontWeight: "bold",
  },
});
