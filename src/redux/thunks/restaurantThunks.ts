/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import privateApiService from "@api/services/privateApiService";

// Fetch all restaurants by user ID
export const fetchAllRestaurants = createAsyncThunk(
  "restaurants/fetchAll",
  async (userID: string, { rejectWithValue }) => {
    try {
      const response = await privateApiService.get(
        `/restaurants/user/${userID}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Fetch a single restaurant by ID
export const fetchRestaurantById = createAsyncThunk(
  "restaurants/fetchById",
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await privateApiService.get(
        `/restaurants/${restaurantId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create a new restaurant
export const addRestaurant = createAsyncThunk(
  "restaurants/addRestaurant",
  async (restaurantData: RestaurantData, { rejectWithValue }) => {
    try {
      const response = await privateApiService.post(
        "/restaurants",
        restaurantData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update an existing restaurant
export const editRestaurant = createAsyncThunk(
  "restaurants/editRestaurant",
  async (
    {
      restaurantId,
      updatedRestaurant,
    }: { restaurantId: string; updatedRestaurant: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await privateApiService.put(
        `/restaurants/${restaurantId}`,
        updatedRestaurant
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete a restaurant
export const removeRestaurant = createAsyncThunk(
  "restaurants/removeRestaurant",
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await privateApiService.delete(
        `/restaurants/${restaurantId}`
      );
      return { response: response.data, restaurantId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
