import axios from "axios";
import { VariantsData } from "../../DataTypes/ProductDetailsDataTypes";

const API_Variants_BASE_URL = "http://localhost:8080/api/productDetails";

const userToken = JSON.parse(localStorage.getItem("userToken") as string);
const apiService = axios.create({
  baseURL: API_Variants_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken.token}`,
  },
});

export const getAllVariantsByProductDetailsId = async (
  productDetailsId: number
) => {
  try {
    const response = await apiService.get(`/${productDetailsId}/variants`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const addVariants = async (
  productDetailsId: number,
  variants: VariantsData
) => {
  try {
    const response = await apiService.post(
      `/${productDetailsId}/variants`,
      variants
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const getVariantsByIdAndProductDetailsId = async (
  productDetailsId: number,
  id: number
) => {
  try {
    const response = await apiService.get(
      `/${productDetailsId}/variants/${id}`
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
  updatedVariants: VariantsData
) => {
  try {
    const response = await apiService.put(
      `/${productDetailsId}/variants/${id}`,
      updatedVariants
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const deleteVariants = async (productDetailsId: number, id: number) => {
  try {
    const response = await apiService.delete(
      `/${productDetailsId}/variants/${id}`
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};
