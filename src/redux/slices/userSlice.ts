// Import the `createOrUpdateQrCode`
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  fetchUserData,
  updateUser,
  updateUserPassword,
  createOrUpdateQrCode, // Import this properly
  requestPasswordReset,
  resetUserPassword,
  fetchUserById,
  deleteUser,
} from "../thunks/userThunks";
import {
  handlePending,
  handleRejected,
  handleFulfilled,
} from "../helpers/reduxHelpers";
import { UserDataType } from "@dataTypes/UserDataTypes";
import { QrCodeStyleDataType } from "@dataTypes/QrStyleDataType";
import { UserState } from "@redux/slicesInterfaces";

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Handle pending actions for all async thunks
    builder.addMatcher(
      isAnyOf(
        registerUser.pending,
        loginUser.pending,
        fetchUserData.pending,
        updateUser.pending,
        updateUserPassword.pending,
        createOrUpdateQrCode.pending,
        requestPasswordReset.pending,
        resetUserPassword.pending,
        fetchUserById.pending,
        deleteUser.pending
      ),
      handlePending
    );

    // Handle fulfilled actions that modify user data
    builder.addMatcher(
      isAnyOf(
        registerUser.fulfilled,
        loginUser.fulfilled,
        fetchUserData.fulfilled,
        updateUser.fulfilled,
        fetchUserById.fulfilled
      ),
      (state, action: PayloadAction<UserDataType>) => {
        state.user = action.payload;
        handleFulfilled(state, action, "Operation successful");
      }
    );

    // Handle QR code update success separately
    builder.addMatcher(
      (action) => createOrUpdateQrCode.fulfilled.match(action),
      (state, action: PayloadAction<{ qrCodeStyle: QrCodeStyleDataType }>) => {
        if (state.user && action.payload.qrCodeStyle) {
          state.user.qrCodeStyle = action.payload.qrCodeStyle;
        }
        state.loading = false;
        state.successMessage = "QR Code updated successfully!";
      }
    );

    // Handle fulfilled actions that don't modify user data
    builder.addMatcher(
      isAnyOf(
        updateUserPassword.fulfilled,
        requestPasswordReset.fulfilled,
        resetUserPassword.fulfilled,
        deleteUser.fulfilled
      ),
      (state) => {
        handleFulfilled(state, null, "Operation successful");
      }
    );

    // Handle rejected actions for all async thunks
    builder.addMatcher(
      isAnyOf(
        registerUser.rejected,
        loginUser.rejected,
        fetchUserData.rejected,
        updateUser.rejected,
        updateUserPassword.rejected,
        createOrUpdateQrCode.rejected,
        requestPasswordReset.rejected,
        resetUserPassword.rejected,
        fetchUserById.rejected,
        deleteUser.rejected
      ),
      handleRejected
    );
  },
});

export const { clearError, clearSuccessMessage, logout } = userSlice.actions;

export default userSlice.reducer;
