import privateApiService from "./services/privateApiService";
import { IngredientData } from "@dataTypes/ProductDataTypes";

// Fetch all ingredients by product details ID
export const getAllIngredientsByProductDetailsId = async (
  productDetailsId: number
) => {
  try {
    const response = await privateApiService.get(
      `/productDetails/${productDetailsId}/ingredients`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Add an ingredient to a specific product details ID
export const addIngredient = async (
  productDetailsId: number,
  ingredient: IngredientData
) => {
  try {
    const response = await privateApiService.post(
      `/productDetails/${productDetailsId}/ingredients`,
      ingredient
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Fetch a specific ingredient by product details ID and ingredient ID
export const getIngredientByIdAndProductDetailsId = async (
  productDetailsId: number,
  id: number
) => {
  try {
    const response = await privateApiService.get(
      `/productDetails/${productDetailsId}/ingredients/${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Update a specific ingredient by product details ID and ingredient ID
export const updateIngredient = async (
  productDetailsId: number,
  id: number,
  updatedIngredient: IngredientData
) => {
  try {
    const response = await privateApiService.put(
      `/productDetails/${productDetailsId}/ingredients/${id}`,
      updatedIngredient
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Delete a specific ingredient by product details ID and ingredient ID
export const deleteIngredient = async (
  productDetailsId: number,
  id: number
) => {
  try {
    const response = await privateApiService.delete(
      `/productDetails/${productDetailsId}/ingredients/${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
