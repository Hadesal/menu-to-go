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
import {
  addProduct as ApiAddProduct,
  deleteProduct as ApiDeleteProduct,
  updateProduct as ApiEditProduct,
} from "../../services/api/productsCrud";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
import { ProductData } from "../../DataTypes/ProductDataTypes";

export interface RestaurantState {
  restaurantList: RestaurantData[];
  selectedCategory: any;
  selectedRestaurant: any;
  loading: boolean;
  error: string | null;
  // categoryError: string | null;
  successMessage: string | null;
}

const initialState: RestaurantState = {
  restaurantList: [],
  selectedCategory: {},
  selectedRestaurant: {},
  loading: false,
  error: null,
  // categoryError: null,
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
      const response = await apiCreateCategory(restaurantId, category);
      return { restaurantId, category: response };
    } catch (error) {
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

export const addProduct = createAsyncThunk(
  "restaurantsData/addProduct",
  async (
    {
      restaurantId,
      categoryId,
      product,
    }: { restaurantId: string; categoryId: string; product: ProductData },
    { rejectWithValue }
  ) => {
    try {
      const productResponseData = await ApiAddProduct(categoryId, product);
      return { restaurantId, categoryId, productResponseData }; // Return both IDs for use in the reducer
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "restaurantsData/deleteProduct",
  async (
    {
      restaurantId,
      categoryId,
      productId,
    }: { restaurantId: string; categoryId: string; productId: string },
    { rejectWithValue }
  ) => {
    try {
      await ApiDeleteProduct(categoryId, productId);
      return { restaurantId, categoryId, productId }; // Return both IDs for use in the reducer
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting product");
    }
  }
);

export const editProduct = createAsyncThunk(
  "restaurantsData/editProduct",
  async (
    {
      restaurantId,
      categoryId,
      productId,
      updatedProduct,
    }: {
      restaurantId: string;
      categoryId: string;
      productId: string;
      updatedProduct: ProductData;
    },
    { rejectWithValue }
  ) => {
    try {
      const productResponseData = await ApiEditProduct(
        categoryId,
        productId,
        updatedProduct
      );
      return { restaurantId, categoryId, productId, productResponseData }; // Return both IDs for use in the reducer
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error editing product");
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
    setSelectedRestaurant: (state, action: PayloadAction<any>) => {
      state.selectedRestaurant = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<any>) => {
      state.selectedCategory = action.payload;
    },
    clearSuccessMessage: (state, action: PayloadAction<any>) => {
      state.successMessage = action.payload;
    },
    clearErrorMessage: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
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
        state.successMessage = null;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.restaurantList.push(action.payload);
        state.loading = false;
        state.successMessage = "Restaurant created successfully!";
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null; // Reset success message on pending
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        const { restaurantId, category } = action.payload;
        const restaurant = state.restaurantList.find(
          (res) => res.id === restaurantId
        );
        if (restaurant) {
          restaurant.category.push(category);

          state.selectedRestaurant = restaurant;
        }
        if (Object.keys(state.selectedCategory).length === 0) {
          state.selectedCategory = category;
        }

        state.loading = false;
        state.successMessage = "Category added successfully!"; // Set success message
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
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
          state.selectedRestaurant = restaurant;
        }
        state.loading = false;
        state.successMessage = "Category updated successfully!";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.details || action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
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

          // Update the selected restaurant to the updated one
          state.selectedRestaurant = restaurant || null;
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
        state.error = action.payload.message || action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null; // Set success message
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        const { restaurantId, categoryId, productResponseData } =
          action.payload;
        const restaurant = state.restaurantList.find(
          (res) => res.id === restaurantId
        );
        if (restaurant) {
          // Update the restaurant's category list by removing the product from the correct category
          restaurant.category.forEach((category) => {
            if (category.id === categoryId) {
              category.products.push(productResponseData);
            }
          });

          // If the selected category is the one we just updated, update it too
          if (
            state.selectedCategory &&
            state.selectedCategory.id === categoryId
          ) {
            state.selectedCategory.products.push(productResponseData);
          }

          state.selectedRestaurant = restaurant;
        }
        state.loading = false;
        state.successMessage = "Product added successfully!";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.details || action.payload;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null; // Set success message
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const { restaurantId, categoryId, productId, productResponseData } =
          action.payload;
        const restaurant = state.restaurantList.find(
          (res) => res.id === restaurantId
        );

        if (restaurant) {
          // Find the category in which the product should be updated
          const category = restaurant.category.find(
            (cat) => cat.id === categoryId
          );

          if (category) {
            category.products = category.products.map((product) =>
              product.id === productId
                ? { ...product, ...productResponseData }
                : product
            );

            // If the selected category is the one we just updated, update it too
            if (
              state.selectedCategory &&
              state.selectedCategory.id === categoryId
            ) {
              state.selectedCategory.products =
                state.selectedCategory.products.map((product) =>
                  product.id === productId
                    ? { ...product, ...productResponseData }
                    : product
                );
            }

            state.selectedRestaurant = restaurant;
          }
        }

        state.loading = false;
        state.successMessage = "Product edited successfully!";
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.details || action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null; // Set success message
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { restaurantId, categoryId, productId } = action.payload;
        const restaurant = state.restaurantList.find(
          (res) => res.id === restaurantId
        );
        if (restaurant) {
          // Update the restaurant's category list by removing the product from the correct category
          restaurant.category.forEach((category) => {
            if (category.id === categoryId) {
              // Remove the product from the category's products list
              category.products = category.products.filter(
                (product) => product.id !== productId
              );
            }
          });

          // If the selected category is the one we just updated, update it too
          if (
            state.selectedCategory &&
            state.selectedCategory.id === categoryId
          ) {
            state.selectedCategory.products =
              state.selectedCategory.products.filter(
                (product) => product.id !== productId
              );
          }

          state.selectedRestaurant = restaurant;
        }
        state.loading = false;
        state.successMessage = "Product deleted successfully!";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      });
  },
});

export const {
  setRestaurantList,
  setSelectedCategory,
  clearSuccessMessage,
  clearErrorMessage,
  setSelectedRestaurant,
} = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
