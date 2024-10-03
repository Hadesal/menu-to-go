/* eslint-disable @typescript-eslint/no-explicit-any */
import { RestaurantData } from "@dataTypes/RestaurantObject";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { CategoryData } from "@dataTypes/CategoryDataTypes";

// Type checks
export const isRestaurantData = (item: any): item is RestaurantData => {
  return (item as RestaurantData).categories !== undefined;
};

export const isProductData = (item: any): item is ProductData => {
  return (item as ProductData).price !== undefined;
};

export const isCategoryData = (item: any): item is CategoryData => {
  return (item as CategoryData).categoryType !== undefined;
};

// Find name property in a deep object
export const findNameProperty = (obj: any): string | null => {
  if (obj !== null && typeof obj === "object") {
    for (const key in obj) {
      if (key === "name") return obj[key];
      if (typeof obj[key] === "object") {
        const result = findNameProperty(obj[key]);
        if (result) return result;
      }
    }
  }
  return null;
};

// Filter items based on search text
export const filterItemsByName = <T>(items: T[], searchText: string): T[] => {
  return items.filter((item) => {
    const nameValue = findNameProperty(item);
    return (
      nameValue && nameValue.toLowerCase().includes(searchText.toLowerCase())
    );
  });
};
