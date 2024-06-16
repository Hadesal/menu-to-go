import axios from "axios";
import { VariantsData } from "../../DataTypes/ProductDetailsDataTypes";

const API_Variants_BASE_URL = "http://52.23.230.198:8080/api/productDetails";

const apiService = axios.create({
  baseURL: API_Variants_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllVariantsByProductDetailsId = async (
  productDetailsId: number,
  token: string
) => {
  try {
    const response = await apiService.get(`/${productDetailsId}/variants`, {
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

export const addVariants = async (
  productDetailsId: number,
  variants: VariantsData,
  token: string
) => {
  try {
    const response = await apiService.post(
      `/${productDetailsId}/variants`,
      variants,
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

export const getVariantsByIdAndProductDetailsId = async (
  productDetailsId: number,
  id: number,
  token: string
) => {
  try {
    const response = await apiService.get(
      `/${productDetailsId}/variants/${id}`,
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

export const updateVariants = async (
  productDetailsId: number,
  id: number,
  updatedVariants: VariantsData,
  token: string
) => {
  try {
    const response = await apiService.put(
      `/${productDetailsId}/variants/${id}`,
      updatedVariants,
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

export const deleteVariants = async (
  productDetailsId: number,
  id: number,
  token: string
) => {
  try {
    const response = await apiService.delete(
      `/${productDetailsId}/variants/${id}`,
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
