import FoodService from "./foodService";
import { IFoodItem } from "@/types/foodTypes";

const addFoodService = async (data: Omit<IFoodItem, "id">) => {
  const response = await FoodService.addFood(data);

  return response;
};

export { addFoodService };
