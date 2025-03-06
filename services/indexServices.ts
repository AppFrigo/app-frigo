import FoodService from "@/services/foodService";
import { IFoodItem } from "@/types/foodTypes";

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
    console.log("response", response);

    return response.data ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export { groupDataInPairs, fetchAllFoods };
