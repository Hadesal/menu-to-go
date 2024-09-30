import privateApiService from "./services/privateApiService";
import { ProductDetailsData } from "@dataTypes/ProductDetailsDataTypes";

// Fetch product details by product ID
export const getProductDetailsByProductId = async (productId: string) => {
  try {
    const response = await privateApiService.get(
      `/products/${productId}/details`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Add product details to a specific product
export const addProductDetails = async (
  productId: string,
  productDetails: ProductDetailsData
) => {
  try {
    const response = await privateApiService.post(
      `/products/${productId}/details`,
      productDetails
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update product details for a specific product
export const updateProductDetails = async (
  productId: string,
  updatedProductDetails: ProductDetailsData
) => {
  try {
    const response = await privateApiService.put(
      `/products/${productId}/details`,
      updatedProductDetails
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Delete product details for a specific product
export const deleteProductDetails = async (productId: string) => {
  try {
    const response = await privateApiService.delete(
      `/products/${productId}/details`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
