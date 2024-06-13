// store.ts
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../../src/redux/slices/mainViewSlice"; // Adjust the import path based on your project structure

export const store = configureStore({
  reducer: {
    mainView: mainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
