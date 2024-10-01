import { RestaurantData } from "@dataTypes/RestaurantObject";
import privateApiService from "./services/privateApiService";
import publicApiService from "./services/publicApiService";

// Fetch restaurant by restaurant ID (with token)
export const getRestaurantById = async (restaurantId: string) => {
  try {
    const response = await privateApiService.get(
      `/restaurants/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Fetch restaurant by restaurant ID (public API)
export const getRestaurantByIdOpenApi = async (restaurantId: string) => {
  try {
    const response = await publicApiService.get(
      `/restaurants/id/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Fetch all restaurants by user ID (with token)
export const getAllRestaurantsByUserId = async (userId: string) => {
  try {
    const response = await privateApiService.get(`/restaurants/user/${userId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update restaurant details (with token)
export const updateRestaurant = async (
  updatedRestaurant: RestaurantData,
  restaurantId: string | undefined
) => {
  try {
    const response = await privateApiService.put(
      `/restaurants/${restaurantId}`,
      updatedRestaurant
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Delete restaurant (with token)
export const deleteRestaurant = async (restaurantId: string) => {
  try {
    const response = await privateApiService.delete(
      `/restaurants/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create a new restaurant (with token)
export const createRestaurant = async (restaurant: RestaurantData) => {
  try {
    const response = await privateApiService.post("/restaurants", restaurant);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
