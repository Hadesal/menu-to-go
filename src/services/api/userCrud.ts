import axios from "axios";
import {
  UserSignInData,
  UserSignupApiData,
  UserUpdateData,
} from "../../DataTypes/UserDataTypes";

const API_BASE_URL =
  "https://menutogoapi.ambitiousocean-45c3e892.eastus.azurecontainerapps.io/api";

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
  const response = await apiService.post(
    "/register/authenticate",
    userSignInData
  );
  return response.data;
};
export const updateUser = async (
  updatedUser: UserUpdateData,
  userId: Number,
  token: String
) => {
  const response = await apiService.put("/users/" + userId, updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserById = async (userId: Number, token: String) => {
  const response = await apiService.get("/users/" + userId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteUser = async (userId: Number, token: String) => {
  const response = await apiService.delete("/users/" + userId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
