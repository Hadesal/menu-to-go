// utils/searchHelper.ts
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import debounce from "lodash.debounce";

/**
 * Helper function to find the 'name' property in an object.
 */
export const findNameProperty = (
  obj: ProductData | RestaurantData
): string | null => {
  return obj && typeof obj === "object" && obj.name ? obj.name : null;
};

/**
 * Debounced search helper.
 * @param items - The array of items to filter.
 * @param searchText - The search text used for filtering.
 * @param debounceTime - Debounce delay in milliseconds.
 * @param callback - Callback function to return the filtered items.
 */
export const debouncedSearch = debounce(
  (
    items: ProductData[] | CategoryData[] | RestaurantData[],
    searchText: string,
    callback: (
      filteredItems: ProductData[] | RestaurantData[] | CategoryData[]
    ) => void
  ) => {
    const filtered = items.filter((item) => {
      const nameValue = (item as ProductData | RestaurantData).name
        ? findNameProperty(item as ProductData | RestaurantData)
        : null;
      return nameValue && nameValue.toLowerCase().includes(searchText);
    }) as (ProductData | RestaurantData | CategoryData)[];

    callback(filtered as ProductData[] | RestaurantData[] | CategoryData[]);
  },
  300 // You can adjust the debounce time here
);
