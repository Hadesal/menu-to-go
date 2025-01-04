import publicApiService from "./services/publicApiService";
import {
  UpdatePasswordDataType,
  UserSignInDataType,
  UserSignupDataType,
  UserDataType,
} from "@dataTypes/UserDataTypes";
import { QrCodeStyleDataType } from "@dataTypes/QrStyleDataType";
import privateApiService from "./services/privateApiService";

// Register new user
export const register = async (userData: UserSignupDataType) => {
  try {
    const response = await publicApiService.post("/users/register", userData);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Login user
export const login = async (userSignInData: UserSignInDataType) => {
  try {
    const response = await publicApiService.post(
      "/users/authenticate",
      userSignInData
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Fetch user data using token
export const getUserData = async () => {
  try {
    const response = await privateApiService.get("/users/token");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update user data
export const updateUser = async (updatedUser: UserDataType, userId: string) => {
  try {
    const response = await privateApiService.put(
      `/users/${userId}`,
      updatedUser
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update user password
export const updateUserPassword = async (
  updatePasswordObject: UpdatePasswordDataType,
  userId: string
) => {
  try {
    const response = await privateApiService.put(
      `/users/${userId}/password`,
      updatePasswordObject
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create or update QR code style
export const createUpdateQrCode = async (
  userId: string,
  qrStyleDTO: QrCodeStyleDataType
) => {
  try {
    const response = await privateApiService.put(
      `/users/${userId}/qrstyle`,
      qrStyleDTO
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Request password reset
export const forgetPassword = async (email: string) => {
  try {
    const response = await publicApiService.post(
      `/users/forgot-password?email=${email}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Reset password
export const resetPassword = async (newPassword: string, token: string) => {
  const passwordResetObject = { token, newPassword };
  try {
    const response = await publicApiService.post(
      "/users/reset-password",
      passwordResetObject
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Fetch user by ID
export const getUserById = async (userId: string) => {
  try {
    const response = await publicApiService.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Delete user
export const deleteUser = async (userId: string) => {
  try {
    const response = await privateApiService.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
