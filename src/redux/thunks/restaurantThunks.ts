/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import privateApiService from "@api/services/privateApiService";
import { deleteAllCategoryImages } from "./thunks.helpers";

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
  async (
    restaurantData: Omit<RestaurantData, "userUiPreferences">,
    { rejectWithValue }
  ) => {
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
  async (
    {
      restaurantId,
      restaurantData,
    }: { restaurantId: string; restaurantData: RestaurantData },
    { rejectWithValue }
  ) => {
    try {
      // Delete the restaurant first
      const response = await privateApiService.delete(
        `/restaurants/${restaurantId}`
      );

      // After restaurant is deleted successfully, delete category images in the background
      if (response.status === 200) {
        // Ensure the restaurant was successfully deleted
        restaurantData.categories.forEach((category) => {
          // Fire off the image deletion asynchronously without awaiting it
          deleteAllCategoryImages(category).catch((error) => {
            console.error("Error deleting category images:", error);
          });
        });
      }

      // Return the response immediately after deleting the restaurant
      return { response: response.data, restaurantId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
