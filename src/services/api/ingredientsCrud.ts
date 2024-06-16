import axios from "axios";
import { IngredientData } from "../../DataTypes/ProductDetailsDataTypes";

const API_Ingredient_BASE_URL =
  "https://menutogoapi.ambitiousocean-45c3e892.eastus.azurecontainerapps.io/api/productDetails";

const apiService = axios.create({
  baseURL: API_Ingredient_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllIngredientsByProductDetailsId = async (
  productDetailsId: number,
  token: string
) => {
  try {
    const response = await apiService.get(`/${productDetailsId}/ingredients`, {
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

export const addIngredient = async (
  productDetailsId: number,
  ingredient: IngredientData,
  token: string
) => {
  try {
    const response = await apiService.post(
      `/${productDetailsId}/ingredients`,
      ingredient,
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

export const getIngredientByIdAndProductDetailsId = async (
  productDetailsId: number,
  id: number,
  token: string
) => {
  try {
    const response = await apiService.get(
      `/${productDetailsId}/ingredients/${id}`,
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

export const updateIngredient = async (
  productDetailsId: number,
  id: number,
  updatedIngredient: IngredientData,
  token: string
) => {
  try {
    const response = await apiService.put(
      `/${productDetailsId}/ingredients/${id}`,
      updatedIngredient,
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

export const deleteIngredient = async (
  productDetailsId: number,
  id: number,
  token: string
) => {
  try {
    const response = await apiService.delete(
      `/${productDetailsId}/ingredients/${id}`,
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
