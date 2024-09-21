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
  colors: Colors;
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
export interface Colors {
  primaryColor: string;
  secondaryColor: string;
  effectedSpace: string;
}
