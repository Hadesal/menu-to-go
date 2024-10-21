import { TabType } from "@constants/types";
import { CategoryData } from "@dataTypes/CategoryDataTypes";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import { UserDataType } from "@dataTypes/UserDataTypes";

// RestaurantState interface
export interface RestaurantState {
  restaurantList: RestaurantData[];
  selectedRestaurant: RestaurantData | null;
  selectedCategory: CategoryData | null;
  selectedProduct: ProductData | null;
  categoryLoading: boolean;
  productLoading: boolean;
  restaurantLoading: boolean;
  error: string | null;
  categoryError: string | null;
  productError: string | null;
  successMessage: string | null;
  selectedProductsIDs: string[];
}
export interface ProductState {
  productList: ProductData[];
  selectedProduct: ProductData | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}
export interface MenuState {
  restaurantData: RestaurantData;
  selectedProduct: ProductData;
  selectedCategory: CategoryData;
  selectedCategoryType: string;
  loading: boolean;
  error: string | null;
}
export interface MainState {
  activeTab: TabType;
}
export interface CategoryState {
  selectedCategory: CategoryData | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}
export interface UserState {
  user: UserDataType | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}
