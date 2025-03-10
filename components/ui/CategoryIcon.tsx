import { FoodCategory } from "@/types/foodTypes";

import DefaultIcon from "@/assets/icons/defaultFood.svg";
import ProteinsIcon from "@/assets/icons/foods/proteins.svg";
import VegetablesIcon from "@/assets/icons/foods/vegetables.svg";
import FatsIcon from "@/assets/icons/foods/fats.svg";
import DairyIcon from "@/assets/icons/foods/dairy.svg";
import CerealsIcon from "@/assets/icons/foods/cereals.svg";
import SugaryProductsIcon from "@/assets/icons/foods/sugar.svg";
import SpicesIcon from "@/assets/icons/foods/spices.svg";

// Map food categories to their respective icons
const CategoryIcon = ({ category }: { category: FoodCategory }) => {
  const iconsComponent: Record<FoodCategory, React.FC> = {
    Proteins: ProteinsIcon,
    Fruits: DefaultIcon,
    Vegetables: VegetablesIcon,
    Dairy: DairyIcon,
    Fats: FatsIcon,
    Cereals: CerealsIcon,
    SugaryProducts: SugaryProductsIcon,
    Spices: SpicesIcon,
  };

  // Get the icon component based on the category
  const IconComponent = iconsComponent[category] || DefaultIcon;

  return <IconComponent />;
};

export default CategoryIcon;
