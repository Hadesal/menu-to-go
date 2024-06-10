import axios from "axios";

const API_URL =
  "https://menutogoapi.ambitiousocean-45c3e892.eastus.azurecontainerapps.io/api/products";

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllProducts = async (token: string) => {
  try {
    const response = await apiService.get("", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all products", error);
    throw error;
  }
};

export const addProduct = async (product: object, token: string) => {
  try {
    const response = await apiService.post("", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
};

export const getProductById = async (id: number, token: string) => {
  try {
    const response = await apiService.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}`, error);
    throw error;
  }
};

export const updateProduct = async (
  id: number,
  updatedProduct: object,
  token: string
) => {
  try {
    const response = await apiService.put(`/${id}`, updatedProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}`, error);
    throw error;
  }
};

export const deleteProduct = async (id: number, token: string) => {
  try {
    const response = await apiService.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with id ${id}`, error);
    throw error;
  }
};
