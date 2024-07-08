import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RestaurantData } from "../../DataTypes/RestaurantObject";

export interface RestaurantState {
  restaurantList: RestaurantData[];
}

const initialState: RestaurantState = {
  restaurantList: [],
};

export const RestaurantSlice = createSlice({
  name: "restaurantsData",
  initialState,
  reducers: {
    setRestaurantList: (state, action: PayloadAction<RestaurantData[]>) => {
      state.restaurantList = action.payload;
    },
    deleteRestaurant: (state, action: PayloadAction<string>) => {
      state.restaurantList = state.restaurantList.filter(
        (restaurant) => restaurant.id !== action.payload
      );
    },
    addRestaurant: (state, action: PayloadAction<RestaurantData>) => {
      state.restaurantList.push(action.payload);
    },
    editRestaurant: (state, action: PayloadAction<RestaurantData>) => {
      state.restaurantList = state.restaurantList.map((restaurant) =>
        restaurant.id === action.payload.id ? action.payload : restaurant
      );
    },
  },
});

export const {
  setRestaurantList,
  deleteRestaurant,
  addRestaurant,
  editRestaurant,
} = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
