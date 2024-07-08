import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import {
  createRestaurant as apiCreateRestaurant,
  updateRestaurant as apiUpdateRestaurant,
  deleteRestaurant as apiDeleteRestaurant,
} from "../../services/api/restaurantCrud";
export interface RestaurantState {
  restaurantList: RestaurantData[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurantList: [],
  loading: false,
  error: null,
};

export const addRestaurant = createAsyncThunk(
  "restaurantsData/addRestaurant",
  async (
    { restaurant, token }: { restaurant: RestaurantData; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiCreateRestaurant(restaurant, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding restaurant");
    }
  }
);

export const editRestaurant = createAsyncThunk(
  "restaurantsData/editRestaurant",
  async (
    { restaurant, token }: { restaurant: RestaurantData; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiUpdateRestaurant(
        restaurant,
        restaurant.id,
        token
      );
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
  async (
    { restaurantId, token }: { restaurantId: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      await apiDeleteRestaurant(restaurantId, token);
      return restaurantId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error deleting restaurant"
      );
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
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
      });
  },
});

export const { setRestaurantList } = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
