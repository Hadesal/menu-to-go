import { CategoryData } from "./CategoryDataTypes";

export interface RestaurantData {
  id?: string;
  name: string;
  categories: CategoryData[];
  table: [];
  userUiPreferences: UserUiPreferences;
}

export interface addRestaurantData {
  name: string;
}

export interface UserUiPreferences {
  primaryColor: string;
  secondaryColor: string;
  fontType: string;
  categoryShape: string;
  contactLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  ingredientViewType: ViewType;
  itemsViewType: ViewType;
}

export enum ViewType {
  GRID = "GRID",
  LIST = "LIST",
}
