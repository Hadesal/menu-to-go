/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import privateApiService from "@api/services/privateApiService";

// Add a category to a specific restaurant
export const addCategoryToRestaurant = createAsyncThunk(
  "restaurants/addCategory",
  async (
    { restaurantId, categoryData }: { restaurantId: string; categoryData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.post(
        `/categories/${restaurantId}`,
        categoryData
      );
      return { restaurantId, category: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update a category in a specific restaurant
export const editCategoryInRestaurant = createAsyncThunk(
  "restaurants/editCategory",
  async (
    {
      restaurantId,
      categoryId,
      updatedCategory,
    }: {
      restaurantId: string;
      categoryId: string;
      updatedCategory: CategoryData;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.put(
        `/categories/${categoryId}/${restaurantId}`,
        updatedCategory
      );
      return { restaurantId, categoryId, updatedCategory: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Remove a category from a restaurant
export const removeCategoryFromRestaurant = createAsyncThunk(
  "restaurants/removeCategory",
  async (
    { restaurantId, categoryId }: { restaurantId: string; categoryId: string },
    { rejectWithValue }
  ) => {
    try {
      await privateApiService.delete(`/categories/${categoryId}`);
      return { restaurantId, categoryId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
