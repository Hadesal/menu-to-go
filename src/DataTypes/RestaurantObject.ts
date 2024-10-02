import { CategoryData } from "./CategoryDataTypes";

export interface RestaurantData {
  id?: string;
  name: string;
  categories: CategoryData[];
  tables: TableData[];
  userUiPreferences?: UserUiPreferences;
}

export interface addRestaurantData {
  name: string;
}

export interface UserUiPreferences {
  colors: Colors;
  fontType: string;
  categoryShape: string;
  contactLinks: ContactLinks;
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

export interface ContactLinks {
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface TableData {
  id: string;
  number: number;
  capacity: number;
}
