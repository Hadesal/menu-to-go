import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRestaurantByIdOpenApi as apiFetchRestaurantData } from "../../services/api/restaurantCrud";
import { RestaurantAllData } from "../../DataTypes/ResturantAllData";
import { UserUiPreferences } from "../../DataTypes/userUiPreferences";

export interface MenuState {
  restaurantData: RestaurantAllData;
  selectedProduct: object;
  selectedCategory: object;
  loading: boolean;
  error: string | null;
}

const initialUserUiPreferences: UserUiPreferences = {
  primaryColor: "",
  secondaryColor: "",
  fontType: "",
  categoryShape: "",
  contactLinks: {
    facebook: "",
    twitter: "",
    instagram: "",
  },
  ingredientViewType: "GRID",
  itemsViewType: "GRID",
};

const initialState: MenuState = {
  restaurantData: {
    id: "",
    name: "",
    userUiPreferences: initialUserUiPreferences,
    categories: [],
    tables: [],
  },
  selectedProduct: {},
  selectedCategory: {},
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
        error.response?.data || "Error fetching categories"
      );
    }
  }
);

export const MenuSlice = createSlice({
  name: "menuData",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<object>) => {
      state.selectedProduct = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<object>) => {
      state.selectedCategory = action.payload;
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
        state.selectedProduct =
          state?.restaurantData?.categories[0]?.products[2];
        state.loading = false;

        state.selectedCategory = state?.restaurantData.categories[0];
      })
      .addCase(fetchRestaurantData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedProduct, setSelectedCategory } = MenuSlice.actions;

export default MenuSlice.reducer;
