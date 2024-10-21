import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { RestaurantData } from "@dataTypes/RestaurantObject";

// utils/dataTypeCheck.ts
export type dataTypesString = "product" | "category" | "restaurant";
export type itemsType = ProductData | CategoryData | RestaurantData;

export function isProductData(item: itemsType): item is ProductData {
  return "price" in item;
}
export function isCategoryData(item: itemsType): item is CategoryData {
  return "categoryType" in item;
}
export function isRestaurantData(item: itemsType): item is RestaurantData {
  return "name" in item;
}
