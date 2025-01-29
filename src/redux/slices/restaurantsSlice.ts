import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllRestaurants,
  fetchRestaurantById,
  addRestaurant,
  editRestaurant,
  removeRestaurant,
} from "../thunks/restaurantThunks";
import {
  addCategoriesToRestaurant,
  addCategoryToRestaurant,
  editCategoryInRestaurant,
  removeCategoryFromRestaurant,
  reorderCategoriesForRestaurant,
} from "../thunks/categoryThunks";
import {
  fetchProductsByCategory,
  addProductToCategory,
  updateProductInCategory,
  removeProductFromCategory,
  reorderProductsForRestaurant,
  moveProductsToCategory,
  copyProductsToCategory,
} from "../thunks/productThunks";
import { RestaurantData, UserUiPreferences } from "@dataTypes/RestaurantObject";
import { RestaurantState } from "@redux/slicesInterfaces";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { ErrorResponseObject } from "@dataTypes/ErrorResponsObject";

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
  productActionErrorMessage: null,
  selectedProductsIDs: [],
  importingLoading: false,
};

const isRejectedAction = (
  action: Action
): action is PayloadAction<ErrorResponseObject> => {
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
    clearProductActionErrorMessage(state) {
      state.productActionErrorMessage = null;
    },
    setSelectedCategory(state, action: PayloadAction<CategoryData | null>) {
      state.selectedCategory = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<ProductData | null>) {
      state.selectedProduct = action.payload;
    },
    setSelectedRestaurant(state, action: PayloadAction<RestaurantData>) {
      state.selectedRestaurant = action.payload;
      state.successMessage = null;
      state.error = null;
    },
    updateRestaurantUserUiPreferences: (
      state,
      action: PayloadAction<UserUiPreferences>
    ) => {
      state.selectedRestaurant.userUiPreferences = action.payload;
    },
    setSelectedProductsIDs(state, action: PayloadAction<string[]>) {
      state.selectedProductsIDs = action.payload;
    },
    setImportingLoading(state, action: PayloadAction<boolean>) {
      state.importingLoading = action.payload;
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
    builder.addCase(reorderCategoriesForRestaurant.pending, (state) => {
      state.successMessage = null;
      state.error = null;
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
    builder.addCase(reorderProductsForRestaurant.pending, (state) => {
      state.productLoading = true;
      state.successMessage = null;
      state.error = null;
    });
    builder.addCase(moveProductsToCategory.pending, (state) => {
      state.productLoading = true;
      state.successMessage = null;
      state.error = null;
      state.productActionErrorMessage = null;
    });
    builder.addCase(copyProductsToCategory.pending, (state) => {
      state.productLoading = true;
      state.productLoading = true;
      state.successMessage = null;
      state.error = null;
      state.productActionErrorMessage = null;
    });
    builder.addCase(addCategoriesToRestaurant.pending, (state) => {
      state.importingLoading = true;
    });
    builder.addCase(
      addCategoriesToRestaurant.fulfilled,
      (
        state,
        action: PayloadAction<{
          categoryList: CategoryData[];
          restaurantId: string;
        }>
      ) => {
        const restaurant = state.restaurantList.find(
          (r) => r.id === action.payload.restaurantId
        );

        if (restaurant) {
          // Append the new categories to the existing ones
          restaurant.categories = [
            ...restaurant.categories,
            ...action.payload.categoryList,
          ];

          // Update the selectedRestaurant if necessary
          if (state.selectedRestaurant?.id === action.payload.restaurantId) {
            state.selectedRestaurant = {
              ...state.selectedRestaurant,
              categories: restaurant.categories,
            };
          }

          // Optionally set the first imported category as selected
          if (
            !state.selectedCategory &&
            action.payload.categoryList.length > 0
          ) {
            state.selectedCategory = action.payload.categoryList[0];
          }
        }

        state.successMessage = "Categories imported successfully!";
        state.categoryLoading = false;
        state.importingLoading = false;
      }
    );

    // Fulfilled states for restaurant-related thunks
    builder.addCase(
      fetchAllRestaurants.fulfilled,
      (
        state,
        action: PayloadAction<{ data: RestaurantData[]; message: string }>
      ) => {
        state.restaurantList = action.payload.data;
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
        editRestaurant;
        state.restaurantList = state.restaurantList.filter(
          (r) => r.id !== action.payload.restaurantId
        );
        state.successMessage = action.payload.response.message;
        state.restaurantLoading = false;

        if (state.selectedRestaurant?.id === action.payload.restaurantId) {
          state.selectedRestaurant = state.restaurantList[0];
        }
      }
    );

    // Fulfilled states for category-related thunks
    builder.addCase(
      addCategoryToRestaurant.fulfilled,
      (
        state,
        action: PayloadAction<{
          restaurantId: string;
          category: CategoryData;
          imageError?: boolean;
        }>
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
        console.log(action.payload);
        state.error = action.payload.imageError
          ? "Category image failed to upload."
          : null;
        state.successMessage = "Category added successfully!";
        state.categoryLoading = false;
        state.selectedCategory = action.payload.category;
      }
    );
    // Fulfilled states for category-related thunks
    builder.addCase(
      reorderCategoriesForRestaurant.fulfilled,
      (
        state,
        action: PayloadAction<{
          restaurantId: string;
          reorderedCategories: CategoryData[];
        }>
      ) => {
        const { restaurantId, reorderedCategories } = action.payload;

        // Update the restaurant list
        const restaurant = state.restaurantList.find(
          (r) => r.id === restaurantId
        );
        if (restaurant) {
          restaurant.categories = reorderedCategories; // Update categories in restaurant
        }

        // If the selected restaurant matches the restaurant being updated
        if (state.selectedRestaurant?.id === restaurantId) {
          state.selectedRestaurant = {
            ...state.selectedRestaurant,
            categories: reorderedCategories, // Update selected restaurant categories
          };

          // Update selected category to maintain its position in the new order
          const foundCategory = reorderedCategories.find(
            (cat) => cat.id === state.selectedCategory?.id
          );
          if (foundCategory) {
            state.selectedCategory = foundCategory; // Update to the new category object if it exists
          }
        }

        //state.successMessage = "Categories reordered successfully!";
        state.categoryLoading = false;
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
          imageError: boolean;
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
        state.error = action.payload.imageError
          ? "Category image failed to update."
          : null;
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
      reorderProductsForRestaurant.fulfilled,
      (
        state,
        action: PayloadAction<{
          categoryId: string;
          reorderedProducts: ProductData[];
        }>
      ) => {
        const { categoryId, reorderedProducts } = action.payload;

        state.restaurantList.forEach((restaurant) => {
          const category = restaurant.categories.find(
            (cat) => cat.id === action.payload.categoryId
          );
          if (category && category.products) {
            category.products = reorderedProducts;
          }

          if (
            state.selectedRestaurant &&
            state.selectedRestaurant.id === restaurant.id
          ) {
            const selectedCategory = state.selectedRestaurant.categories.find(
              (cat) => cat.id === categoryId
            );
            if (selectedCategory && selectedCategory.products) {
              selectedCategory.products = reorderedProducts;
            }
          }
        });

        state.productLoading = false;
      }
    );
    builder.addCase(
      moveProductsToCategory.fulfilled,
      (
        state,
        action: PayloadAction<{
          sourceCategoryId: string;
          targetCategoryId: string;
          productIds: string[];
          movedProducts: ProductData[];
          notMovedProductNames: string[];
        }>
      ) => {
        const {
          sourceCategoryId,
          targetCategoryId,
          movedProducts,
          notMovedProductNames,
        } = action.payload;
        // Extract the IDs of moved products
        const movedProductsIds = movedProducts.map((product) => product.id);

        state.restaurantList.forEach((restaurant) => {
          const srcCategory = restaurant.categories.find(
            (cat) => cat.id === sourceCategoryId
          );
          const trgCategory = restaurant.categories.find(
            (cat) => cat.id === targetCategoryId
          );
          if (trgCategory && trgCategory.products) {
            trgCategory.products.push(...movedProducts);
          }
          if (srcCategory && srcCategory.products) {
            srcCategory.products = srcCategory.products.filter((product) => {
              if (product.id) {
                return !movedProductsIds.includes(product.id);
              }
            });
          }

          if (state.selectedCategory && state.selectedCategory.products) {
            state.selectedCategory.products =
              state.selectedCategory.products.filter((product) => {
                if (product.id) {
                  return !movedProductsIds.includes(product.id);
                }
              });
          }

          if (
            state.selectedRestaurant &&
            state.selectedRestaurant.id === restaurant.id
          ) {
            const selectedCategory = state.selectedRestaurant.categories.find(
              (cat) => cat.id === sourceCategoryId
            );
            const moveToCategory = state.selectedRestaurant.categories.find(
              (cat) => cat.id === targetCategoryId
            );

            if (moveToCategory && moveToCategory.products) {
              moveToCategory.products.push(...movedProducts);
            }
            if (selectedCategory && selectedCategory.products) {
              selectedCategory.products = selectedCategory.products.filter(
                (product) => {
                  if (product.id) {
                    return !movedProductsIds.includes(product.id);
                  }
                }
              );
            }
          }
        });

        let targetCategoryName = "";

        for (const restaurant of state.restaurantList) {
          const trgCategory = restaurant.categories.find(
            (cat) => cat.id === targetCategoryId
          );
          if (trgCategory) {
            targetCategoryName = trgCategory.name || "";
            break; // Exit the loop once the target category is found
          }
        }

        state.productLoading = false;
        state.successMessage = "Products moved successfully!";

        if (notMovedProductNames.length > 0) {
          const productWord =
            notMovedProductNames.length === 1 ? "Product" : "Products";
          state.productActionErrorMessage = `${productWord} '${notMovedProductNames.join(
            ", "
          )}' could not be moved because it already exists in ${
            targetCategoryName || "the other category"
          }.`;
        }

        state.selectedProductsIDs = [];
      }
    );

    builder.addCase(
      copyProductsToCategory.fulfilled,
      (
        state,
        action: PayloadAction<{
          sourceCategoryId: string;
          targetCategoryId: string;
          productIds: string[];
          copiedProducts: ProductData[];
          notCopiedProductNames: string[];
        }>
      ) => {
        const { targetCategoryId, copiedProducts, notCopiedProductNames } =
          action.payload;

        state.restaurantList.forEach((restaurant) => {
          const targetCategory = restaurant.categories.find(
            (cat) => cat.id === targetCategoryId
          );

          if (targetCategory && targetCategory.products) {
            // Add copied products to the target category
            targetCategory.products.push(...copiedProducts);
          }

          if (
            state.selectedRestaurant &&
            state.selectedRestaurant.id === restaurant.id
          ) {
            const targetSelectedCategory =
              state.selectedRestaurant.categories.find(
                (cat) => cat.id === targetCategoryId
              );

            if (targetSelectedCategory && targetSelectedCategory.products) {
              // Add copied products to the selected target category
              targetSelectedCategory.products.push(...copiedProducts);
            }
          }
        });

        let targetCategoryName = "";

        for (const restaurant of state.restaurantList) {
          const trgCategory = restaurant.categories.find(
            (cat) => cat.id === targetCategoryId
          );
          if (trgCategory) {
            targetCategoryName = trgCategory.name || "";
            break;
          }
        }

        // Update UI state
        state.productLoading = false;
        state.successMessage = "Products copied successfully!";

        if (notCopiedProductNames.length > 0) {
          const productWord =
            notCopiedProductNames.length === 1 ? "Product" : "Products";
          state.productActionErrorMessage = `${productWord} '${notCopiedProductNames.join(
            ", "
          )}' could not be copied because it already exists in ${
            targetCategoryName || "the other category"
          }`;
        }

        state.selectedProductsIDs = [];
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
      console.log(action.payload);
      state.restaurantLoading = false;
      state.categoryLoading = false;
      state.productLoading = false;
      state.importingLoading = false;
      state.error =
        (action.payload.errors && action.payload.errors.name) ||
        action.payload.message ||
        (typeof action.payload === "string" && action.payload) || // Return action.payload if it's a string
        "Something went wrong!";
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
  clearProductActionErrorMessage,
  setImportingLoading,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
