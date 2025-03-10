import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import IngredientsIcon from "@/assets/icons/ingredients.svg";
import { FoodCategory } from "@/types/foodTypes";
import { TextInput } from "react-native-gesture-handler";

const freshnessMap = [
  { label: "Produit frais", value: true },
  { label: "Produit sec", value: false },
];

export default function Ingredients() {
  const [ingredientName, setIngredientName] = useState(
    "Nommez votre ingrédient"
  );
  const [ingredientCategory, setIngredientCategory] = useState("");
  const [ingredientFreshness, setIngredientFreshness] = useState({
    label: "",
    value: false,
  });

  const [isDrawerCategoriesOpen, setIsDrawerCategoriesOpen] = useState(false);
  const [isDrawerFreshnessOpen, setIsDrawerFreshnessOpen] = useState(false);

  const handleDrawerCategoriesPress = () => {
    setIngredientCategory("");
    setIsDrawerCategoriesOpen(!isDrawerCategoriesOpen);
  };

  const handleDrawerFreshnessPress = () => {
    setIngredientFreshness({ label: "", value: false });
    setIsDrawerFreshnessOpen(!isDrawerFreshnessOpen);
  };

  const handleChooseCategory = (category: FoodCategory) => {
    setIngredientCategory(category);
    setIsDrawerCategoriesOpen(false);
  };

  const handleChooseFreshness = (freshness: {
    label: string;
    value: boolean;
  }) => {
    setIngredientFreshness(freshness);
    setIsDrawerFreshnessOpen(false);
  };

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 25,
      marginBottom: 50,
    },
    iconIngredients: {
      margin: "auto",
      width: 90,
      height: 90,
      borderRadius: 10,
      backgroundColor: "#D9D9D9",
      marginBottom: 15,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    inputIngredients: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: 180,
      height: 15,
      borderRadius: 10,
      backgroundColor: "#D9D9D9",
      margin: "auto",
      marginBottom: 40,
      borderWidth: ingredientName === "Nommez votre ingrédient" ? 0 : 1,
      borderColor: ingredientName === "Nommez votre ingrédient" ? "" : "green",
    },
    inputIngredientsText: {
      fontSize: 8,
      fontWeight: "light",
      textAlign: "center",
      alignItems: "center",
    },
    drawerIngredientsCategories: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      width: 304,
      minHeight: 15,
      borderRadius: 10,
      backgroundColor: "#D9D9D9",
      margin: "auto",
      marginBottom: isDrawerCategoriesOpen ? 0 : 40,
      borderWidth: ingredientCategory ? 1 : 0,
      borderColor: ingredientCategory ? "green" : "",
    },
    drawerIngredientsCategoriesText: {
      marginLeft: 5,
      fontSize: 10,
      fontWeight: "light",
      textAlign: "center",
      alignItems: "center",
    },
    drawerIngredientsCategoriesList: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: 304,
      minHeight: 15,
      borderRadius: 10,
      backgroundColor: "#D9D9D9",
      margin: "auto",
      marginTop: 10,
      marginBottom: 20,
    },
    drawerIngredientsCategoriesList2: {
      marginTop: 10,
      marginBottom: 10,
    },
    drawerIngredientsCategoriesListItem: {
      marginBottom: 5,
      marginTop: 5,
      marginLeft: 20,
      fontSize: 10,
      fontWeight: "light",
      textAlign: "left",
      alignItems: "flex-start",
    },
    drawerIngredientsFreshness: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      width: 304,
      minHeight: 15,
      borderRadius: 10,
      backgroundColor: "#D9D9D9",
      margin: "auto",
      borderWidth: ingredientFreshness.label ? 1 : 0,
      borderColor: ingredientFreshness.label ? "green" : "",
    },
    drawerIngredientsFreshnessText: {
      marginLeft: 5,
      fontSize: 10,
      fontWeight: "light",
      textAlign: "center",
      alignItems: "center",
    },
  });

  const onFocusInput = () => {
    if (ingredientName === "Nommez votre ingrédient") {
      setIngredientName("");
    }
  };

  const onBlurInput = () => {
    if (ingredientName === "") {
      setIngredientName("Nommez votre ingrédient");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrédients</Text>
      <View style={styles.iconIngredients}>
        <IngredientsIcon />
      </View>
      <View style={styles.inputIngredients}>
        <TextInput
          onChangeText={setIngredientName}
          style={styles.inputIngredientsText}
          value={ingredientName}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
        />
      </View>
      <TouchableOpacity
        style={styles.drawerIngredientsCategories}
        onPress={handleDrawerCategoriesPress}
      >
        <Text style={styles.drawerIngredientsCategoriesText}>
          {isDrawerCategoriesOpen ? "V" : ">"}{" "}
          {ingredientCategory ? ingredientCategory : "Classe de l'ingrédient"}
        </Text>
      </TouchableOpacity>

      {/* Drawer for categories */}
      {isDrawerCategoriesOpen && (
        <View style={styles.drawerIngredientsCategoriesList}>
          <View style={styles.drawerIngredientsCategoriesList2}>
            {Object.values(FoodCategory).map((category) => (
              <TouchableOpacity
                onPress={handleChooseCategory.bind(null, category)}
                key={category}
              >
                <Text
                  key={category}
                  style={styles.drawerIngredientsCategoriesListItem}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={handleDrawerFreshnessPress}
        style={styles.drawerIngredientsFreshness}
      >
        <Text style={styles.drawerIngredientsFreshnessText}>
          {isDrawerFreshnessOpen ? "V" : ">"}{" "}
          {ingredientFreshness.label
            ? ingredientFreshness.label
            : "Fraîcheur de l'ingrédient"}
        </Text>
      </TouchableOpacity>

      {/* Drawer for freshness */}
      {isDrawerFreshnessOpen && (
        <View style={styles.drawerIngredientsCategoriesList}>
          <View style={styles.drawerIngredientsCategoriesList2}>
            {Object.values(freshnessMap).map((freshness) => (
              <TouchableOpacity
                onPress={handleChooseFreshness.bind(null, freshness)}
                key={freshness.label}
              >
                <Text
                  key={freshness.label}
                  style={styles.drawerIngredientsCategoriesListItem}
                >
                  {freshness.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
