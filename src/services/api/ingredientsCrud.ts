import axios from "axios";
import { IngredientData } from "../../DataTypes/ProductDetailsDataTypes";

const API_Ingredient_BASE_URL = "http://localhost:8080/api/productDetails";

const userToken = JSON.parse(localStorage.getItem("userToken") as string);
const apiService = axios.create({
  baseURL: API_Ingredient_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken.token}`,
  },
});

export const getAllIngredientsByProductDetailsId = async (
  productDetailsId: number
) => {
  try {
    const response = await apiService.get(`/${productDetailsId}/ingredients`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const addIngredient = async (
  productDetailsId: number,
  ingredient: IngredientData
) => {
  try {
    const response = await apiService.post(
      `/${productDetailsId}/ingredients`,
      ingredient
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const getIngredientByIdAndProductDetailsId = async (
  productDetailsId: number,
  id: number
) => {
  try {
    const response = await apiService.get(
      `/${productDetailsId}/ingredients/${id}`
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
  updatedIngredient: IngredientData
) => {
  try {
    const response = await apiService.put(
      `/${productDetailsId}/ingredients/${id}`,
      updatedIngredient
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const deleteIngredient = async (
  productDetailsId: number,
  id: number
) => {
  try {
    const response = await apiService.delete(
      `/${productDetailsId}/ingredients/${id}`
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};
