import { CategoryData } from "./CategoryDataTypes";
import { UserUiPreferences } from "./RestaurantObject";

export interface RestaurantAllData {
  id: string;
  name: string;
  userUiPreferences: UserUiPreferences;
  categories: CategoryData[];
  tables: [];
}
