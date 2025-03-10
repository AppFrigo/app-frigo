import { useState } from "react";
import { Fridge } from "@/services/fridgeService";
import { FoodItem, FoodCategory } from "@/types/foodTypes";
import { addFoodService } from "@/services/ingredientsServices";

export const useFridge = () => {
  const [fridge] = useState(new Fridge());

  const addFood = (
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
    fridge.addItem(newItem);
    addFoodService(newItem);
  };

  return {
    fridge,
    addFood,
    items: fridge.getItems(),
    expiredItems: fridge.getExpiredItems(),
  };
};
