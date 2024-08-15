import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../../src/redux/slices/mainViewSlice";
import restaurantReducer from "../../src/redux/slices/restaurantsSlice";
import userReducer from "../../src/redux/slices/userSlice";
import menuReducer from "../../src/redux/slices/menuSlice";
import categoryReducer from "../../src/redux/slices/categorySlice"; // Import the Category slice
import productReducer from "../../src/redux/slices/productSlice"; // Import the Product slice

export const store = configureStore({
  reducer: {
    mainView: mainReducer,
    restaurantsData: restaurantReducer,
    userData: userReducer,
    menuData: menuReducer,
    categoriesData: categoryReducer,
    productsData: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
