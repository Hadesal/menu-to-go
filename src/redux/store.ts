// store.ts
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../../src/redux/slices/mainViewSlice"; // Adjust the import path based on your project structure
import restaurantReducer from "../../src/redux/slices/restaurantsSlice";
export const store = configureStore({
  reducer: {
    mainView: mainReducer,
    restaurantsData: restaurantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
