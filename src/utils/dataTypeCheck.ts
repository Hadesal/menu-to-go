import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { RestaurantData } from "@dataTypes/RestaurantObject";

// utils/dataTypeCheck.ts
export type dataTypesString = "product" | "category" | "restaurant";
export type itemType = ProductData | CategoryData | RestaurantData;
export type itemsTypes = ProductData[] | CategoryData[] | RestaurantData[];

export function isProductData(item: itemType): item is ProductData {
  return "price" in item;
}
export function isCategoryData(item: itemType): item is CategoryData {
  return "categoryType" in item;
}
export function isRestaurantData(item: itemType): item is RestaurantData {
  return "name" in item;
}
