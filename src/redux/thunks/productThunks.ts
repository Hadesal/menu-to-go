import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProductsByCategoryId,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@api/productsCrud";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { getErrorMessage } from "@utils/errorHandler";

// Fetch all products by category ID
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await getAllProductsByCategoryId(categoryId);
      return { categoryId, products: response };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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
      const response = await addProduct(categoryId, productData);
      return { categoryId, product: response };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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
      const response = await updateProduct(
        categoryId,
        productId,
        updatedProduct
      );
      return { categoryId, productId, updatedProduct: response };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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
      await deleteProduct(categoryId, productId);
      return { categoryId, productId };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
