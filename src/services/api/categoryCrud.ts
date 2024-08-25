import axios from "axios";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
import { ErrorResponseObject } from "../../DataTypes/ErrorResponsObject";
const API_Category_BASE_URL = "http://52.23.230.198:8080/api/categories";
//const userToken = JSON.parse(localStorage.getItem("userToken") as string);
const apiService = axios.create({
  baseURL: API_Category_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    //Authorization: `Bearer ${userToken.token}`,
  },
});

export const getCategoryById = async (categoryId: number) => {
  try {
    const response = await apiService.get(`/${categoryId}`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const createCategory = async (
  restaurantId: string,
  category: CategoryData
) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    const response = await apiService.post(`/${restaurantId}`, category, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error;
    return Promise.reject(errorResponseObject);
  }
};

export const updateCategory = async (
  restaurantId,
  categoryId,
  updatedCategory: CategoryData
) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    const response = await apiService.put(
      `/${categoryId}/${restaurantId}`,
      updatedCategory,
      {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error;
    return Promise.reject(errorResponseObject);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    const response = await apiService.delete(`/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error;
    return Promise.reject(errorResponseObject);
  }
};

export const getAllCategoriesByRestaurantId = async (restaurantId: string) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    console.log(userToken);
    const response = await apiService.get(`/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error;
    return Promise.reject(errorResponseObject);
  }
};
export const getAllCategoriesByRestaurantIdOpenApi = async (
  restaurantId: string
) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    console.log(userToken);
    const response = await apiService.get(`/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error;
    return Promise.reject(errorResponseObject);
  }
};
