import FoodService from "@/services/foodService";
import { IFoodItem } from "@/types/foodTypes";
import logger from "./logger";

const groupDataInPairs = (
  data: IFoodItem[]
): Array<[IFoodItem, IFoodItem | null]> => {
  return data.reduce<Array<[IFoodItem, IFoodItem | null]>>(
    (acc, _, index, arr) => {
      if (index % 2 === 0) {
        acc.push([arr[index], arr[index + 1] ?? null]); // Pair elements or set null
      }
      return acc;
    },
    []
  );
};

const fetchAllFoods = async () => {
  try {
    const response = await FoodService.getAllFoods();

    logger(`Fetched ${response.data.length} food items`);
    return response.data ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const deleteFoodItem = async (id: string) => {
  try {
    const response = await FoodService.deleteFood(id);

    logger(`Deleted food item with id: ${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting food item:", error);
    return null;
  }
};

export { groupDataInPairs, fetchAllFoods, deleteFoodItem };
