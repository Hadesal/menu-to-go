import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";
import { TabType } from "@constants/types";
import { MainState } from "@redux/slicesInterfaces";

const initialState: MainState = {
  activeTab: "dashboard",
  errorMessage: "",
};

export const mainSlice = createSlice({
  name: "mainView",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TabType>) => {
      state.activeTab = action.payload;
    },
    resetActiveTab: (state) => {
      state.activeTab = initialState.activeTab;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = "";
    },
  },
});

export const selectActiveTab = (state: RootState) => state.mainView.activeTab;

export const {
  setActiveTab,
  resetActiveTab,
  setErrorMessage,
  clearErrorMessage,
} = mainSlice.actions;

export default mainSlice.reducer;
