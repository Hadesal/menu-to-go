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
import { productDefaultData } from "@constants/constants";

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
  selectedCategory: {
    name: "",
    image: null,
    categoryType: "",
  },
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
        if (state?.restaurantData.categories.length === 1) {
          state.selectedCategory = state?.restaurantData.categories[0];
          state.selectedCategoryType = "";
          return;
        }
        if (state?.restaurantData.categories.length !== 0) {
          if (state?.restaurantData.categories.length > 1) {
            const foodCategory = state?.restaurantData.categories.find(
              (category) => {
                return category.categoryType.toLocaleLowerCase() === "food";
              }
            );
            if (foodCategory) {
              state.selectedCategory = foodCategory;
              state.selectedCategoryType = "Food";
            }
            return;
          }
          console.log(state?.restaurantData.categories[0]);
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
