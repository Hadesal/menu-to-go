import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRestaurantByIdOpenApi as apiFetchRestaurantData } from "@api/restaurantCrud";
import { UserUiPreferences, ViewType } from "@dataTypes/RestaurantObject";
import { MenuState } from "@redux/slicesInterfaces";
import { getErrorMessage } from "@utils/errorHandler";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { CategoryData } from "@dataTypes/CategoryDataTypes";

const initialUserUiPreferences: UserUiPreferences = {
  colors: {
    effectedSpace: "Background",
    primaryColor: "#A4755D",
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
};

const initialState: MenuState = {
  restaurantData: {
    id: "",
    name: "",
    userUiPreferences: initialUserUiPreferences,
    categories: [],
    tables: [],
  },
  selectedProduct: {
    name: "",
    price: 0,
    details: {
      detailsDescription: "",
      extras: [],
      ingredients: [],
      variants: {
        name: "",
        variantList: [],
      },
    },
    isAvailable: true,
    image: undefined,
    uniqueProductOrderingName: "",
  },
  selectedCategory: {
    name: "",
    image: null,
    categoryType: "",
  },
  selectedCategoryType: "Food",
  loading: false,
  error: null,
};

export const fetchRestaurantData = createAsyncThunk(
  "menuData/fetchRestaurantData",
  async ({ restaurantID }: { restaurantID: string }, { rejectWithValue }) => {
    try {
      const response = await apiFetchRestaurantData(restaurantID);
      return response;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error) || "Error fetching categories"
      );
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantData.fulfilled, (state, action) => {
        state.restaurantData = action.payload;
        state.loading = false;
        if (state?.restaurantData.categories.length !== 0) {
          state.selectedCategory = state?.restaurantData.categories[0];
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
} = MenuSlice.actions;

export default MenuSlice.reducer;
