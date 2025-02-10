import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";

// Import des icônes SVG locales
import CalendarIcon from "@/assets/icons/calendar.svg";
import FridgeIcon from "@/assets/icons/fridge.svg";
import RecipeIcon from "@/assets/icons/recipe.svg";
import ShoppingListIcon from "@/assets/icons/shopping-list.svg";

// Mapping des icônes avec les fichiers SVG
const ICON_MAPPING = {
  calendar: CalendarIcon,
  fridge: FridgeIcon,
  recipe: RecipeIcon,
  shoppingList: ShoppingListIcon,
} as const;

export type IconSymbolName = keyof typeof ICON_MAPPING;

interface IconSymbolProps {
  name: IconSymbolName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}

/**
 * Composant d'icône basé sur des SVG locaux.
 */
export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  const SvgIcon = ICON_MAPPING[name];

  if (!SvgIcon) {
    console.error(`❌ Icon "${name}" not found in ICON_MAPPING.`);
    return null;
  }

  return <SvgIcon width={size} height={size} fill={color} style={style} />;
}
