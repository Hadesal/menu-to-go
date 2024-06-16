import axios from "axios";
import { ExtraData } from "../../DataTypes/ProductDetailsDataTypes";

interface ErrorResponseObject {
  details: string;
  message: string;
  status: number;
  timestamp: string;
}

const API_Extra_BASE_URL = "http://52.23.230.198:8080/api/productDetails";

// Create an instance of axios
const apiService = axios.create({
  baseURL: API_Extra_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllExtrasByProductDetailsId = async (
  productDetailsId: number,
  token: string
) => {
  try {
    const response = await apiService.get(`/${productDetailsId}/extras`, {
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

export const addExtra = async (
  productDetailsId: number,
  extra: ExtraData,
  token: string
) => {
  try {
    const response = await apiService.post(
      `/${productDetailsId}/extras`,
      extra,
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

export const getExtraByIdAndProductDetailsId = async (
  productDetailsId: number,
  id: number,
  token: string
) => {
  try {
    const response = await apiService.get(`/${productDetailsId}/extras/${id}`, {
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

export const updateExtra = async (
  productDetailsId: number,
  id: number,
  updatedExtra: ExtraData,
  token: string
) => {
  try {
    const response = await apiService.put(
      `/${productDetailsId}/extras/${id}`,
      updatedExtra,
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

export const deleteExtra = async (
  productDetailsId: number,
  id: number,
  token: string
) => {
  try {
    const response = await apiService.delete(
      `/${productDetailsId}/extras/${id}`,
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
