import { FoodItem } from "@/types/foodTypes";

export class Fridge {
  private items: FoodItem[] = [];

  addItem(item: FoodItem): void {
    this.items.push(item);
  }

  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  getItems(): FoodItem[] {
    return this.items;
  }

  findItemByName(name: string): FoodItem | undefined {
    return this.items.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
  }

  getExpiredItems(): FoodItem[] {
    return this.items.filter((item) => item.isExpired());
  }
}
