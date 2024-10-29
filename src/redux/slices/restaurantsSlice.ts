import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllRestaurants,
  fetchRestaurantById,
  addRestaurant,
  editRestaurant,
  removeRestaurant,
} from "../thunks/restaurantThunks";
import {
  addCategoryToRestaurant,
  editCategoryInRestaurant,
  removeCategoryFromRestaurant,
} from "../thunks/categoryThunks";
import {
  fetchProductsByCategory,
  addProductToCategory,
  updateProductInCategory,
  removeProductFromCategory,
} from "../thunks/productThunks";
import { RestaurantData, UserUiPreferences } from "@dataTypes/RestaurantObject";
import { RestaurantState } from "@redux/slicesInterfaces";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";

const initialState: RestaurantState = {
  restaurantList: [],
  selectedRestaurant: null!,
  selectedCategory: null,
  selectedProduct: null,
  restaurantLoading: false,
  categoryLoading: false,
  productLoading: false,
  error: null,
  categoryError: null,
  productError: null,
  successMessage: null,
  selectedProductsIDs: [],
};

const isRejectedAction = (action: Action): action is PayloadAction<string> => {
  return action.type.endsWith("/rejected");
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    clearRestaurantError(state) {
      state.error = null;
    },
    clearCategoryError(state) {
      state.categoryError = null;
    },
    clearProductError(state) {
      state.productError = null;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
    setSelectedCategory(state, action: PayloadAction<CategoryData | null>) {
      state.selectedCategory = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<ProductData | null>) {
      state.selectedProduct = action.payload;
    },
    setSelectedRestaurant(state, action: PayloadAction<RestaurantData | null>) {
      state.selectedRestaurant = action.payload;
      state.successMessage = null;
      state.error = null;
    },
    updateRestaurantUserUiPreferences: (
      state,
      action: PayloadAction<UserUiPreferences>
    ) => {
      state.selectedRestaurant!.userUiPreferences = action.payload;
    },
    setSelectedProductsIDs(state, action: PayloadAction<string[]>) {
      state.selectedProductsIDs = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Pending state for restaurant-related thunks
    builder.addCase(fetchAllRestaurants.pending, (state) => {
      state.restaurantLoading = true;
    });
    builder.addCase(fetchRestaurantById.pending, (state) => {
      state.restaurantLoading = true;
    });
    builder.addCase(addRestaurant.pending, (state) => {
      state.restaurantLoading = true;
      state.successMessage = null;
      state.error = null;
    });
    builder.addCase(editRestaurant.pending, (state) => {
      state.restaurantLoading = true;
      state.successMessage = null;
      state.error = null;
    });
    builder.addCase(removeRestaurant.pending, (state) => {
      state.restaurantLoading = true;
      state.successMessage = null;
      state.error = null;
    });

    // Pending state for category-related thunks
    builder.addCase(addCategoryToRestaurant.pending, (state) => {
      state.categoryLoading = true;
    });
    builder.addCase(editCategoryInRestaurant.pending, (state) => {
      state.categoryLoading = true;
    });
    builder.addCase(removeCategoryFromRestaurant.pending, (state) => {
      state.categoryLoading = true;
    });

    // Pending state for product-related thunks
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(addProductToCategory.pending, (state) => {
      state.productLoading = true;
      state.successMessage = null;
      state.error = null;
    });
    builder.addCase(updateProductInCategory.pending, (state) => {
      state.productLoading = true;
      state.successMessage = null;
      state.error = null;
    });
    builder.addCase(removeProductFromCategory.pending, (state) => {
      state.productLoading = true;
      state.successMessage = null;
      state.error = null;
    });

    // Fulfilled states for restaurant-related thunks
    builder.addCase(
      fetchAllRestaurants.fulfilled,
      (
        state,
        action: PayloadAction<{ data: RestaurantData[]; message: string }>
      ) => {
        state.restaurantList = action.payload.data;
        state.successMessage = action.payload.message;
        state.restaurantLoading = false;
        if (state.restaurantList.length > 0) {
          state.selectedRestaurant = state.restaurantList[0];
        }
      }
    );
    builder.addCase(
      fetchRestaurantById.fulfilled,
      (
        state,
        action: PayloadAction<{ data: RestaurantData; message: string }>
      ) => {
        state.selectedRestaurant = action.payload.data;
        state.successMessage = action.payload.message;
        state.restaurantLoading = false;
      }
    );
    builder.addCase(
      addRestaurant.fulfilled,
      (
        state,
        action: PayloadAction<{ data: RestaurantData; message: string }>
      ) => {
        state.restaurantList.push(action.payload.data);
        state.successMessage = action.payload.message;
        state.restaurantLoading = false;
      }
    );
    builder.addCase(
      editRestaurant.fulfilled,
      (
        state,
        action: PayloadAction<{ data: RestaurantData; message: string }>
      ) => {
        const index = state.restaurantList.findIndex(
          (r) => r.id === action.payload.data.id
        );
        if (index !== -1) {
          state.restaurantList[index] = action.payload.data;
        }
        state.successMessage = action.payload.message;
        state.restaurantLoading = false;
      }
    );
    builder.addCase(
      removeRestaurant.fulfilled,
      (
        state,
        action: PayloadAction<{
          response: { message: string };
          restaurantId: string;
        }>
      ) => {
        console.log(action.payload);
        state.restaurantList = state.restaurantList.filter(
          (r) => r.id !== action.payload.restaurantId
        );
        state.successMessage = action.payload.response.message;
        state.restaurantLoading = false;

        if (state.selectedRestaurant?.id === action.payload.restaurantId) {
          state.selectedRestaurant =
            state.restaurantList.length > 0 ? state.restaurantList[0] : null;
        }
      }
    );

    // Fulfilled states for category-related thunks
    builder.addCase(
      addCategoryToRestaurant.fulfilled,
      (
        state,
        action: PayloadAction<{ restaurantId: string; category: CategoryData }>
      ) => {
        const restaurant = state.restaurantList.find(
          (r) => r.id === action.payload.restaurantId
        );

        if (restaurant) {
          restaurant.categories = [
            ...restaurant.categories,
            action.payload.category,
          ];

          if (state.selectedRestaurant?.id === action.payload.restaurantId) {
            state.selectedRestaurant = {
              ...state.selectedRestaurant,
              categories: [
                ...state.selectedRestaurant.categories,
                action.payload.category,
              ],
            };
          }
        }

        if (state.selectedProductsIDs.length > 0) {
          state.selectedProductsIDs = [];
        }
        state.successMessage = "Category added successfully!";
        state.categoryLoading = false;
        state.selectedCategory = action.payload.category;
      }
    );
    builder.addCase(
      editCategoryInRestaurant.fulfilled,
      (
        state,
        action: PayloadAction<{
          restaurantId: string;
          categoryId: string;
          updatedCategory: CategoryData;
        }>
      ) => {
        const restaurant = state.restaurantList.find(
          (r) => r.id === action.payload.restaurantId
        );

        if (restaurant) {
          const categoryIndex = restaurant.categories.findIndex(
            (c) => c.id === action.payload.categoryId
          );

          if (categoryIndex !== -1) {
            restaurant.categories[categoryIndex] =
              action.payload.updatedCategory;

            if (state.selectedRestaurant?.id === action.payload.restaurantId) {
              state.selectedRestaurant = {
                ...state.selectedRestaurant,
                categories: state.selectedRestaurant.categories.map((cat) =>
                  cat.id === action.payload.categoryId
                    ? action.payload.updatedCategory
                    : cat
                ),
              };
            }
          }
        }

        state.selectedCategory = action.payload.updatedCategory;
        state.successMessage = "Category updated successfully!";
        state.categoryLoading = false;
      }
    );
    builder.addCase(
      removeCategoryFromRestaurant.fulfilled,
      (
        state,
        action: PayloadAction<{ restaurantId: string; categoryId: string }>
      ) => {
        const restaurant = state.restaurantList.find(
          (r) => r.id === action.payload.restaurantId
        );

        if (restaurant) {
          restaurant.categories = restaurant.categories.filter(
            (c) => c.id !== action.payload.categoryId
          );

          if (state.selectedRestaurant?.id === action.payload.restaurantId) {
            state.selectedRestaurant = {
              ...state.selectedRestaurant,
              categories: state.selectedRestaurant.categories.filter(
                (c) => c.id !== action.payload.categoryId
              ),
            };
          }
        }

        if (
          state.selectedRestaurant &&
          state.selectedRestaurant?.categories.length > 0
        ) {
          state.selectedCategory = state.selectedRestaurant?.categories[0];
        } else {
          state.selectedCategory = null;
        }
        state.successMessage = "Category removed successfully!";
        state.categoryLoading = false;
      }
    );
    // Fulfilled states for product-related thunks
    builder.addCase(
      fetchProductsByCategory.fulfilled,
      (
        state,
        action: PayloadAction<{ categoryId: string; products: ProductData[] }>
      ) => {
        state.restaurantList.forEach((restaurant) => {
          const category = restaurant.categories.find(
            (cat) => cat.id === action.payload.categoryId
          );
          if (category) {
            category.products = action.payload.products;
          }
        });
        state.productLoading = false;
      }
    );
    builder.addCase(
      addProductToCategory.fulfilled,
      (
        state,
        action: PayloadAction<{ categoryId: string; product: ProductData }>
      ) => {
        state.restaurantList.forEach((restaurant) => {
          const category = restaurant.categories.find(
            (cat) => cat.id === action.payload.categoryId
          );
          if (category) {
            category.products = [
              ...(category.products ?? []),
              action.payload.product,
            ];

            if (
              state.selectedRestaurant &&
              state.selectedRestaurant.id === restaurant.id
            ) {
              const selectedCategory = state.selectedRestaurant.categories.find(
                (cat) => cat.id === action.payload.categoryId
              );
              if (selectedCategory) {
                selectedCategory.products = [
                  ...(selectedCategory.products ?? []),
                  action.payload.product,
                ];
              }
            }
          }
        });

        if (state.selectedCategory && state.selectedCategory.products) {
          state.selectedCategory.products = [
            ...state.selectedCategory.products,
            action.payload.product,
          ];
        }
        state.successMessage = "Product added successfully!";
        state.productLoading = false;
      }
    );
    builder.addCase(
      updateProductInCategory.fulfilled,
      (
        state,
        action: PayloadAction<{
          categoryId: string;
          productId: string;
          updatedProduct: ProductData;
        }>
      ) => {
        state.restaurantList.forEach((restaurant) => {
          const category = restaurant.categories.find(
            (cat) => cat.id === action.payload.categoryId
          );
          if (category && category.products) {
            const productIndex = category.products.findIndex(
              (prod) => prod.id === action.payload.productId
            );
            if (productIndex !== -1) {
              // Update the product in the restaurant list
              category.products[productIndex] = action.payload.updatedProduct;
            }
          }

          // Check if selectedRestaurant is not null before updating
          if (
            state.selectedRestaurant &&
            state.selectedRestaurant.id === restaurant.id
          ) {
            const selectedCategory = state.selectedRestaurant.categories.find(
              (cat) => cat.id === action.payload.categoryId
            );
            if (selectedCategory && selectedCategory.products) {
              const selectedProductIndex = selectedCategory.products.findIndex(
                (prod) => prod.id === action.payload.productId
              );
              if (selectedProductIndex !== -1) {
                // Update the product in the selectedRestaurant
                selectedCategory.products[selectedProductIndex] =
                  action.payload.updatedProduct;
              }

              if (state.selectedCategory && state.selectedCategory.products) {
                state.selectedCategory.products[selectedProductIndex] =
                  action.payload.updatedProduct;
              }
            }
          }
        });

        state.successMessage = "Product updated successfully!";
        state.productLoading = false;
      }
    );

    builder.addCase(
      removeProductFromCategory.fulfilled,
      (
        state,
        action: PayloadAction<{ categoryId: string; productId: string[] }>
      ) => {
        state.restaurantList.forEach((restaurant) => {
          const category = restaurant.categories.find(
            (cat) => cat.id === action.payload.categoryId
          );
          if (category && category.products) {
            // Update the products in the restaurant list
            category.products = category.products.filter(
              (prod) => !action.payload.productId.includes(prod.id as string)
            );
          }

          // Check if selectedRestaurant exists before updating it
          if (
            state.selectedRestaurant &&
            state.selectedRestaurant.id === restaurant.id
          ) {
            const selectedCategory = state.selectedRestaurant.categories.find(
              (cat) => cat.id === action.payload.categoryId
            );
            if (selectedCategory && selectedCategory.products) {
              // Update the products in the selectedRestaurant
              selectedCategory.products = selectedCategory.products.filter(
                (prod) => !action.payload.productId.includes(prod.id as string)
              );
            }
          }
        });

        if (state.selectedCategory && state.selectedCategory.products) {
          state.selectedCategory.products =
            state.selectedCategory.products.filter(
              (prod) => !action.payload.productId.includes(prod.id as string)
            );
        }

        state.selectedProductsIDs = state.selectedProductsIDs.filter(
          (id) => !action.payload.productId.includes(id as string)
        );
        state.successMessage = "Product removed successfully!";
        state.productLoading = false;
      }
    );
    // Handle rejected state for all async thunks
    builder.addMatcher(isRejectedAction, (state, action) => {
      state.restaurantLoading = false;
      state.categoryLoading = false;
      state.productLoading = false;
      console.log(action.payload);
      state.error = action.payload || "Something went wrong!";
    });
  },
});

export const {
  clearRestaurantError,
  clearSuccessMessage,
  setSelectedCategory,
  setSelectedProduct,
  setSelectedRestaurant,
  clearProductError,
  clearCategoryError,
  updateRestaurantUserUiPreferences,
  setSelectedProductsIDs,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
