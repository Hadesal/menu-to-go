import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import {
  createRestaurant as apiCreateRestaurant,
  updateRestaurant as apiUpdateRestaurant,
  deleteRestaurant as apiDeleteRestaurant,
  getAllRestaurantsByUserId as apiFetchRestaurants,
} from "../../services/api/restaurantCrud";
import {
  createCategory as apiCreateCategory,
  deleteCategory as ApiDeleteCategory,
  updateCategory as apiUpdateCategory,
} from "../../services/api/categoryCrud";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";

export interface RestaurantState {
  restaurantList: RestaurantData[];
  selectedCategory: any;
  loading: boolean;
  error: string | null;
  categoryError: string | null;
  successMessage: string | null;
}

const initialState: RestaurantState = {
  restaurantList: [],
  selectedCategory: {},
  loading: false,
  error: null,
  categoryError: null,
  successMessage: null,
};

export const fetchAllRestaurants = createAsyncThunk(
  "restaurantsData/fetchAllRestaurants",
  async ({ userID }: { userID: string }, { rejectWithValue }) => {
    try {
      const response = await apiFetchRestaurants(userID);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching restaurants"
      );
    }
  }
);

export const addRestaurant = createAsyncThunk(
  "restaurantsData/addRestaurant",
  async (
    { restaurant }: { restaurant: RestaurantData },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiCreateRestaurant(restaurant);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Error adding restaurant");
    }
  }
);

export const editRestaurant = createAsyncThunk(
  "restaurantsData/editRestaurant",
  async (
    { restaurant }: { restaurant: RestaurantData },
    { rejectWithValue }
  ) => {
    try {
      console.log(restaurant);
      const response = await apiUpdateRestaurant(restaurant, restaurant.id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error editing restaurant"
      );
    }
  }
);

export const deleteRestaurant = createAsyncThunk(
  "restaurantsData/deleteRestaurant",
  async ({ restaurantId }: { restaurantId: string }, { rejectWithValue }) => {
    try {
      await apiDeleteRestaurant(restaurantId);
      return restaurantId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error deleting restaurant"
      );
    }
  }
);

export const addCategory = createAsyncThunk(
  "restaurantsData/addCategory",
  async (
    {
      restaurantId,
      category,
    }: { restaurantId: string; category: CategoryData },
    { rejectWithValue }
  ) => {
    try {
      console.log(restaurantId);
      console.log(category);
      const response = await apiCreateCategory(restaurantId, category);
      console.log(response);
      return { restaurantId, category: response };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Error adding category");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "restaurantsData/editCategory",
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
      return { restaurantId, categoryId, category }; // Return both IDs for use in the reducer
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting category");
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "restaurantsData/deleteCategory",
  async (
    { restaurantId, categoryId }: { restaurantId: string; categoryId: string },
    { rejectWithValue }
  ) => {
    try {
      await ApiDeleteCategory(categoryId);
      return { restaurantId, categoryId }; // Return both IDs for use in the reducer
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting category");
    }
  }
);

export const RestaurantSlice = createSlice({
  name: "restaurantsData",
  initialState,
  reducers: {
    setRestaurantList: (state, action: PayloadAction<RestaurantData[]>) => {
      state.restaurantList = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<any>) => {
      state.selectedCategory = action.payload;
    },
    clearSuccessMessage: (state, action: PayloadAction<any>) => {
      state.successMessage = action.payload;
    },
    clearCategoryErrorMessage: (state, action: PayloadAction<any>) => {
      state.categoryError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.restaurantList = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        console.log(action);
        state.restaurantList.push(action.payload);
        state.loading = false;
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editRestaurant.fulfilled, (state, action) => {
        state.restaurantList = state.restaurantList.map((restaurant) =>
          restaurant.id === action.payload.id ? action.payload : restaurant
        );
        state.loading = false;
      })
      .addCase(editRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurantList = state.restaurantList.filter(
          (restaurant) => restaurant.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.categoryError = null;
        state.successMessage = null; // Reset success message on pending
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        const { restaurantId, category } = action.payload;
        const restaurant = state.restaurantList.find(
          (res) => res.id === restaurantId
        );
        if (restaurant) {
          restaurant.category.push(category);
        }
        console.log(category);
        console.log("restaurant: ", restaurant);
        console.log("state: ", state.selectedCategory);
        if (Object.keys(state.selectedCategory).length === 0) {
          state.selectedCategory = category;
        }

        state.loading = false;
        state.successMessage = "Category added successfully!"; // Set success message
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.categoryError = action.payload.details || action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.categoryError = null;
        state.successMessage = null; // Set success message
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const { restaurantId, categoryId } = action.payload;
        const restaurant = state.restaurantList.find(
          (res) => res.id === restaurantId
        );
        if (restaurant) {
          restaurant.category = restaurant.category.filter(
            (category) => category.id !== categoryId
          );
        }

        // Update the selected category if it was deleted
        if (state.selectedCategory.id === categoryId) {
          state.selectedCategory = restaurant.category[0] || {}; // Set to first category or empty object
        }
        state.loading = false;
        state.successMessage = "Category deleted successfully!"; // Set success message
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.categoryError = action.payload.details || action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.categoryError = null;
        state.successMessage = null; // Set success message
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { restaurantId, categoryId, category } = action.payload;
        const restaurant = state.restaurantList.find(
          (res) => res.id === restaurantId
        );
        if (restaurant) {
          restaurant.category = restaurant.category.map(
            (updatedCategory: CategoryData) =>
              updatedCategory.id === categoryId
                ? { ...updatedCategory, ...category }
                : updatedCategory
          );

          // Update selectedCategory if it matches the updated category
          if (
            state.selectedCategory &&
            state.selectedCategory.id === categoryId
          ) {
            state.selectedCategory = { ...state.selectedCategory, ...category };
          }
        }
        state.loading = false;
        state.successMessage = "Category updated successfully!";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.categoryError = action.payload.details || action.payload;
      });
  },
});

export const {
  setRestaurantList,
  setSelectedCategory,
  clearSuccessMessage,
  clearCategoryErrorMessage,
} = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
