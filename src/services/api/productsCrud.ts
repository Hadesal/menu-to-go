import axios from "axios";
import { ProductData } from "../../DataTypes/ProductDataTypes";

const API_Product_BASE_URL = "http://52.23.230.198:8080/api/categories";

const apiService = axios.create({
  baseURL: API_Product_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllProductsByCategoryId = async (categoryId: string) => {
  try {
    const response = await apiService.get(`/${categoryId}/products`);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const addProduct = async (categoryId: string, product: ProductData) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    const response = await apiService.post(`/${categoryId}/products`, product, {
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

export const getProductById = async (categoryId: string, productId: string) => {
  try {
    const response = await apiService.get(
      `/${categoryId}/products/${productId}`
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const updateProduct = async (
  categoryId: string,
  productId: string,
  updatedProduct: ProductData
) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    const response = await apiService.put(`/${categoryId}/products/${productId}`, updatedProduct, {
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

export const deleteProduct = async (categoryId: string, productId: string) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);

    const response = await apiService.delete(
      `/${categoryId}/products/${productId}`,
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
