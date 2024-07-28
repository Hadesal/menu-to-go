import { CategoryData } from "./CategoryDataTypes";
import { UserUiPreferences } from "./userUiPreferences";

export interface RestaurantAllData {
  id: string;
  name: string;
  userUiPreferences: UserUiPreferences;
  category: CategoryData[];
  tables: [];
}
