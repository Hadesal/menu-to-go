import axios from "axios";
import {
  UpdatePasswordDataType,
  UserSignInData,
  UserSignupApiData,
  UserUpdateData,
} from "../../DataTypes/UserDataTypes";
import { ErrorResponseObject } from "../../DataTypes/ErrorResponsObject";
import { QrCodeStyleUpdateDTO } from "../../DataTypes/QrStyleDataType";

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
export const getUserData = async (userToken: any) => {
  try {
    if (!userToken) throw new Error("No user token provided");
    const response = await apiService.get("/token", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errosResponseObject = error.response;
      const responseStatus = errosResponseObject?.status;
      if (responseStatus === 403) {
        throw new Error("Unauthorized: " + responseStatus);
      } else {
        throw new Error(errosResponseObject?.data);
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export const updateUser = async (
  updatedUser: UserUpdateData,
  userId: string
) => {
  try {
    const userToken = JSON.parse(localStorage.getItem("userToken") as string);
    const response = await apiService.put(`/${userId}`, updatedUser, {
      headers: { Authorization: `Bearer ${userToken.token}` },
    });
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error;
    return Promise.reject(errorResponseObject);
  }
};
export const updateUserPassword = async (
  updatePasswordObject: UpdatePasswordDataType,
  userId: string,
  token: any
) => {
  try {
    const response = await apiService.put(
      "/" + userId + "/password",
      updatePasswordObject,
      {
        headers: { Authorization: `Bearer ${token.token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorResponseObject: ErrorResponseObject = error.response.data;
    return errorResponseObject;
  }
};

export const createUpdateQrCode = async (
  userId: string,
  qrStyleDTO: QrCodeStyleUpdateDTO,
  userToken: any
) => {
  try {
    const response = await apiService.put(`/${userId}/qrstyle`, qrStyleDTO, {
      headers: { Authorization: `Bearer ${userToken.token}` },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const responseStatus = error.response?.status;
      if (responseStatus === 403) {
        throw new Error(
          "Forbidden: You do not have permission to update this QR code style."
        );
      } else if (responseStatus === 404) {
        throw new Error("User not found.");
      } else if (responseStatus === 400) {
        throw new Error("Invalid QR Code Style data.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
export const forgetPassword = async (email: string) => {
  try {
    const response = await apiService.post(`/forgot-password?email=${email}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: "No response was received from the server." };
    } else {
      return { error: error.message };
    }
  }
};

export const resetPassword = async (newPassword: string, token: string) => {
  const passwordResetObject = { token, newPassword };
  try {
    const response = await apiService.post(
      "/reset-password",
      passwordResetObject
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: "No response was received from the server." };
    } else {
      return { error: error.message };
    }
  }
};
export const getUserById = async (userId: string, userToken: any) => {
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

export const deleteUser = async (userId: String, userToken: any) => {
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
