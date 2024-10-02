import privateApiService from "./services/privateApiService";
import { ExtrasData } from "@dataTypes/ProductDataTypes";

// Fetch all extras by product details ID
export const getAllExtrasByProductDetailsId = async (
  productDetailsId: number
) => {
  try {
    const response = await privateApiService.get(
      `/productDetails/${productDetailsId}/extras`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Add a new extra to a specific product details ID
export const addExtra = async (productDetailsId: number, extra: ExtrasData) => {
  try {
    const response = await privateApiService.post(
      `/productDetails/${productDetailsId}/extras`,
      extra
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Fetch a specific extra by product details ID and extra ID
export const getExtraByIdAndProductDetailsId = async (
  productDetailsId: number,
  id: number
) => {
  try {
    const response = await privateApiService.get(
      `/productDetails/${productDetailsId}/extras/${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Update a specific extra by product details ID and extra ID
export const updateExtra = async (
  productDetailsId: number,
  id: number,
  updatedExtra: ExtrasData
) => {
  try {
    const response = await privateApiService.put(
      `/productDetails/${productDetailsId}/extras/${id}`,
      updatedExtra
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Delete a specific extra by product details ID and extra ID
export const deleteExtra = async (productDetailsId: number, id: number) => {
  try {
    const response = await privateApiService.delete(
      `/productDetails/${productDetailsId}/extras/${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
