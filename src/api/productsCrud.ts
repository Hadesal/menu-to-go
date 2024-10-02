import privateApiService from "./services/privateApiService";
import { ProductData } from "@dataTypes/ProductDataTypes";

// Fetch all products by category ID
export const getAllProductsByCategoryId = async (categoryId: string) => {
  try {
    const response = await privateApiService.get(
      `/categories/${categoryId}/products`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Add a new product to a specific category
export const addProduct = async (
  categoryId: string | undefined,
  product: ProductData
) => {
  try {
    const response = await privateApiService.post(
      `/categories/${categoryId}/products`,
      product
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Add multiple products to a specific category
export const addProductList = async (
  categoryId: string | undefined,
  products: ProductData[]
) => {
  try {
    const response = await privateApiService.post(
      `/categories/${categoryId}/products/list`,
      products
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Fetch a specific product by category and product ID
export const getProductById = async (categoryId: string, productId: string) => {
  try {
    const response = await privateApiService.get(
      `/categories/${categoryId}/products/${productId}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update a specific product by category and product ID
export const updateProduct = async (
  categoryId: string | undefined,
  productId: string,
  updatedProduct: ProductData
) => {
  try {
    const response = await privateApiService.put(
      `/categories/${categoryId}/products/${productId}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Delete a specific product by category and product ID
export const deleteProduct = async (
  categoryId: string | undefined,
  productIds: string[]
) => {
  try {
    const response = await privateApiService.delete(
      `/categories/${categoryId}/products`, // Endpoint
      { data: productIds } // Send productIds wrapped in a data object
    );

    return response.data; // Return the response data
  } catch (error) {
    return Promise.reject(error);
  }
};
