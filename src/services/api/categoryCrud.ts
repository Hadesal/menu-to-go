import axios from "axios";
import { CategoryData } from "../../DataTypes/CategoryDataTypes";
const API_Category_BASE_URL =
  "https://menutogoapi.ambitiousocean-45c3e892.eastus.azurecontainerapps.io/api/categories";

// create an instance of axios
const apiService = axios.create({
  baseURL: API_Category_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCategoryById = async (categoryId: Number, token: string) => {
  const response = await apiService.get(`/${categoryId}`, {
    headers: {
      Authorization: `Baerer ${token}`,
    },
  });
  return response.data;
};

export const createCategory = async (category: CategoryData, token: string) => {
  const response = await apiService.post("", category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateCategory = async (
  updatedCategory: CategoryData,
  token: string
) => {
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
};

export const deleteCategory = async (categoryId: number, token: string) => {
  const response = await apiService.delete(`/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getAllCategoriesByRestaurantId = async (
  restaurantId: number,
  token: string
) => {
  const response = await apiService.get(`/restaurant/${restaurantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
