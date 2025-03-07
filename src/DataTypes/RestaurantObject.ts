import { CategoryData } from "./CategoryDataTypes";

export interface RestaurantData {
  id?: string;
  name: string;
  categories: CategoryData[];
  tables: TableData[];
  userUiPreferences: UserUiPreferences;
  currency: string;
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
  logo: string;
}

export enum ViewType {
  GRID = "GRID",
  LIST = "LIST",
}

export interface Colors {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
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
