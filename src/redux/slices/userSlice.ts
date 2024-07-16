import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  updateUser,
  getUserById,
  deleteUser,
} from "../../services/api/userCrud";
import { UserUpdateData } from "../../DataTypes/UserDataTypes";

export interface UserState {
  userList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userList: [],
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const userToken = JSON.parse(localStorage.getItem("userToken") as string);
      const response = await getUserData(userToken.token);
      return [response];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching user data"
      );
    }
  }
);

export const userUpdate = createAsyncThunk(
  "user/update",
  async (
    { updatedUser, userId }: { updatedUser: UserUpdateData; userId: number },
    { rejectWithValue }
  ) => {
    try {
      const userToken = JSON.parse(localStorage.getItem("userToken") as string);

      const response = await updateUser(updatedUser, userId, userToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error updating user");
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const userToken = JSON.parse(localStorage.getItem("userToken") as string);
      const response = await getUserById(userId, userToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching user by ID"
      );
    }
  }
);

export const userDelete = createAsyncThunk(
  "user/delete",
  async (userId: number, { rejectWithValue }) => {
    try {
      const userToken = JSON.parse(localStorage.getItem("userToken") as string);

      const response = await deleteUser(userId, userToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error deleting user");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserData: (state) => {
      state.userList = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        action.payload.forEach((newUser) => {
          const existingUserIndex = state.userList.findIndex(
            (user) => user.id === newUser.id
          );
          if (existingUserIndex === -1) {
            state.userList.push(newUser);
          } else {
            state.userList[existingUserIndex] = newUser;
          }
        });
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        const updatedUserIndex = state.userList.findIndex(
          (user) => user.id === action.payload.id
        );
        if (updatedUserIndex !== -1) {
          state.userList[updatedUserIndex] = action.payload;
        }
        state.loading = false;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        const fetchedUserIndex = state.userList.findIndex(
          (user) => user.id === action.payload.id
        );
        if (fetchedUserIndex !== -1) {
          state.userList[fetchedUserIndex] = action.payload;
        } else {
          state.userList.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userDelete.fulfilled, (state, action) => {
        state.userList = state.userList.filter(
          (user) => user.id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUserData } = userSlice.actions;

export default userSlice.reducer;
