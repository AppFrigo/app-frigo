import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import IngredientsIcon from "@/assets/icons/ingredients.svg";
import { FoodCategory } from "@/types/foodTypes";

export default function Ingredients() {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientCategory, setIngredientCategory] = useState("");
  const [ingredientFreshness, setIngredientFreshness] = useState("");

  const [isDrawerCategoriesOpen, setIsDrawerCategoriesOpen] = useState(false);
  const [isDrawerFreshnessOpen, setIsDrawerFreshnessOpen] = useState(false);

  const handleDrawerCategoriesPress = () => {
    setIsDrawerCategoriesOpen(!isDrawerCategoriesOpen);
  };

  const handleDrawerFreshnessPress = () => {
    setIsDrawerFreshnessOpen(!isDrawerFreshnessOpen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrédients</Text>
      <View style={styles.iconIngredients}>
        <IngredientsIcon />
      </View>
      <View style={styles.inputIngredients}>
        <Text style={styles.inputIngredientsText}>Nommez votre ingrédient</Text>
      </View>
      <TouchableOpacity
        style={styles.drawerIngredientsCategories}
        onPress={handleDrawerCategoriesPress}
      >
        <Text style={styles.drawerIngredientsCategoriesText}>
          {isDrawerCategoriesOpen ? "V" : ">"} Classe de l'ingrédient
        </Text>
        {isDrawerCategoriesOpen && (
          <View style={styles.drawerIngredientsCategoriesList}>
            {Object.values(FoodCategory).map((category) => (
              <Text
                key={category}
                style={styles.drawerIngredientsCategoriesListItem}
              >
                {category}
              </Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDrawerFreshnessPress}
        style={styles.drawerIngredientsCategories}
      >
        <Text style={styles.drawerIngredientsCategoriesText}>
          {isDrawerFreshnessOpen ? "V" : ">"} Fraîcheur de l'ingrédient
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export const options = {
  title: "Ingredients",
  headerBackTitle: "Retour",
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
    marginBottom: 40,
  },
  drawerIngredientsCategoriesText: {
    marginLeft: 5,
    fontSize: 10,
    fontWeight: "light",
    textAlign: "center",
    alignItems: "center",
  },
  drawerIngredientsCategoriesList: { marginTop: 5 },
  drawerIngredientsCategoriesListItem: {
    marginBottom: 5,
    marginLeft: 15,
    fontSize: 10,
    fontWeight: "light",
    textAlign: "left",
    alignItems: "flex-start",
  },
});
