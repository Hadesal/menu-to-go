import axios from "axios";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
const API_Category_BASE_URL = "http://52.23.230.198:8080/api/categories";

const apiService = axios.create({
  baseURL: API_Category_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCategoryById = async (categoryId: number, token: string) => {
  try {
    const response = await apiService.get(`/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const createCategory = async (category: CategoryData, token: string) => {
  try {
    const response = await apiService.post("", category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const updateCategory = async (
  updatedCategory: CategoryData,
  token: string
) => {
  try {
    const response = await apiService.put(
      `/${updatedCategory.id}`,
      updatedCategory,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const deleteCategory = async (categoryId: number, token: string) => {
  try {
    const response = await apiService.delete(`/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const getAllCategoriesByRestaurantId = async (
  restaurantId: number,
  token: string
) => {
  try {
    const response = await apiService.get(`/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};
