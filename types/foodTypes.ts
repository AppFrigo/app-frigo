// Enum for food categories
export enum FoodCategory {
  Proteins = "Proteins",
  Fruits = "Fruits",
  Vegetables = "Vegetables",
  Dairy = "Dairy",
  Fats = "Fats",
  Cereals = "Cereals",
  SugaryProducts = "SugaryProducts",
  Spices = "Spices",
}

// Interface for the properties of the food
export interface IFoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  isDry: boolean;
  expirationDate?: Date;
  quantity: number;
  unit: string; // ex: "kg", "litres", "pcs"
  notes?: string; // Optionnal
}

// Class for a food
export class FoodItem implements IFoodItem {
  constructor(
    public id: string,
    public name: string,
    public category: FoodCategory,
    public isDry: boolean,
    public quantity: number,
    public unit: string,
    public expirationDate?: Date,
    public notes?: string
  ) {}

  isExpired(): boolean {
    if (this.isDry) return false;
    return this.expirationDate ? new Date() > this.expirationDate : false;
  }
}
