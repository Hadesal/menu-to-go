import { CategoryData } from "@dataTypes/CategoryDataTypes";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Styles from "../../../DataTypes/StylesTypes";
import { useAppSelector } from "@redux/reduxHooks";
import { useTranslation } from "react-i18next";
import DropDownMenuComponent from "../../common/DropDownMenu/DropDownMenuComponent";
interface CategoryListItemProps {
  item: CategoryData;
  index: number;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  onMenuClose: (index: number) => void;
  itemClick: (item: CategoryData) => void;
  anchorEl: HTMLElement | null;
  handleEditClick: (item: CategoryData) => void;
  handleDeleteClick: (item: CategoryData) => void;
  styles: Styles;
  length: number;
}

const CategoryListItemItem = ({
  item,
  index,
  onMenuClick,
  onMenuClose,
  anchorEl,
  handleEditClick,
  handleDeleteClick,
  itemClick,
  styles,
  length,
}: CategoryListItemProps) => {
  const { t } = useTranslation();
  const getString = t;
  const { selectedCategory } = useAppSelector((state) => state.restaurantsData);
  const menuItems = () => [
    {
      text: getString("edit"),
      icon: <EditIcon fontSize="small" sx={styles.dropDownMenuItemIcon} />,
      onClick: () => handleEditClick(item),
    },
    {
      text: getString("delete"),
      icon: (
        <DeleteOutlinedIcon fontSize="small" sx={styles.dropDownMenuItemIcon} />
      ),
      onClick: () => handleDeleteClick(item),
    },
  ];

  return (
    <ListItem
      onClick={() => {
        itemClick(item);
      }}
      sx={{
        ...styles.categoryListItem,
        borderRadius: index === length - 1 ? "0 0 16px 16px" : "0",
        background:
          selectedCategory?.id === item.id ? "var(--primary-color)" : "initial",
      }}
      key={item.id}
    >
      <Box sx={styles.categoryListItemBox}>
        <ListItemText
          primary={
            <Box sx={styles.categoryListItemText}>
              <IconButton
                sx={{ ...styles.iconButton, cursor: "grab" }}
                aria-label="more"
              >
                <DragIndicatorIcon
                  sx={{
                    color:
                      selectedCategory?.id === item.id
                        ? styles.selectedCategoryColor
                        : styles.defaultCategoryColor,
                  }}
                  fontSize="medium"
                />
              </IconButton>
              <Typography
                noWrap
                sx={styles.categoryName}
                variant="body1"
                color={
                  selectedCategory?.id === item.id
                    ? "white"
                    : "var(--primary-color)"
                }
              >
                {item.name}
                <Typography
                  noWrap
                  color={selectedCategory?.id === item.id ? "white" : "#BCB8B1"}
                  sx={styles.categoryItemsLengthText}
                  component="span"
                >
                  ({item?.products?.length})
                </Typography>
              </Typography>
            </Box>
          }
        />
      </Box>
      <IconButton
        sx={styles.iconButton}
        aria-label="more"
        onClick={(event) => onMenuClick(event, index)}
      >
        <MoreVertIcon
          sx={{
            color:
              selectedCategory?.id === item.id
                ? styles.selectedCategoryColor
                : styles.defaultCategoryColor,
          }}
          fontSize="small"
        />
      </IconButton>
      <DropDownMenuComponent
        menuItems={menuItems()}
        open={Boolean(anchorEl)}
        onClose={() => onMenuClose(index)}
        anchorEl={anchorEl}
        idPrefix="categoryOptions"
        index={index}
      />
    </ListItem>
  );
};

export default CategoryListItemItem;
