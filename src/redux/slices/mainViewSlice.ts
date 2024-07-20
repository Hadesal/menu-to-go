import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Adjust the import path based on your project structure

export interface MainState {
  activeTab: string;
}

const initialState: MainState = {
  activeTab: "dashboard",
};

export const mainSlice = createSlice({
  name: "mainView",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    resetActiveTab: (state) => {
      state.activeTab = initialState.activeTab;
    },
  },
});

export const selectActiveTab = (state: RootState) => state.mainView.activeTab;

export const { setActiveTab, resetActiveTab } = mainSlice.actions;

export default mainSlice.reducer;
