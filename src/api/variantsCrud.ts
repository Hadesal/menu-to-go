import privateApiService from "./services/privateApiService";
import { VariantsData } from "@dataTypes/ProductDataTypes";

// Fetch all variants by product details ID
export const getAllVariantsByProductDetailsId = async (
  productDetailsId: number
) => {
  try {
    const response = await privateApiService.get(
      `/productDetails/${productDetailsId}/variants`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Add new variants to a product details ID
export const addVariants = async (
  productDetailsId: number,
  variants: VariantsData
) => {
  try {
    const response = await privateApiService.post(
      `/productDetails/${productDetailsId}/variants`,
      variants
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get a specific variant by product details ID and variant ID
export const getVariantsByIdAndProductDetailsId = async (
  productDetailsId: number,
  id: number
) => {
  try {
    const response = await privateApiService.get(
      `/productDetails/${productDetailsId}/variants/${id}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update a specific variant by product details ID and variant ID
export const updateVariants = async (
  productDetailsId: number,
  id: number,
  updatedVariants: VariantsData
) => {
  try {
    const response = await privateApiService.put(
      `/productDetails/${productDetailsId}/variants/${id}`,
      updatedVariants
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Delete a specific variant by product details ID and variant ID
export const deleteVariants = async (productDetailsId: number, id: number) => {
  try {
    const response = await privateApiService.delete(
      `/productDetails/${productDetailsId}/variants/${id}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
