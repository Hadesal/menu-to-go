import axios from "axios";
import {
  UserSignInData,
  UserSignupApiData,
  UserUpdateData,
} from "../../DataTypes/UserDataTypes";

const API_BASE_URL: string = "http://52.23.230.198:8080/api/users";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (userData: UserSignupApiData) => {
  try {
    const response = await apiService.post("/register", userData);
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
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
export const getUserData = async (userToken) => {
  try {
    if (userToken == null) throw Error;
    const response = await apiService.get("/token", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};
export const updateUser = async (
  updatedUser: UserUpdateData,
  userId: number,
  userToken
) => {
  try {
    const response = await apiService.put("/" + userId, updatedUser, {
      headers: { Authorization: `Bearer ${userToken.token}` },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const getUserById = async (userId: string, userToken) => {
  try {
    const response = await apiService.get("/" + userId, {
      headers: { Authorization: `Bearer ${userToken.token}` },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const deleteUser = async (userId: number, userToken) => {
  try {
    const response = await apiService.delete("/" + userId, {
      headers: { Authorization: `Bearer ${userToken.token}` },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};
