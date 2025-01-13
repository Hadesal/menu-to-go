/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  UpdatePasswordDataType,
  UserSignInDataType,
  UserSignupDataType,
  UserDataType,
} from "@dataTypes/UserDataTypes";
import { QrCodeStyleDataType } from "@dataTypes/QrStyleDataType";
import {
  register as apiRegister,
  login as apiLogin,
  getUserData as apiGetUserData,
  updateUser as apiUpdateUser,
  updateUserPassword as apiUpdateUserPassword,
  createUpdateQrCode as apiCreateUpdateQrCode,
  forgetPassword as apiForgetPassword,
  resetPassword as apiResetPassword,
  getUserById as apiGetUserById,
  deleteUser as apiDeleteUser,
} from "@api/userCrud";

// Register user
export const registerUser = createAsyncThunk<
  UserDataType,
  UserSignupDataType,
  { rejectValue: string }
>("user/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await apiRegister(userData);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

// Login user
export const loginUser = createAsyncThunk<
  UserDataType,
  UserSignInDataType,
  { rejectValue: string }
>("user/login", async (userSignInData, { rejectWithValue }) => {
  try {
    const response = await apiLogin(userSignInData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// Fetch user data using token
export const fetchUserData = createAsyncThunk<
  UserDataType,
  void,
  { rejectValue: string }
>("user/fetchUserData", async (_, { rejectWithValue }) => {
  try {
    const response = await apiGetUserData();
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
});

// Update user data
export const updateUser = createAsyncThunk<
  UserDataType,
  { updatedUser: UserDataType; userId: string },
  { rejectValue: string }
>("user/updateUser", async ({ updatedUser, userId }, { rejectWithValue }) => {
  try {
    const response = await apiUpdateUser(updatedUser, userId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Update failed");
  }
});

// Update user password
export const updateUserPassword = createAsyncThunk<
  void,
  { updatePasswordObject: UpdatePasswordDataType; userId: string },
  { rejectValue: string }
>(
  "user/updatePassword",
  async ({ updatePasswordObject, userId }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateUserPassword(
        updatePasswordObject,
        userId
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Password update failed");
    }
  }
);

// Create or update QR code style
export const createOrUpdateQrCode = createAsyncThunk<
  { qrCodeStyle: QrCodeStyleDataType },
  { userId: string; qrCodeStyle: QrCodeStyleDataType },
  { rejectValue: string }
>(
  "user/createUpdateQrCode",
  async ({ userId, qrCodeStyle: qrStyleDTO }, { rejectWithValue }) => {
    try {
      const response = await apiCreateUpdateQrCode(userId, qrStyleDTO);
      return { qrCodeStyle: response };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Request password reset
export const requestPasswordReset = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("user/forgetPassword", async (email, { rejectWithValue }) => {
  try {
    await apiForgetPassword(email);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Password reset request failed"
    );
  }
});

// Reset password
export const resetUserPassword = createAsyncThunk<
  void,
  { newPassword: string; token: string },
  { rejectValue: string }
>("user/resetPassword", async ({ newPassword, token }, { rejectWithValue }) => {
  try {
    await apiResetPassword(newPassword, token);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Password reset failed"
    );
  }
});

// Fetch user by ID
export const fetchUserById = createAsyncThunk<
  UserDataType,
  string,
  { rejectValue: string }
>("user/fetchUserById", async (userId, { rejectWithValue }) => {
  try {
    const response = await apiGetUserById(userId);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch user by ID"
    );
  }
});

// Delete user
export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("user/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await apiDeleteUser(userId);
    return "User deleted successfully";
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete user"
    );
  }
});
