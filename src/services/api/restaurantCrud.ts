import axios from "axios";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import { ErrorResponseObject } from "../../DataTypes/ErrorResponsObject";

const API_Restaurant_BASE_URL = "http://52.23.230.198:8080/api/restaurants";
const apiService = axios.create({
  baseURL: API_Restaurant_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRestaurantById = async (restaurantId: string) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    const response = await apiService.get(`/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const getRestaurantByIdOpenApi = async (restaurantId: string) => {
  try {
    const response = await apiService.get(`/${restaurantId}`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error;
    return Promise.reject(errorResponseObject);
  }
};

export const getAllRestaurantsByUserId = async (userId: string) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    const response = await apiService.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
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
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);

    const response = await apiService.put(
      `/${restaurantId}`,
      updatedRestaurant,
      {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const deleteRestaurant = async (restaurantId: string) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    const response = await apiService.delete(`${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const createRestaurant = async (restaurant: RestaurantData) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    const response = await apiService.post("", restaurant, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error;
    return Promise.reject(errorResponseObject);
  }
};
