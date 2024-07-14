import axios from "axios";
import { RestaurantData } from "../../DataTypes/RestaurantObject";

const API_Restaurant_BASE_URL = "http://52.23.230.198:8080/api/restaurants";
const userToken = JSON.parse(localStorage.getItem("userToken") as string);
const apiService = axios.create({
  baseURL: API_Restaurant_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken.token}`,
  },
});

export const getRestaurantById = async (restaurantId: string) => {
  try {
    const response = await apiService.get(`/${restaurantId}`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const getAllRestaurantsByUserId = async (userId: string) => {
  try {
    const response = await apiService.get(`/user/${userId}`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const updateRestaurant = async (
  updatedRestaurant: RestaurantData,
  restaurantId: string
) => {
  try {
    const response = await apiService.put(
      `/${restaurantId}`,
      updatedRestaurant
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const deleteRestaurant = async (restaurantId: string) => {
  try {
    const response = await apiService.delete(`${restaurantId}`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const createRestaurant = async (restaurant: RestaurantData) => {
  try {
    const response = await apiService.post("", restaurant);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error;
    return Promise.reject(errorResponseObject);
  }
};
