import { SxProps, Theme } from "@mui/system";
import { CSSProperties } from "react";

interface Styles {
  stack?: SxProps<Theme>;
  typography?: SxProps<Theme>;
  paper?: SxProps<Theme>;
  searchField?: SxProps<Theme>;
  addButton?: SxProps<Theme>;
  addButtonCategory?: SxProps<Theme>;
  gridPaper?: SxProps<Theme>;
  card?: SxProps<Theme>;
  cardContent?: SxProps<Theme>;
  stackColumn?: SxProps<Theme>;
  stackRow?: SxProps<Theme>;
  iconButton?: SxProps<Theme>;
  container?: SxProps<Theme>;
  list?: SxProps<Theme>;
  paperListView?: SxProps<Theme>;
  listItemBox?: SxProps<Theme>;
  categoryList?: SxProps<Theme>;
  categoryPaper?: SxProps<Theme>;
  previewMenu?: SxProps<Theme>;
  productListItem?: SxProps<Theme>;
  productListItemBox?: SxProps<Theme>;
  productImg?: CSSProperties;
  productCheckBox?: SxProps<Theme>;
  productName?: SxProps<Theme>;
  productPrice?: SxProps<Theme>;
  productMoreIcon?: SxProps<Theme>;
  categoryListItem?: SxProps<Theme>;
  categoryListItemBox?: SxProps<Theme>;
  categoryListItemText?: SxProps<Theme>;
  categoryListItemTextWrapper?: SxProps<Theme>;
  categoryName?: SxProps<Theme>;
  categoryItemsLengthText?: SxProps<Theme>;
  dropDownMenuItemIcon?: SxProps<Theme>;
  selectedCategoryColor?: string;
  defaultCategoryColor?: string;
}

export default Styles;
