import FoodService from "./foodService";
import { IFoodItem } from "@/types/foodTypes";

const addFoodService = (data: Omit<IFoodItem, "id">) => {
  return FoodService.addFood(data);
};

export { addFoodService };
