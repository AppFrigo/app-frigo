import { apiGet, apiPost, apiDelete } from "./apiClient";
import { IFoodItem } from "@/types/foodTypes";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class FoodService {
  // 🔹 Fetch all food items
  static async getAllFoods(): Promise<ApiResponse<IFoodItem[]>> {
    return apiGet<ApiResponse<IFoodItem[]>>("/food");
  }

  // 🔹 Fetch a single food item by ID
  static async getFoodById(id: string): Promise<ApiResponse<IFoodItem | null>> {
    return apiGet<ApiResponse<IFoodItem | null>>(`/food/${id}`);
  }

  // 🔹 Add a new food item
  static async addFood(
    data: Omit<IFoodItem, "id">
  ): Promise<ApiResponse<IFoodItem>> {
    return apiPost<ApiResponse<IFoodItem>>("/food", data);
  }

  // 🔹 Delete a food item by ID
  static async deleteFood(id: string): Promise<ApiResponse<null>> {
    return apiDelete<ApiResponse<null>>(`/food/${id}`);
  }
}

export default FoodService;
