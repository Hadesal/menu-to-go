// store.ts
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../../src/redux/slices/mainViewSlice";
import restaurantReducer from "../../src/redux/slices/restaurantsSlice";
import userReducer from "../../src/redux/slices/userSlice";

export const store = configureStore({
  reducer: {
    mainView: mainReducer,
    restaurantsData: restaurantReducer,
    userData: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
