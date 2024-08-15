import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createCategory as apiCreateCategory,
  deleteCategory as apiDeleteCategory,
  updateCategory as apiUpdateCategory,
} from "../../services/api/categoryCrud";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";

export interface CategoryState {
  selectedCategory: CategoryData | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: CategoryState = {
  selectedCategory: null,
  loading: false,
  error: null,
  successMessage: null,
};

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (
    {
      restaurantId,
      category,
    }: { restaurantId: string; category: CategoryData },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiCreateCategory(restaurantId, category);
      return { restaurantId, category: response };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error adding category");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/editCategory",
  async (
    {
      restaurantId,
      categoryId,
      category,
    }: { restaurantId: string; categoryId: string; category: CategoryData },
    { rejectWithValue }
  ) => {
    try {
      await apiUpdateCategory(restaurantId, categoryId, category);
      return { restaurantId, categoryId, category };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error updating category");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (
    { restaurantId, categoryId }: { restaurantId: string; categoryId: string },
    { rejectWithValue }
  ) => {
    try {
      await apiDeleteCategory(categoryId);
      return { restaurantId, categoryId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error deleting category");
    }
  }
);

export const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory: (
      state,
      action: PayloadAction<CategoryData | null>
    ) => {
      state.selectedCategory = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearErrorMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.selectedCategory = action.payload.category;
        state.loading = false;
        state.successMessage = "Category added successfully!";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (state.selectedCategory?.id === action.payload.categoryId) {
          state.selectedCategory = {
            ...state.selectedCategory,
            ...action.payload.category,
          };
        }
        state.loading = false;
        state.successMessage = "Category updated successfully!";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (state.selectedCategory?.id === action.payload.categoryId) {
          state.selectedCategory = null;
        }
        state.loading = false;
        state.successMessage = "Category deleted successfully!";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      });
  },
});

export const { setSelectedCategory, clearSuccessMessage, clearErrorMessage } =
  CategorySlice.actions;

export default CategorySlice.reducer;
