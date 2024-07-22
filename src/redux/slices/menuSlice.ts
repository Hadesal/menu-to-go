import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategoriesByRestaurantId as apiFetchCategories } from "../../services/api/categoryCrud";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
import { ProductData } from "../../DataTypes/ProductDataTypes";

export interface MenuState {
  categoriesList: CategoryData[];
  selectedProduct: object;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  categoriesList: [],
  selectedProduct: {},
  loading: false,
  error: null,
};

export const fetchAllCategories = createAsyncThunk(
  "menuData/fetchAllCategories",
  async ({ restaurantID }: { restaurantID: string }, { rejectWithValue }) => {
    try {
      const response = await apiFetchCategories(restaurantID);
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
    setCategoriesList: (state, action: PayloadAction<[]>) => {
      state.categoriesList = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<object>) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categoriesList = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategoriesList } = MenuSlice.actions;

export default MenuSlice.reducer;
