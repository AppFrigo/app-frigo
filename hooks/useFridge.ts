import { useState } from "react";
import { Fridge } from "@/services/fridgeService";
import { FoodItem, FoodCategory } from "@/types/foodTypes";
import { addFoodService } from "@/services/ingredientsServices";
import logger from "@/services/logger";
import { useNavigation } from "expo-router";

export const useFridge = () => {
  const navigate = useNavigation();
  const [fridge] = useState(new Fridge());

  const addFood = async (
    name: string,
    category: FoodCategory,
    isDry: boolean,
    quantity: number,
    unit: string,
    expirationDate?: Date
  ) => {
    const newItem = new FoodItem(
      Date.now().toString(),
      name,
      category,
      isDry,
      quantity,
      unit,
      expirationDate
    );

    try {
      fridge.addItem(newItem);
      const response = await addFoodService(newItem);
      logger("data", response.data);
    } catch (error) {
      logger("error", error);
    } finally {
      navigate.navigate("(tabs)");
    }
  };

  return {
    fridge,
    addFood,
    items: fridge.getItems(),
    expiredItems: fridge.getExpiredItems(),
  };
};
