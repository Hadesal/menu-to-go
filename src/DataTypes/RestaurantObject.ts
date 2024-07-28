export interface RestaurantData {
  id?: string;
  name: string;
  categories?: [];
  table?: [];
  userUiPreferences: UserUiPreferences;
}
export interface UserUiPreferences {
  primaryColor: "";
  secondaryColor: "";
  fontType: "";
  categoryShape: "";
  contactLinks: {
    facebook: "";
    twitter: "";
    instagram: "";
  };
  ingredientViewType: ViewType.GRID;
  itemsViewType: ViewType;
}

export enum ViewType {
  GRID = "GRID",
  LIST = "LIST",
}
