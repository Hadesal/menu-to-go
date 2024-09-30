/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRestaurantById,
  getAllRestaurantsByUserId,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "@api/restaurantCrud";

import { RestaurantData } from "@dataTypes/RestaurantObject";
import { getErrorMessage } from "@utils/errorHandler";

// Fetch all restaurants by user ID
export const fetchAllRestaurants = createAsyncThunk(
  "restaurants/fetchAll",
  async (userID: string, { rejectWithValue }) => {
    try {
      const response = await getAllRestaurantsByUserId(userID);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Fetch a single restaurant by ID
export const fetchRestaurantById = createAsyncThunk(
  "restaurants/fetchById",
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await getRestaurantById(restaurantId);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Create a new restaurant
export const addRestaurant = createAsyncThunk(
  "restaurants/addRestaurant",
  async (restaurantData: RestaurantData, { rejectWithValue }) => {
    try {
      const response = await createRestaurant(restaurantData);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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
      const response = await updateRestaurant(updatedRestaurant, restaurantId);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a restaurant
export const removeRestaurant = createAsyncThunk(
  "restaurants/removeRestaurant",
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await deleteRestaurant(restaurantId);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
