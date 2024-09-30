import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "@slices/mainViewSlice";
import restaurantReducer from "@slices/restaurantsSlice";
import userReducer from "@slices/userSlice";
import menuReducer from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    mainView: mainReducer,
    restaurantsData: restaurantReducer,
    userData: userReducer,
    menuData: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
