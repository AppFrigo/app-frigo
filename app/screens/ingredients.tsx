import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import IngredientsIcon from "@/assets/icons/ingredients.svg";
import { FoodCategory } from "@/types/foodTypes";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useNavigation } from "expo-router";

const freshnessMap = [
  { label: "Produit frais", value: false },
  { label: "Produit sec", value: true },
];

const unitMap = [
  { label: "pieces", value: "pcs" },
  { label: "millilitres", value: "ml" },
  { label: "litres", value: "l" },
  { label: "grammes", value: "g" },
  { label: "kilogrammes", value: "kg" },
];

export default function Ingredients() {
  const navigation = useNavigation();

  const [ingredientName, setIngredientName] = useState(
    "Nommez votre ingrédient"
  );
  const [ingredientCategory, setIngredientCategory] = useState<FoodCategory>(
    FoodCategory.None
  );
  const [ingredientFreshness, setIngredientFreshness] = useState({
    label: "",
    value: false,
  });
  const [ingredientUnit, setIngredientUnit] = useState({
    label: "",
    value: "",
  });
  const [ingredientQuantityValue, setIngredientQuantityValue] = useState(
    "Quantité de l'ingrédient"
  );

  const [isDrawerCategoriesOpen, setIsDrawerCategoriesOpen] = useState(false);
  const [isDrawerFreshnessOpen, setIsDrawerFreshnessOpen] = useState(false);
  const [isDrawerQuantityOpen, setIsDrawerQuantityOpen] = useState(false);

  const handleDrawerCategoriesPress = () => {
    setIngredientCategory(FoodCategory.None);
    setIsDrawerFreshnessOpen(false);
    setIsDrawerQuantityOpen(false);
    setIsDrawerCategoriesOpen(!isDrawerCategoriesOpen);
  };

  const handleDrawerFreshnessPress = () => {
    setIngredientFreshness({ label: "", value: false });
    setIsDrawerQuantityOpen(false);
    setIsDrawerCategoriesOpen(false);
    setIsDrawerFreshnessOpen(!isDrawerFreshnessOpen);
  };

  const handleDrawerUnitPress = () => {
    setIngredientUnit({ label: "", value: "" });
    setIsDrawerFreshnessOpen(false);
    setIsDrawerCategoriesOpen(false);
    setIsDrawerQuantityOpen(!isDrawerQuantityOpen);
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

  const handleChooseUnit = (unit: { label: string; value: string }) => {
    setIngredientUnit(unit);
    setIsDrawerQuantityOpen(false);
  };

  const handleQuantity = (quantity: string) => {
    const filteredQuantity = quantity.replace(/[^0-9]/g, "");
    setIngredientQuantityValue(filteredQuantity);
  };

  const onFocusInput = () => {
    if (ingredientName === "Nommez votre ingrédient") {
      setIngredientName("");
    }
  };

  const onFocusQuantity = () => {
    if (ingredientQuantityValue === "Quantité de l'ingrédient") {
      setIngredientQuantityValue("");
    }
  };

  const onBlurInput = () => {
    if (ingredientName === "") {
      setIngredientName("Nommez votre ingrédient");
    }
  };

  const onBlurQuantity = () => {
    if (ingredientQuantityValue === "") {
      setIngredientQuantityValue("Quantité de l'ingrédient");
    }
  };

  // new food

  const handleSubmit = () => {
    if (
      ingredientName !== "Nommez votre ingrédient" &&
      ingredientCategory !== FoodCategory.None &&
      ingredientFreshness.label &&
      ingredientQuantityValue !== "Quantité de l'ingrédient" &&
      ingredientUnit.label
    ) {
      // setNewIngredient({
      //   name: ingredientName,
      //   category: ingredientCategory,
      //   freshness: ingredientFreshness.value,
      //   quantity: parseInt(ingredientQuantityValue),
      //   unit: ingredientUnit.value,
      // });
    } else {
      console.log("Please fill all the fields");
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Veuillez remplir tous les champs",
        position: "top",
      });
    }
  };

  // useEffect(() => {
  //   if (
  //     newIngredient.name &&
  //     newIngredient.category &&
  //     newIngredient.unit &&
  //     newIngredient.quantity
  //   ) {
  //   console.log(newIngredient);
  //   navigation.navigate("(tabs)");
  //   }
  // }, [newIngredient]);

  return (
    <View style={styles.container}>
      {/* Title and icon */}
      <Text style={styles.title}>Ingrédients</Text>
      <View style={styles.iconIngredients}>
        <IngredientsIcon />
      </View>

      {/* Input for ingredients name */}
      <View
        style={[
          styles.inputIngredients,
          ingredientName !== "Nommez votre ingrédient" && {
            borderWidth: 1,
            borderColor: "green",
          },
        ]}
      >
        <TextInput
          onChangeText={setIngredientName}
          style={styles.inputIngredientsText}
          value={ingredientName}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
        />
      </View>

      {/* Drawer for categories button */}
      <TouchableOpacity
        style={[
          styles.drawerIngredientsCategories,
          ingredientCategory !== FoodCategory.None && {
            borderWidth: 1,
            borderColor: "green",
          },
          isDrawerCategoriesOpen && { marginBottom: 0 },
        ]}
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
            {Object.values(FoodCategory).map(
              (category) =>
                category !== FoodCategory.None && (
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
                )
            )}
          </View>
        </View>
      )}

      {/* Drawer for freshness button */}
      <TouchableOpacity
        onPress={handleDrawerFreshnessPress}
        style={[
          styles.drawerIngredientsFreshness,
          ingredientFreshness.label && { borderWidth: 1, borderColor: "green" },
          isDrawerFreshnessOpen && { marginBottom: 0 },
        ]}
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

      {/* Choose quantity */}
      <View
        style={[
          styles.ingredientsQuantityContainer,
          isDrawerQuantityOpen && { marginBottom: 0 },
        ]}
      >
        <TextInput
          style={[
            styles.ingredientsQuantityInput,
            ingredientQuantityValue !== "Quantité de l'ingrédient" && {
              borderWidth: 1,
              borderColor: "green",
            },
          ]}
          keyboardType="numeric"
          value={ingredientQuantityValue}
          onChangeText={handleQuantity}
          onFocus={onFocusQuantity}
          onBlur={onBlurQuantity}
        />
        <TouchableOpacity onPress={handleDrawerUnitPress}>
          <Text
            style={[
              styles.ingredientsQuantityText,
              ingredientUnit.label && { borderWidth: 1, borderColor: "green" },
            ]}
          >
            {isDrawerQuantityOpen ? "V" : ">"}{" "}
            {ingredientUnit.label ? ingredientUnit.label : "Unité"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Drawer for units */}
      {isDrawerQuantityOpen && (
        <View style={styles.drawerIngredientsQuantity}>
          <View style={styles.drawerIngredientsQuantityList}>
            <View style={styles.drawerIngredientsQuantityList2}>
              {Object.values(unitMap).map((unit) => (
                <TouchableOpacity
                  onPress={handleChooseUnit.bind(null, unit)}
                  key={unit.label}
                >
                  <Text
                    key={unit.label}
                    style={styles.drawerIngredientsQuantityListItem}
                  >
                    {unit.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Submit button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Ajouter</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 40,
  },
  drawerIngredientsFreshnessText: {
    marginLeft: 5,
    fontSize: 10,
    fontWeight: "light",
    textAlign: "center",
    alignItems: "center",
  },
  ingredientsQuantityContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 304,
    minHeight: 15,
    borderRadius: 10,
    margin: "auto",
    marginBottom: 40,
  },
  ingredientsQuantityText: {
    fontSize: 10,
    fontWeight: "light",
    textAlign: "right",
    minWidth: 55,
    height: 15,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingStart: 5,
    paddingEnd: 10,
  },
  ingredientsQuantityInput: {
    fontSize: 10,
    fontWeight: "light",
    textAlign: "left",
    flex: 1,
    marginRight: 10,
    height: 15,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingStart: 10,
  },
  drawerIngredientsQuantity: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 304,
    margin: "auto",
    minHeight: 15,
  },
  drawerIngredientsQuantityList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "auto",
    minHeight: 15,
    borderRadius: 10,
    marginLeft: "auto",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#D9D9D9",
  },
  drawerIngredientsQuantityList2: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
  },
  drawerIngredientsQuantityListItem: {
    marginBottom: 5,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 20,
    fontSize: 10,
    fontWeight: "light",
    textAlign: "right",
    alignItems: "flex-start",
  },
  submitButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 152,
    margin: "auto",
    minHeight: 30,
    borderRadius: 10,
    backgroundColor: "#3f6131",
  },
  submitButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    color: "#D9D9D9",
  },
});
