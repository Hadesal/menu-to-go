import axios from "axios";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
const API_Category_BASE_URL = "http://52.23.230.198:8080/api/categories";

const apiService = axios.create({
  baseURL: API_Category_BASE_URL,
  headers: {
    "Content-Type": "application/json",
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

export const createCategory = async (category: CategoryData) => {
  try {
    const response = await apiService.post("", category);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const updateCategory = async (updatedCategory: CategoryData) => {
  try {
    const response = await apiService.put(
      `/${updatedCategory.id}`,
      updatedCategory
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await apiService.delete(`/${categoryId}`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
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
export const getAllCategoriesByRestaurantIdOpenApi = async (restaurantId: string) => {
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
