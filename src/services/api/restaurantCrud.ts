import axios from "axios";
import { RestaurantData } from "../../DataTypes/ObjectDataTypes";

const API_Restaurant_BASE_URL =
  "https://menutogoapi.ambitiousocean-45c3e892.eastus.azurecontainerapps.io/api/restaurants";

// create an instance of axios
const apiService = axios.create({
  baseURL: API_Restaurant_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRestaurantById = async (
  restaurantId: Number,
  token: String
) => {
  const response = await apiService.get(`/${restaurantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllRestaurantsByUserId = async (
  userId: Number,
  token: String
) => {
  const response = await apiService.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateRestaurant = async (
  updatedRestaurant: RestaurantData,
  restaurantId: Number,
  token: String
) => {
  const response = await apiService.put(`/${restaurantId}`, updatedRestaurant, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteRestaurant = async (restaurantId: Number, token: String) => {
  const response = await apiService.delete(`${restaurantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createRestaurant = async (
  restaurant: RestaurantData,
  token: String
) => {
  const response = await apiService.post("", restaurant, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
