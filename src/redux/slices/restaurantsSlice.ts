import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import {
  createRestaurant as apiCreateRestaurant,
  updateRestaurant as apiUpdateRestaurant,
  deleteRestaurant as apiDeleteRestaurant,
  getAllRestaurantsByUserId as apiFetchRestaurants,
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
      console.log(error);
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
      console.log(restaurant);
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
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        console.log(action);
        state.restaurantList.push(action.meta.arg.restaurant);
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
