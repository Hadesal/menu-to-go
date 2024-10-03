/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  createMultipleCategories,
} from "@api/categoryCrud";
import { getErrorMessage } from "@utils/errorHandler";
import { CategoryData } from "@dataTypes/CategoryDataTypes";

// Add a category to a specific restaurant
export const addCategoryToRestaurant = createAsyncThunk(
  "restaurants/addCategory",
  async (
    { restaurantId, categoryData }: { restaurantId: string; categoryData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await createCategory(restaurantId, categoryData);
      return { restaurantId, category: response };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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
      const response = await updateCategory(
        restaurantId,
        categoryId,
        updatedCategory
      );
      return { restaurantId, categoryId, updatedCategory: response };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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
      await deleteCategory(categoryId);
      return { restaurantId, categoryId };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
// Add a list of categories to a specific restaurant
export const addCategoriesToRestaurant = createAsyncThunk(
  "restaurants/addCategories",
  async (
    {
      restaurantId,
      categoriesData,
    }: { restaurantId: string; categoriesData: CategoryData[] },
    { rejectWithValue }
  ) => {
    try {
      // Use createMultipleCategories API to add all categories at once
      const response = await createMultipleCategories(
        restaurantId,
        categoriesData
      );
      return { restaurantId, categories: response };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
