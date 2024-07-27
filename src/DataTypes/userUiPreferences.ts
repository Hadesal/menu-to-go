
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
  ingredientViewType: "GRID" | "LIST";
  itemsViewType: "GRID" | "LIST";
}
