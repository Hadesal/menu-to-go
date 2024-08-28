import axios from "axios";
import { ProductDetailsData } from "../../DataTypes/ProductDetailsDataTypes.ts";

const API_ProductDetails_BASE_URL = "http://localhost:8080/api/products";

const userToken = JSON.parse(localStorage.getItem("userToken") as string);
const apiService = axios.create({
  baseURL: API_ProductDetails_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken.token}`,
  },
});

export const getProductDetailsByProductId = async (productId: string) => {
  try {
    const response = await apiService.get(`/${productId}/details`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const addProductDetails = async (
  productId: string,
  productDetails: ProductDetailsData
) => {
  try {
    const response = await apiService.post(
      `/${productId}/details`,
      productDetails
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const updateProductDetails = async (
  productId: string,
  updatedProductDetails: ProductDetailsData
) => {
  try {
    const response = await apiService.put(
      `/${productId}/details`,
      updatedProductDetails
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const deleteProductDetails = async (productId: string) => {
  try {
    const response = await apiService.delete(`/${productId}/details`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};
