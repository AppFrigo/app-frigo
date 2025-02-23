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

const screenHeight = Dimensions.get("window").height;

export default function AddButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(screenHeight)).current;

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
      {!modalVisible ? (
        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={openModal} style={styles.addButton}>
            <Text style={styles.addButtonTextIcon}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
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
    bottom: 25,
    left: "50%",
    transform: [{ translateX: -25 }],
    zIndex: 10,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: Colors.light.tint,
    backgroundColor: Colors.light.text,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonTextIcon: {
    fontSize: 36,
    color: Colors.light.tint,
    position: "relative",
    bottom: 2,
    left: 1,
    fontWeight: "500",
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
