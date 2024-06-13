import axios from "axios";
import { ProductDetailsData } from "../../DataTypes/ProductDetailsDataTypes.ts";

const API_ProductDetails_BASE_URL =
  "https://menutogoapi.ambitiousocean-45c3e892.eastus.azurecontainerapps.io/api/products";

// Create an instance of axios
const apiService = axios.create({
  baseURL: API_ProductDetails_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProductDetailsByProductId = async (
  productId: string,
  token: string
) => {
  try {
    const response = await apiService.get(`/${productId}/details`, {
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

export const addProductDetails = async (
  productId: string,
  productDetails: ProductDetailsData,
  token: string
) => {
  try {
    const response = await apiService.post(
      `/${productId}/details`,
      productDetails,
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

export const updateProductDetails = async (
  productId: string,
  updatedProductDetails: ProductDetailsData,
  token: string
) => {
  try {
    const response = await apiService.put(
      `/${productId}/details`,
      updatedProductDetails,
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

export const deleteProductDetails = async (
  productId: string,
  token: string
) => {
  try {
    const response = await apiService.delete(`/${productId}/details`, {
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
