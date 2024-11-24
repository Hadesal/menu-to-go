import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductData } from "@dataTypes/ProductDataTypes";
import privateApiService from "@api/services/privateApiService";

// Fetch all products by category ID
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await privateApiService.get(
        `/categories/${categoryId}/products`
      );
      return { categoryId, products: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Add a product to a specific category
export const addProductToCategory = createAsyncThunk(
  "products/addToCategory",
  async (
    {
      categoryId,
      productData,
    }: { categoryId: string; productData: ProductData },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.post(
        `/categories/${categoryId}/products`,
        productData
      );
      return { categoryId, product: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProductListToCategory = createAsyncThunk(
  "products/addListToCategory",
  async (
    {
      categoryId,
      productList,
    }: {
      categoryId: string;
      productList: ProductData[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.post(
        `/categories/${categoryId}/products/list`,
        productList
      );
      return { categoryId, product: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update a product in a specific category
export const updateProductInCategory = createAsyncThunk(
  "products/updateInCategory",
  async (
    {
      categoryId,
      productId,
      updatedProduct,
    }: { categoryId: string; productId: string; updatedProduct: ProductData },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.put(
        `/categories/${categoryId}/products/${productId}`,
        updatedProduct
      );
      return { categoryId, productId, updatedProduct: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Remove a product from a specific category
export const removeProductFromCategory = createAsyncThunk(
  "products/removeFromCategory",
  async (
    { categoryId, productId }: { categoryId: string; productId: string[] },
    { rejectWithValue }
  ) => {
    try {
      await privateApiService.delete(
        `/categories/${categoryId}/products`, // Endpoint
        { data: productId }
      );
      return { categoryId, productId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


// Reorder categories for a specific restaurant
export const reorderProductsForRestaurant = createAsyncThunk(
  "restaurants/reorderProducts",
  async (
    {
      categoryId,
      reorderedProductIds: reorderedCategoryIds,
    }: {
      categoryId: string;
      reorderedProductIds: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.put(
        `/categories/${categoryId}/products/reorder`,
        reorderedCategoryIds
      );
      return { categoryId, reorderedProducts: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);