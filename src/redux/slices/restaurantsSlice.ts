/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RestaurantData,
  UserUiPreferences,
  ViewType,
} from "../../DataTypes/RestaurantObject";
import {
  createRestaurant as apiCreateRestaurant,
  updateRestaurant as apiUpdateRestaurant,
  deleteRestaurant as apiDeleteRestaurant,
  getAllRestaurantsByUserId as apiFetchRestaurants,
} from "../../services/api/restaurantCrud";
import { addCategory, deleteCategory, updateCategory } from "./categorySlice";
import { createProduct, modifyProduct, removeProduct } from "./productSlice";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
import { ProductData } from "../../DataTypes/ProductDataTypes";
export interface RestaurantState {
  restaurantList: RestaurantData[];
  selectedRestaurant: RestaurantData;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: RestaurantState = {
  restaurantList: [],
  selectedRestaurant: {
    id: "",
    name: "",
    categories: [],
    table: [],
    userUiPreferences: {
      colors: {
        primaryColor: "#A4755D",
        secondaryColor: "#D9B18F",
        effectedSpace: "Text & Background",
      },
      fontType: "",
      categoryShape: "",
      contactLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
      },
      ingredientViewType: ViewType.GRID,
      itemsViewType: ViewType.GRID,
    },
  },
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchAllRestaurants = createAsyncThunk(
  "restaurants/fetchAllRestaurants",
  async ({ userID }: { userID: string }, { rejectWithValue }) => {
    try {
      const response = await apiFetchRestaurants(userID);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching restaurants"
      );
    }
  }
);

export const addRestaurant = createAsyncThunk(
  "restaurants/addRestaurant",
  async (
    { restaurant }: { restaurant: RestaurantData },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiCreateRestaurant(restaurant);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error adding restaurant");
    }
  }
);

export const editRestaurant = createAsyncThunk(
  "restaurants/editRestaurant",
  async (
    { restaurant }: { restaurant: RestaurantData },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiUpdateRestaurant(restaurant, restaurant.id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error editing restaurant"
      );
    }
  }
);

export const deleteRestaurant = createAsyncThunk(
  "restaurants/deleteRestaurant",
  async ({ restaurantId }: { restaurantId: string }, { rejectWithValue }) => {
    try {
      await apiDeleteRestaurant(restaurantId);
      return restaurantId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error deleting restaurant"
      );
    }
  }
);

export const RestaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurantList: (state, action: PayloadAction<RestaurantData[]>) => {
      state.restaurantList = action.payload;
    },
    setSelectedRestaurant: (state, action: PayloadAction<RestaurantData>) => {
      state.selectedRestaurant = action.payload;
    },
    clearSuccessMessage: (state, action: PayloadAction<any>) => {
      state.successMessage = action.payload;
    },
    clearErrorMessage: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    updateRestaurantUserUiPreferences: (
      state,
      action: PayloadAction<UserUiPreferences>
    ) => {
      state.selectedRestaurant.userUiPreferences = action.payload;
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
        state.selectedRestaurant = action.payload[0];
        state.loading = false;
      })
      .addCase(fetchAllRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.restaurantList.push(action.payload);
        state.loading = false;
        state.successMessage = "Restaurant created successfully!";
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false;
        // state.error = action?.payload.message || action.payload;
        state.error =
          action.payload?.message === "Restaurant with this name already exists"
            ? action.payload?.message
            : "Failed to create restaurant!";
      })
      .addCase(editRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(editRestaurant.fulfilled, (state, action) => {
        state.restaurantList = state.restaurantList.map((restaurant) =>
          restaurant.id === action.payload.id ? action.payload : restaurant
        );
        state.loading = false;
        state.successMessage = "Restaurant updated successfully!";
      })
      .addCase(editRestaurant.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload as string;
        state.error = "Failed to create restaurant!";
      })
      .addCase(deleteRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurantList = state.restaurantList.filter(
          (restaurant) => restaurant.id !== action.payload
        );
        state.loading = false;
        state.successMessage = "Restaurant deleted successfully!";
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload as string;
        state.error = "Failed to create restaurant!";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        const { restaurantId, category } = action.payload;
        const restaurant = state.restaurantList.find(
          (restaurant) => restaurant.id === restaurantId
        );
        if (restaurant) {
          restaurant.categories = [...restaurant.categories, category];

          if (state.selectedRestaurant?.id === restaurantId) {
            state.selectedRestaurant = { ...restaurant };
          }
          state.successMessage = "Category added successfully!";
        }
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { restaurantId, categoryId, category } = action.payload;
        const restaurant = state.restaurantList.find(
          (restaurant) => restaurant.id === restaurantId
        );

        if (restaurant) {
          // Update the specific category
          restaurant.categories = restaurant.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, ...category } : cat
          );

          // If the updated restaurant is the selected one, update selectedRestaurant
          if (state.selectedRestaurant?.id === restaurantId) {
            state.selectedRestaurant = { ...restaurant };
          }

          state.successMessage = "Category updated successfully!";
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const { restaurantId, categoryId } = action.payload;
        const restaurant = state.restaurantList.find(
          (restaurant) => restaurant.id === restaurantId
        );
        if (restaurant) {
          restaurant.categories = restaurant.categories.filter(
            (category) => category.id !== categoryId
          );

          if (state.selectedRestaurant?.id === restaurantId) {
            state.selectedRestaurant = { ...restaurant };
          }
          state.successMessage =
            "Category deleted and restaurant updated successfully!";
        }
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        const { categoryId, product } = action.payload;

        const foundCategory = state.selectedRestaurant?.categories?.find(
          (category: CategoryData) => category.id === categoryId
        );

        if (foundCategory) {
          foundCategory.products = [...(foundCategory.products || []), product];

          state.selectedRestaurant.categories =
            state.selectedRestaurant?.categories.map((category: CategoryData) =>
              category.id === categoryId ? foundCategory : category
            );
        }

        state.loading = false;
        state.successMessage = "Product added successfully!";
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        const { categoryId, productId } = action.payload;
        const foundCategory = state.selectedRestaurant?.categories?.find(
          (category: CategoryData) => category.id === categoryId
        );
        if (foundCategory) {
          foundCategory.products = foundCategory.products.filter(
            (prod: ProductData) => prod.id !== productId
          );
          state.selectedRestaurant.categories =
            state.selectedRestaurant?.categories.map((category: CategoryData) =>
              category.id === categoryId ? foundCategory : category
            );
        }
        state.loading = false;
        state.successMessage = "Product deleted successfully!";
      })
      .addCase(modifyProduct.fulfilled, (state, action) => {
        const { categoryId, productId, product } = action.payload;

        const foundCategory = state.selectedRestaurant?.categories?.find(
          (category: CategoryData) => category.id === categoryId
        );

        if (foundCategory) {
          foundCategory.products = foundCategory.products.map(
            (prod: ProductData) => (prod.id === productId ? product : prod)
          );

          state.selectedRestaurant.categories =
            state.selectedRestaurant.categories.map((category: CategoryData) =>
              category.id === categoryId ? foundCategory : category
            );
        }

        state.loading = false;
        state.successMessage = "Product updated successfully!";
      });
  },
});

export const {
  setRestaurantList,
  setSelectedRestaurant,
  clearSuccessMessage,
  clearErrorMessage,
  updateRestaurantUserUiPreferences,
} = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
