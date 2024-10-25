import privateApiService from "./services/privateApiService";
import publicApiService from "./services/publicApiService";
import { CategoryData } from "@dataTypes/CategoryDataTypes";

// Fetch category by category ID (public API)
export const getCategoryById = async (categoryId: number) => {
  const response = await publicApiService.get(`/categories/${categoryId}`);
  return response.data;
};

// Create a new category (with token)
export const createCategory = async (
  restaurantId: string,
  category: CategoryData
) => {
  const response = await privateApiService.post(
    `/categories/${restaurantId}`,
    category
  );
  return response.data;
};

// Update a specific category by restaurant ID and category ID (with token)
export const updateCategory = async (
  restaurantId: string,
  categoryId: string,
  updatedCategory: CategoryData
) => {
  const response = await privateApiService.put(
    `/categories/${categoryId}/${restaurantId}`,
    updatedCategory
  );
  return response.data;
};

// Delete a specific category by category ID (with token)
export const deleteCategory = async (categoryId: string) => {
  const response = await privateApiService.delete(`/categories/${categoryId}`);
  return response.data;
};

// Fetch all categories by restaurant ID (with token)
export const getAllCategoriesByRestaurantId = async (restaurantId: string) => {
  const response = await privateApiService.get(
    `/categories/restaurant/${restaurantId}`
  );
  return response.data;
};

// Fetch all categories by restaurant ID (public API)
export const getAllCategoriesByRestaurantIdOpenApi = async (
  restaurantId: string
) => {
  const response = await publicApiService.get(
    `/categories/restaurant/${restaurantId}`
  );
  return response.data;
};
