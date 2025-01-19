import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  RestaurantData,
  UserUiPreferences,
  ViewType,
} from "@dataTypes/RestaurantObject";
import { MenuState } from "@redux/slicesInterfaces";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import publicApiService from "@api/services/publicApiService";
import { categoryDefaultData, productDefaultData } from "@constants/constants";

const initialUserUiPreferences: UserUiPreferences = {
  colors: {
    effectedSpace: "Background",
    primaryColor: "#A4755D",
    backgroundColor: "#F9FDFE",
    secondaryColor: "#D9B18F",
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
  logo: "",
};

const initialState: MenuState = {
  restaurantData: {
    id: "",
    name: "",
    userUiPreferences: initialUserUiPreferences,
    categories: [],
    tables: [],
  },
  selectedProduct: productDefaultData,
  selectedCategory: categoryDefaultData,
  selectedCategoryType: "",
  loading: false,
  error: null,
};

export const fetchRestaurantData = createAsyncThunk(
  "menuData/fetchRestaurantData",
  async ({ restaurantID }: { restaurantID: string }, { rejectWithValue }) => {
    try {
      const response = await publicApiService.get(
        `/restaurants/id/${restaurantID}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const MenuSlice = createSlice({
  name: "menuData",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<ProductData>) => {
      state.selectedProduct = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<CategoryData>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedCategoryType: (state, action: PayloadAction<string>) => {
      state.selectedCategoryType = action.payload;
    },
    // New Reducer for updating userUiPreferences
    updateMenuUiPreferences: (
      state,
      action: PayloadAction<UserUiPreferences>
    ) => {
      state.restaurantData.userUiPreferences = action.payload;
    },
    // New Reducer for updating userUiPreferences
    setRestaurantData: (state, action: PayloadAction<RestaurantData>) => {
      state.restaurantData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantData.fulfilled, (state, action) => {
        state.restaurantData = action.payload.data;
        state.loading = false;

        // Filter categories to include only those with products
        const filteredCategories = state.restaurantData.categories.filter(
          (category) => category.products!.length > 0
        );
        // Get unique category types
        const categoryType = [
          ...new Set(
            state.restaurantData.categories.map(
              (category) => category.categoryType
            )
          ),
        ];

        if (categoryType.length === 1) {
          if (
            filteredCategories[0] &&
            filteredCategories[0].products &&
            filteredCategories[0].products?.length > 0
          ) {
            //state.selectedCategory = filteredCategories[0];
            state.selectedCategoryType = filteredCategories[0].categoryType;
          }
          return;
        }

        if (categoryType.length > 1) {
          const foodCategory = filteredCategories.find((category) => {
            return (
              category.categoryType.toLocaleLowerCase() === "food" &&
              category.products &&
              category.products?.length > 0
            );
          });
          if (foodCategory) {
            state.selectedCategoryType = "Food";
          }
          return;
        }
      })
      .addCase(fetchRestaurantData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedProduct,
  setSelectedCategory,
  setSelectedCategoryType,
  updateMenuUiPreferences,
  setRestaurantData,
} = MenuSlice.actions;

export default MenuSlice.reducer;
