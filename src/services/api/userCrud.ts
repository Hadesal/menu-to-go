import axios from "axios";
import {
  UserSignInData,
  UserSignupApiData,
  UserUpdateData,
} from "../../DataTypes/UserDataTypes";

const API_BASE_URL: string =
  "https://menutogoapi.ambitiousocean-45c3e892.eastus.azurecontainerapps.io/api/users";

// create an instance of axios
const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (userData: UserSignupApiData) => {
  const response = await apiService.post("/register", userData);
  return response.data;
};

export const login = async (userSignInData: UserSignInData) => {
  try {
    const response = await apiService.post("/authenticate", userSignInData);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};
export const updateUser = async (
  updatedUser: UserUpdateData,
  userId: number,
  token: string
) => {
  const response = await apiService.put("/" + userId, updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserById = async (userId: number, token: string) => {
  const response = await apiService.get("/" + userId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteUser = async (userId: number, token: string) => {
  const response = await apiService.delete("/" + userId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
