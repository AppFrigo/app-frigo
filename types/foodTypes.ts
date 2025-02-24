// Enum pour les catégories d'aliments
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

// Interface pour les propriétés de l'aliment
export interface IFoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  isDry: boolean;
  expirationDate?: Date;
  quantity: number;
  unit: string; // ex: "kg", "litres", "pcs"
  notes?: string; // Optionnel
}

// Classe pour un aliment
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
